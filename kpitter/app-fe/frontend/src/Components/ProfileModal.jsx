// ProfileModal.jsx
import React from 'react';
import Modal from '@mui/material/Modal';
import './PrifileModal.css';

function ProfileModal({ open, onClose, profileData, error }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <div className="modal-container">
        {profileData ? (
          <div>
            <h3>Profile Information:</h3>
            <p><strong>Username:</strong> {profileData.username}</p>
            <p><strong>Full Name:</strong> {profileData.full_name || 'Not provided'}</p>
            <p><strong>Posts:</strong> {profileData.posts}</p>
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
    </Modal>
  );
}

export default ProfileModal;
