import { CouchDbRepository } from "./couchDbRepository";
import ExpenseType from "../models/expenseType";
import { classToPlain, plainToClass } from "class-transformer";
import getUUID from "../services/utils/getUUID";

export interface CreateExpenseTypeProps {
  code?: string;
  orgId?: string;
  multiplicator?: number;
  i18n?: string;
  attachmentRequired?: boolean;
  status?: string;
  type?: string;
}

class expenseTypeRepository extends CouchDbRepository {
  private designName: string = "expt";
  constructor() {
    super();
  }

  public async create(
    expenseType: CreateExpenseTypeProps
  ): Promise<ExpenseType> {
    const uuid = await getUUID();
    const id = `expt:${uuid[0]}`;
    const newExpenseType: ExpenseType = { ...expenseType, id };
    await this.db.atomic(
      this.designName,
      "upsert",
      id,
      classToPlain(newExpenseType)
    );
    return plainToClass(ExpenseType, newExpenseType);
  }

  public async delete(expenseTypeId: string, rev: string) {
    try {
      await this.db.destroy(expenseTypeId, rev);
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      console.error(`Couch DB error ${e}`);
    }
  }

  public async edit(id: string, expenseType: CreateExpenseTypeProps) {
    return await this.db.atomic(this.designName, "upsert", id, expenseType);
  }

  public async list(orgId?: string): Promise<ExpenseType[]> {
    let result = await this.db.view<any>("expt", "list", {
      key: orgId,
    });
    return plainToClass(
      ExpenseType,
      result.rows.map(({ value }) => value)
    );
  }

  public async getById(
    expenseTypeId: string
  ): Promise<ExpenseType | null | undefined> {
    try {
      const result = await this.db.get(expenseTypeId);
      return plainToClass(ExpenseType, result);
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      console.error(`Couch DB error ${e}`);
    }
  }
}
export default new expenseTypeRepository();
