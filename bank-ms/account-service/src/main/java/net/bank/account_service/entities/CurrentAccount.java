package net.bank.account_service.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue(value = "CA")
public class CurrentAccount extends Account {
    private double decouvert;
    private double balance;
}
