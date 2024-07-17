import type { NextApiRequest, NextApiResponse } from "next";
import { createLiveStream } from "@/services/mux";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const liveStream = await createLiveStream();
      res.status(200).json(liveStream);
    } catch (error) {
      res.status(500).json({ error: "Error creating live stream" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
