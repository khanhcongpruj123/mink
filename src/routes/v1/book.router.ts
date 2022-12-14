import { RequestWithUser } from "@models/auth.model";
import express, { NextFunction, Request, Response } from "express";
import * as bookService from "@services/book.service";
import { AuthRouter, BasicRouter } from "@core/router";
import * as _ from "lodash";
import * as imageService from "@services/image.service";
import {
  BadRequest,
  BookIsExisted,
  BookNotFound,
  BookThumbnailIsEmpty,
  BookThumbnailIsTooLarge,
} from "@core/error";
import Logger from "@libs/logger";
import { Book } from "@prisma/client";

const BOOK_THUMBNAIL_FIELD_NAME = "thumbnail";
const THUMBNAIL_LIMIT_SIZE = 100 * 1000; // bytes

const router = express.Router({ mergeParams: true });

/**
 * Create book router
 */
router.post(
  "/",
  AuthRouter(
    async (
      request: RequestWithUser,
      response: Response,
      next: NextFunction
    ) => {
      const { name, description } = request.body;
      // eslint-disable-next-line prettier/prettier
      const thumbnail = _.find(
        request.files,
        (f: Express.Multer.File) => f.fieldname === BOOK_THUMBNAIL_FIELD_NAME
      ) as Express.Multer.File;

      if (!thumbnail) throw BookThumbnailIsEmpty;
      if (!checkThumbnailSize(thumbnail)) throw BookThumbnailIsTooLarge;

      // eslint-disable-next-line prettier/prettier
      const existBook = await bookService.getBySlug(
        bookService.extractToSlug(name)
      );
      if (existBook) throw BookIsExisted;

      const uploadRes = await imageService.uploadImage(
        thumbnail.buffer,
        thumbnail.originalname
      );

      if (!uploadRes.data.fileName) throw BookThumbnailIsEmpty;

      const book = await bookService.create(
        name,
        description,
        uploadRes.data.fileName,
        request.user.id
      );
      response.json({
        ...book,
        thumbnailUrl: imageService.getImageURL(book.thumbnailUrl),
      });
    }
  )
);

/**
 * Find book by keyword
 */
router.get(
  "/search",
  BasicRouter(
    async (request: Request, response: Response, next: NextFunction) => {
      const { keyword, page, pageSize } = request.query;
      Logger.info(`Find books by keyword ${keyword}`);
      const books = await bookService.findByKeyword(
        keyword as string,
        page ? Number(page) : undefined,
        pageSize ? Number(pageSize) : undefined
      );
      response.json(books);
    }
  )
);

/**
 * Get book details
 */
router.get(
  "/:bookId",
  BasicRouter(
    async (request: Request, response: Response, next: NextFunction) => {
      const bookId = request.params.bookId;
      if (!bookId) throw BadRequest("Book Id is required!");
      const book = await bookService.getById(bookId);
      if (!book) throw BookNotFound;
      Logger.info(`Info book with id: ${bookId}`);
      response.json({
        ...book,
      });
    }
  )
);

router.put(
  "/:bookId",
  AuthRouter(
    async (
      request: RequestWithUser,
      response: Response,
      next: NextFunction
    ) => {
      const { bookId } = request.params;
      if (!bookId) throw BadRequest("Book id is required!");
      // check ownership
      const isOwner = await bookService.isOwner(request.user, bookId);
      if (isOwner) {
        const { name, description } = request.body;
        const thumbnail = _.find(
          request.files,
          (f: Express.Multer.File) => f.fieldname === BOOK_THUMBNAIL_FIELD_NAME
        ) as Express.Multer.File;
        // check valid and update
        const book = await bookService.getById(bookId);
        book.name = name;
        book.description = description;
        if (thumbnail) {
          if (checkThumbnailSize(thumbnail)) {
            const uploadRes = await imageService.uploadImage(
              thumbnail.buffer,
              thumbnail.originalname
            );
            // check valid thumnail url
            if (!uploadRes.data.fileName) throw BookThumbnailIsEmpty;
            book.thumbnailUrl = uploadRes.data.fileName;
          } else {
            throw BookThumbnailIsTooLarge;
          }
        }
        await bookService.update(book);
        response.sendStatus(202);
      } else {
        throw BookNotFound;
      }
    }
  )
);

const checkThumbnailSize = (thumbnail: Express.Multer.File) => {
  return thumbnail.size <= THUMBNAIL_LIMIT_SIZE;
};

export default router;
