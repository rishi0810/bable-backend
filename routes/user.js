import express from "express";
import {
  handlesignup,
  handlelogin,
  handlelogout,
  handleauthcheck,
  handleuserdetails,
} from "../controller/user.control.js";

const router = express.Router();

router.post("/signup", handlesignup);
router.post("/login", handlelogin);
router.post("/logout", handlelogout);
router.get("/authcheck", handleauthcheck);
router.get("/details/:userID", handleuserdetails);

export default router;
