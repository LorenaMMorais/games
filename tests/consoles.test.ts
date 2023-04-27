import app from "app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import { createConsole } from "./factories/console";
import { cleanDB } from "./factories/cleanDB";
import { number, string } from "joi";

const server = supertest(app);

beforeEach(async () => {
   await cleanDB(); 
});

describe("GET /consoles", () => {

    it("Should respond with 200 and an array of consoles",async () => {
        await createConsole();

        const result = await server.get("/consoles");

        expect(result.status).toBe(httpStatus.OK);
        expect(result.body).toEqual([{
            id: expect.any(Number),
            name: expect.any(String)
        }]);
    });
});

describe("GET /consoles/:id", () => {

    it("Should respond with 200 and specific console",async () => {
        const console = await createConsole();

        const result = await server.get(`/consoles/${console.id}`);

        expect(result.body).toEqual([{
            id: expect.any(Number),
            name: expect.any(String)
        }]);
    });

    it("Should respond with 404 if are no consoles with this id",async () => {
        const result = await server.get(`/consoles/${faker.random.numeric(2)}`);

        expect(result.status).toBe(httpStatus.NOT_FOUND);
    });
});

describe("POST /consoles", () => {
    const generateValidBody = () => ({
        name: faker.name.fullName()
    });

    it("Should respond with 201 and console body",async () => {
        const body = generateValidBody();

        const result = await server.post("/consoles").send(body);

        expect(result.status).toBe(httpStatus.CREATED);
    });

    it("Should respond with 422 if body is invalid",async () => {
        const result = await server.post("/consoles").send({});

        expect(result.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("Should respond with 409 if console already exist",async () => {
        const console = await createConsole();
        
        const result = await server.post("/consoles").send({ name: console.name });

        expect(result.status).toBe(httpStatus.CONFLICT);
    });
})