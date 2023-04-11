import { useProfileContext } from "../profileContext";
import { Interaction } from "./interaction";
import React from "react";

export const ProfileInteractions = () => {
  const { interactions, interactionsQuery } = useProfileContext();

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
                key={interaction.id}
                createdAt={interaction.createdAt}
                creatorName={interaction.user.name}
                content={interaction.content}
                type={interaction.type}
                tags={interaction.tags}
                method={interaction.method}
                noteId={interaction.noteId ?? undefined}
              />
            );
          })
        ) : (
          <div className=""> There are no interactions! Create one! </div>
        )}
      </ol>
      {interactionsQuery.hasNextPage || interactionsQuery.isFetchingNextPage ? (
        <div className="flex h-10 justify-center bg-slate-200 bg-gradient-to-t from-transparent to-white py-2 text-center">
          <button onClick={() => interactionsQuery.fetchNextPage()}>
            Load More Notes
          </button>
        </div>
      ) : null}
    </div>
  );
};
