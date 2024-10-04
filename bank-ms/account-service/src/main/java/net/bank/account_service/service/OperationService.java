package net.bank.account_service.service;

import net.bank.account_service.dto.OperationDto;
import net.bank.account_service.dto.VirementDto;
import net.bank.account_service.entities.Operations;

import java.util.List;
import java.util.UUID;

public interface OperationService {
    boolean debit(OperationDto operationDto);
    boolean credit(OperationDto operationDto);
    boolean transfer(VirementDto virementDto);
    boolean transferToSaving(VirementDto virementDto);
    boolean transferToCurrent(VirementDto virementDto);

    List<Operations> getOperationsByAccountId(UUID accountId);

    List<Operations> favoriteOperations(UUID accountId);

    Operations oneFavoriteOperation(Long id);
}
