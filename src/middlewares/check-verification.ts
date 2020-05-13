export default function checkVerification(req, res, next) {
  if (!req.decoded.verified) {
    return res.status(403).send();
  }

  return next();
}
