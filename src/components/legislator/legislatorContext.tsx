import { createContext } from "react";
import { Legislator } from "@prisma/client";

const defaultLegislator = {};

export const LegislatorContext =
  createContext<Partial<Legislator>>(defaultLegislator);

export default LegislatorContext;
