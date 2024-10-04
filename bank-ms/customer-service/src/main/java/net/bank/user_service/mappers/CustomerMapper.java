package net.bank.user_service.mappers;

import net.bank.user_service.dto.CustomerDto;
import net.bank.user_service.entities.Customer;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public CustomerDto customerToDto(Customer customer){
        return CustomerDto.builder()
                .customerId(customer.getCustomerId())
                .created_at(customer.getCreatedAt())
                .cin(customer.getCin())
                .email(customer.getEmail())
                .adresse(customer.getAdresse())
                .name(customer.getName())
                .build();
    }

    public Customer dtoToCustomer(CustomerDto customerDto){
        return Customer.builder()
                .customerId(customerDto.customerId())
                .name(customerDto.name())
                .email(customerDto.email())
                .cin(customerDto.cin())
                .adresse(customerDto.adresse())
                .createdAt(customerDto.created_at())
                .build();
    }
}
