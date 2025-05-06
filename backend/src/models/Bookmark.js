import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
  url: String,
  title: String,
  favicon: String,
 
  smallText: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

export default Bookmark;
