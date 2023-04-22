import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardHeader,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

interface LegislatorCardProps {
  firstName: string;
  lastName: string;
  district: string;
  role: string;
  party: string;
}

export const LegislatorCard = ({
  firstName,
  lastName,
  role,
  district,
  party,
}: LegislatorCardProps) => {
  const redGradient =
    "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-700 via-red-600 to-red-500";
  const blueGradient =
    "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-600 to-blue-500";
  const bgColor = party === "R" ? redGradient : blueGradient;

  return (
    <Card
      className={`flex h-32 items-center justify-center text-white ${bgColor}`}
    >
      <CardHeader className="text-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {firstName.charAt(0)}. {lastName}
        </h3>
        <Separator
          decorative
          className="my-4 w-full bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        />
        <div className="flex h-full items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <div>
            <p>{role}</p>
          </div>
          <div className="mx-1 self-center">
            <Separator orientation="vertical" className="mx-3 h-4 bg-white " />
          </div>
          <div>
            <p>{district}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
