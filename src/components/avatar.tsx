import React from "react";
import Image from "next/image";

interface AvatarProps {
  type: "USER" | "LEGISLATOR";
  name: string;
  imageUri?: string | null;
  size?: number;
}

// TODO: Fix this component. Need placeholder initials to get smaller when size is below 12.
// Currently its very inconsistent for all avatars
const Avatar = ({ imageUri, name, type, size }: AvatarProps) => {
  const defaultSize = 12;

  if (!name) {
    return null;
  }
  const [firstName, lastName] = name.split(" ");

  // If there is no image, render a placeholder with initials
  if (!imageUri) {
    const firstInitial = firstName?.charAt(0).toUpperCase() ?? "A";
    const secondIntial = lastName?.charAt(0).toUpperCase() ?? "Z";
    const initials = firstInitial + secondIntial;

    return (
      <>
        <div className="placeholder avatar">
          <div
            className={`h-${size ?? defaultSize} w-${
              size ?? defaultSize
            } flex-shrink-0 rounded-full bg-neutral-focus text-neutral-content`}
          >
            <span className="text-3xl">{initials}</span>
          </div>
        </div>
      </>
    );
    // Otherwise, return the image
  } else {
    let imagePath = imageUri;
    // Use the GCS bucket path if legislator
    if (type === "LEGISLATOR") {
      const bucketName = process.env.GCS_BUCKET_NAME ?? "defaultBucketName";
      const gcsBasePath = `https://storage.googleapis.com/${bucketName}/avatars`;
      imagePath = `${gcsBasePath}/${imageUri}`;
    }
    return (
      <>
        <div className="avatar">
          <div
            className={`h-${size ?? defaultSize} w-${
              size ?? defaultSize
            } rounded-full`}
          >
            {/* TODO: Make width and height correct? */}
            <Image src={imagePath} alt="avatar" width={12} height={12} />
          </div>
        </div>
      </>
    );
  }
};

export default Avatar;
