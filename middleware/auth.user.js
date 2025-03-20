import { validatetoken } from "../utils/auth.jsw";

export const validateuser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = validatetoken(token);
    console.log(decoded);
    req.user = decoded._id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
