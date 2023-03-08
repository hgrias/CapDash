import React, { FC } from "react";

interface AvatarProps {
  imageUri?: string;
}

const Avatar: FC<AvatarProps> = ({ imageUri }) => {
  // TODO: Do I need to store the bucket name in an env var?
  const gcsBasePath =
    "https://storage.googleapis.com/legislator-dashboard/avatars";
  const fullImagePath = `${gcsBasePath}/${imageUri}`;

  // Don't render if there is no image URI
  // TODO: Look into using component composition / compound components for Legislator Profile
  if (!imageUri) {
    return null;
  }

  return (
    <>
      <div className="avatar">
        <div className="w-24 rounded">
          <img src={fullImagePath} />
        </div>
      </div>
    </>
  );
};

export default Avatar;
