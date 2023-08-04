import { IsNotEmpty, IsString } from "class-validator";
import { IsEmailAlreadyExist } from "shared/custom-decorators/unique-email.decorator";

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  // @IsEmailAlreadyExist({ message: "Email is already in use" })
  email: string;
}
