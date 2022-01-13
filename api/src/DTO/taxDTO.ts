import { AutoMap } from "@nartc/automapper";
import { IsNotEmpty, IsString } from "class-validator";

export class TaxDTO {
  @AutoMap()
  id?: string;
  @AutoMap()
  code?: string;
  @AutoMap()
  defaultRate?: number;
  @AutoMap()
  i18n?: string;
  @AutoMap()
  orgId?: string;
}

export class UpsertTaxDTO {
  @IsNotEmpty()
  @IsString()
  code?: string;
  @IsNotEmpty()
  i18n?: string;
  defaultRate?: number;
}
