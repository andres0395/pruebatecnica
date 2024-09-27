import { User } from "./user.interface"
export interface Tasks{
  title: string;
  dateLimit: string | Date;
  personsAsociate:User[] | any[];
  completed:boolean;
  id?:number;
  userId?:number;
}
