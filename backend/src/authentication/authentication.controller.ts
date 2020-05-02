import * as bcrypt from 'bcrypt';
import * as express from 'express';
import DuplicateUserNameException from '../exceptions/DuplicateUserNameException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../user/user.dto';
import userModel from './../user/user.model';
import LogInDto from './logIn.dto';

class AuthenticationController implements Controller {
    public path = '/auth';
    public router = express.Router();
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`/register`, validationMiddleware(CreateUserDto), this.registration);
        this.router.post(`/login`, validationMiddleware(LogInDto), this.loggingIn);
    }

    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: CreateUserDto = request.body;
        if (
            await this.user.findOne({ username: userData.username })
        ) {
            next(new DuplicateUserNameException(userData.username));
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = await this.user.create({
                ...userData,
                password: hashedPassword,
                rating: 0,
                visits: [],
                lastLogged: [],
                profilePic: '',
                rates: []
            });
            user.password = undefined;
            response.send(user);
        }
    };

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const logInData: LogInDto = request.body;
        const user = await this.user.findOne({ username: logInData.username });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
            if (isPasswordMatching) {
                user.password = undefined;
                const lastLogged = new Date().toLocaleString('pl-PL');
                user.lastLogged.push(lastLogged);
                response.send(user);
            } else {
                next(new WrongCredentialsException());
            }
        } else {
            next(new WrongCredentialsException());
        }
    }
}

export default AuthenticationController;
