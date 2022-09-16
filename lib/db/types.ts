import mongoose from "mongoose";

export type CodeDocument = {
    name: string
    language: string
    content: string
    private?: boolean
    password?: string
    created_at: Date
}

export const CodeDocumentSchema = new mongoose.Schema<CodeDocument>({
    name: { type: String, required: true },
    content: { type: String, required: true },
    language: { type: String, required: true },
    private: { type: Boolean, required: false },
    password: { type: String, required: false },
    created_at: { type: Date, required: true }
});
export const CodeDocumentModel = mongoose.models.CodeDocument || mongoose.model('CodeDocument', CodeDocumentSchema);