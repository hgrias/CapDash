import { Legislator, Party, State, Role } from "@prisma/client";
import { createContext } from "react";

const defaultDate: Date = new Date(2023, 2, 28);

const defaultLegislator = {
  id: "12345",
  firstName: "John",
  lastName: "Doe",
  state: State.MI,
  party: Party.D,
  role: LegislatorRole.Sen,
  district: "E2-321",
  imageUri: "defaultValue",
  chamberWebsiteUrl: "defaultValue",
  capitolWebsiteUrl: "defaultValue",
  organizationId: "",
  currentSessionId: -1,
  createdAt: defaultDate,
  updatedAt: defaultDate,
};

export const LegislatorContext = createContext<Legislator>(defaultLegislator);

export default LegislatorContext;
