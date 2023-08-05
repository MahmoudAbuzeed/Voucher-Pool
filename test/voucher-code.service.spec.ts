import { Test, TestingModule } from "@nestjs/testing";

import { VoucherCodeRepo } from "../src/voucher-code/voucher-code.repository";
import { VoucherCodeService } from "../src/voucher-code/voucher-code.service";
import { CustomerService } from "../src/customer/customer.service";
import { SpecialOfferService } from "../src/special-offer/special-offer.service";
import { CustomerRepository } from "../src/customer/customer.repository";
import { SpecialOfferRepo } from "../src/special-offer/special-offer.repository";
import { Customer } from "../src/customer/entities/customer.entity";
import { SpecialOffer } from "../src/special-offer/entities/special-offer.entity";
import { VoucherCode } from "../src/voucher-code/entities/voucher-code.entity";
import { ValidateVoucherCodeDto } from "../src/voucher-code/dto/validate-voucher-code.dto";

const createMock = jest.fn();
const findByCodeMock = jest.fn();
const findAllMock = jest.fn();
const findOneMock = jest.fn();
const updateMock = jest.fn();
const updateByEmailMock = jest.fn();
const removeMock = jest.fn();
const findByMailMock = jest.fn();
const saveMock = jest.fn();

const mockedVoucherCodeRepository = () => ({
  create: createMock,
  findByCode: findByCodeMock,
  findAll: findAllMock,
  findOne: findOneMock,
  update: updateMock,
  updateByEmail: updateByEmailMock,
  remove: removeMock,
  findByMail: findByMailMock,
  save: saveMock,
});

describe("VoucherCodeService", () => {
  let voucherCodeService: VoucherCodeService;
  let voucherCodeRepository: VoucherCodeRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoucherCodeService,
        CustomerService,
        SpecialOfferService,
        { provide: VoucherCodeRepo, useFactory: mockedVoucherCodeRepository },
        { provide: CustomerRepository, useFactory: mockedVoucherCodeRepository },
        { provide: SpecialOfferRepo, useFactory: mockedVoucherCodeRepository },
      ],
    }).compile();
    voucherCodeRepository = module.get<VoucherCodeRepo>(VoucherCodeRepo);
    voucherCodeService = module.get<VoucherCodeService>(VoucherCodeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("My Test Suite", () => {
    it("should pass", () => {
      expect(true).toBe(true);
    });
  });

  describe("create", () => {
    it("should create a voucher code", async () => {
      const createDto: any = { customer_email: "test@example.com", special_offer_id: 1 };
      const customer = new Customer();
      const specialOffer = new SpecialOffer();
      findByMailMock.mockResolvedValue(customer);
      findOneMock.mockResolvedValue(specialOffer);
      createMock.mockResolvedValue(new VoucherCode());

      expect(await voucherCodeService.create(createDto)).toBeInstanceOf(VoucherCode);
    });
  });

  describe("validateVoucher", () => {
    it("should throw an error if voucher code is not found", async () => {
      const dto: ValidateVoucherCodeDto = { code: "TESTCODE", customer_email: "test@example.com" };
      findByCodeMock.mockResolvedValue(undefined);

      await expect(voucherCodeService.validateVoucher(dto)).rejects.toThrowError("Voucher code not found!");
    });

    it("should throw an error if voucher code does not belong to the customer", async () => {
      const dto: ValidateVoucherCodeDto = { code: "TESTCODE", customer_email: "test@example.com" };
      const voucherCode = { customer: { email: "wrong@example.com" }, expired_at: new Date() };
      findByCodeMock.mockResolvedValue(voucherCode);

      await expect(voucherCodeService.validateVoucher(dto)).rejects.toThrowError(
        "Voucher code does not belong to this customer!",
      );
    });

    it("should throw an error if voucher code has expired", async () => {
      const dto: ValidateVoucherCodeDto = { code: "TESTCODE", customer_email: "test@example.com" };
      const voucherCode = { customer: { email: "test@example.com" }, expired_at: new Date(Date.now() - 10000) };
      findByCodeMock.mockResolvedValue(voucherCode);

      await expect(voucherCodeService.validateVoucher(dto)).rejects.toThrowError("Voucher code has expired!");
    });
  });

  describe("findAll", () => {
    it("should return all voucher codes", async () => {
      const vouchers = [new VoucherCode(), new VoucherCode()];
      findAllMock.mockResolvedValue(vouchers);

      expect(await voucherCodeService.findAll()).toBe(vouchers);
    });
  });

  describe("findOne", () => {
    it("should find a voucher code by id", async () => {
      const voucher = new VoucherCode();
      findOneMock.mockResolvedValue(voucher);

      expect(await voucherCodeService.findOne(1)).toBe(voucher);
    });
  });

  describe("update", () => {
    it("should update a voucher code", async () => {
      const updateDto = { used: true };
      updateMock.mockResolvedValue({ affected: 1 });

      expect(await voucherCodeService.update(1, updateDto)).toEqual({ message: "UPDATED_SUCCESSFULLY" });
    });
  });

  describe("updateByEmail", () => {
    it("should update a voucher code by email", async () => {
      const updateDto = { used: true };
      updateByEmailMock.mockResolvedValue({ affected: 1 });

      expect(await voucherCodeService.updateByEmail("test@example.com", updateDto)).toEqual({
        message: "UPDATED_SUCCESSFULLY",
      });
    });
  });

  describe("remove", () => {
    it("should remove a voucher code", async () => {
      removeMock.mockResolvedValue({ affected: 1 });

      expect(await voucherCodeService.remove(1)).toEqual({ message: "DELETED_SUCCESSFULLY" });
    });
  });

  describe("getOneByMail", () => {
    it("should get a voucher code by email", async () => {
      const voucher = new VoucherCode();
      findByMailMock.mockResolvedValue(voucher);

      expect(await voucherCodeService.getOneByMail("test@example.com")).toBe(voucher);
    });
  });
});
