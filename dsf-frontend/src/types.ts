export interface IClient {
	_id?: string;
	fiscalId?: string;
	email: string;
	clientName: string;
	tel?: string;
	dbUrl?: string;
}

export interface IKey {
	_id?:string;
	fiscalId?: string;
	email: string;
	clientName: string;
	tel?: string;
	clientId: String,
	expirationDate: string,
	numberOfdays: number,
	hasExpired: boolean
}

export interface IUser{
	_id?:string;
	name?:string;
	email?:string;
	password?:string;
}