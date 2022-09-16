import mongoose from "mongoose";

export interface CodeDocument {
    name: string
    language: string
    content: string
    created_at: Date
}

export const CodeDocumentSchema = new mongoose.Schema<CodeDocument>({
    name: { type: String, required: true },
    content: { type: String, required: true },
    language: { type: String, required: true },
    created_at: { type: Date, required: true }
});
export const CodeDocumentModel = mongoose.models.CodeDocument || mongoose.model('CodeDocument', CodeDocumentSchema);