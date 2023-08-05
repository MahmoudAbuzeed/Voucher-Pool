import { Test, TestingModule } from "@nestjs/testing";

import { CustomerRepository } from "../src/customer/customer.repository";
import { CustomerService } from "../src/customer/customer.service";
import { CreateCustomerDto } from "../src/customer/dto/create-customer.dto";
import { CustomError } from "../shared/custom-error/custom-error";

const createMock = jest.fn();
const findByMailMock = jest.fn();

const mockedCustomerRepository = () => ({
  create: createMock,
  findByMail: findByMailMock,
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
  });
});
