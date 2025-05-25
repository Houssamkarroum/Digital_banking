export interface DashboardDTO {
  totalCustomers: number;
  totalAccounts: number;
  currentAccountsCount: number;
  savingAccountsCount: number;
  accountTypeDistribution: { [key: string]: number };
  totalBalance: number;
  avgBalance: number;
  maxBalance: number;
  minBalance: number;
  totalOperations: number;
  debitOperationsCount: number;
  creditOperationsCount: number;
  operationTypeDistribution: { [key: string]: number };
  totalDebitAmount: number;
  totalCreditAmount: number;
  avgOverdraft: number;
  avgInterestRate: number;
}
