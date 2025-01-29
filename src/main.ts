import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { placeListSchema } from "./schema/Place";

const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.get("/", async (req: Request, res: Response) => {
  const places = await prisma.$queryRaw`
    SELECT id, name, description,ST_AsGeoJSON(location)::json as location, created_at
    FROM "places"
  `;
  const parsedPlaces = placeListSchema.safeParse(places);
  if (!parsedPlaces.success) {
    console.error("Failed to parse places", parsedPlaces.error.format());
    res.status(500).json({ error: "Failed to parse places" });
    return;
  }
  res.json({ data: parsedPlaces.data });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
