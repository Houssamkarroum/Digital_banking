package karroum.houssam.ebankbackend.entities;

import jakarta.persistence.*;
import karroum.houssam.ebankbackend.enums.OperationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class AccountOperation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date operationDate;
    private long amount;
    private OperationType type;
    @ManyToOne
    private BankAccount bankAccount;
}
