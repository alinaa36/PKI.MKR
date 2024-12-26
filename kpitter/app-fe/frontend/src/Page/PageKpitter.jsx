import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TopBar from '../Components/TopBar';
import ProfileModal from '../Components/ProfileModal';
import SearchPanel from '../Components/SearchPanel';
import NewPostPanel from '../Components/NewPostPanel';
import './PageKpitter.css';

function Kpitter() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);
  const [newPostContent, setNewPostContent] = useState('');
  const [postSuccessMessage, setPostSuccessMessage] = useState('');
  const [myPosts, setMyPosts] = useState([]);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('http://localhost:8000/api/me', {
        headers: {
          'Authorization': `Basic ${btoa(userData.username + ':' + userData.password)}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setProfileData(data);
      fetchMyPosts(data.username);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));

      const response = await fetch(`http://localhost:8000/api/users/${userData.username}/posts`, {
        headers: {
          'Authorization': `Basic ${btoa(userData.username + ':' + userData.password)}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch your posts');
      }

      const data = await response.json();
      setMyPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserByUsername = async (username) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/api/users/${username}`);

      if (!response.ok) {
        throw new Error('User not found');
      }

      const data = await response.json();
      setSearchedUser(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createNewPost = async () => {
    setLoading(true);
    setPostSuccessMessage('');
    setError(null);

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`http://localhost:8000/api/users/${userData.username}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(userData.username + ':' + userData.password)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newPostContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to create new post');
      }

      setPostSuccessMessage('Post created successfully!');
      setNewPostContent('');
      fetchMyPosts(userData.username);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

 
  const [likedPosts, setLikedPosts] = useState({});

 
  const handleLike = (postId) => {
    setLikedPosts((prevLikes) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId],
    }));
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      fetchProfileData();
    }
  }, []);

  return (
    <div className="kpitter-container">
      <TopBar onOpenModal={handleOpenModal} onLogout={handleLogout} />

      <div className="main-content">
        <p>Here you can share your thoughts, post updates, and interact with the community.</p>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

       
        <NewPostPanel
          newPostContent={newPostContent}
          setNewPostContent={setNewPostContent}
          createNewPost={createNewPost}
          loading={loading}
          postSuccessMessage={postSuccessMessage}
        />

     
        <div className="my-posts-container">
          <h3>Your Posts</h3>
          {myPosts.length > 0 ? (
            <div>
              {myPosts.map((post, index) => (
                <Card variant="outlined" key={index} className="post-card">
                  <CardContent>
                    <Typography variant="h6">Post #{index + 1}</Typography>
                    <Typography variant="body1">{post.content}</Typography>

                  
                    <IconButton onClick={() => handleLike(post.id)}>
                      <FavoriteBorderIcon color={likedPosts[post.id] ? 'primary' : 'disabled'} />
                    </IconButton>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>

    
      <SearchPanel onSearch={fetchUserByUsername} searchedUser={searchedUser} />

      <ProfileModal open={openModal} onClose={handleCloseModal} profileData={profileData} error={error} />
    </div>
  );
}

export default Kpitter;
