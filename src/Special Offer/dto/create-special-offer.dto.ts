import { IsNotEmpty, IsString } from "class-validator";

export class CreateSpecialOfferDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  fixed_percentage_discount: string;
}
