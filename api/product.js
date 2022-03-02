const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

/**
 * GET prodyct list.
 * 
 * @return product list | empty
 */
router.get("/", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "Get data is successful"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
});

module.exports = router;