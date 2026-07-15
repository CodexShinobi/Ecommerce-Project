import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    console.log("Token:", token);

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Please Login Again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    req.userId = decoded.id;

    console.log("User ID:", req.userId);

    next();
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;