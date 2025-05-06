import Bookmark from "../models/Bookmark.js";

export async function create(req, res) {
  const { url } = req.body;
  const userId = req.user._id;

  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const encoded = encodeURIComponent(url);
    const summaryRes = await fetch(`https://r.jina.ai/${encoded}`);
    const summary = await summaryRes.text();

    const summaryLines = summary.split('\n').map(line => line.trim()).filter(Boolean);
    const title = summaryLines[0] || "Untitled";
    const smallText = summaryLines.slice(4, 7).join('\n') || "No summary available";

    const favicon = `${new URL(url).origin}/favicon.ico`;

    const bookmark = await Bookmark.create({
      url,
      title,
      smallText,
      favicon,
      userId,
    });

    res.status(201).json(bookmark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch or save bookmark" });
  }
}

export async function getAll(req, res) {
    try {
      const userId = req.user._id;
  
      
      const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });
  
      res.json(bookmarks);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to fetch bookmarks" });
    }
  }
  

export async function remove(req, res) {
  const { id } = req.params;

  try {
    const deleted = await Bookmark.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ error: "Bookmark not found or not authorized" });
    }

    res.json({ success: true, message: "Bookmark deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete bookmark" });
  }
}
