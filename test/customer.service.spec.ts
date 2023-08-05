import { Test, TestingModule } from "@nestjs/testing";

import { CustomerRepository } from "../src/customer/customer.repository";
import { CustomerService } from "../src/customer/customer.service";

export const mockedCustomerRepository = () => ({
  saveApplication: jest.fn(),
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

  describe("My Test Suite", () => {
    it("should pass", () => {
      expect(true).toBe(true);
    });
  });
});
