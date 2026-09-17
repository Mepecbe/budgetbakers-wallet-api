import {
	create as createAxiosClient,
	AxiosInstance
} from "axios";
import { RecordsApi } from "./records-api/records-api";
import { AccountsApi } from "./accounts-api";

export * from "./accounts-api/index";
export * from "./accounts-api/accounts-api-types";
export * from "./records-api/records-api";
export * from "./records-api/record-api-types";

export class WalletApi {
	private readonly axios: AxiosInstance;

	public readonly records: RecordsApi;
	public readonly accounts: AccountsApi;

	constructor(
		apiToken: string,
		baseUrl = "https://rest.budgetbakers.com"
	){
		this.axios = createAxiosClient({
			baseURL:
				baseUrl,
			headers: {
				"Authorization": `Bearer ${apiToken}`
			}
		});

		this.records = new RecordsApi(this.axios);
		this.accounts = new AccountsApi(this.axios);
	}
}