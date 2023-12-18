'use client'

import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { useMutation } from "react-query";


interface ButtonActionProps {
  id: string
}

const ButtonAction: FC<ButtonActionProps> = ({id}) => {

  const router = useRouter();

  const { mutate: deletePost } = useMutation({
    mutationFn : async () => {
      return axios.delete(`/api/posts/${id}`)
    },
    onError: (err) => {
      console.error(err)
    },
    onSuccess: () => {
      router.push('/');
      router.refresh();
    }
  })

  return (
    <div className="flex gap-4">
      <Link
        href="/edit/id"
        className="p-2 bg-green-400 text-black rounded-md flex"
      >
        <Pencil /> Edit
      </Link>
      <button className="p-2 bg-red-400 text-black rounded-md flex" onClick={deletePost}>
        {" "}
        <Trash /> Delete
      </button>
    </div>
  );
};

export default ButtonAction;
