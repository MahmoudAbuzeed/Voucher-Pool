import { ApiProperty } from "@nestjs/swagger";

export class VoucherCodeViewDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  used: boolean;

  @ApiProperty()
  used_at: boolean;

  @ApiProperty()
  expired_at: boolean;
}
