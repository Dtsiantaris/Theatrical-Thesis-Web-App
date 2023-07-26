import { mainFetcher } from "../../src/utils/AxiosInstances";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const showIds = req.body;

  const showsNames = await Promise.all(
    showIds.map(async (id: string) => {
      const fetchedShow = await mainFetcher(`/productions/${id}`);
      return {
        [id]: fetchedShow.title,
      };
    })
  );

  const showsNamesObject = Object.assign({}, ...showsNames);

  if (showsNames.length > 0) {
    res.status(200).json(showsNamesObject);
  } else {
    res.status(400).json({ message: "Error at show name handler" });
  }
};

export default handler;
