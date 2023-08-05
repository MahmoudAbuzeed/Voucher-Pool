import { Test, TestingModule } from "@nestjs/testing";

import { SpecialOfferService } from "../src/special-offer/special-offer.service";
import { SpecialOfferRepo } from "../src/special-offer/special-offer.repository";
import { SpecialOffer } from "../src/special-offer/entities/special-offer.entity";
import { UpdateSpecialOfferDto } from "../src/special-offer/dto/update-special-offer.dto";
import { CreateSpecialOfferDto } from "../src/special-offer/dto/create-special-offer.dto";

const createMock = jest.fn();
const findByNameMock = jest.fn();
const findAllMock = jest.fn();
const findOneMock = jest.fn();
const updateMock = jest.fn();
const removeMock = jest.fn();
const findByMailMock = jest.fn();

const mockedSpecialOfferRepository = () => ({
  create: createMock,
  findByName: findByNameMock,
  findAll: findAllMock,
  findOne: findOneMock,
  update: updateMock,
  remove: removeMock,
  findByMail: findByMailMock,
});

describe("CustomerService", () => {
  let specialOfferService: SpecialOfferService;
  let specialOfferRepository: SpecialOfferRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialOfferService, { provide: SpecialOfferRepo, useFactory: mockedSpecialOfferRepository }],
    }).compile();
    specialOfferRepository = module.get<SpecialOfferRepo>(SpecialOfferRepo);
    specialOfferService = module.get<SpecialOfferService>(SpecialOfferService);
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
    it("should throw an error if the special offer already exists", async () => {
      const dto: CreateSpecialOfferDto = { name: "Offer1", fixed_percentage_discount: 10 };
      findByNameMock.mockResolvedValue(new SpecialOffer());

      await expect(specialOfferService.create(dto)).rejects.toThrowError("Special offer already exists!");
    });

    it("should create a special offer and return it", async () => {
      const dto: CreateSpecialOfferDto = { name: "Offer1", fixed_percentage_discount: 10 };
      const specialOffer = new SpecialOffer();
      specialOffer.name = dto.name;
      specialOffer.fixed_percentage_discount = dto.fixed_percentage_discount;

      findByNameMock.mockResolvedValue(undefined);
      createMock.mockResolvedValue(specialOffer);

      const result = await specialOfferService.create(dto);

      expect(result).toEqual(specialOffer);
    });
  });

  describe("findAll", () => {
    it("should return all special offers", async () => {
      const specialOffers = [new SpecialOffer(), new SpecialOffer()];
      findAllMock.mockResolvedValue(specialOffers);

      const result = await specialOfferService.findAll();

      expect(result).toEqual(specialOffers);
    });
  });

  describe("findOne", () => {
    it("should throw an error if special offer not found", async () => {
      findOneMock.mockResolvedValue(undefined);

      await expect(specialOfferService.findOne(1)).rejects.toThrowError("Special offer not found!");
    });

    it("should return the special offer if found", async () => {
      const specialOffer = new SpecialOffer();
      findOneMock.mockResolvedValue(specialOffer);

      const result = await specialOfferService.findOne(1);

      expect(result).toEqual(specialOffer);
    });
  });

  describe("update", () => {
    it("should throw an error if special offer not found", async () => {
      const dto: UpdateSpecialOfferDto = { name: "UpdatedOffer", fixed_percentage_discount: 20 };
      updateMock.mockResolvedValue({ affected: 0 });

      await expect(specialOfferService.update(1, dto)).rejects.toThrowError("Special offer not found!");
    });

    it("should update the special offer and return success message", async () => {
      const dto: UpdateSpecialOfferDto = { name: "UpdatedOffer", fixed_percentage_discount: 20 };
      updateMock.mockResolvedValue({ affected: 1 });

      const result = await specialOfferService.update(1, dto);

      expect(result.message).toEqual("UPDATED_SUCCESSFULLY");
    });
  });

  describe("remove", () => {
    it("should throw an error if special offer not found", async () => {
      removeMock.mockResolvedValue({ affected: 0 });

      await expect(specialOfferService.remove(1)).rejects.toThrowError("Special offer not found!");
    });

    it("should remove the special offer and return success message", async () => {
      removeMock.mockResolvedValue({ affected: 1 });

      const result = await specialOfferService.remove(1);

      expect(result.message).toEqual("DELETED_SUCCESSFULLY");
    });
  });

  describe("getOneByMail", () => {
    it("should throw an error if special offer not found", async () => {
      findByMailMock.mockResolvedValue(undefined);

      await expect(specialOfferService.getOneByMail("test@example.com")).rejects.toThrowError(
        "Special offer not found!",
      );
    });

    it("should return the special offer if found", async () => {
      const specialOffer = new SpecialOffer();
      findByMailMock.mockResolvedValue(specialOffer);

      const result = await specialOfferService.getOneByMail("test@example.com");

      expect(result).toEqual(specialOffer);
    });
  });
});
