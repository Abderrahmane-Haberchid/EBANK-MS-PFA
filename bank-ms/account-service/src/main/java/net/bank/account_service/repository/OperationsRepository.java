package net.bank.account_service.repository;

import net.bank.account_service.entities.Operations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface OperationsRepository extends JpaRepository<Operations, Long> {
    List<Operations> findByAccountIdOrderByOperationIdDesc(UUID accountId);
    @Query(value = "SELECT * FROM operations o WHERE o.account_id = ?1 AND favorite = 'true'"
            ,nativeQuery = true)
    List<Operations> findFavoriteOperations(UUID accountId);

    @Query(value = "SELECT * FROM operations o WHERE o.operation_id = :id"
            ,nativeQuery = true)
    Operations oneFavoriteOperation(Long id);
}
