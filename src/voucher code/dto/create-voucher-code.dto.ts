import { IsNotEmpty, IsString } from "class-validator";

export class CreateVoucherCodeDto {
  @IsString()
  @IsNotEmpty()
  customer_email: string;

  code: string;

  expired_at: Date;

  used: boolean;

  used_at: Date;

  created_at: Date;

  updated_at: Date;
}
