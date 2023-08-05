import { PartialType } from "@nestjs/mapped-types";

import { CreateVoucherCodeDto } from "./create-voucher-code.dto";

export class UpdateVoucherCodeDto extends PartialType(CreateVoucherCodeDto) {}
