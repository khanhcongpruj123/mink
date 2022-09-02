import axios from "axios";
import FormData from "form-data";

// eslint-disable-next-line prettier/prettier
export const IMAGE_SERVER_URL = process.env.IMAGE_SERVER_URL || "http://localhost:8080";

export const uploadImage = (data: Buffer, name: string) => {
  const body = new FormData();
  body.append("file", data, name);
  return axios.post(`${IMAGE_SERVER_URL}/upload`, body);
};

export const getImageURL = (fileName: string) => {
  return `${IMAGE_SERVER_URL}/${fileName}`;
};
