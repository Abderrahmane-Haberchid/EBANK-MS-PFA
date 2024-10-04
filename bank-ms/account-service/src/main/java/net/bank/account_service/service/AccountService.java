package net.bank.account_service.service;

import net.bank.account_service.dto.CurrentAccountDto;
import net.bank.account_service.dto.CustomerDto;
import net.bank.account_service.dto.SavingAccountDto;

import java.util.List;

public interface AccountService {

    CurrentAccountDto createCurrentAccount(CurrentAccountDto currentAccountDto);
    SavingAccountDto createSavingAccount(SavingAccountDto savingAccountDto);
    CurrentAccountDto findCurrentAccountById(String cin);
    SavingAccountDto findSavingAccountById(String cin);
}
