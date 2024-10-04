package net.bank.user_service.dto;

import lombok.Builder;

import java.util.Date;
@Builder
public record CustomerDto (
        int customerId,
        String name,
        Date created_at,
        String cin,
        String email,
        String adresse
) { }
