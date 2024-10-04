package net.bank.card_service.service;

import net.bank.card_service.dto.CardDto;
import net.bank.card_service.dto.UpdateCardDto;

public interface CardService {
    CardDto getCardByCustomerId(Long id);

    CardDto createCard(CardDto cardDto);

    CardDto setEnabled(UpdateCardDto updateCardDto);
    CardDto setOnlinePayment(UpdateCardDto updateCardDto);
    CardDto setByPass(UpdateCardDto updateCardDto);
    CardDto setInternationalPayment(UpdateCardDto updateCardDto);
}
