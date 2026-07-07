import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

console.log("Config:", cloudinary.config());

try {
  const result = await cloudinary.uploader.upload("./test.png");

  console.log("SUCCESS");
  console.log(result);

} catch (err) {
  console.log("FULL ERROR:");
  console.dir(err, { depth: null });

  if (err.response) {
    console.log("Status:", err.response.status);
    console.log("Response Body:", err.response.body);
  }
}