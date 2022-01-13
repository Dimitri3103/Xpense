import { Attachment } from "../../models/attachment";
import expenseRepository from "../../repositories/expenseRepository";

export default async (type: string, id: string, attachment: Attachment) => {
  if (type == "exp")
    return await expenseRepository.saveAttachment(id, attachment);
};
