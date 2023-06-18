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
