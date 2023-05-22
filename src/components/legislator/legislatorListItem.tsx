import { Card, CardContent, CardHeader } from "~/components/ui/card";
import React from "react";

interface LegislatorListItemProps {
  firstName: string;
  lastName: string;
  district: string;
  role: string;
  party: string;
}

export const LegislatorListItem = ({
  firstName,
  lastName,
  role,
  district,
  party,
}: LegislatorListItemProps) => {
  const redGradient =
    "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-700 via-red-600 to-red-500";
  const blueGradient =
    "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-600 to-blue-500";
  const bgColor = party === "R" ? redGradient : blueGradient;

  return (
    <Card
      className={`flex h-14 w-full justify-between text-white hover:underline ${bgColor}`}
    >
      <CardHeader className="flex justify-center p-4 text-left">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-2xl">
          {lastName}, {firstName}
        </h3>
      </CardHeader>
      <CardContent className="flex items-center gap-x-4 p-4">
        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-xl">
          {district}
        </h2>
        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-xl">
          {role}
        </h2>
      </CardContent>
    </Card>
  );
};
