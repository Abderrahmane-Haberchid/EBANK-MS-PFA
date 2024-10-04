package net.bank.account_service.dto;

import lombok.Builder;
import net.bank.account_service.enumerated.AccountStatus;

import java.util.Date;

@Builder
public record CurrentAccountDto(
        String account_id,
        double balance,
        String created_at,
        AccountStatus status,
        double decouvert,
        int customer_id
) { }
