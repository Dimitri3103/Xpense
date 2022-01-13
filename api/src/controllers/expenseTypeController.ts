import { Mapper } from "@nartc/automapper";
import {
  JsonController,
  Get,
  UseBefore,
  Param,
  Post,
  HttpCode,
  Put,
  NotFoundError,
  Delete,
  OnUndefined,
  Body,
} from "routing-controllers";
import { ExpenseTypeDTO, UpsertExpenseTypeDTO } from "../DTO/expenseTypeDTO";
import expenseService from "../services/expense-type";
import orgService from "../services/orgs";
import expenseTypeService from "../services/expense-type";
import { authenticate } from "../middlewares/authenticate.middleware";

@JsonController()
@UseBefore(authenticate)
class ExpTypeController {
  @Get("/org/:orgId/exp-types")
  async getExpenseTypes(@Param("orgId") orgId: string) {
    const result = await expenseService.getExpenseTypes(orgId);
    return Mapper.mapArray(result, ExpenseTypeDTO);
  }

  @Get("/org/:orgId/exp-types/:expenseTypeId")
  async getExpenseType(
    @Param("orgId") orgId: string,
    @Param("expenseTypeId") expenseTypeId: string
  ) {
    const expenseType = await expenseService.getExpenseTypeById(expenseTypeId);
    return Mapper.map(expenseType, ExpenseTypeDTO);
  }

  @Post("/org/:orgId/exp-types")
  @HttpCode(201)
  async create(
    @Param("orgId") orgId: string,
    @Body() createExpenseTypeDTO: UpsertExpenseTypeDTO
  ) {
    if (!(await orgService.exist(orgId))) {
      throw new NotFoundError("Org Not Found!");
    }
    const expenseType = await expenseTypeService.createExpenseType({
      orgId,
      ...createExpenseTypeDTO,
    });
    return Mapper.map(expenseType, ExpenseTypeDTO);
  }
  
  @Put("/org/:orgId/exp-types/:expenseTypeId")
  @OnUndefined(204)
  async update(
    @Param("orgId") orgId: string,
    @Param("expenseTypeId") expenseTypeId: string,
    @Body() expenseTypeDTO: UpsertExpenseTypeDTO
  ) {
    if (!(await expenseTypeService.exist(expenseTypeId))) {
      throw new NotFoundError("ExpenseType not found");
    }
    await expenseTypeService.updateExpenseType(expenseTypeId, {
      orgId,
      ...expenseTypeDTO,
    });
  }

  @Delete("/org/:orgId/exp-types/:expenseTypeId")
  @OnUndefined(204)
  async delete(@Param("expenseTypeId") expenseTypeId: string) {
    const expenseType = await expenseTypeService.getExpenseTypeById(
      expenseTypeId
    );
    if (!expenseType) {
      throw new NotFoundError("ExpenseType not found");
    }
    await expenseTypeService.deleteExpensetype(expenseTypeId, expenseType.rev!);
  }
}

export default ExpTypeController;
