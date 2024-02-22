export class WalkinAddressModel {
    constructor(
        public phone: string,
        public city: string,
        public address: string,
        public pinCode: string,
        public landmark: string,
        public companyName: string
    ) { }

    static fromJson(json: any): WalkinAddressModel {
        return new WalkinAddressModel(
            json.phone.toString(),
            json.city.toString(),
            json.address.toString(),
            json.pinCode.toString(),
            json.landmark.toString(),
            json.companyName.toString()
        );
    }
}
// example
// const jsonObject = {
//   
//         "phone": "+91-22-66600000",
//         "city": "Mumbai",
//         "address": "1402, 14th Floor, Tower B, Peninsula Business Park. Ganpatrao Kadam Marg",
//         "pinCode": "400 013",
//         "landmark": "Lower Parel (W)",
//         "companyName": "Zeus Systems Pvt. Ltd."
//     
// };

// const walkinAddress = WalkinAddressModel.fromJson(jsonObject);
// console.log(walkinAddress);