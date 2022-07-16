import prisma from "../config/database.js";
import { Credential } from "@prisma/client";

export type DbInsertionData = Omit<Credential, "id">
export type InputData = Omit<Credential, "id" | "userId" >

export async function getByTitleAndUserId(title: string, userId: number) {
    return await prisma.credential.findUnique({where: {userId_title: {userId, title}}});
}

export async function getByUserId(userId: number) {
    const credentials = await prisma.credential.findMany({where: {userId}});
    return credentials;
}

export async function getById(id: number) {
    const credential = await prisma.credential.findFirst({where: {id}});
    return credential;
}

export async function insert(credential: DbInsertionData) {
    return await prisma.credential.create({data: credential});
}