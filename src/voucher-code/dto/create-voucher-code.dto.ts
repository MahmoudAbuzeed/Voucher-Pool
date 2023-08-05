import { IsNotEmpty, IsString } from "class-validator";
import { Customer } from "../../../src/customer/entities/customer.entity";

export class CreateVoucherCodeDto {
  @IsString()
  @IsNotEmpty()
  customer_email: string;

  @IsNotEmpty()
  special_offer_id: number;

  code: string;

  expired_at: Date;

  used: boolean;

  used_at: Date;

  created_at: Date;

  updated_at: Date;

  customer: Customer;
}
