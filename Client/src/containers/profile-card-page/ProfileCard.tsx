import React from "react";
import "./ProfileCard.css";
import CustomImage from "../../components/custom-image/CustomImage";

interface ProfileCardProps {
  name: string;
  profilePicture: string;
  email: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  profilePicture,
  email,
}) => {
  return (
    <div className="profile-card">
      <h2 className="welcome-text">Welcome, {name}</h2>
      <div className="profile-details">
        <CustomImage
          src={profilePicture}
          alt={name}
          className="profile-picture"
        />
        <div>
          <h3 className="profile-name">{name}</h3>
          <p className="profile-email">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
