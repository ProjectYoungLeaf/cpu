const express  = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');

router.post("/write", async (req, res) => {
    try {
      let obj;
  
      obj = {
        board: req.body._board,
        writer: req.body._id,
        content: req.body.content
      };
  
      const comment = new Comment(obj);
      await comment.save();
      res.json({ message: "댓글이 작성 되었습니다." });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });

router.post("/delete", async (req, res) => {
  try {
    await Comment.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getBoardList", async (req, res) => {
  try {
    const _board = req.body._board;
    const comment = await Comment.find({ board: _board }, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: comment });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/detail", async (req, res) => {
    try {
      const _id = req.body._id;
      const comment = await Comment.find({ _id });
      res.json({ comment });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });

  module.exports = router;