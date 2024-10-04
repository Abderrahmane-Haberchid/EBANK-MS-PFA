package net.bank.account_service.service.impl;

import lombok.RequiredArgsConstructor;
import net.bank.account_service.clients.CustomerRestClient;
import net.bank.account_service.dto.CurrentAccountDto;
import net.bank.account_service.dto.CustomerDto;
import net.bank.account_service.dto.SavingAccountDto;
import net.bank.account_service.entities.CurrentAccount;
import net.bank.account_service.entities.SavingAccount;
import net.bank.account_service.enumerated.AccountStatus;
import net.bank.account_service.repository.AccountRepository;
import net.bank.account_service.service.AccountService;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final CustomerRestClient customerRestClient;
    private final AccountRepository accountRepository;
    @Override
    public CurrentAccountDto createCurrentAccount(CurrentAccountDto currentAccountDto) {

        CurrentAccount account = new CurrentAccount();
        account.setCreatedAt(new Date());
        account.setDecouvert(currentAccountDto.decouvert());
        account.setBalance(currentAccountDto.balance());
        account.setCustomerId(currentAccountDto.customer_id());
        account.setStatus(AccountStatus.CREATED);
        accountRepository.save(account);

        return currentAccountDto;
    }

    @Override
    public SavingAccountDto createSavingAccount(SavingAccountDto savingAccountDto) {

        SavingAccount saving = new SavingAccount();
        saving.setCreatedAt(new Date());
        saving.setInterestRate(savingAccountDto.interestRate());
        saving.setBalance(savingAccountDto.balance());
        saving.setCustomerId(savingAccountDto.customer_id());
        saving.setStatus(AccountStatus.CREATED);
        accountRepository.save(saving);

        return savingAccountDto;
    }

    @Override
    public CurrentAccountDto findCurrentAccountById(String cin) {
        CustomerDto customer = customerRestClient.findCustomerByCin(cin);
        if (customer == null)
            throw new RuntimeException();

        CurrentAccount account = (CurrentAccount) accountRepository.findCurrentByCustomerId(customer.customerId());

        return CurrentAccountDto.builder()
                .account_id(String.valueOf(account.getAccountId()))
                .balance(account.getBalance())
                .status(account.getStatus())
                .decouvert(account.getDecouvert())
                .created_at(String.valueOf(account.getCreatedAt()))
                .customer_id(account.getCustomerId())
                .build();
    }

    @Override
    public SavingAccountDto findSavingAccountById(String cin) {
        CustomerDto customer = customerRestClient.findCustomerByCin(cin);
        if (customer == null)
            throw new RuntimeException();

        SavingAccount account = (SavingAccount) accountRepository.findSavingByCustomerId(customer.customerId());

        return SavingAccountDto.builder()
                .account_id(String.valueOf(account.getAccountId()))
                .balance(account.getBalance())
                .status(account.getStatus())
                .interestRate(account.getInterestRate())
                .created_at(account.getCreatedAt())
                .customer_id(account.getCustomerId())
                .build();
    }
}
