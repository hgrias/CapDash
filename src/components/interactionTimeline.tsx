import { Interaction } from "@prisma/client";
import React, { FC } from "react";
import TimelineElement from "./interaction/interactionTimelineElement";
interface InteractionTimelineProps {
  interactions: Interaction[];
}

const InteractionTimeline: FC<InteractionTimelineProps> = ({
  interactions,
}) => {
  const timelineElements = interactions.map((interaction) => {
    return <TimelineElement key={interaction.id} interaction={interaction} />;
  });

  if (!timelineElements) {
    return null;
  }

  return (
    <>
      <ol className="relative my-10 border-l border-gray-200 dark:border-gray-700">
        {timelineElements}
      </ol>
    </>
  );
};

export default InteractionTimeline;
