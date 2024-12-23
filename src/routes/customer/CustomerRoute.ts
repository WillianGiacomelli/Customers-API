import { Router } from "express";
import { createCustomerAsync, getCustomerAsync } from "../../controllers/customer/CustomerController";
import { verifyAuth } from "../../middlewares/verifyAuth";

const customerRoutes = Router();

customerRoutes.get('/capital/get-customer', verifyAuth, getCustomerAsync);
customerRoutes.post('/capital/post-customer', verifyAuth, createCustomerAsync);

export default customerRoutes;