import app from '../src/app.js';
import supertest from 'supertest';
import prisma from "../src/config/database.js";
import userFactory from "./factories/userFactory.js";

// beforeEach(async () => {
//     await prisma.$executeRaw`DELETE from users;`;
// });

describe("POST /sign-up", () => {
    it("given valids inputs should create an account", async () => { 
        const response = await supertest(app).post("/sign-up").send(userFactory.login);
        expect(response.statusCode).toEqual(201);
    });

    it("given password with length less than 10, should return 422", async () => { 
        const response = await supertest(app).post("/sign-up").send(userFactory.passwordWronglogin);
        expect(response.statusCode).toEqual(422);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});