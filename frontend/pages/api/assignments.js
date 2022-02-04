import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const assignments = await db
    .collection("assignments")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(assignments);
};
