package karroum.houssam.ebankbackend.repositories;

import karroum.houssam.ebankbackend.entities.AccountOperation;
import karroum.houssam.ebankbackend.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountOperationRepository extends JpaRepository<AccountOperation, Long> {
}
