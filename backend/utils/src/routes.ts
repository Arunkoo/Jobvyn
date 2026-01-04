import express from "express";
import cloudinary from "cloudinary";
const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const { buffer, public_id } = req.body; //why? public_id because if let say user is updating its resume or profile pic than i need to get refrenve to delete the previous version of the image so that my space would be free in cloudinary...
    if (public_id) {
      await cloudinary.v2.uploader.destroy(public_id);
    }

    const cloud = await cloudinary.v2.uploader.upload(buffer);

    res.json({
      url: cloud.secure_url,
      public_id: cloud.public_id,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});
export default router;
