export type ApplicationError = {
	name: string;
	message: string;
};

export interface AuthRequestBody {
	email: string;
	password: string;
	name:string;
	picture_url:string
}
