import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { CustomerService } from "./customer.service";

@ApiTags("Customer")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get("/:customerId")
  findOne(@Param("customerId") customerId: string) {
    return this.customerService.findOne(+customerId);
  }

  @Patch("/:customerId")
  update(@Param("customerId") customerId: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+customerId, updateCustomerDto);
  }

  @Delete(":customerId")
  remove(@Param("customerId") customerId: string) {
    return this.customerService.remove(+customerId);
  }
}
