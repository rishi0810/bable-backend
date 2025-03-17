import express from "express";
import {
  blogcreate,
  blogfetch,
  blogfetchall,
  deleteblog,
  addblogtosave,
  removefromsave,
} from "../controller/blog.control.js";

const router = express.Router();

router.post("/create", blogcreate);
router.get("/:id", blogfetch);
router.get("/", blogfetchall);
router.post("/delete/:id", deleteblog);
router.post("/save/:blogid", addblogtosave);
router.post("/remove/:blogid", removefromsave);

export default router;
