// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { url } = req.body;
  const { data } = await axios.get(url, { responseType: "arraybuffer" });
  res.status(200).send(data);
}
