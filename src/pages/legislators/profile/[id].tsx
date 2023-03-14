import LegislatorContext from "~/components/legislator/legislatorContext";
import { State, Party, Chamber } from "@prisma/client";
import Avatar from "~/components/legislator/avatar";
import Bio from "~/components/legislator/bio";
import ProfileDetails from "~/components/legislator/profileDetails";
import { Header } from "~/components/header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import Link from "next/link";
import { useState } from "react";
import NewInteractionForm from "~/components/interaction/newInteractionForm";

const LegislatorProfile: NextPage = () => {
  const legislatorId = useRouter().query.id as string;
  const [showNewInteractionForm, setShowNewInteractionForm] = useState(false);

  function handleNewInteractionClick() {
    setShowNewInteractionForm(true);
  }

  // TODO: Determine if this API call is called on blur only on dev?
  const { data: legislator } = api.legislator.getById.useQuery({
    legislatorId,
  });

  // TODO: Determine what to do if we don't get any information back from API
  if (!legislator) {
    return null;
  }

  return (
    <>
      <Header />
      <LegislatorContext.Provider value={legislator}>
        <div className="mb-4 flex">
          <div className="h-12 w-1/4 pt-2 pl-2">
            <ProfileDetails />
          </div>
          <div className=" h-12 w-3/4 justify-center pt-2 pr-2 pl-2">
            {showNewInteractionForm ? (
              <NewInteractionForm />
            ) : (
              <button className="btn" onClick={handleNewInteractionClick}>
                Create New Interaction
              </button>
            )}
          </div>
        </div>
      </LegislatorContext.Provider>
    </>
  );
};

export default LegislatorProfile;
