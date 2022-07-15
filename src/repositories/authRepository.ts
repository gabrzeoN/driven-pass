import prisma from "../config/database.js";
import { User } from "@prisma/client";

export type UserSignUpData = Omit<User, "id" | "createdAt">
export type UserSignInData = Omit<User, "id" | "createdAt">
// export type SessionCreationData = Omit<User, "id" | "createdAt">

export async function getByEmail(email:string) {
    const user = await prisma.user.findUnique({where: {email}});
    return user;
}

export async function insertSignUp(user:UserSignUpData) {
    return await prisma.user.create({data: user});
}