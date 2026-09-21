export type GetAccountsResponse = {
	accounts: any[];
}

export type AccountType =
	"General"
	| "Cash"
	| "CurrentAccount"
	| "SavingAccount"
	| "Insurance"
	| "CreditCard"
	| "Investment"
	| "Loan"
	| "Mortgage"
	| "Overdraft"
	| "Bonus";

export type AccountRecord = {
	id: string;
	archived: boolean;
	name: string;
	// hex format
	color: string;
	createdAt: string;
	updatedAt: string;
	accountType: AccountType;
	currencyCode: string;
	excludeFromStats: boolean;
	isBankSync: boolean;
	isInvestmentAccount: boolean;

	balance: {
		availableCredit?: number;
		balanceDisplayOption?: string;
		balanceMode?: string;
		balanceModeFormula?: string;
		creditBalance?: number;
		creditLimit?: number;
		currentBalance?: number;
		error?: string;
		formula?: string;

		initial: number;
		rawCurrentBalance: number;
		currencyCode: string;
	};

	recordStats: {
		error?: string;
		errorAt?: string;
		recordCount?: number;
		recordDate?: { min: string, max: string };
		createdAt?: { min: string, max: string };
		lastUpdatedAt?: string;
		totalExpenses?: number;
		totalIncomes?: number;
	}
}

export type GetAccountsReponse = {
	accounts: AccountRecord[];
	total?: number;
	limit: number;
	nextOffset?: number;
	offset: number;
}