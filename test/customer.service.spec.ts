import { Test, TestingModule } from "@nestjs/testing";

import { CustomerRepository } from "../src/customer/customer.repository";
import { CustomerService } from "../src/customer/customer.service";
import { CreateCustomerDto } from "../src/customer/dto/create-customer.dto";
import { CustomError } from "../shared/custom-error/custom-error";
import { Customer } from "../src/customer/entities/customer.entity";
import { UpdateCustomerDto } from "../src/customer/dto/update-customer.dto";

const createMock = jest.fn();
const findByMailMock = jest.fn();
const findAllMock = jest.fn();
const findOneMock = jest.fn();
const updateMock = jest.fn();
const removeMock = jest.fn();

const mockedCustomerRepository = () => ({
  create: createMock,
  findByMail: findByMailMock,
  findAll: findAllMock,
  findOne: findOneMock,
  update: updateMock,
  remove: removeMock,
});

describe("CustomerService", () => {
  let customerService: CustomerService;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, { provide: CustomerRepository, useFactory: mockedCustomerRepository }],
    }).compile();
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
    customerService = module.get<CustomerService>(CustomerService);
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
    const createCustomerDto: CreateCustomerDto = {
      email: "example@example.com",
      name: "John Doe",
    };

    it("should create a customer successfully", async () => {
      createMock.mockResolvedValue(createCustomerDto);
      findByMailMock.mockResolvedValue(null);

      const result = await customerService.create(createCustomerDto);

      expect(result.message).toBe("CREATED_SUCCESSFULLY");
    });

    it("should throw an error if the customer already exists", async () => {
      findByMailMock.mockResolvedValue(createCustomerDto);

      await expect(customerService.create(createCustomerDto)).rejects.toThrow(
        new CustomError(400, "Customer already exists!"),
      );
    });

    it("should throw an error if the email is invalid", async () => {
      const invalidDto = { ...createCustomerDto, email: "invalidemail" };

      await expect(customerService.create(invalidDto)).rejects.toThrow(new CustomError(400, "Invalid email address!"));
    });

    it("should throw an error if something goes wrong during creation", async () => {
      createMock.mockResolvedValue(null);
      findByMailMock.mockResolvedValue(null);

      await expect(customerService.create(createCustomerDto)).rejects.toThrow(
        new CustomError(400, "Something went wrong!"),
      );
    });

    describe("findAll", () => {
      it("should return all customers", async () => {
        const result = [];
        findAllMock.mockResolvedValue(result);
        expect(await customerService.findAll()).toEqual(result);
      });
    });

    describe("findOne", () => {
      it("should find a customer by id", async () => {
        const customer = new Customer();
        findOneMock.mockResolvedValue(customer);
        expect(await customerService.findOne(1)).toEqual(customer);
      });

      it("should throw an error if customer not found", async () => {
        findOneMock.mockResolvedValue(undefined);
        await expect(customerService.findOne(1)).rejects.toThrow(new CustomError(404, "Customer not found!"));
      });
    });

    describe("update", () => {
      it("should update a customer", async () => {
        const dto: UpdateCustomerDto = { name: "new name" };
        updateMock.mockResolvedValue({ affected: 1 });
        expect(await customerService.update(1, dto)).toEqual({ message: "UPDATED_SUCCESSFULLY" });
      });

      it("should throw an error if customer not found", async () => {
        const dto: UpdateCustomerDto = { name: "new name" };
        updateMock.mockResolvedValue({ affected: 0 });
        await expect(customerService.update(1, dto)).rejects.toThrow(new CustomError(404, "Customer not found!"));
      });
    });

    describe("remove", () => {
      it("should delete a customer", async () => {
        removeMock.mockResolvedValue({ affected: 1 });
        expect(await customerService.remove(1)).toEqual({ message: "DELETED_SUCCESSFULLY" });
      });

      it("should throw an error if customer not found", async () => {
        removeMock.mockResolvedValue({ affected: 0 });
        await expect(customerService.remove(1)).rejects.toThrow(new CustomError(404, "Customer not found!"));
      });
    });

    describe("getOneByMail", () => {
      it("should find a customer by email", async () => {
        const customer = new Customer();
        findByMailMock.mockResolvedValue(customer);
        expect(await customerService.getOneByMail("test@example.com")).toEqual(customer);
      });
    });

    describe("findOneByEmail", () => {
      it("should find a customer by email", async () => {
        const customer = new Customer();
        findByMailMock.mockResolvedValue(customer);
        expect(await customerService.findOneByEmail("test@example.com")).toEqual(customer);
      });

      it("should throw an error if customer not found", async () => {
        findByMailMock.mockResolvedValue(undefined);
        await expect(customerService.findOneByEmail("test@example.com")).rejects.toThrow(
          new CustomError(404, "Customer not found!"),
        );
      });
    });
  });
});
