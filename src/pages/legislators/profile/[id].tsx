import { State, Party, Chamber } from "@prisma/client";
import Avatar from "~/components/legislator/avatar";
import Bio from "~/components/legislator/bio";
import { Header } from "~/components/header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import Link from "next/link";

const LegislatorProfile: NextPage = () => {
  const legislatorId = useRouter().query.id as string;
  // TODO: Determine if this API call is called on blur only on dev?
  const { data: legislator } = api.legislator.get.useQuery({ legislatorId });

  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        <Avatar imageUri={legislator?.imageUri} />
        <Bio {...legislator} />
      </div>
    </>
  );
};

export default LegislatorProfile;
