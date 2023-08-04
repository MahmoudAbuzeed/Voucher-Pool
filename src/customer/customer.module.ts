import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { ErrorHandler } from "shared/errorHandler.service";
import { CustomerController } from "./customer.controller";
import { Customer } from "./entities/customer.entity";
import { CustomerService } from "./customer.service";
import { CustomerRepo } from "./customer.repository";
import { IsEmailAlreadyExistConstraint } from "shared/custom-decorators/unique-email.decorator";

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepo, ErrorHandler, IsEmailAlreadyExistConstraint],
})
export class CustomerModule {}
