import { AutoMapper, mapFrom, ProfileBase } from "@nartc/automapper";
import { ExpenseTypeDTO } from "../DTO/expenseTypeDTO";
import Tax from "../models/tax";
import { TaxDTO } from "../DTO/taxDTO";
import { FirebaseUserDTO } from "../DTO/userDTO";
import Expense from "../models/expense";
import { ExpenseDTO } from "../DTO/expenseDTO";
import ExpenseType from "../models/expenseType";
import { FirebaseUser } from "../models/user";
import Role from "../models/role";
import RoleDTO from "../DTO/roleDTO";
import Group from "../models/group";
import { GroupDTO } from "../DTO/groupDTO";
import Sheet from "../models/sheet";
import { SheetDTO } from "../DTO/sheetDTO";
import Organization, { Contact } from "../models/org";
import { ContactDTO, OrgDTO } from "../DTO/orgDTO";
import Invitation from "../models/invitation";
import { InvitationDTO } from "../DTO/invitationDTO";

export class AutoMapProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(FirebaseUser, FirebaseUserDTO);
    mapper.createMap(ExpenseType, ExpenseTypeDTO);
    mapper.createMap(Role, RoleDTO);
    mapper.createMap(Tax, TaxDTO);
    mapper.createMap(Invitation, InvitationDTO);
    mapper.createMap(Group, GroupDTO);
    mapper.createMap(Expense, ExpenseDTO).forMember(
      (d) => d.attachments,
      mapFrom((s) => s.attachments)
    );
    mapper.createMap(Sheet, SheetDTO);
    mapper.createMap(Contact, ContactDTO);
    mapper.createMap(Organization, OrgDTO).forMember(
      (d) => d.contact,
      mapFrom((s) => s.contact)
    );
  }
}

export default AutoMapProfile;
