import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Highlight } from "react-instantsearch-hooks-web";
import React from "react";

interface LegislatorProps {
  firstName: string;
  lastName: string;
  district: string;
  role: string;
  party: string;
}

interface LegislatorHit {
  hit: LegislatorProps;
}

export const LegislatorListItem = ({ hit }: LegislatorHit) => {
  const redGradient =
    "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-700 via-red-600 to-red-500";
  const blueGradient =
    "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-600 to-blue-500";
  const bgColor = hit.party === "R" ? redGradient : blueGradient;

  return (
    <Card
      className={`flex h-14 w-full justify-between text-white hover:underline ${bgColor}`}
    >
      <CardHeader className="flex justify-center p-4 text-left">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-2xl">
          <Highlight attribute="lastName" hit={hit} />
          {", "}
          <Highlight attribute="firstName" hit={hit} />
        </h3>
      </CardHeader>
      <CardContent className="flex items-center gap-x-4 p-4">
        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-xl">
          <Highlight attribute="district" hit={hit} />
        </h2>
        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-xl">
          {hit.role}
        </h2>
      </CardContent>
    </Card>
  );
};
