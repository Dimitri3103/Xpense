import { httpClient } from "../utils/httpClient";

const uploadFile = async (type: string, id: string, file) => {
  let formData = new FormData();
  formData.append("file", file);
  const { data } = await httpClient.uploadFile(
    `/upload/${type}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

const deleteFile = async (type: string, id: string, file) => {};

export { uploadFile, deleteFile };
