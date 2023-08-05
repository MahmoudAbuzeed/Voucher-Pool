import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Customer } from "../../../src/customer/entities/customer.entity";
import { SpecialOffer } from "../../../src/special-offer/entities/special-offer.entity";

@Entity()
export class VoucherCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ default: false })
  used: boolean;

  @Column()
  expired_at: Date;

  @CreateDateColumn({ default: null })
  used_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Customer, (customer) => customer.voucherCodes)
  customer: Customer;

  @ManyToOne(() => SpecialOffer, (specialOffer) => specialOffer.voucherCodes)
  specialOffer: SpecialOffer;
}
