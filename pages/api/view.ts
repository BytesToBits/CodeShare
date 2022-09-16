import type { NextApiRequest, NextApiResponse } from 'next'
import { findDocument } from "../../lib/db/Documents"

type ResponseData = {
  name?: string
  content?: string
  language?: string
  created_at?: string,
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  if(req.method != "GET") {
    return res.status(405)
  }

  const { name } = req.query;

  const document = await findDocument(name as string);

  if(document && document.private) {
    return res.status(403).json({ message: "Secured documents may only be accessed via the website" })
  }

  return res.status(200).json({ name: document?.name, content: document?.content, language: document?.language, created_at: document?.created_at.toString() });
}