import prisma from "../config/database.js";
import { Annotation } from "@prisma/client";

export type DbInsertionData = Omit<Annotation, "id">
export type InputData = Omit<Annotation, "id" | "userId" >

export async function getByTitleAndUserId(title: string, userId: number) {
    return await prisma.annotation.findUnique({where: {userId_title: {userId, title}}});
}

export async function getByUserId(userId: number) {
    const annotations = await prisma.annotation.findMany({where: {userId}});
    return annotations;
}

export async function getById(id: number) {
    const annotation = await prisma.annotation.findFirst({where: {id}});
    return annotation;
}

export async function insert(annotation: DbInsertionData) {
    return await prisma.annotation.create({data: annotation});
}


export async function deleteById(id: number) {
    await prisma.annotation.delete({where: {id}});
    return;
}