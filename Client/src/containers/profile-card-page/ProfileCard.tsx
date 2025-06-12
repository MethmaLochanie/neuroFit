import React from "react";
import { Avatar, Spin } from "antd";
import "./ProfileCard.css";
interface ProfileCardProps {
  name: string;
  email: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email }) => {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="profile-card">
      <h2 className="welcome-text">Welcome, {name}</h2>
      <div className="profile-details">
        <Avatar size={50} className="profile-picture">
          {initial}
        </Avatar>
        <div>
          <h3 className="profile-name">{name}</h3>
          <p className="profile-email">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
