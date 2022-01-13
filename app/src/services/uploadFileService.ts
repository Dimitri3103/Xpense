import http from "../utils/http-common";

const uploadFile = (type, id, file) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post(`/uploads/${type}/${id}`, formData);
};

export { uploadFile };
