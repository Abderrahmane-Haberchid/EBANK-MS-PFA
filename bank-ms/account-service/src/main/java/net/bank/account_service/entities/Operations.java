package net.bank.account_service.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import net.bank.account_service.enumerated.OperationType;

import java.util.Date;
import java.util.UUID;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Builder
@Getter @Setter
public class Operations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long operationId;
    @Enumerated(EnumType.STRING)
    private OperationType type;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private Date operationDate;
    private double amount;
    private boolean favorite;
    private String description;
    private UUID accountId;
    private String libele;
}
