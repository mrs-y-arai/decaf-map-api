import { z } from "zod";
import { placeSchema } from "../schema/Place";

export type Place = z.infer<typeof placeSchema>;
