package net.bank.card_service.dto;

import lombok.Builder;

@Builder
public record UpdateCardDto(
        boolean value,
        Long customerId
) {
}
