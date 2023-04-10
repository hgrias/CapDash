import { useProfileContext } from "../profileContext";
import { Interaction } from "./interaction";
import React from "react";

export const ProfileInteractions = () => {
  const { interactions } = useProfileContext();

  if (!interactions) {
    return null;
  }

  return (
    <div className="w-full rounded-lg bg-white shadow-lg sm:mt-12">
      <div id="header" className="border-b-1 mb-3 border-b p-4 text-xl">
        <h1>Interactions</h1>
      </div>
      <ol className="relative m-3 border-l border-gray-200 pb-1">
        {interactions.length ? (
          interactions.map((interaction) => {
            return (
              <Interaction
                createdAt={interaction.createdAt}
                creatorName={interaction.user.name}
                type={interaction.type}
                tags={interaction.tags}
                method={interaction.method}
                noteId={interaction.noteId}
              />
            );
          })
        ) : (
          <div className=""> There are no interactions! Create one! </div>
        )}
      </ol>
    </div>
  );
};
