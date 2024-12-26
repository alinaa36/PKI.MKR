import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

const SearchPanel = ({ onSearch, searchedUser }) => {
  const [searchUsername, setSearchUsername] = useState('');

  const handleSearchChange = (e) => {
    setSearchUsername(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchUsername) {
      onSearch(searchUsername);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a user by username"
          value={searchUsername}
          onChange={handleSearchChange}
        />
        <IconButton type="submit" className="search-button">
          <SearchIcon />
        </IconButton>

        {searchedUser && (
          <div className="searched-user">
            <h3>User Details:</h3>
            <p><strong>Username:</strong> {searchedUser.username}</p>
            <p><strong>Full Name:</strong> {searchedUser.full_name || 'Not provided'}</p>
            <p><strong>Posts:</strong> {searchedUser.posts}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchPanel;
