import { Highlight } from "react-instantsearch-hooks-web";
import { Card, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
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

export const LegislatorCard = ({ hit }: LegislatorHit) => {
  const redGradient =
    "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-700 via-red-600 to-red-500";
  const blueGradient =
    "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-600 to-blue-500";
  const bgColor = hit.party === "R" ? redGradient : blueGradient;

  return (
    <Card
      className={`flex h-32 items-center justify-center text-white hover:underline ${bgColor}`}
    >
      <CardHeader className="text-center">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-2xl">
          <Highlight attribute="lastName" hit={hit} />
          {", "}
          <Highlight attribute="firstName" hit={hit} />
        </h3>
        <Separator
          decorative
          className="my-4 w-full bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        />
        <div className="flex h-full items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <div>
            <p>{hit.role}</p>
          </div>
          <div className="mx-1 self-center">
            <Separator orientation="vertical" className="mx-3 h-4 bg-white " />
          </div>
          <div>
            <Highlight attribute="district" hit={hit} />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
