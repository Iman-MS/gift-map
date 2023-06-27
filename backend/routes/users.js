import express from "express";
const router = express.Router();

router.get("/:userId", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `get user details of the user ${req.params.userId}`,
  });
});

router.post("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `create a new user`,
  });
});

router.put("/:userId", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `update user ${req.params.userId}`,
  });
});

router.delete("/:userId", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `delete user ${req.params.userId}`,
  });
});

export default router;
