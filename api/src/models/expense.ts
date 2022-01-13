import { AutoMap } from "@nartc/automapper";
import { Expose } from "class-transformer";
import { Attachment } from "./attachment";

export default class Expense {
  @AutoMap()
  @Expose({ name: "_id" })
  id?: string;
  @AutoMap()
  @Expose()
  sheetId?: string;
  @AutoMap()
  @Expose()
  type?: string;
  @AutoMap()
  @Expose()
  date?: Date;
  @AutoMap()
  @Expose()
  label?: string;
  @AutoMap()
  @Expose()
  payMethod?: string;
  @AutoMap()
  @Expose()
  category?: string;
  @AutoMap()
  orgId?: string;
  @AutoMap()
  @Expose()
  amount?: number;
  @AutoMap()
  @Expose()
  currency?: string;
  @AutoMap()
  @Expose()
  tax?: string;
  @AutoMap()
  @Expose()
  taxAmount?: number;
  @AutoMap()
  @Expose()
  attachments?: Attachment[];
  @Expose({ name: "_rev" })
  rev?: string;
}
