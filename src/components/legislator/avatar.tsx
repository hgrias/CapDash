import LegislatorContext from "./legislatorContext";
import React, { useContext } from "react";

const Avatar = () => {
  // Get necessary data from context instead of props
  const { imageUri, firstName, lastName } = useContext(LegislatorContext);
  // TODO: Do I need to store the bucket name in an env var?
  const gcsBasePath =
    "https://storage.googleapis.com/legislator-dashboard/avatars";
  const fullImagePath = `${gcsBasePath}/${imageUri}`;

  // If there is no image, render a placeholder with initials
  if (!imageUri) {
    const initials = `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
    return (
      <>
        <div className="placeholder avatar">
          <div className="w-24 rounded bg-neutral-focus text-neutral-content">
            <span className="text-3xl">{initials}</span>
          </div>
        </div>
      </>
    );
    // Otherwise, return the image via GCS image URI
  } else {
    return (
      <>
        <div className="avatar">
          <div className="rounded">
            <img src={fullImagePath} />
          </div>
        </div>
      </>
    );
  }
};

export default Avatar;
