import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession( req, res, authOptions )
  if (!session) { return res.status(403).json({ err: "Not authenticated" })}
  //Get the user
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email }
  })

  if (req.method === "POST") {
    console.log("Došlo mi to")
    try{
      const { title, postId } = req.body.data

      if (!title) { return res.status(403).json({ err: "No title" }) }

      const result = await prisma.comment.create({
        data: {
          content:title,
          userId: user?.id,
          postId : postId
        }})
       
      console.log("Yo mama! ")

      return res.status(200).json({ result })
    }

    catch(err){
      const { title, postId } = req.body.data
      console.log("Fuck já",{
        message:title,
        userId: user?.id,
        postId : postId
      })
      res.status(403).json({ err: "Error has occured while deleting a post" })
    }
  }
}