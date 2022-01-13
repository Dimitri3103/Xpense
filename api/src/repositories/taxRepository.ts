import { CouchDbRepository } from "./couchDbRepository";
import Tax from "../models/tax";
import { classToPlain, plainToClass } from "class-transformer";
import getUUID from "../services/utils/getUUID";

export interface CreateTaxProps {
  code?: string;
  i18n?: string;
  defaultRate?: number;
  orgId?: string;
}

class taxRepository extends CouchDbRepository {
  private designName: string = "tx";
  constructor() {
    super();
  }

  public async create(tax: CreateTaxProps): Promise<Tax> {
    const uuid = await getUUID();
    const id = `tx:${uuid[0]}`;
    const newTax: Tax = { ...tax, id };
    await this.db.atomic(this.designName, "upsert", id, classToPlain(newTax));
    return plainToClass(Tax, newTax);
  }

  public async delete(taxId: string, rev: string) {
    try {
      await this.db.destroy(taxId, rev);
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      console.error(`Couch DB error ${e}`);
    }
  }

  public async edit(id: string, tax: CreateTaxProps) {
    return await this.db.atomic(this.designName, "upsert", id, tax);
  }

  public async list(orgId?: string): Promise<Tax[]> {
    let result = await this.db.view<any>("tx", "list", {
      key: orgId,
    });
    return plainToClass(
      Tax,
      result.rows.map(({ value }) => value)
    );
  }

  public async getById(taxId: string): Promise<Tax | null | undefined> {
    try {
      const result = await this.db.get(taxId);
      return plainToClass(Tax, result);
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      console.error(`Couch DB error ${e}`);
    }
  }
}
export default new taxRepository();
