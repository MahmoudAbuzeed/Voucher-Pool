import { IsNotEmpty, IsString } from "class-validator";

export class ValidateVoucherCodeDto {
  @IsString()
  @IsNotEmpty()
  customer_email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
