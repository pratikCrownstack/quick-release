"use client";

import { FormInputPost } from "@/types";
import { Tag } from "@prisma/client";
import axios from "axios";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing: boolean;
}

const FormPost: FC<FormPostProps> = ({ submit, isEditing }) => {
  const { register, handleSubmit } = useForm<FormInputPost>();

  // fetch list of tags
  const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get("/api/tags");
      return response.data;
    },
  });

  console.log(dataTags);
  return (
    <div>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center justify-center gap-5 mt-10"
      >
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Post title"
          className="input input-bordered w-full max-w-lg"
        />

        <textarea
          {...register("content", { required: true })}
          className="textarea textarea-bordered w-full max-w-lg"
          placeholder="Post content"
        ></textarea>

        {isLoadingTags ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <select
            {...register("tagId", { required: true })}
            className="select select-bordered w-full max-w-lg"
            defaultValue={""}
          >
            <option disabled value="">
              Select tags
            </option>
            {dataTags?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="p-2 rounded-md bg-[#5D3587] hover:bg-[#392467] text-white w-full max-w-lg"
        >
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default FormPost;
