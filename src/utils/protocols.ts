export type ApplicationError = {
	name: string;
	message: string;
};

export interface AuthRegisterRequestBody {
	email: string;
	password: string;
	name: string;
	picture_url: string;
}

export interface AuthLoginRequestBody {
	email: string;
	password: string;
}

interface ImageLinks {
	smallThumbnail: string;
	thumbnail: string;
}

interface VolumeInfo {
	title: string;
	subtitle:string;
	authors: string[];
	publishedDate?: string;
	description?: string;
	language?: string;
	imageLinks?: ImageLinks;
}

export interface apiBook {
	id: string;
	volumeInfo: VolumeInfo;
}

export type UserEntity = {
    id: number,
    name: string,
    email: string,
    image: string,
    password: string,
}

export type CheckEmail = {
    email: string,
    password: string,
    id: number,
    token: string,
}

export type NewLogin = {
    email: string,
    password: string
}