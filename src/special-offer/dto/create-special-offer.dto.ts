import { IsNotEmpty, IsString } from "class-validator";

export class CreateSpecialOfferDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  fixed_percentage_discount: number;
}
