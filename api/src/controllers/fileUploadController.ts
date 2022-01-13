import {
  UseBefore,
  Post,
  UploadedFile,
  Controller,
  BadRequestError,
  Param,
} from "routing-controllers";
var mime = require("mime-types");
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { Attachment } from "../models/attachment";
import { authenticate } from "../middlewares/authenticate.middleware";
import saveAttachment from "../services/attachment/saveAttachment";

@Controller()
@UseBefore(authenticate)
class FileUploadController {
  @Post("/upload/:type/:id")
  saveFile(
    @Param("type") type: string,
    @Param("id") id: string,
    @UploadedFile("file", {
      options: {
        storage: multer.diskStorage({
          destination: (req: any, file: any, cb: any) => {
            cb(null, "public/files");
          },
          filename: (req: any, file: any, cb: any) => {
            const fileExtension = mime.extension(file.mimetype);
            cb(null, `${uuidv4()}.${fileExtension}`);
          },
        }),
        fileFilter: (req: any, file: any, cb: any) => {
          if (
            file.mimetype !== "application/pdf" &&
            file.mimetype !== "image/jpeg" &&
            file.mimetype !== "image/png" &&
            file.mimetype !== "image/gif" &&
            file.mimetype !== "image/bnp"
          ) {
            return cb(null, false);
          }
          cb(null, true);
        },
      },
    })
    file: any
  ) {
    if (!file) throw new BadRequestError("Invalid file");

    const newAttachment: Attachment = {
      name: file.filename,
      originalName: file.originalname,
    };

    return saveAttachment(type, id, newAttachment);
  }
}
export default FileUploadController;
