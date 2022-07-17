import prisma from "../config/database.js";
import { Card } from "@prisma/client";

export type DbInsertionData = Omit<Card, "id">
export type InputData = Omit<Card, "id" | "userId" >

export async function getByTitleAndUserId(title: string, userId: number) {
    return await prisma.card.findUnique({where: {userId_title: {userId, title}}});
}

export async function getByUserId(userId: number) {
    const cards = await prisma.card.findMany({where: {userId}});
    return cards;
}

export async function getById(id: number) {
    const card = await prisma.card.findFirst({where: {id}});
    return card;
}

export async function insert(card: DbInsertionData) {
    return await prisma.card.create({data: card});
}

export async function deleteById(id: number) {
    await prisma.card.delete({where: {id}});
    return;
}