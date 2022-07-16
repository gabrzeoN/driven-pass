import joi from "joi";
import { InputData } from "../repositories/credentialsRepository.js";

export const createSchema = joi.object<InputData>({
    title: joi.string().trim().required(),
    url: joi.string().trim().required(),
    userOrEmail: joi.string().trim().required(),
    password: joi.string().trim().required()
});