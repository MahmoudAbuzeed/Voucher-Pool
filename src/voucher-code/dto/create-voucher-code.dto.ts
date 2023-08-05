import { IsNotEmpty, IsString } from "class-validator";
import { Customer } from "../../../src/customer/entities/customer.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateVoucherCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customer_email: string;

  @IsNotEmpty()
  @ApiProperty()
  special_offer_id: number;

  code: string;

  expired_at: Date;

  used: boolean;

  used_at: Date;

  created_at: Date;

  updated_at: Date;

  customer: Customer;
}
