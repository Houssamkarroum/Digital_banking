package karroum.houssam.ebankbackend;

import karroum.houssam.ebankbackend.dtos.BankAccountDTO;
import karroum.houssam.ebankbackend.dtos.CurrentBankAccountDTO;
import karroum.houssam.ebankbackend.dtos.CustomerDTO;
import karroum.houssam.ebankbackend.dtos.SavingBankAccountDTO;
import karroum.houssam.ebankbackend.entities.*;
import karroum.houssam.ebankbackend.enums.AccountStatus;
import karroum.houssam.ebankbackend.enums.OperationType;
import karroum.houssam.ebankbackend.exceptions.CustomerNotFoundException;
import karroum.houssam.ebankbackend.repositories.AccountOperationRepository;
import karroum.houssam.ebankbackend.repositories.BankAccountRepository;
import karroum.houssam.ebankbackend.repositories.CustomerRepository;
import karroum.houssam.ebankbackend.services.BankAccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@SpringBootApplication
public class EbankBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EbankBackendApplication.class, args);
    }
    @Bean
    CommandLineRunner commandLineRunner(BankAccountService bankAccountService){
        return args -> {
            Stream.of("Hassan","Imane","Mohamed").forEach(name->{
                CustomerDTO customer=new CustomerDTO();
                customer.setName(name);
                customer.setEmail(name+"@gmail.com");
                bankAccountService.saveCustomer(customer);
            });
            bankAccountService.listCustomers().forEach(customer->{
                try {
                    bankAccountService.saveCurrentBankAccount(Math.random()*90000,9000,customer.getId());
                    bankAccountService.saveSavingBankAccount(Math.random()*120000,5.5,customer.getId());

                } catch (CustomerNotFoundException e) {
                    e.printStackTrace();
                }
            });
            List<BankAccountDTO> bankAccounts = bankAccountService.bankAccountList();
            for (BankAccountDTO bankAccount:bankAccounts){
                for (int i = 0; i <10 ; i++) {
                    String accountId;
                    if(bankAccount instanceof SavingBankAccountDTO){
                        accountId=((SavingBankAccountDTO) bankAccount).getId();
                    } else{
                        accountId=((CurrentBankAccountDTO) bankAccount).getId();
                    }
                    bankAccountService.credit(accountId,10000+Math.random()*120000,"Credit");
                    bankAccountService.debit(accountId,1000+Math.random()*9000,"Debit");
                }
            }
        };
    }
    @Bean
 CommandLineRunner start(CustomerRepository customerRepository,
                         BankAccountRepository bankAccountRepository,
                         AccountOperationRepository accountOperationRepository) {
        return args -> {
            Stream.of("hassan","Yassine","Aicha").forEach(name -> {
                Customer customer = new Customer();
                customer.setName(name);
                customer.setEmail(name + "@gmail.com");
                customerRepository.save(customer);
            });
            customerRepository.findAll().forEach(customer -> {
                CurrentAccount currentaccount = new CurrentAccount();
                currentaccount.setId(UUID.randomUUID().toString());
                currentaccount.setCustomer(customer);
                currentaccount.setBalance(Math.random() * 100);
                currentaccount.setCreatedAt(new Date());
                currentaccount.setOverDraft(9000);
                currentaccount.setStatus(AccountStatus.ACTIVATED);
                bankAccountRepository.save(currentaccount);

                SavingAccount savingaccount = new SavingAccount();
                savingaccount.setId(UUID.randomUUID().toString());
                savingaccount.setCustomer(customer);
                savingaccount.setBalance(Math.random() * 9000);
                savingaccount.setCreatedAt(new Date());
                savingaccount.setInterestRate(5.5);
                savingaccount.setStatus(AccountStatus.ACTIVATED);
                bankAccountRepository.save(savingaccount);
            });
            bankAccountRepository.findAll().forEach(acc->{
                for (int i = 0; i <10 ; i++) {
                    AccountOperation accountOperation=new AccountOperation();
                    accountOperation.setOperationDate(new Date());
                    accountOperation.setAmount(Math.random()*1200);
                    accountOperation.setType(Math.random()>0.5? OperationType.DEBIT: OperationType.CREDIT);
                    accountOperation.setBankAccount(acc);
                    accountOperationRepository.save(accountOperation);
                }

            });
        };
    }
}
