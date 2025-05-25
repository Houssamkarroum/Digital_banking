package karroum.houssam.ebankbackend.web;

import karroum.houssam.ebankbackend.dtos.DashboardDTO;
import karroum.houssam.ebankbackend.services.BankAccountService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class DashboardController {
    private BankAccountService bankAccountService;

    @GetMapping("/dashboard")
    public DashboardDTO getDashboardStatistics() {
        log.info("Fetching dashboard statistics");
        return bankAccountService.getDashboardStatistics();
    }
}