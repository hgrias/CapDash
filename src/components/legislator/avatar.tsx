import React, { FC } from "react";

interface AvatarProps {
  imageUri?: string;
}

const Avatar: FC<AvatarProps> = ({ imageUri }) => {
  const gcsBasePath = `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/avatars`;
  const fullImagePath = `${gcsBasePath}/${imageUri}`;

  // Don't render if there is no image URI
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
