import { VoucherCode } from "src/voucher-code/entities/voucher-code.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity()
export class SpecialOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  name: string;

  @Column()
  fixed_percentage_discount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => VoucherCode, (voucherCode) => voucherCode.specialOffer)
  voucherCodes: VoucherCode[];
}
