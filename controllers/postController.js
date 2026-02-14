import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id,
  });

  res.status(201).json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "username");
  res.json(posts);
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Not found" });

  if (post.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  const updated = await post.save();
  res.json(updated);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Not found" });

  if (post.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  await post.deleteOne();
  res.json({ message: "Deleted" });
};
