declare module server {
	interface storage {
		id: number;
		guid: string;
		batch: boolean;
		batchId: number;
		username: string;
		password: string;
		isPasswordProtected: boolean;
		protectedPassword: string;
		note: string;
		confirmation: boolean;
		email: string;
		dateCreated: Date;
	}
}
