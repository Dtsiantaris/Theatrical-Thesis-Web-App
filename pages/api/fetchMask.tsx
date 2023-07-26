// pathId.tsx

import { mainFetcher } from "../../src/utils/AxiosInstances";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { path, id } = req.query;

  const item = await mainFetcher(`${path}/${id}`);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(400).json({ message: "Error at fetchMask Handler" });
  }
};

export default handler;
