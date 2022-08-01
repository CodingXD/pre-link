// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Stat = {
  platform: string;
  count: string;
  event: string;
};

export type LinkEventStats = {
  linkEventStats: Stat[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LinkEventStats>
) {
  res.status(200).json({
    linkEventStats: [
      {
        platform: "ANDROID",
        count: "123",
        event: "CLICK",
      },
      {
        platform: "IOS",
        count: "123",
        event: "CLICK",
      },
      {
        platform: "DESKTOP",
        count: "456",
        event: "CLICK",
      },
    ],
  });
}
