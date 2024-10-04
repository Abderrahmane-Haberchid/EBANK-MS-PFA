package net.bank.card_service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;

import java.time.LocalDate;
@Builder
public record CardDto(
         boolean isEnabled,
         boolean onlinePayment,
         boolean internationalPayment,
         boolean bypasse,
         LocalDate createdAt,
         LocalDate expirationDate,
         Long customerId
) { }
