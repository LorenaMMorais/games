import prisma from "config/database";
import { faker } from "@faker-js/faker";
import { number } from "joi";

export async function createConsole() {
    return await prisma.console.create({ 
        data:{ 
            name:faker.random.word() 
        } 
    });
}