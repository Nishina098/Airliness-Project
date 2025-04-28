import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
    console.log('Verifying user session:', req.session);
    if (!req.session.userId) {
        console.log('No user session found');
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    console.log('User session verified:', req.session);
    next();
};

export const adminOnly = (req, res, next) => {
    console.log('Verifying admin access:', req.session);
    if (!req.session.userId) {
        console.log('No user session found');
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    if (req.session.role !== "administrator") {
        console.log('User is not an administrator:', req.session.role);
        return res.status(403).json({ msg: "Akses terlarang!" });
    }
    console.log('Admin access verified');
    next();
};

export const maskapaiOnly = (req, res, next) => {
    console.log('Verifying maskapai access:', req.session);
    if (!req.session.userId) {
        console.log('No user session found');
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    if (req.session.role !== "maskapai") {
        console.log('User is not a maskapai:', req.session.role);
        return res.status(403).json({ msg: "Akses terlarang!" });
    }
    console.log('Maskapai access verified');
    next();
};

export const adminOrMaskapai = (req, res, next) => {
    console.log('Verifying admin or maskapai access:', req.session);
    if (!req.session.userId) {
        console.log('No user session found');
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    if (req.session.role !== "administrator" && req.session.role !== "maskapai") {
        console.log('User is neither admin nor maskapai:', req.session.role);
        return res.status(403).json({ msg: "Akses terlarang!" });
    }
    console.log('Admin or maskapai access verified');
    next();
};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        console.log('No token found in request');
        return res.status(401).json({ msg: "Token tidak ditemukan" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log('Invalid token:', err);
            return res.status(403).json({ msg: "Token tidak valid" });
        }
        console.log('Token verified:', decoded);
        req.user = decoded;
        next();
    });
}; 