import { Request, Response } from "express";
import * as credentialsService from "../services/credentialsService.js";
import * as credentialsRepository from "./../repositories/credentialsRepository.js";

export async function create(req: Request, res: Response) {
    const { title, url, userOrEmail, password } : credentialsRepository.InputData = req.body;
    const { userId } : { userId: number } = res.locals.userId;
    await credentialsService.create({ title, url, userOrEmail, password, userId });
    return res.sendStatus(201);
}

// export async function signIn(req: Request, res: Response) {
//     const { email, password } : authRepository.UserSignInData = req.body;
//     const token = await authService.signIn({ email, password });
//     return res.status(200).send(token);
// }