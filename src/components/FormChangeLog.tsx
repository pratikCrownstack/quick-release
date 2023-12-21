"use client";

import { FormChangeLogPost, FormInputPost } from "@/types";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormPostProps {
  submit: SubmitHandler<FormChangeLogPost>;
  isEditing: boolean;
}

const FormChangeLog: FC<FormPostProps> = ({ submit, isEditing }) => {
  const { register, handleSubmit } = useForm<FormChangeLogPost>();

  return (
    <div>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center justify-center gap-5 mt-10"
      >
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Change Logs Title"
          className="input input-bordered w-full max-w-lg"
        />

        <textarea
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full max-w-lg"
          placeholder="Description"
        ></textarea>

        <textarea
          {...register("releaseVersion", { required: true })}
          className="textarea textarea-bordered w-full max-w-lg"
          placeholder="Release Version"
        ></textarea>

        <textarea
          {...register("releaseCategory", { required: true })}
          className="textarea textarea-bordered w-full max-w-lg"
          placeholder="Release Category"
        ></textarea>


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

export default FormChangeLog;
