"use client";

import BackButton from "@/components/BackButton";
import FormChangeLog from "@/components/FormChangeLog";
import { FormChangeLogPost, FormInputPost } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

const AddChangeLog = () => {
  const router = useRouter();

  const handleCreatePost: SubmitHandler<FormChangeLogPost> = (data) => {
    createPost(data);
  };

  const {mutate: createPost, isLoading} = useMutation({
    mutationFn: (newPost: FormChangeLogPost) => {
      return axios.post('/api/changelogs/create', newPost)
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
      <FormChangeLog submit={handleCreatePost} isEditing={false} />
    </div>
  );
};

export default AddChangeLog;
