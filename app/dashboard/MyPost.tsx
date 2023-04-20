"use client"

import Image from "next/image"
import { IPost } from "../types"
import { useState } from "react"
import Toggle from "./Toggle"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"


export default function MyPost ({post, user ,image}:{post:IPost, user:string, image:string}) {

  const [show, setShow] = useState(false)
  const {mutate} = useMutation(
    async (id:string) => {
      await axios.delete("/api/post/deletePost", {data:{id}}),
      {
        onError: (error: any) => console.log(error),
        onSuccess: (data: any) => console.log(data)
      }
    },
  )

  const deletePost = () => {
    mutate("3")
  }


  return(
    <div className="my-8 rounded-lg bg-white p-8">
      <div className="flex place-items-center gap-4">
        <Image src={image} alt="avatar" width={40} height={40} className="rounded-full" />
        <h3 className="font-bold text-gray-700">{user}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{post.title}</p>
      </div>
      <div className="my-8 flex gap-4">
        <p className="break-all font-bold">{post.comments?.length} comments</p>
        <p 
          className="cursor-pointer"
          onClick={() => setShow(!show)}
        >Delete</p>
      </div>
      {show && <Toggle setToggle={setShow} deletePost={deletePost} />}
    </div>
  )
}