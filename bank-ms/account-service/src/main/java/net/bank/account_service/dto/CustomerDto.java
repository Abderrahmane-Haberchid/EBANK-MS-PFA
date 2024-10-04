package net.bank.account_service.dto;

import java.util.Date;

public record CustomerDto (
        int customerId,
        String name,
        String created_at,
        String cin,
        String email,
        String adresse
) { }
