import { Attachment } from "./attachment";

export class Expense {
  id?: string;
  orgId?: string;
  sheetId?: string;
  type?: string;
  date?: Date;
  label?: string;
  payMethod?: string;
  category?: string;
  amount?: any;
  attachments?: Attachment[];
}
