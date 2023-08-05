/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { CustomerViewDto } from "../dtos/customer-view.dto";

@Injectable()
export class CustomerMapper {
  mapSingleCustomer(customer): CustomerViewDto {
    const customerDto = new CustomerViewDto();
    customerDto.id = customer.id;
    customerDto.name = customer.name;
    customerDto.email = customer.email;
    return customerDto;
  }

  mapManyCustomers(customers): CustomerViewDto[] {
    const mappedCustomers = customers.map((customer) => {
      const customerDto = new CustomerViewDto();
      customerDto.id = customer.id;
      customerDto.name = customer.name;
      customerDto.email = customer.email;
      return customerDto;
    });

    return mappedCustomers;
  }
}
