import type { NextApiRequest, NextApiResponse } from 'next'
import { createDocument } from "../../lib/db/Documents"
import { CodeDocument } from "../../lib/db/types"

type ResponseData = {
  name?: string,
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  if(req.method != "POST") {
    return res.status(405).json({ message: "Only GET requests are allowed" })
  }

  const body = req.body as CodeDocument;

  const name: string = await createDocument({
    ...body,
    created_at: new Date()
  });

  return res.status(200).json({ name, message: "Document was successfully created!" });

}
