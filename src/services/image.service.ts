import axios from "axios";
import FormData from "form-data";

export const uploadImage = (data: Buffer, name: string) => {
  const body = new FormData();
  body.append("file", data, name);
  return axios.post("http://localhost:8080/upload", body);
};
