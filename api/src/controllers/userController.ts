import {
  JsonController,
  Get,
  UseBefore,
  Patch,
  Param,
  OnUndefined,
  Post,
  Body,
  Req,
  Delete,
  NotFoundError,
} from "routing-controllers";
import checkPermissions from "../middlewares/permissions.middleware";
import { AdminPermissions } from "../enums/permissions";
import userService from "../services/users";
import {
  changeRoleDTO,
  FirebaseUserDTO,
  RegisterUserDTO,
} from "../DTO/userDTO";
import { Mapper } from "@nartc/automapper";
import { authenticate } from "../middlewares/authenticate.middleware";
import { Request } from "express";
import { SheetDTO } from "../DTO/sheetDTO";

@JsonController()
class UserController {
  //@UseBefore(checkPermissions([AdminPermissions.showUsers], true))
  @Get("/org/:orgId/users")
  async getUsersByOrg(@Param("orgId") orgId: string) {
    const users = await userService.getUsersByOrg(orgId);
    return Mapper.mapArray(users, FirebaseUserDTO);
  }

  @Patch("/users/:userId")
  @OnUndefined(204)
  async updateRole(
    @Param("userId") userId: string,
    @Body() roleName: changeRoleDTO
  ) {
    await userService.changeRole(userId, roleName);
  }

  @Get("/roles")
  async getAllRoles() {
    return await userService.getAllRoles();
  }

  @Delete("/users/:userId")
  @OnUndefined(204)
  async removeUserFromCorporation(@Param("userId") userId: string) {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    await userService.removeUserFromCorporation(userId, user.rev!);
  }
  @Post("/users")
  @OnUndefined(201)
  async createUser(@Body() user: RegisterUserDTO) {
    return await userService.createUser(user);
  }

  @Post("/users/:uid")
  @OnUndefined(204)
  async createUserWithGoogle(
    @Param("uid") uid: string,
    @Body() user: RegisterUserDTO
  ) {
    if (!(await userService.exist(`user:${uid}`))) {
      return await userService.createUserWithGoogle(uid, user);
    }
    console.log("User Already existing Welcome");
  }

  @Get("/users/userId/sheets")
  @UseBefore(authenticate)
  async getSheetsByUser(@Req() request: Request) {
    const result = await userService.getSheetById(`user:${request.userId}`);
    return Mapper.mapArray(result, SheetDTO);
  }
}

export default UserController;
