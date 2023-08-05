import { ApiProperty } from "@nestjs/swagger";

export class CustomerViewDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
