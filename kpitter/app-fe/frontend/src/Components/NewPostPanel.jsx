import React from 'react';

const NewPostPanel = ({ newPostContent, setNewPostContent, createNewPost, loading, postSuccessMessage }) => {
  return (
    <div className="new-post-container">
      <h3>Create a New Post</h3>
      <textarea
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        placeholder="Write something..."
        rows="4"
        cols="50"
      />
      <button onClick={createNewPost} disabled={loading || !newPostContent}>
        Post
      </button>
      {postSuccessMessage && <p className="success-message">{postSuccessMessage}</p>}
    </div>
  );
};

export default NewPostPanel;
