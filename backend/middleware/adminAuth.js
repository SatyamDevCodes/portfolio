import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ msg: "No token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return res.status(403).json({ msg: "Not authorized" });
        }
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};