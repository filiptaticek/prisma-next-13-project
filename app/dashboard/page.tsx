import { getServerSession } from "next-auth"
import { authOptions } from "@/authOptions"
import { redirect } from "next/navigation"
import MyPosts from "../../src/components/client/MyPosts"

export default async function Dashboard () {

  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect("/api/auth/signin")
  }

  return(
    <div>
      <h1 className="text-2xl font-bold"> My posts </h1>
      <MyPosts />
    </div>
  )
}