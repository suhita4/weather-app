/*const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

/**
 * GET prodyct list.
 * 
 * @return product list | empty

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

module.exports = router; */

const app = require('express')();
const { v4 } = require('uuid');

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;