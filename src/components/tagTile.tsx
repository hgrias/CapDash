import { useOrganizationContext } from "./organizationContext";
import { Tag } from "lucide-react";
import Link from "next/link";

interface TagTileProps {
  id: number;
  name: string;
}

export const TagTile = ({ id, name }: TagTileProps) => {
  const { organization } = useOrganizationContext();

  if (!organization) {
    return null;
  }

  return (
    <Link href={`/org/${organization?.slug}/tags/${id}`}>
      <div className="flex h-36 flex-col items-center justify-center gap-y-2 rounded-lg border-2 border-slate-800 text-center shadow-xl">
        <Tag className="h-10 w-10" />
        <h1 className="text-2xl">{name}</h1>
      </div>
    </Link>
  );
};
