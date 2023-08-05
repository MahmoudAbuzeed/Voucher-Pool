import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { CustomerController } from "./customer.controller";
import { Customer } from "./entities/customer.entity";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "./customer.repository";
import { CustomerMapper } from "./mappers/customer.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository, CustomerMapper],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
