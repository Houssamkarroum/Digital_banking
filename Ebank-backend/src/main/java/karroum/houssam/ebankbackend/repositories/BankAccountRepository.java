package karroum.houssam.ebankbackend.repositories;

import karroum.houssam.ebankbackend.entities.BankAccount;
import karroum.houssam.ebankbackend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository extends JpaRepository<BankAccount, String> {
}
