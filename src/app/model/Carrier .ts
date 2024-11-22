import { civil_Status } from "./Civil_Status";
import { qualification } from "./Qualification";


export class Carrier{
    id!: number;
    salary!: number;
    bban!: number;
    from!: Date;
    to!: Date;
    rib!: number;
    createdAt!: Date;
    updatedAt!: Date;
    
    qualificationId?: number;
    qualification?: qualification;

    civil_StatusId?: number;
    civil_Status!:civil_Status;
}