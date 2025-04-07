import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    next();
};

export const adminOnly = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    if (req.session.role !== "administrator") {
        return res.status(403).json({ msg: "Akses terlarang!" });
    }
    next();
};

export const maskapaiOnly = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    if (req.session.role !== "maskapai") {
        return res.status(403).json({ msg: "Akses terlarang!" });
    }
    next();
};

export const adminOrMaskapai = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    if (req.session.role !== "administrator" && req.session.role !== "maskapai") {
        return res.status(403).json({ msg: "Akses terlarang!" });
    }
    next();
};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ msg: "Token tidak ditemukan" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ msg: "Token tidak valid" });
        req.user = decoded;
        next();
    });
}; 