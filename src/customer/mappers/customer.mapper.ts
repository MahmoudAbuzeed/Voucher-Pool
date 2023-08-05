/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { CustomerViewDto } from "../dto/customer-view.dto";

@Injectable()
export class CustomerMapper {
  mapSingleCustomer(customer): CustomerViewDto {
    const customerDto = new CustomerViewDto();
    customerDto.id = customer.id;
    customerDto.name = customer.name;
    customerDto.email = customer.email;
    return customerDto;
  }

  mapCustomers(customers): CustomerViewDto[] {
    return customers.map((customer) => this.mapSingleCustomer(customer));
  }
}
