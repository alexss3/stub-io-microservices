import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const PASS_MIN = 4;
const PASS_MAX = 20;

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Email address must be valid');

        body('password')
            .trim()
            .isLength({ min: PASS_MIN, max: PASS_MAX })
            .withMessage(`Password must be between ${PASS_MIN} and ${PASS_MAX} characters`)
    ], 
    (req: Request, res: Response) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.statusCode(400).send(errors.array());
    }

    const { email, password } = req.body;
    console.log('Creating user...');
    
    res.send({});
});

export { router as signupRouter };