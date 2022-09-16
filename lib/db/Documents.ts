import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v4 as makeId } from "uuid";
import { CodeDocument, CodeDocumentModel } from "./types";

dotenv.config();

mongoose.connect(process.env.MONGO_URI! + "codes");

export async function createDocument(data: Partial<CodeDocument>): Promise<string> {
    const name = makeId().split('-').filter((_, index) => index%2==0).join('').toLowerCase();

    const document = new CodeDocumentModel({ name, ...data });

    await document.save()

    return name
}

export async function findDocument(name: string): Promise<CodeDocument | null> {

    const query = await CodeDocumentModel.findOne({ name });

    return query;
}