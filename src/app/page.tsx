import { db } from "@/lib/db";

const getPosts = async () => {
  const response = await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return response;
};

export default async function Home() {
  const posts = await getPosts();

  console.log("Posts Data", posts);
  return (
    <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      hello
    </main>
  );
}
