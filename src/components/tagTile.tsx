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
  const utils = api.useContext();

  const [hovered, setHovered] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(isFavorite);

  const { mutate: addFavoriteMutation } = api.tag.addFavoite.useMutation({
    onSuccess: () => {
      setFavorite(true);
      void utils.organization.tags.invalidate();
    },
    onError: (error) => {
      console.error(error);
      // Send a toast it failed
    },
  });

  const { mutate: removeFavoriteMutation } = api.tag.removeFavoite.useMutation({
    onSuccess: () => {
      setFavorite(false);
    },
    onError: (error) => {
      console.error(error);
      // Send a toast it failed
    },
  });

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
      {favorite ? (
        <button className="absolute right-2 top-2">
          <Star
            size={28}
            fill="gold"
            stroke="gold"
            onClick={() => removeFavoriteMutation({ tagId: id })}
          />
        </button>
      ) : hovered ? (
        <button className="absolute right-2 top-2">
          <Star
            className=""
            size={28}
            onClick={() => addFavoriteMutation({ tagId: id })}
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
