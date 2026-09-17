import { AxiosInstance } from "axios";
import { GetAccountsReponse } from "./accounts-api-types";

export class AccountsApi {
	async getAccounts(): Promise<GetAccountsReponse> {
		return (await this.httpClient.get<GetAccountsReponse>(`/wallet/v1/api/accounts`)).data;
	}

	constructor(
		private readonly httpClient: AxiosInstance
	){}
}