import { AutoMap } from "@nartc/automapper";
import { Attachment } from "../models/attachment";

export class ExpenseDTO {
  @AutoMap()
  id?: string;
  @AutoMap()
  sheetId?: string;
  @AutoMap()
  type?: string;
  @AutoMap()
  date?: Date;
  @AutoMap()
  label?: string;
  @AutoMap()
  payMethod?: string;
  @AutoMap()
  category?: string;
  @AutoMap()
  orgId?: string;
  @AutoMap()
  amount?: number;
  @AutoMap()
  currency?: string;
  @AutoMap()
  tax?: string;
  @AutoMap()
  taxAmount?: number;
  @AutoMap()
  attachments?: Attachment[];
}
