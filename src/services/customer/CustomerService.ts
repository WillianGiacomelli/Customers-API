import { CustomerModel } from "../../models/customer/customerModel";
import admin from 'firebase-admin';
import serviceAccount from '../../FirebaseServiceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});
const db = admin.firestore();

class CustomerService{
    public async getCustomerByCNPJ(cnpj: string, isInsertion:boolean=false): Promise<CustomerModel | null | undefined> {
        try{
            const snapshot = await db.collection('customer')
                               .where('cnpj', '==', cnpj)
                               .get();

            if (snapshot.empty && !isInsertion) {
                throw new Error(`Customer with CNPJ ${cnpj} not found`);
            }

            if (snapshot.empty && isInsertion) {
                return null;
            }

            const customerData = snapshot.docs[0].data() as CustomerModel;

            return customerData;
        }catch(error: any){
            throw new Error(`Create Customer - ${error.message}`);
        }
    }

    public async createCustomer(customer: CustomerModel): Promise<CustomerModel> {
        try{
            const existingCustomer = await this.getCustomerByCNPJ(customer.cnpj,true);

            if (existingCustomer) {
                throw new Error(`Customer with CNPJ ${customer.cnpj} already exists.`);
            }

            await db.collection('customer').add(customer);

            return customer;
        }catch(error: any){
            throw new Error(`Create Customer - ${error.message}`);
        }
    }
}

export { CustomerService }