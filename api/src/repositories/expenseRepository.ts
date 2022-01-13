import { CouchDbRepository } from "./couchDbRepository";
import Expense from "../models/expense";
import { classToPlain, plainToClass } from "class-transformer";
import { Attachment } from "../models/attachment";
import getUUID from "../services/utils/getUUID";
export interface CreateExpenseProps {
  type?: string;
  sheetId?: string;
  orgId?: string;
  date?: Date;
  label?: string;
  payMethod?: string;
  category?: string;
  amount?: number;
  currency?: string;
  tax?: string;
  taxAmount?: number;
  attachments?: Attachment[];
}
class expenseRepository extends CouchDbRepository {
  private designName: string = "exp";

  constructor() {
    super();
  }

  public async getAllBySheet(sheetId: string): Promise<Expense[]> {
    let result = await this.db.view<any>(this.designName, "by-sheet", {
      key: sheetId,
    });
    return plainToClass(
      Expense,
      result.rows.map(({ value }) => value)
    );
  }

  public async getById(expenseId: string): Promise<Expense | null | undefined> {
    try {
      const result = await this.db.get(expenseId);
      return plainToClass(Expense, result);
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      console.error(`Couch DB error ${e}`);
    }
  }

  public async saveAttachment(sheetId: string, attachment: Attachment) {
    return await this.db.atomic(
      this.designName,
      "add-attachment",
      sheetId,
      classToPlain(attachment)
    );
  }

  public async update(id: string, expense: CreateExpenseProps) {
    return await this.db.atomic(this.designName, "upsert", id, expense);
  }
  public async deleteExpense(expenseId: string, rev: string) {
    try {
      await this.db.destroy(expenseId, rev);
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      console.error(`CouchDB error ${e} `);
    }
  }
  public async createExpense(expense: CreateExpenseProps): Promise<Expense> {
    const uuid = await getUUID();
    const id = `exp:${uuid[0]}`;
    const newExpense: Expense = { ...expense, id, attachments: [] };
    await this.db.atomic(
      this.designName,
      "upsert",
      id,
      classToPlain(newExpense)
    );
    return plainToClass(Expense, newExpense);
  }
}
export default new expenseRepository();
