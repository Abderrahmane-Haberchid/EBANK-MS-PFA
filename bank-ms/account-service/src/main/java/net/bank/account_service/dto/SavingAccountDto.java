package net.bank.account_service.dto;

import lombok.Builder;
import net.bank.account_service.enumerated.AccountStatus;

import java.util.Date;

@Builder
public record SavingAccountDto(
        String account_id,
        double balance,
        Date created_at,
        AccountStatus status,
        double interestRate,
        int customer_id
) {
}
