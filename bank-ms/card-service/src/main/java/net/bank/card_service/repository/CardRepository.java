package net.bank.card_service.repository;

import net.bank.card_service.dto.CardDto;
import net.bank.card_service.entities.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
    Card findByCustomerId(Long id);
}
