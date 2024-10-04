package net.bank.account_service.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue(value = "SA")
public class SavingAccount extends Account{
    private double interestRate;
    private double balance;
}
