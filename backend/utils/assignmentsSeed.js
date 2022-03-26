import Mongoose from "mongoose";
import fetch from "node-fetch";
import assignmentsSchema from "../schemas/assignmentsModel.js";
let saveCounter = 0;
//Connecting to mongoDB with mongoose
//async function to wait for mongoose to connect starting using the collection
export const insertData = async () => {
  try {
    await Mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb connection success");
  } catch (error) {
    console.log(error);
  }
  const url = "https://tskoli-intranet-api-alpha.vercel.app/api/v1/gallery";
  try {
    const response = await fetch(url);
    const json = await response.json();

    for (let i = saveCounter; i < json.length; i++) {
      if (
        json[i].reviews &&
        json[i].reviews.filter((review) => review.vote === "recommend").length
      ) {
        let assignments = new assignmentsSchema({
          uniqueID: json[i]._id,
          author: json[i].sender.name,
          moduleTitle: json[i].assignment.project.Title,
          assignmentTitle: json[i].assignment.title,
          description: json[i].assignment.project.Description,
          comment: json[i].comment,
          url: json[i].url,
          createdAt: json[i].createdAt,
          updatedAt: json[i].updatedAt,
        });

        assignments.save(() => {
          saveCounter++;

          if (saveCounter === json.length) {
            mongoose
              .disconnect()
              .then(() =>
                console.log("saved succesfully and mongodb disconnected")
              )
              .catch((error) => console.log(error));
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
