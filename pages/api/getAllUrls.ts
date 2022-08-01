// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type AllUrls = {
  url: string;
  redirectTo: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AllUrls[]>
) {
  res.status(200).json([
    { url: "https://example.com", redirectTo: "https://rex.com" },
    { url: "https://example.com/abc", redirectTo: "https://rex.com/abc" },
    { url: "https://example.com/def", redirectTo: "https://rex.com/def" },
    { url: "https://example.com/ghi", redirectTo: "https://rex.com/ghi" },
  ]);
}
