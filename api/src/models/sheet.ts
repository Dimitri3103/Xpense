import { AutoMap } from "@nartc/automapper";
import { Expose } from "class-transformer";

export default class Sheet {
  @AutoMap()
  @Expose({ name: "_id" })
  id?: string;
  @AutoMap()
  @Expose()
  type?: string;
  @AutoMap()
  @Expose()
  orgId?: string;
  @AutoMap()
  @Expose()
  userId?: string;
  @AutoMap()
  @Expose()
  label?: string;
  @AutoMap()
  @Expose()
  description?: string;
  @AutoMap()
  @Expose()
  status?: "new" | "pending" | "approved" | "declined";
  @AutoMap()
  @Expose()
  creationDate?: Date;
  @AutoMap()
  @Expose()
  submittedOn?: Date;
  @AutoMap()
  @Expose()
  exported?: boolean;
  @AutoMap()
  @Expose()
  total?: number;
  @Expose({name: '_rev'})
  rev?: string
}
