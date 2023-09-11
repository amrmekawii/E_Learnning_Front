import { UserClassDTO } from "src/app/TypeDto/UserClassDTO";

export class UserYearDTO {
    id: number | null = 0;
    name: string | null = null;
    classes: UserClassDTO[] | null = null;
}