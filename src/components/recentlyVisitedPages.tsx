import { User, Tag } from "lucide-react";
import { api } from "~/utils/api";
import Link from "next/link";

export const RecentlyVisitedPages = () => {
  const recentlyVisitedPageInfo = api.pageVisit.getRecentlyVisited.useQuery(
    undefined,
    {
      refetchOnReconnect: false,
    }
  );

  const pages = recentlyVisitedPageInfo.data?.map((data) => {
    if (data?.type === "legislator") {
      return (
        <Link key={data.id} href={data.url}>
          <div className="flex rounded-md p-2 hover:bg-gray-100">
            <User className="mr-1" />
            {data.lastName}, {data.firstName}
          </div>
        </Link>
      );
    } else if (data?.type === "tag") {
      return (
        <Link key={data.id} href={data.url}>
          <div className="flex rounded-md p-2 hover:bg-gray-100">
            <Tag className="mr-1" />
            {data.name}
          </div>
        </Link>
      );
    }
  });

  return <div className="flex flex-col gap-y-1">{pages}</div>;
};
