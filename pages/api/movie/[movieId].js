import { prisma } from "../../../lib/prisma";

const handler = async (req, res) => {
  const { movieId } = req.query;

  try {
    const data = await prisma.comment.findMany({
      where: {
        movieId: Number(movieId),
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
