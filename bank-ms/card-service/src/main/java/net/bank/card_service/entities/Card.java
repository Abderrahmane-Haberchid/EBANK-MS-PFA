package net.bank.card_service.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Builder @Getter @Setter
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;
    private boolean isEnabled;
    private boolean onlinePayment;
    private boolean internationalPayment;
    private boolean bypasse;
    @JsonFormat(pattern = "dd/MM/YYYY HH:mm")
    private LocalDate createdAt;
    @JsonFormat(pattern = "dd/MM/YYYY HH:mm")
    private LocalDate expirationDate;
    private Long customerId;
}
