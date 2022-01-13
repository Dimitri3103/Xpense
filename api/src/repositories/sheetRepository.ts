import { classToPlain, plainToClass } from "class-transformer";
import Sheet from "../models/sheet";
import getUUID from "../services/utils/getUUID";
import { CouchDbRepository } from "./couchDbRepository";
export interface CreateSheetProps {
  orgId?: string;
  label?: string;
  description?: string;
  total?: number;
  exported?: boolean;
  creationDate?: Date;
  submittedOn?: Date;
  userId?: string;
}
class SheetRepository extends CouchDbRepository {
  private designName: string = "sheet";
  constructor() {
    super();
  }
  public async find(orgId: string): Promise<Sheet[]> {
    const result = await this.db.view<Sheet>("sheet", "list", {
      key: orgId,
    });
    return plainToClass(
      Sheet,
      result.rows.map(({ value }) => value)
    );
  }
  public async getById(sheetId: string): Promise<Sheet | null | undefined> {
    try {
      const result = await this.db.get(sheetId);
      return plainToClass(Sheet, result);
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      console.error(`Couch DB error ${e}`);
    }
  }
  public async updateTotalSheet(id: string, sheet: CreateSheetProps) {
    return await this.db.atomic(this.designName, "upsert", id, sheet);
  }
  public async create(sheet: CreateSheetProps): Promise<Sheet> {
    const uuid = await getUUID();
    //const prefix = `sheet:${i++}`;
    const id = `sheet:${uuid[0]}`;
    const type = "sheet";
    const newSheet: Sheet = { ...sheet, id };
    const result = await this.db.atomic(
      this.designName,
      "upsert",
      id,
      classToPlain(newSheet)
    );
    console.table(result);
    return plainToClass(Sheet, newSheet);
  }

  public async getSheetByUserId(userId: string): Promise<Sheet[]> {
    const result = await this.db.view<Sheet>(
      this.designName,
      "sheetsByUserId",
      {
        key: userId,
      }
    );
    return plainToClass(
      Sheet,
      result.rows.map(({ value }) => value)
    );
  }

  public async delete(sheetId: string, rev: string) {
    try {
      await this.db.destroy(sheetId, rev);
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      console.error(`Couch DB error ${e}`);
    }
  }
}
export default new SheetRepository();
