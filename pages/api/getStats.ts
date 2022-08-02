// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getLinkPreview } from "link-preview-js";

export type Preview = {
  url: string;
  title?: string;
  siteName?: string | undefined;
  description?: string | undefined;
  mediaType?: string;
  contentType?: string | undefined;
  images?: string[];
  videos?: {
    url: string | undefined;
    secureUrl: string | null | undefined;
    type: string | null | undefined;
    width: string | undefined;
    height: string | undefined;
  }[];
  favicons?: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Preview>
) {
  const { url } = req.body;
  const data = await getLinkPreview(url);
  res.status(200).json(data as Preview);
}
