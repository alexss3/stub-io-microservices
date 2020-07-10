import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

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
    async (req: Request, res: Response) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

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

    res.status(201).send(user);
   
});

export { router as signupRouter };

export default router;