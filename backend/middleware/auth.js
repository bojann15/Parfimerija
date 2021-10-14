import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request');
        }
        let token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send('Unauthorized request');
        }
        let payload = jwt.verify(token, process.env.SECRET);
        if (!payload) {
            return res.status(401).send('Unauthorized request');
        }
        req.userId = payload.id;
        next();

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
export default auth;