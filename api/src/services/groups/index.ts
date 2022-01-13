import createGroup from "./createGroup";
import getGroups from "./getGroups";
import updateGroup from "./updateGroup";
import getGroupById from "./getGroupById";
import exist from "./exist";
import deleteGroup from "./deleteGroup";
import removeUserFromGroup from "./removeUserFromGroup";
import addUserToGroup from "./addUserToGroup";
import assignExpenseTypesToGroup from "./assignExpenseTypesToGroup";
import addSupervisorToGroup from "./addSupervisorToGroup";
import removeSupervisorFromGroup from "./removeSupervisorFromGroup";

export default {
  createGroup,
  updateGroup,
  getGroups,
  getGroupById,
  exist,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup,
  assignExpenseTypesToGroup,
  addSupervisorToGroup,
  removeSupervisorFromGroup,
};
