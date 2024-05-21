/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { TenantService } from "../tenant.service";
import { TenantCreateInput } from "./TenantCreateInput";
import { Tenant } from "./Tenant";
import { TenantFindManyArgs } from "./TenantFindManyArgs";
import { TenantWhereUniqueInput } from "./TenantWhereUniqueInput";
import { TenantUpdateInput } from "./TenantUpdateInput";

export class TenantControllerBase {
  constructor(protected readonly service: TenantService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Tenant })
  async createTenant(@common.Body() data: TenantCreateInput): Promise<Tenant> {
    return await this.service.createTenant({
      data: data,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [Tenant] })
  @ApiNestedQuery(TenantFindManyArgs)
  async tenants(@common.Req() request: Request): Promise<Tenant[]> {
    const args = plainToClass(TenantFindManyArgs, request.query);
    return this.service.tenants({
      ...args,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Tenant })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async tenant(
    @common.Param() params: TenantWhereUniqueInput
  ): Promise<Tenant | null> {
    const result = await this.service.tenant({
      where: params,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Tenant })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async updateTenant(
    @common.Param() params: TenantWhereUniqueInput,
    @common.Body() data: TenantUpdateInput
  ): Promise<Tenant | null> {
    try {
      return await this.service.updateTenant({
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Tenant })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async deleteTenant(
    @common.Param() params: TenantWhereUniqueInput
  ): Promise<Tenant | null> {
    try {
      return await this.service.deleteTenant({
        where: params,
        select: {
          createdAt: true,
          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
