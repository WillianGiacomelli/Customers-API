import express, { Request, Response } from 'express';
import cors from 'cors';
import customerRoutes from './routes/customer/CustomerRoute';

const app = express();
const PORT = 45000;

app.use(express.json());
app.use(cors())

app.use(customerRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});