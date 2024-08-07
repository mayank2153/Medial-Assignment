import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostData from "./PostData";
import PostCard from "./PostCard";
import { Helmet } from "react-helmet";

const PostPage = () => {
  const { postId } = useParams();
  const posts = PostData();
  const post = posts.find((p) => p._id === postId);

  const [imageUrl, setImageUrl] = useState('');

  if (!post) {
    return <h1>Post not found</h1>;
  }

  const generateImageUrl = (post) => {
    const params = new URLSearchParams({
      avatar: post.owner.avatar,
      title: post.title,
      description: post.description,
      media: post.media,
      username: post.owner.userName,
      category: post.category.name,
      updatedAt: post.updatedAt,
      voteCount: post.votes.length,
      commentsCount: post.comments.length
    });
    
    return `https://medial-assignment-mayank.onrender.com/api/generate-image?${params.toString()}`;
  };

  const fetchImageUrl = async () => {
    const url = generateImageUrl(post);
    const response = await fetch(url);
    const data = await response.json();
    setImageUrl(data.imageUrl);
  };

  useEffect(() => {
    fetchImageUrl();
  }, []);

  return (
    <div className="post-page flex flex-col bg-[#0d1114] w-full min-h-screen overflow-y-auto items-center no-scrollbar py-8">
      <Helmet>
        <meta property="og:image" content={imageUrl} />
      </Helmet>
      <div>
        <PostCard {...post} />
      </div>
    </div>
  );
};

export default PostPage;
