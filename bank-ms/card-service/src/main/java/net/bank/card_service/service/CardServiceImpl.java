package net.bank.card_service.service;

import lombok.RequiredArgsConstructor;
import net.bank.card_service.dto.CardDto;
import net.bank.card_service.dto.UpdateCardDto;
import net.bank.card_service.entities.Card;
import net.bank.card_service.mapper.CardMapper;
import net.bank.card_service.repository.CardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final CardMapper cardMapper;
    @Override
    public CardDto getCardByCustomerId(Long id) {
        Card card = cardRepository.findByCustomerId(id);
        return cardMapper.cardtoDto(card);
    }

    @Override
    public CardDto createCard(CardDto cardDto) {
        Card card = Card.builder()
                    .isEnabled(true)
                    .bypasse(false)
                    .internationalPayment(false)
                    .onlinePayment(false)
                    .createdAt(LocalDate.now())
                    .expirationDate(LocalDate.now().plusYears(4))
                    .customerId(cardDto.customerId())
                    .build();
        cardRepository.save(card);
        return cardDto;
    }

    @Override
    public CardDto setEnabled(UpdateCardDto updateCardDto) {
        Card card = cardRepository.findByCustomerId(updateCardDto.customerId());
        card.setEnabled(updateCardDto.value());
        cardRepository.save(card);

        return cardMapper.cardtoDto(card);
    }

    @Override
    public CardDto setOnlinePayment(UpdateCardDto updateCardDto) {
        Card card = cardRepository.findByCustomerId(updateCardDto.customerId());
        card.setOnlinePayment(updateCardDto.value());
        cardRepository.save(card);

        return cardMapper.cardtoDto(card);
    }

    @Override
    public CardDto setByPass(UpdateCardDto updateCardDto) {
        Card card = cardRepository.findByCustomerId(updateCardDto.customerId());
        card.setBypasse(updateCardDto.value());
        cardRepository.save(card);

        return cardMapper.cardtoDto(card);
    }

    @Override
    public CardDto setInternationalPayment(UpdateCardDto updateCardDto) {
        Card card = cardRepository.findByCustomerId(updateCardDto.customerId());
        card.setInternationalPayment(updateCardDto.value());
        cardRepository.save(card);

        return cardMapper.cardtoDto(card);
    }
}
