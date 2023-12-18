import BackButton from "@/components/BackButton";
import ButtonAction from "@/components/ButtonAction";
import { db } from "@/lib/db";
import React, { FC } from "react";

interface BlogDetailProp {
  params: {
    id: string;
  };
}

const getPost = async (id: string) => {
  const response = await db.post.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
  });
  return response;
};

const BlogDetail: FC<BlogDetailProp> = async ({ params }) => {
  const post = await getPost(params.id);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <h2 className="text-2xl font-bold my-4">{post?.title}</h2>
        </div>
        <ButtonAction id = {params.id}/>
      </div>
      <div className={`badge badge-primary badge-outline`}>
        {post?.tag?.name}
      </div>
      <p className="text-white">{post?.content}</p>
    </div>
  );
};

export default BlogDetail;
