import supertest from "supertest";
import app, { init } from "@/app";
import { cleanDb } from "../helper";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import {
	createLogin,
	createUser,
	registerValidBody,
} from "../factories/users-factory";

const api = supertest(app);

beforeAll(async () => {
	await init();
});

beforeEach(async () => {
	await cleanDb();
});

describe("REGISTER /auth/register", () => {
	it("should respond with status 400 when body is not given", async () => {
		const response = await api.post("/auth/register");

		expect(response.status).toBe(httpStatus.BAD_REQUEST);
	});

	it("should respond with status 400 when body is not valid", async () => {
		const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
		const response = await api.post("/auth/register").send(invalidBody);

		expect(response.status).toBe(httpStatus.BAD_REQUEST);
	});

	describe("when body is valid", () => {
		it("should register a user and respond with status 201", async () => {
			const user = await createUser();
			const response = await api
				.post("/auth/register")
				.send(registerValidBody);

			expect(response.status).toBe(httpStatus.CREATED);
		});

		it("should respond with status 409 if the email is already registered", async () => {
			const user = await createUser();
			const newUser = {
				name: faker.internet.userName(),
				password: faker.internet.password(),
				email: user.email,
				picture_url: faker.image.imageUrl(),
			};
			const response = await api.post("/auth/register").send(newUser);

			expect(response.status).toBe(httpStatus.CONFLICT);
		});
	});
});

describe("LOGIN /auth/login", () => {
	it("should respond with status 400 when body is not given", async () => {
		const response = await api.post("/auth/login");

		expect(response.status).toBe(httpStatus.BAD_REQUEST);
	});

	it("should respond with status 400 when body is not valid", async () => {
		const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
		const response = await api.post("/auth/login").send(invalidBody);

		expect(response.status).toBe(httpStatus.BAD_REQUEST);
	});

	describe("when body is valid", () => {
		it("should respond with status 201 and a token", async () => {
			const loginBody = {
				email: faker.internet.email(),
				password: faker.internet.password(6),
			};
			const user = await createLogin(loginBody);
			const response = await api.post("/auth/login").send(loginBody);

			expect(response.status).toBe(httpStatus.OK);
			expect(response.body).toEqual({ userToken: expect.any(String) });
		});

		it("should respond with status 401 when password or email is incorrect", async () => {
			const loginBody = {
				email: faker.internet.email(),
				password: faker.internet.password(6),
			};
			const user = await createLogin(loginBody);
			loginBody.password = faker.internet.password(6);
			const response = await api.post("/auth/login").send(loginBody);

			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
		});

		it("should respond with status 401 when user is not registered", async () => {
			const loginBody = {
				email: faker.internet.email(),
				password: faker.internet.password(6),
			};
			const response = await api.post("/auth/login").send(loginBody);

			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
		});
	});
});
