import prisma from "../config/database.js";
import { Wifi } from "@prisma/client";

export type DbInsertionData = Omit<Wifi, "id">
export type InputData = Omit<Wifi, "id" | "userId" >

export async function getByUserId(userId: number) {
    const wifis = await prisma.wifi.findMany({where: {userId}});
    return wifis;
}

export async function getById(id: number) {
    const wifi = await prisma.wifi.findFirst({where: {id}});
    return wifi;
}

export async function insert(wifi: DbInsertionData) {
    return await prisma.wifi.create({data: wifi});
}

export async function deleteById(id: number) {
    await prisma.wifi.delete({where: {id}});
    return;
}