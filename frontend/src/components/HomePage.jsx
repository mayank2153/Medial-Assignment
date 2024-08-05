// HomePage.jsx
import React from "react";
import PostCard from "./PostCard.jsx";
import PostData from "./PostData.jsx";

const HomePage = () => {
  const posts = PostData();

  return (
    <div className="flex flex-col bg-[#0d1114] w-full min-h-screen overflow-y-auto items-center no-scrollbar py-8">
      {posts.map((post, index) => (
        <div key={post._id} className="rounded-2xl bg-[#13181d] p-1 mb-4">
          <PostCard {...post} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
