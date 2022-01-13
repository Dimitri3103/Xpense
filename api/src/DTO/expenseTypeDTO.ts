import { AutoMap } from "@nartc/automapper";
import { IsNotEmpty } from "class-validator";

export class ExpenseTypeDTO {
  @AutoMap()
  id?: string;
  @AutoMap()
  code?: string;
  @AutoMap()
  type?: string;
  @AutoMap()
  multiplicator?: number;
  @AutoMap()
  i18n?: string;
  @AutoMap()
  status?: string;
  @AutoMap()
  orgId?: string;
  @AutoMap()
  attachmentRequired?: boolean;
}

export class UpsertExpenseTypeDTO {
  @IsNotEmpty()
  code?: string;
  @IsNotEmpty()
  i18n?: string;
  @IsNotEmpty()
  type?: string;
  @IsNotEmpty()
  status?: string;
  @IsNotEmpty()
  attachmentRequired?: boolean;
  multiplicator?: number;
}
