import { AutoMap } from "@nartc/automapper";
import { IsNotEmpty, IsString } from "class-validator";

export class InvitationDTO {
  @AutoMap()
  id?: string;
  @AutoMap()
  email?: string;
  @AutoMap()
  roleId?: string;
  @AutoMap()
  groupId?: string;
  @AutoMap()
  status?: string;
  @AutoMap()
  orgId?: string;
}

export class UpsertInvitationDTO {
  @IsNotEmpty()
  @IsString()
  email: string = "";
  @IsNotEmpty()
  roleId: string = "";
  @IsNotEmpty()
  @IsString()
  groupId: string = "";
}
