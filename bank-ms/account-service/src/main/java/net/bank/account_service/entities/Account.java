package net.bank.account_service.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import net.bank.account_service.enumerated.AccountStatus;

import java.util.Date;
import java.util.UUID;
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE", length = 2)
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID accountId;
    @JsonFormat(pattern = "DD/MM/YYYY HH:mm")
    private Date createdAt;
    @Enumerated(EnumType.STRING) private AccountStatus status;
//    @Column(name="TYPE", insertable = false, updatable = false)
    //private String TYPE;
    int customerId;
}



