import { dayhour } from "../Components/Lecture/add-user-access/add-user-access.component";


export class AddUserAccessDto {
    userId?: string;
    lectureId?: number;
    quizrequird?: boolean;
    duration?: number;
    accessType?: number;
    DayOrHour:dayhour=  dayhour.day ;

  }