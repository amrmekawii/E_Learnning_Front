import { UserClassDTO } from "src/app/TypeDto/UserClassDTO";

export class UserYearDTO {
    id?: Number;
    name?: string | null ;
    classes?: UserClassDTO[] | null = null;
}