package net.bank.user_service.web;

import feign.Response;
import lombok.RequiredArgsConstructor;
import net.bank.user_service.dto.CustomerDto;
import net.bank.user_service.entities.Customer;
import net.bank.user_service.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    @GetMapping("/{cin}")
    public ResponseEntity<CustomerDto> findCustomerByCin(@PathVariable String cin){
        return ResponseEntity.ok(customerService.findByCIN(cin));
    }

    @PostMapping("/create")
    public ResponseEntity<CustomerDto> createCustomer(@RequestBody CustomerDto customerDto){
        return ResponseEntity.ok(customerService.createCustomer(customerDto));
    }

    @GetMapping("all")
    public ResponseEntity<List<Customer>> getAllCustomers(){
        return ResponseEntity.ok(customerService.getAllCustomers());
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<CustomerDto> getCustomerByAccountId(@PathVariable double id){
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }
}
