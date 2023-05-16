import { useOrganizationContext } from "./organizationContext";
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
      <div className="flex items-center justify-center rounded-lg bg-slate-200 text-center">
        <h1 className="text-2xl">{name}</h1>
      </div>
    </Link>
  );
};
