export interface AddUserAccessDto {
    userId: string;
    lectureId: number;
    quizRequired: boolean;
    duration: number;
    accessType: number;
  }