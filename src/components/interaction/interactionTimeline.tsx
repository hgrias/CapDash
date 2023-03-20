import TimelineElement from "./interactionTimelineElement";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import React, { FC } from "react";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allLegislatorTimelineElements =
  RouterOutput["interaction"]["getAllForLegislator"];

interface InteractionTimelineProps {
  interactionTimelineData: allLegislatorTimelineElements;
}

const InteractionTimeline: FC<InteractionTimelineProps> = ({
  interactionTimelineData,
}) => {
  // Convert all interactions into HTML elements
  const timelineElements = interactionTimelineData.map((interaction) => {
    return <TimelineElement key={interaction.id} interaction={interaction} />;
  });

  if (!timelineElements) {
    return null;
  }

  return (
    <>
      <ol className="relative mb-10 border-l border-gray-200 dark:border-gray-700">
        {timelineElements}
      </ol>
    </>
  );
};

export default InteractionTimeline;
