package net.bank.account_service.repository;

import net.bank.account_service.entities.Account;
import net.bank.account_service.entities.CurrentAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, UUID> {
    @Query(value="SELECT * from account a WHERE a.customer_id = ?1 AND type = 'CA'", nativeQuery = true)
    Account findCurrentByCustomerId(double v);
    @Query(value="SELECT * from account a WHERE a.customer_id = ?1 AND type = 'SA'", nativeQuery = true)
    Account findSavingByCustomerId(double v);

}
