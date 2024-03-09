import { Request, Response, NextFunction } from 'express';
interface CustomRequest extends Request {
    user?: any; // Adjust the type according to your user object structure
}
const isAdminMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    // Assuming you have a user object attached to the request after the isAuthorized middleware
    const user = req.user;

    if (!user || user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized. Admin access required.' });
    }

    // If user is admin, proceed to the next middleware/route handler
    next();
};

export default isAdminMiddleware;
