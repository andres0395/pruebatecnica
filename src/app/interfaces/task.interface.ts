import { User } from "./user.interface"
export interface Tasks{
  title: string;
  dateLimit: string | Date;
  personsAsociate:User[]| [];
  completed:boolean;
  id?:number;
  userId?:number;
}
