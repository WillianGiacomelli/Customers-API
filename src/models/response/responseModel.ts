export class ResponseModel {
    public error: boolean;
    public message: string;
    public data: any;
  
    constructor(error: boolean, message: string, data: any) {
      this.error = error;
      this.message = message;
      this.data = data;
    }

    public static success(data: any, message: string = 'Success') {
        return new ResponseModel(false, message, data);
    }

    public static error(message: string = 'Error', data: any = null) {
        return new ResponseModel(true, message, data);
    }
}