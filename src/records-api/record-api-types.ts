export type SourceType = "android" | "web" | "ios" | "rest" | "mcp" | "backend";
export type RecordState = "reconciled" | "cleared" | "uncleared" | "void" | "waitForAssign";
export type RecordType = "income" | "expense" | "transfer";

export interface Category {
	id: string;
	name: string;
	group?: {
		id: string;
		name: string;
	}
}

export interface Account {
	id: string;
	name: string;
	currency: string;
}

export interface FinancialRecord {
	id: string;
	amount: { value: number, currencyCode: string };
	recordDate: string; // ISO
	recordState: RecordState;
	note?: string;
	category?: Category;
	account?: Account;
	accountName?: string;
	recordType?: RecordType;

	source: SourceType;
}

export interface GetFinancialRecordsResponse {
	records: FinancialRecord[];

	limit?: number;

	total?: number;

	offset?: number;

	// Offset for next page
	nextOffset?: number;

	appliedRecordDateFilters?: string[];
}

export type GreatThanRangeFilter<T = string | number> = { type: "great_than", value: T };
export type GreatThanOrEqualRangeFilter<T = string | number> = { type: "great_than_or_equal", value: T };
export type LessThanRangeFilter<T = string | number> = { type: "less_than", value: T };
export type LessThanOrEqualRangeFilter<T = string | number> = { type: "less_than_or_equal", value: T };
export type EqualRangeFilter<T = string | number> = { type: "equal", value: T };
export type RangeFilter<T = string | number> =
	GreatThanRangeFilter<T>
	| GreatThanOrEqualRangeFilter<T>
	| LessThanRangeFilter<T>
	| LessThanOrEqualRangeFilter<T>
	| EqualRangeFilter<T>;


export type TextEqualFilter = {
	type: "equal",
	value: string;
}

export type TextContainsCaseSensitiveFilter = {
	type: "contains_sensitive",
	value: string;
}

export type TextContainsCaseInsensitiveFilter = {
	type: "contains_insensitive",
	value: string;
}

export type TextFilter =
	TextEqualFilter
	| TextContainsCaseSensitiveFilter
	| TextContainsCaseInsensitiveFilter;


export type GetRecordsFilter = {
	id?: string | string[];
	accountId?: string | string[];
	
	amount?: RangeFilter<number>;
	note?: TextFilter;

	recordDate?: RangeFilter<Date>;

	limit?: number;
	offset?: number;
};

export type InsertRecordParams = {
	accountId: string;
	amount: { value: number, currencyCode?: string };
	recordDate: string;
	note?: string;
}