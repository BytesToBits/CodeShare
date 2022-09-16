import type { NextApiRequest, NextApiResponse } from 'next'
import { createDocument } from "../../lib/db/Documents"

type ResponseData = {
  name?: string,
  message: string
}

type BodyData = {
  content: string,
  language: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  if(req.method != "POST") {
    return res.status(405).json({ message: "Only GET requests are allowed" })
  }

  const body = req.body as BodyData;

  const name: string = await createDocument(body.content, body.language, new Date());

  return res.status(200).json({ name, message: "Document was successfully created!" });

}
