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
import { TaxDTO, UpsertTaxDTO } from "../DTO/taxDTO";
import { authenticate } from "../middlewares/authenticate.middleware";
import orgService from "../services/orgs";
import taxService from "../services/tax";

@JsonController()
@UseBefore(authenticate)
class TaxController {
  @Get("/org/:orgId/taxes")
  async getTaxes(@Param("orgId") orgId: string) {
    const result = await taxService.getTaxes(orgId);
    return Mapper.mapArray(result, TaxDTO);
  }

  @Get("/org/:orgId/taxes/:taxId")
  async getTax(@Param("orgId") orgId: string, @Param("taxId") taxId: string) {
    const tax = await taxService.getTaxById(taxId);
    return Mapper.map(tax, TaxDTO);
  }

  @Post("/org/:orgId/taxes")
  @HttpCode(201)
  async create(
    @Param("orgId") orgId: string,
    @Body() createTaxDTO: UpsertTaxDTO
  ) {
    if (!(await orgService.exist(orgId))) {
      throw new NotFoundError("Org Not Found!");
    }
    const tax = await taxService.createTax({ orgId, ...createTaxDTO });
    return Mapper.map(tax, TaxDTO);
  }
  
  @Put("/org/:orgId/taxes/:taxId")
  @OnUndefined(204)
  async update(
    @Param("orgId") orgId: string,
    @Param("taxId") taxId: string,
    @Body() taxDTO: UpsertTaxDTO
  ) {
    if (!(await taxService.exist(taxId))) {
      throw new NotFoundError("Tax not found");
    }
    await taxService.updateTax(taxId, { orgId, ...taxDTO });
  }

  @Delete("/org/:orgId/taxes/:taxId")
  @OnUndefined(204)
  async delete(@Param("taxId") taxId: string) {
    const tax = await taxService.getTaxById(taxId);
    if (!tax) {
      throw new NotFoundError("Tax not found");
    }
    await taxService.deleteTax(taxId, tax.rev!);
  }
}

export default TaxController;
