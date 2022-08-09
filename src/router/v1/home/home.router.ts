/**
 * This is example for home router 
 */
import { Request, Response, Router } from 'express';

const router = Router();

router.get("/", (request: Request, response: Response) => {
    response.json({
        "message": "OK"
    });
});

export default router;