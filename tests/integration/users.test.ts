import supertest from "supertest";
import app, { init } from '@/app';
import { cleanDb } from "../helper";

const api = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

test('Test', () => {
    expect(2 + 2).toBe(4);
  });