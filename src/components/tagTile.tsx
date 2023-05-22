import { useOrganizationContext } from "./organizationContext";
import { Tag, Star } from "lucide-react";
import { api } from "~/utils/api";
import { useState } from "react";
import Link from "next/link";

interface TagTileProps {
  id: number;
  name: string;
  isFavorite: boolean;
}

export const TagTile = ({ id, name, isFavorite }: TagTileProps) => {
  const { organization } = useOrganizationContext();
  const [hovered, setHovered] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  // const favoriteTagMutation = api.tag.favorite.useMutation();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  if (!organization) {
    return null;
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {isFavorite ? (
        <button className="absolute right-2 top-2">
          <Star
            className=""
            size={28}
            fill="gold"
            strokeWidth={0}
            onClick={() => console.log("Tag Unfavorited!")}
          />
        </button>
      ) : hovered ? (
        <button className="absolute right-2 top-2">
          <Star
            className=""
            size={26}
            onClick={() => console.log("Tag Favorited!")}
          />
        </button>
      ) : null}
      <Link href={`/org/${organization?.slug}/tags/${id}`}>
        <div className="flex h-36 flex-col items-center justify-center gap-y-2 rounded-lg border-2 border-slate-800 text-center shadow-xl">
          <Tag className="h-10 w-10" />
          <h1 className="text-2xl">{name}</h1>
        </div>
      </Link>
    </div>
  );
};
