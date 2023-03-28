import { Legislator, Party, State, Chamber } from "@prisma/client";
import { createContext } from "react";

const defaultDate: Date = new Date(2023, 2, 28);

const defaultLegislator = {
  id: "12345",
  firstName: "John",
  lastName: "Doe",
  state: State.MI,
  party: Party.Other,
  chamber: Chamber.Senate,
  district: -1,
  imageUri: "defaultValue",
  chamberWebsiteUrl: "defaultValue",
  capitolWebsiteUrl: "defaultValue",
  currentSessionId: -1,
  createdAt: defaultDate,
  updatedAt: defaultDate,
};

export const LegislatorContext = createContext<Legislator>(defaultLegislator);

export default LegislatorContext;
