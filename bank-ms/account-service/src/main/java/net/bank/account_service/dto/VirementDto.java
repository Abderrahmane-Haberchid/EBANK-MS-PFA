package net.bank.account_service.dto;

import lombok.Builder;

@Builder
public record VirementDto(
        String account_sender,
        String account_receiver,
        double amount,
        String description,
        boolean favorite,
        String libele) {
}
