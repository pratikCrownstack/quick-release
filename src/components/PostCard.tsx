import { Tag } from "@prisma/client";
import Link from "next/link";
import React, { FC } from "react";

interface PostCardProps {
  post : {
    id : string,
    title : string,
    content: string,
    tag: Tag
  }
}
const PostCard: FC<PostCardProps> = ({post}) => {
  const { id, title, content, tag} = post;

  return (
    <div className="card w-full bg-base-100 shadow-xl border-4 h-full">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <div className={`badge badge-primary badge-outline`}>{tag.name}</div>
        <div className="card-actions justify-end">
          <Link
            href={`/blog/${id}`}
            className="p-2 rounded-md bg-[#5D3587] hover:bg-[#392467] text-white"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
