package net.bank.card_service.mapper;

import net.bank.card_service.dto.CardDto;
import net.bank.card_service.entities.Card;
import org.springframework.stereotype.Component;

@Component
public class CardMapper {

    public CardDto cardtoDto(Card card){
        return CardDto.builder()
                .isEnabled(card.isEnabled())
                .onlinePayment(card.isOnlinePayment())
                .internationalPayment(card.isInternationalPayment())
                .bypasse(card.isBypasse())
                .customerId(card.getCustomerId())
                .expirationDate(card.getExpirationDate())
                .createdAt(card.getCreatedAt())
                .build();
    }
}
