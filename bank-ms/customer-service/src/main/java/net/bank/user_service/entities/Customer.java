package net.bank.user_service.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Builder
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customerId;
    private String name;
    @JsonFormat(pattern = "dd/MM/YYYY HH:mm")
    private Date createdAt;
    @Column(unique = true)
    private String cin;
    @Column(unique = true)
    private String email;
    private String adresse;

}
