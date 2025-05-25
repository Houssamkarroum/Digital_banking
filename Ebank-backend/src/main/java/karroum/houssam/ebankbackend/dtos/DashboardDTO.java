package karroum.houssam.ebankbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {
    // Customer statistics
    private long totalCustomers;
    
    // Account statistics
    private long totalAccounts;
    private long currentAccountsCount;
    private long savingAccountsCount;
    private Map<String, Long> accountTypeDistribution;
    
    // Balance statistics
    private double totalBalance;
    private double avgBalance;
    private double maxBalance;
    private double minBalance;
    
    // Operation statistics
    private long totalOperations;
    private long debitOperationsCount;
    private long creditOperationsCount;
    private Map<String, Long> operationTypeDistribution;
    
    // Recent activity
    private double totalDebitAmount;
    private double totalCreditAmount;
    
    // Additional statistics
    private double avgOverdraft; // For current accounts
    private double avgInterestRate; // For saving accounts
}