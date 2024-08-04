import React from "react";
import PostCard from "./PostCard.jsx";

const HomePage = () => {
  const postData = {
    title: "Sample Post Title",
    description: "This is a sample post description.",
    owner: {
      userName: "John Doe",
      avatar: "https://via.placeholder.com/40",
    },
    votes: [
      { voteOwner: "user1", voteType: "upvote" },
      { voteOwner: "user2", voteType: "downvote" },
    ],
    updatedAt: "2024-08-01T12:00:00Z",
    media: "https://via.placeholder.com/500x300",
    comments: [{}, {}, {}],
    category: {
      _id: "12345",
      name: "Sample Category",
    },
    _id: "post123",
  };

  return (
    <div className="flex flex-col bg-[#0d1114] w-full min-h-screen overflow-y-auto items-center no-scrollbar py-8">
      <div className="rounded-2xl bg-[#13181d] p-1">
        <PostCard {...postData} />
      </div>
    </div>
  );
};

export default HomePage;
