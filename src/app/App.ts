import express, { Router } from 'express';
import { Routes } from '../routers';
import bodyParser from 'body-parser';

class App {
    public App: express.Application;
    public ApiRouter: Router;
    private routers: Routes = new Routes();

    constructor() {
        this.ApiRouter = Router();
        this.App = express();
        this.configJson();
        this.App.use('/api', this.ApiRouter);
        this.routers.routes(this.ApiRouter);
    }

    public configJson(): void {
        this.App.use(bodyParser.json());
        this.App.use(bodyParser.urlencoded({ extended: false }));
        this.App.use(express.json({ limit: '50mb' }));
        this.App.use(express.urlencoded({ limit: '50mb', extended: false }));
        // this.App.use(cookieParser());
        // this.App.use(logger('dev'));
    }

}

export default new App().App;