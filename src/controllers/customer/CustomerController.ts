import { Request, Response } from 'express';
import { ResponseModel } from '../../models/response/responseModel';
import { CustomerService } from '../../services/customer/CustomerService';

const getCustomerAsync = async (req: Request, res: Response) : Promise<any> => {
    try{
        const { cnpj } = req.query;

        const customerService = new CustomerService();

        const customer = await customerService.getCustomerByCNPJ(cnpj as string);

        return res.status(200).json(ResponseModel.success(customer));

    }catch(error: any){
        res.status(error).json(ResponseModel.error(error.message));
    }

}

const createCustomerAsync = async (req: Request, res: Response) : Promise<any> => {
    try{
        const customerReq = req.body;

        const customerService = new CustomerService();

        const customer = await customerService.createCustomer(customerReq);

        return res.status(201).json(ResponseModel.success(customer));

    }catch(error: any){
        res.status(500).json(ResponseModel.error(error.message));
    }
}

export {getCustomerAsync,createCustomerAsync}