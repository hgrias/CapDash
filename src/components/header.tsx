import { useOrganizationContext } from "./organizationContext";
import { Landmark, Users, Tags, Map } from "lucide-react";
import { OrgDropdown } from "./header/orgDropdown";
import Link from "next/link";

export const Header = () => {
  const { organization } = useOrganizationContext() || null;

  // TODO: The header does not render if there is no internet??
  if (!organization) {
    return null;
  }

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link
            href={`/org/${organization.slug}`}
            className="mr-6 flex items-center space-x-2"
          >
            <Landmark />
            <span className="hidden text-xl font-bold sm:inline-block">
              CapDash
            </span>
          </Link>
          {/* TODO: Change to text-foreground on each link when selected */}
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="flex items-center gap-x-1 text-foreground/60 transition-colors hover:text-foreground/80"
              href={`/org/${organization.slug}/legislators`}
            >
              <Users />
              Legislators
            </Link>
            <Link
              className="flex items-center gap-x-1 text-foreground/60 transition-colors hover:text-foreground/80"
              href={`/org/${organization.slug}/tags`}
            >
              <Tags />
              Tags
            </Link>
            <Link
              className="flex items-center gap-x-1 text-foreground/60 transition-colors hover:text-foreground/80"
              href={`/org/${organization.slug}/map`}
            >
              <Map />
              Map
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <OrgDropdown />
        </div>
      </div>
    </header>
  );
};
