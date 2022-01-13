import { AutoMap } from "@nartc/automapper";
import { Expose } from "class-transformer";

class Invitation {
  @AutoMap()
  @Expose({ name: "_id" })
  id?: string;
  @AutoMap()
  @Expose()
  email?: string;
  @AutoMap()
  @Expose()
  roleId?: string;
  @AutoMap()
  @Expose()
  groupId?: string;
  @AutoMap()
  @Expose()
  status?: string;
  @AutoMap()
  @Expose()
  orgId?: string;
  @Expose({ name: "_rev" })
  rev?: string;
}

export default Invitation;
