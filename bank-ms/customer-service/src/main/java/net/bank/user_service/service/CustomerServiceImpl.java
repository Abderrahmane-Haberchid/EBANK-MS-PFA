package net.bank.user_service.service;

import lombok.RequiredArgsConstructor;
import net.bank.user_service.dto.CustomerDto;
import net.bank.user_service.entities.Customer;
import net.bank.user_service.mappers.CustomerMapper;
import net.bank.user_service.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    @Override
    public CustomerDto createCustomer(CustomerDto customerDto) {
        var user = Customer.builder()
                    .name(customerDto.name())
                    .createdAt(new Date())
                    .email(customerDto.email())
                    .cin(customerDto.cin())
                    .adresse(customerDto.adresse())
                .build();
        customerRepository.save(user);

        return customerMapper.customerToDto(user);
    }

    @Override
    public CustomerDto findByCIN(String cin) {
        var customer = customerRepository.findByCin(cin);
        return CustomerDto.builder()
                .customerId(customer.getCustomerId())
                .name(customer.getName().toLowerCase())
                .cin(customer.getCin().toLowerCase())
                .email(customer.getEmail().toLowerCase())
                .adresse(customer.getAdresse())
                .created_at(customer.getCreatedAt())
                .build();
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public CustomerDto getCustomerById(double id) {
       //  Customer customer = customerRepository.findById(id);
         return null;
    }
}
