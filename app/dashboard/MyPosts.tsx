"use client"

import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { IPost } from "../types"
import MyPost from "./MyPost"

async function fetchAuthPosts () {
  const response = await axios.get("/api/post/authPost")
  return (response.data)
}

export default function MyPosts () {

  const {data, error, isLoading} = useQuery({
    queryFn: fetchAuthPosts,
    queryKey: ["authPosts"],
  })

  if (error) return <div>{error.toString()}</div>
  if (isLoading) return <div>Loading...</div>
  console.log(data)

  return(

    <div>
      {data?.posts?.map((post: IPost) => {
        return(
          <MyPost
            user={data.name}
            image={data.image} 
            post={post} 
            key={post.id} 
          />
        )
      })
      }
    </div>
  )
}