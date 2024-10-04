package net.bank.account_service.service.impl;

import lombok.RequiredArgsConstructor;
import net.bank.account_service.clients.CustomerRestClient;
import net.bank.account_service.dto.CustomerDto;
import net.bank.account_service.dto.OperationDto;
import net.bank.account_service.dto.VirementDto;
import net.bank.account_service.entities.Account;
import net.bank.account_service.entities.CurrentAccount;
import net.bank.account_service.entities.Operations;
import net.bank.account_service.entities.SavingAccount;
import net.bank.account_service.enumerated.OperationType;
import net.bank.account_service.repository.AccountRepository;
import net.bank.account_service.repository.OperationsRepository;
import net.bank.account_service.service.OperationService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OperationServiceImpl implements OperationService {
    private final AccountRepository accountRepository;
    private final OperationsRepository operationsRepository;
    private final CustomerRestClient customerRestClient;
    @Override
    public boolean debit(OperationDto operationDto) {
        CurrentAccount currentAccount;
        SavingAccount savingAccount;

        if (operationDto.accountType().equals("CA")) {
            currentAccount = (CurrentAccount) accountRepository.findById(UUID.fromString(operationDto.accountId())).get();
            if (currentAccount.getBalance() >= operationDto.amount()){
            currentAccount.setBalance(currentAccount.getBalance() - operationDto.amount());
            accountRepository.save(currentAccount);
            }
        }
        if (operationDto.accountType().equals("SA")) {
            savingAccount = (SavingAccount) accountRepository.findById(UUID.fromString(operationDto.accountId())).get();
            if (savingAccount.getBalance() >= operationDto.amount()) {
                savingAccount.setBalance(savingAccount.getBalance() - operationDto.amount());
                accountRepository.save(savingAccount);
            }
        }

        var op = Operations.builder()
                .accountId(UUID.fromString(operationDto.accountId()))
                .operationDate(new Date())
                .type(OperationType.DEBIT)
                .amount(operationDto.amount())
                .favorite(operationDto.favorite())
                .description(operationDto.description())
                .libele(operationDto.libele())
                .build();
        operationsRepository.save(op);
        return true;
    }

    @Override
    public boolean credit(OperationDto operationDto) {
        CurrentAccount currentAccount;
        SavingAccount savingAccount;

        if (operationDto.accountType().equals("CA")) {
            currentAccount = (CurrentAccount) accountRepository.findById(UUID.fromString(operationDto.accountId())).get();
            currentAccount.setBalance(currentAccount.getBalance() + operationDto.amount());
            accountRepository.save(currentAccount);
        }
        if (operationDto.accountType().equals("SA")) {
            savingAccount = (SavingAccount) accountRepository.findById(UUID.fromString(operationDto.accountId())).get();
            savingAccount.setBalance(savingAccount.getBalance() + operationDto.amount());
            accountRepository.save(savingAccount);
        }

        var op = Operations.builder()
                .accountId(UUID.fromString(operationDto.accountId()))
                .operationDate(new Date())
                .type(OperationType.CREDIT)
                .amount(operationDto.amount())
                .favorite(operationDto.favorite())
                .description(operationDto.description())
                .build();
        operationsRepository.save(op);

        return true;
    }

    @Override
    public boolean transfer(VirementDto virementDto) {
        var creditOpt = OperationDto.builder()
                        .accountId(virementDto.account_receiver())
                        .accountType("CA")
                        .amount(virementDto.amount())
                        .description(virementDto.description())
                        .build();
        var debitOpt = OperationDto.builder()
                .accountId(virementDto.account_sender())
                .accountType("CA")
                .amount(virementDto.amount())
                .description(virementDto.description())
                .favorite(virementDto.favorite())
                .libele(virementDto.libele())
                .build();

        credit(creditOpt);
        debit(debitOpt);

        return true;
    }
    @Override
    public boolean transferToSaving(VirementDto virementDto) {
        var creditOpt = OperationDto.builder()
                .accountId(virementDto.account_receiver())
                .accountType("SA")
                .amount(virementDto.amount())
                .description(virementDto.description())
                .build();
        var debitOpt = OperationDto.builder()
                .accountId(virementDto.account_sender())
                .accountType("CA")
                .amount(virementDto.amount())
                .description(virementDto.description())
                .favorite(virementDto.favorite())
                .build();

        credit(creditOpt);
        debit(debitOpt);

        return true;
    }

    @Override
    public boolean transferToCurrent(VirementDto virementDto) {
        var creditOpt = OperationDto.builder()
                .accountId(virementDto.account_receiver())
                .accountType("CA")
                .amount(virementDto.amount())
                .description(virementDto.description())
                .build();
        var debitOpt = OperationDto.builder()
                .accountId(virementDto.account_sender())
                .accountType("SA")
                .amount(virementDto.amount())
                .description(virementDto.description())
                .favorite(virementDto.favorite())
                .build();

        credit(creditOpt);
        debit(debitOpt);

        return true;
    }

    @Override
    public List<Operations> getOperationsByAccountId(UUID accountId) {
        return operationsRepository.findByAccountIdOrderByOperationIdDesc(accountId).stream().toList();
    }

    @Override
    public List<Operations> favoriteOperations(UUID accountId) {
        return operationsRepository.findFavoriteOperations(accountId);
    }

    @Override
    public Operations oneFavoriteOperation(Long id) {
//        Operations operations = operationsRepository.oneFavoriteOperation(id);
//        UUID accountReceiverId = operations.getAccountId();
//        Account account = accountRepository.findById(accountReceiverId).get();
//        double customerId = account.getCustomerId();
//        CustomerDto customerDto = customerRestClient.getCustomerById(customerId);

        return operationsRepository.oneFavoriteOperation(id);
    }
}
