import { AutoMap } from "@nartc/automapper";
import { Expose } from "class-transformer";

class Tax {
  @AutoMap()
  @Expose({ name: "_id" })
  id?: string;
  @AutoMap()
  @Expose()
  code?: string;
  @AutoMap()
  @Expose()
  defaultRate?: number;
  @AutoMap()
  @Expose()
  i18n?: string;
  @Expose()
  @AutoMap()
  orgId?: string;
  @Expose({ name: "_rev" })
  rev?: string;
}

export default Tax;
