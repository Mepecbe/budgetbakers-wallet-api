import axios, { AxiosError, AxiosInstance } from "axios";
import { GetFinancialRecordsResponse, GetRecordsFilter, InsertRecordParams } from "./record-api-types";
import { AnyObject } from "../types";

export class RecordsApi {
	private filterToQueryParams(filter: GetRecordsFilter): AnyObject {
		const object: AnyObject = {};

		if (filter.amount) {
			const value = filter.amount.value.toFixed(2);

			switch (filter.amount.type) {
				case "great_than":
					object["amount"] = `gt.${value}`;
					break;
				case "great_than_or_equal":
					object["amount"] = `gte.${value}`;
					break;
				case "less_than":
					object["amount"] = `lt.${value}`;
					break;
				case "less_than_or_equal":
					object["amount"] = `lte.${value}`;
					break;
				case 'equal':
					object["amount"] = `eq.${value}`;
					break;
			}
		}

		if (filter.recordDate) {
			switch (filter.recordDate.type) {
				case "great_than":
					object["recordDate"] = `gt.${filter.recordDate.value.toISOString()}`;
					break;
				case "great_than_or_equal":
					object["recordDate"] = `gte.${filter.recordDate.value.toISOString()}`;
					break;
				case "less_than":
					object["recordDate"] = `lt.${filter.recordDate.value.toISOString()}`;
					break;
				case "less_than_or_equal":
					object["recordDate"] = `lte.${filter.recordDate.value.toISOString()}`;
					break;
				case 'equal':
					object["recordDate"] = `eq.${filter.recordDate.value.toISOString()}`;
					break;
			}
		}

		if (filter.limit){
			object["limit"] = filter.limit;
		}

		if (filter.offset){
			object["offset"] = filter.offset;
		}

		return object;
	}

	async getRecords(
		filter?: GetRecordsFilter
	): Promise<GetFinancialRecordsResponse> {

		const reqResult = await this.httpClient.request<GetFinancialRecordsResponse>({
			method:
				"GET",
			url:
				`/wallet/v1/api/records`,
			params:
				filter ? this.filterToQueryParams(filter) : null
		});

		if (reqResult.status == 200) {
			return reqResult.data;
		}

		throw new Error(reqResult.statusText);
	}

	async insertRecords(
		records: InsertRecordParams | InsertRecordParams[]
	): Promise<void> {
		await this.httpClient.request<GetFinancialRecordsResponse>({
			method:
				"POST",
			url:
				`/wallet/v1/api/records`,
			data:
				Array.isArray(records) ? records : [records]
		});
	}

	async updateRecords(
		record_id: string
	): Promise<void> {

	}

	async deleteOperations(
		id: string | string[]
	): Promise<void> {
		await this.httpClient.request<any>({
			method:
				"DELETE",
			url:
				`/wallet/v1/api/records`,
			data:
			{
				ids:
					Array.isArray(id) ? id : [id]
			}
		});
	}

	constructor(
		private readonly httpClient: AxiosInstance
	) {

	}
}