package net.bank.account_service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import net.bank.account_service.enumerated.OperationType;

import java.util.Date;
import java.util.UUID;

@Builder
public record OperationDto(
        String accountId,
        double amount,
        String description,
        String accountType,
        boolean favorite,
        String libele) {

}
