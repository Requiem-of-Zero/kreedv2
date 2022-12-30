import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const { authorId, movieId, content, authorName, createdAt } = req.body;

  try {
    await prisma.comment.create({
      data: {
        authorName,
        authorId,
        movieId,
        content,
        createdAt,
        updatedAt: new Date()
      },
    });
    res.status(200).json({ message: "Comment Created" });
  } catch (error) {
    console.log(error);
  }
}
