import { ApiProperty } from "@nestjs/swagger";

export class CustomerViewDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
