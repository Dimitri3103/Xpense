import { Mapper } from "@nartc/automapper";
import {
  JsonController,
  Get,
  UseBefore,
  Param,
  Post,
  HttpCode,
  Put,
  Delete,
  OnUndefined,
  NotFoundError,
  Body,
} from "routing-controllers";
import { InvitationDTO, UpsertInvitationDTO } from "../DTO/invitationDTO";
import { authenticate } from "../middlewares/authenticate.middleware";
import orgService from "../services/orgs";
import invitationService from "../services/invitations";

@JsonController()
@UseBefore(authenticate)
class InvitationController {
  @Get("/org/:orgId/invitations")
  async getInvitations(@Param("orgId") orgId: string) {
    const result = await invitationService.getInvitations(orgId);
    return Mapper.mapArray(result, InvitationDTO);
  }

  @Get("/org/:orgId/invitations/:invitationId")
  async getInvitation(
    @Param("orgId") orgId: string,
    @Param("invitationId") invitationId: string
  ) {
    const invitation = await invitationService.getInvitationById(invitationId);
    return Mapper.map(invitation, InvitationDTO);
  }

  @Post("/org/:orgId/invitations")
  @HttpCode(201)
  async create(
    @Param("orgId") orgId: string,
    @Body() createInvitationDTO: UpsertInvitationDTO
  ) {
    if (!(await orgService.exist(orgId))) {
      throw new NotFoundError("Org Not Found!");
    }
    const invitation = await invitationService.createInvitation({
      orgId,
      ...createInvitationDTO,
    });
    return Mapper.map(invitation, InvitationDTO);
  }

  @Put("/org/:orgId/invitations/:invitationId")
  @OnUndefined(204)
  async update(
    @Param("orgId") orgId: string,
    @Param("invitationId") invitationId: string,
    @Body() invitationDTO: UpsertInvitationDTO
  ) {
    if (!(await invitationService.exist(invitationId))) {
      throw new NotFoundError("Invitation not found");
    }
    await invitationService.updateInvitation(invitationId, {
      orgId,
      ...invitationDTO,
    });
  }

  @Delete("/org/:orgId/invitations/:invitationId")
  @OnUndefined(204)
  async delete(@Param("invitationId") invitationId: string) {
    const invitation = await invitationService.getInvitationById(invitationId);
    if (!invitation) {
      throw new NotFoundError("Invitation not found");
    }
    await invitationService.deleteInvitation(invitationId, invitation.rev!);
  }
}

export default InvitationController;
