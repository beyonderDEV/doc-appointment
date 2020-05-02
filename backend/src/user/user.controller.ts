import * as express from 'express';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import userModel from "./user.model";

class UserController implements Controller {
    public path = '/users';
    public router = express.Router();
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.get(`/users/:id`, this.getUserById);
        this.router.patch(`/users/:id`, this.updateUserData)
        this.router.get(`/`, this.renderIndex)
        this.router.get('/home', this.renderIndex)
    }

    private getAllUsers = async (request: express.Request, response: express.Response) => {
            const users = await this.user.find();
            if(users) {
                response.send(users);
                return;
            } else {
                console.log('no users');
            }
        // next(new NotAuthorizedException());
    };

    private getUserById = async (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        const user = await this.user.findById(id);
        if(user) {
            response.send(user);
            return;
        } else {
            console.log('user not found'); 
        }
    };

    private updateUserData = async (request: express.Request, response: express.Response) => {
        const id = request.body._id;
        const userData = request.body;
        this.user.findByIdAndUpdate(id, userData, {'new': true})
            .then((user) => {
                if(user) {
                    console.log(user);
                    response.send(user);
                }
            });
    }

    private renderIndex = async (request: express.Request, response: express.Response) => {
        response.sendFile(process.cwd()+"/public/index.html")
    }
}

export default UserController;