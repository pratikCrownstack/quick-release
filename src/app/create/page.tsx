"use client";

import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

const CreatePage = () => {
  const router = useRouter();

  const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
    createPost(data);
  };

  const {mutate: createPost, isLoading} = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.post('/api/posts/create', newPost)
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
    <div>
      <div className="items-center  my-4">
        <BackButton />
        <h1 className="text-2xl font-bold text-center text-white">
          Add new post
        </h1>
      </div>
      <FormPost submit={handleCreatePost} isEditing={false} />
    </div>
  );
};

export default CreatePage;
