// unique-email.decorator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Injectable } from "@nestjs/common";
import { CustomerService } from "../../src/customer/customer.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly customerService: CustomerService) {}

  async validate(email: string) {
    console.log("email", email);
    const user = await this.customerService.getOneByMail(email);
    return !user; // if user is found return false, else return true
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}
