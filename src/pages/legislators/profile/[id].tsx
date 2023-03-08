import { type NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";
import { Header } from "~/components/header";
import Avatar from "~/components/legislator/avatar";
import Bio from "~/components/legislator/bio";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { State, Party, Chamber } from "@prisma/client";

// Use this to fetch an array of legislator IDs for our dynamic routes
export async function getStaticPaths() {
  //   const { data: session, status } = useSession();
  const { data: legislators } = api.legislator.getAllIds.useQuery();

  // TODO: Determine what to do if there are no IDs
  if (!legislators) {
    return;
  }

  return {
    paths: legislators.map((legislator) => {
      return {
        params: {
          id: legislator.id,
        },
      };
    }),
    // fallback: true means that the missing pages
    // will not 404_app, and instead can render a fallback.
    fallback: true,
  };
}

type Params = {
  params: {
    id: string;
  };
};

// Use this to fetch data for each Legislator
export async function getStaticProps({ params }: Params) {
  const { data: legislator } = api.legislator.get.useQuery({
    legislatorId: params.id,
  });

  return {
    props: {
      legislator: {
        ...legislator,
      },
    },
    // Incremental Static Regeneration after 60 sec
    revalidate: 60,
  };
}

type Legislator = {
  id: string;
  firstName: string;
  lastName: string;
  state: State;
  party: Party;
  chamber: Chamber;
  district: number;
  imageUri: string | undefined;
  chamberWebsiteUrl: string;
  capitolWebsiteUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function LegislatorPage(legislator: Legislator) {
  const router = useRouter();
  const { legislatorId } = router.query;
  const title = `${legislator.firstName} ${legislator.lastName} | Profile`;

  // Return a loading div while the page is being rendered
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Avatar imageUri={legislator?.imageUri} />
      <h1>Legislator Page</h1>
    </>
  );
}
