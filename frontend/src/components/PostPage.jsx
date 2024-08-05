import React from "react";
import { useParams } from "react-router-dom";
import PostData from "./PostData.jsx";
import PostCard from "./PostCard.jsx";
import { Helmet } from "react-helmet";

const PostPage = () => {
  const { postId } = useParams();
  const posts = PostData();
  const post = posts.find((p) => p._id === postId);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <div className="post-page">
         <Helmet>
            <meta property="og:title" content={post?.title} />
            <meta property="og:description" content={post?.description} />
            <meta property="og:image" content={post?.media} />
            <meta property="og:url" content="http://localhost:5173/" />
            <meta property="og:type" content="website" />
        </Helmet>
        <div>
            <PostCard {...post} />
        </div>

    </div>
  );
};

export default PostPage;
