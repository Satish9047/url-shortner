import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import apiRouter from './routes/route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));


app.get('/api/v1/test', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'express server is working properly' 
  });
});

app.use('/api/v1', apiRouter);

// Centralized Global Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global Error:', err.message);

  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

export default app;