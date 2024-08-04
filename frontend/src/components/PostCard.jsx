import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { Helmet } from "react-helmet"

const PostCard = ({ title, description, owner, votes, updatedAt, media, comments, category, _id }) => {
  const [userVote, setUserVote] = useState(null);

  // Simulate current user data
  const currentUser = "user1";

  // Find the user's vote type, if available
  const userVoteType = votes.find(vote => vote.voteOwner === currentUser)?.voteType;

  const handleVote = (type) => {
    setUserVote(type);
    // Handle vote logic here (e.g., update state, send to server)
  };

  const voteCount = votes.length;
  const commentCount = comments.length;

  return (
    <div className="post-card bg-[#13181d] shadow-md w-[500px] max-h-[500px] min-w-[600px] rounded-lg py-1">
        <Helmet>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={media} />
            <meta property="og:url" content="http://localhost:5173/" />
            <meta property="og:type" content="website" />
        </Helmet>
      <div className='hover:bg-[#2e2b2b] rounded-2xl py-4 px-8'>
        <div className='flex gap-10 justify-between'>
          {owner && (
            <div className="owner-info flex items-center mb-4 gap-4 text-white">
              <img
                src={owner.avatar}
                alt={`Avatar of ${owner.userName}`}
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <span className="font-bold">{owner.userName}</span>
                <p className='text-sm'> {new Date(updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
            <p className='text-sm text-white'>{category.name}</p>
          
        </div>
        <div>
          <div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <p className="text-[#9bb7b8]">{description}</p>

            {media && (
              <div className="media mt-4 rounded-2xl border border-slate-200 flex justify-center">
                <a href={media} target="_blank" rel="noopener noreferrer">
                  <img src={media} alt="Media content" className="max-w-[500px] max-h-[300px]" />
                </a>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500 flex gap-10 mt-2">
            <div className='flex gap-2'>
              <div className={`flex rounded-full gap-1 cursor-pointer
              ${userVoteType === null ? 'bg-[#222020]' : null}
              ${userVoteType === "upvote" ? 'bg-green-500 text-white' : null}
              ${userVoteType === "downvote" ? 'bg-red-500 text-white' : null}
              `}>
                <AiOutlineLike
                  size={30}
                  className={`p-1 rounded-full
                    ${userVoteType === null ? 'hover:text-green-600' : null}
                    ${userVoteType === "upvote" ? 'text-green-500 bg-green-300' : null}
                    ${userVoteType === "downvote" ? ' hover:bg-red-600' : null}
                    duration-200
                    `}
                  onClick={() => handleVote("upvote")}
                />
                  <p className='text-xl'>{voteCount}</p>
                <AiOutlineDislike
                  size={30}
                  className={`p-1 rounded-full
                  ${userVoteType === null ? 'hover:text-red-600' : null}
                  ${userVoteType === "downvote" ? 'text-red-500 bg-red-300' : null}
                  ${userVoteType === "upvote" ? ' hover:bg-green-600' : null}
                    duration-200
                  `}
                  onClick={() => handleVote("downvote")}
                />
              </div>
            </div>
              <div className='flex bg-[#222020] rounded-full gap-1 cursor-pointer pr-1'>
                <FaRegComment size={30} className='hover:text-blue-500 p-1 hover:bg-[#1c1a1a] rounded-full' />
                <p className='text-xl'>{commentCount}</p>
              </div>
            {
              currentUser === owner.userName &&
                <div className='flex bg-[#222020] rounded-full gap-1 cursor-pointer pr-1'>
                  <p className='text-xl'>Edit</p>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
