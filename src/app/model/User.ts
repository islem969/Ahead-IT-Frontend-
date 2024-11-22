
import { civil_Status } from "./Civil_Status";
import { qualification } from "./Qualification";

export class User{
    id!: number;
    username!: string;
    firstName!: string;
    lastName!:string;
    email!:string;
    cin!:string;
    role!:string;
    registrationNumber!:string;
    phoneNumber!:string;
    password!:string;
    cnss!:string;
    sex!:string;
    bban!:string;
    leavebalance!:number;
    numberofchildren!:number;
    birthdate!:Date;
    hiringdate!:Date;
    leavebalancedate!:Date;
    salary!: number;
    token!: string;

    qualificationId!:number;
    qualification!:qualification;

    civil_StatusId!:number;
    civil_Status!:civil_Status;
    
}