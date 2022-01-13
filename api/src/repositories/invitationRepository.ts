import { CouchDbRepository } from "./couchDbRepository";
import Invitation from "../models/invitation";
import { classToPlain, plainToClass } from "class-transformer";
import getUUID from "../services/utils/getUUID";

export interface CreateInvitationProps {
  email?: string;
  roleId?: string;
  groupId?: string;
  status?: string;
  orgId?: string;
}

class invitationRepository extends CouchDbRepository {
  private designName: string = "inv";
  constructor() {
    super();
  }

  public async create(invitation: CreateInvitationProps): Promise<Invitation> {
    const uuid = await getUUID();
    const id = `inv:${uuid[0]}`;
    const newInvitation: Invitation = { ...invitation, id };
    await this.db.atomic(
      this.designName,
      "upsert",
      id,
      classToPlain(newInvitation)
    );
    return plainToClass(Invitation, newInvitation);
  }

  public async delete(invitationId: string, rev: string) {
    try {
      await this.db.destroy(invitationId, rev);
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      console.error(`Couch DB error ${e}`);
    }
  }

  public async list(orgId?: string): Promise<Invitation[]> {
    let result = await this.db.view<any>("inv", "list", {
      key: orgId,
    });
    return plainToClass(
      Invitation,
      result.rows.map(({ value }) => value)
    );
  }

  public async getById(
    invitationId: string
  ): Promise<Invitation | null | undefined> {
    try {
      const result = await this.db.get(invitationId);
      return plainToClass(Invitation, result);
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      console.error(`Couch DB error ${e}`);
    }
  }

  public async edit(id: string, invitation: CreateInvitationProps) {
    return await this.db.atomic(this.designName, "upsert", id, invitation);
  }
}
export default new invitationRepository();
