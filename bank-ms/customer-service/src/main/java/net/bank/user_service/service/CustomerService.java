package net.bank.user_service.service;

import net.bank.user_service.dto.CustomerDto;
import net.bank.user_service.entities.Customer;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CustomerService {

    CustomerDto createCustomer(CustomerDto userAccountDto);

    CustomerDto findByCIN(String cin);

    List<Customer> getAllCustomers();

    CustomerDto getCustomerById(double id);
}
