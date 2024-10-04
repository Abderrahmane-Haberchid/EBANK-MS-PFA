package net.bank.account_service.clients;

import net.bank.account_service.dto.CustomerDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "CUSTOMER-SERVICE")
public interface CustomerRestClient {
    @GetMapping("api/v1/customer/{cin}")
    CustomerDto findCustomerByCin(@PathVariable String cin);

    @GetMapping("api/v1/customer/all")
    List<CustomerDto> allCustomers();

    @GetMapping("api/v1/customer/id/{id}")
    CustomerDto getCustomerById(@PathVariable double id);

}
