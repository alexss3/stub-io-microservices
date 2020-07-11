import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';

const router = express.Router();

const PASS_MIN = 4;
const PASS_MAX = 20;

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Email address must be valid'),
        body('password')
            .trim()
            .isLength({ min: PASS_MIN, max: PASS_MAX })
            .withMessage(`Password must be between ${PASS_MIN} and ${PASS_MAX} characters`)
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
       throw new BadRequestError('Email in use');
    }

    const user = User.build({
        email,
        password
    });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, 
        process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
   
});

export { router as signupRouter };

export default router;