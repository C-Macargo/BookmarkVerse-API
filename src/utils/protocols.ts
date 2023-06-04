export type ApplicationError = {
	name: string;
	message: string;
};

export interface AuthRegisterRequestBody {
	email: string;
	password: string;
	name:string;
	picture_url:string
}

export interface AuthLoginRequestBody {
	email: string;
	password: string;
}
