import jwt from "jsonwebtoken";

function verifyJWT(req, res, next) {
  const authorization = req.headers["authorization"];

  if (!authorization) return res.sendStatus(401);

  const token = authorization.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, decodedData) {
      if (err) return res.sendStatus(403);

      req.user = decodedData.username;

      next();
    }
  );
}

export default verifyJWT;
