// PostData.jsx
const PostData = () => {
    const posts = [
      {
        title: "Sample Post Title 1",
        description: "This is a sample post description 1. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m",
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
      },
      {
        title: "Sample Post Title 2",
        description: "This is a sample post description 2.",
        owner: {
          userName: "Jane Smith",
          avatar: "https://via.placeholder.com/40",
        },
        votes: [
          { voteOwner: "user3", voteType: "upvote" },
          { voteOwner: "user4", voteType: "downvote" },
        ],
        updatedAt: "2024-08-02T14:00:00Z",
        media: "https://via.placeholder.com/500x300",
        comments: [{}, {}, {}, {}],
        category: {
          _id: "67890",
          name: "Another Category",
        },
        _id: "post456",
      },
      // Add more posts as needed
    ];
  
    return posts;
  };
  
  export default PostData;
  