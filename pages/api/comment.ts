
import { client } from "@/client";
import { NextApiRequest, NextApiResponse } from "next";;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  try {
    const { name, email, comment, postId } = req.body;

    if (!name || !email || !comment || !postId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newComment = client.create({
      _type: "comment",
      name,
      email,
      comment,
      post: {
        _type: "reference",
        _ref: postId,
      },
    });
    return res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Failed to create a comment",
        error: error instanceof Error ? error.message : error,
      });
  }
};