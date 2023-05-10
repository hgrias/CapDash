import { badgeVariants } from "./ui/badge";
import Link from "next/link";

interface TagBadgeProps {
  tag: {
    id: number;
    name: string;
  };
  orgSlug: string;
}

export const TagBadge = ({ tag, orgSlug }: TagBadgeProps) => {
  return (
    <Link
      href={`/org/${orgSlug}/tags/${tag.id}`}
      className={badgeVariants({
        variant: "outline",
        className: "mr-1 mb-1 hover:bg-blue-100",
      })}
    >
      {tag.name}
    </Link>
  );
};
