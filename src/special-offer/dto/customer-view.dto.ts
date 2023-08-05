import { ApiProperty } from "@nestjs/swagger";

export class SpecialOfferViewDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  fixed_percentage_discount: number;

  @ApiProperty()
  created_at: Date;
}
