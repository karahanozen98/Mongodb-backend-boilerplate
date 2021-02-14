import jsonWebToken from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) res.status(401).send("Access denied");

  try {
    const verified = jsonWebToken.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}
export default auth;
