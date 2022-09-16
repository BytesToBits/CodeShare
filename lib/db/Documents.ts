import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v4 as makeId } from "uuid";
import { CodeDocumentModel } from "./types";

dotenv.config();

mongoose.connect(process.env.MONGO_URI! + "codes");

export async function createDocument(content: string, language: string, created_at: Date): Promise<string> {
    const name = makeId().split('-').filter((_, index) => index%2==0).join('').toLowerCase();

    const document = new CodeDocumentModel({ name, content, language, created_at });

    await document.save()

    return name
}

export async function findDocument(name: string) {

    const query = await CodeDocumentModel.findOne({ name });

    return query;
}