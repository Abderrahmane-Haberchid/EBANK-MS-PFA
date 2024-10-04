package net.bank.user_service.repository;

import net.bank.user_service.dto.CustomerDto;
import net.bank.user_service.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByCin(String cin);

    //Customer findBy(double id);
}
