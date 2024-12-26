
import React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './TopBar.css';

function TopBar({ onOpenModal, onLogout }) {
  return (
    <div className="top-bar">
      <IconButton onClick={onOpenModal} aria-label="profile">
        <AccountCircleIcon className="account-icon" />
      </IconButton>
      <h2>Welcome to Kpitter!</h2>
      <button onClick={onLogout} className="logout-button">Вийти</button>
    </div>
  );
}

export default TopBar;
