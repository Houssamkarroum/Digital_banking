package karroum.houssam.ebankbackend.repositories;

import karroum.houssam.ebankbackend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
