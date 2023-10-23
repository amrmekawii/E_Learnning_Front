export class GetAnswersDto {
    questionID: number | null = null;
    answerID: number | null = null;
    right: boolean | null = null;
    header: string | null = null;
}

export class GetQuestionsDto {
    quizid: number | null = null;
    questionID: number | null = null;
    questionType: QuestionType | null = null;
    questionHeader: string | null = null;
    grade : any;
    getAnswersDtos: GetAnswersDto[] = [];
}

export class GetQustionWithAnswersDto {
    quizid: number | null = null;
    quizHeader: string | null = null;
    quizType: QuizType | null = null;
    quizGrade:any ; 
    getQuestionsDtos: GetQuestionsDto[] = [];
}
export class GetQuizToSolveDto {
    start?: Date;
    end?: Date;
    quiestions?:GetQustionWithAnswersDto
  }
export class UpdateQuestionsDto {
    id?: number ;
    header: string | null = null;
    Grade: any ; 
    answerDTOs: UpdateAnswersDto[] = [];
}
export class UpdateAnswersDto {
    id: number | null = null;
    right: boolean | null = null;
    header: string | null = null;
}
export enum QuizType {
    month,
    lecture
}

export enum QuestionType {
    text, Image
}


export class CheckQuizIssolvedDto{
    userid?: string
  quizid?: number
}


export class SubmitQuizDto {
    quizid: number = 0;
    userid: string = '';
    userAnswerDtos: UserAnswerDto[] = [];
}
export class UserAnswerDto {
    questionId: number = 0;
    answerID: number = 0
}

export class QuizResult {
    colEfected: number = 0;
    numberOfQuestions: number = 0;
    userGrade: number = 0;
}


export class GetUserQuizAnswersDto {
    quizHeader?: string;
    grade?: string;
    answers: Answers[] = [];
  }
  
  export class Answers {
    answerType?: string;
    questionHeader?: string;
    questionType?: QuestionType;
    rightAnswer?: string;
    wrongAnswer?: string;
  }
  

  export class UserQuizDto {
    username?: string;
    quizname?: string;
    quizGrade?: number;
    quizId?:number
  }

  export class QuizMonthInfoDto {
    quizid?: number;
    header?: string;
    start?: Date;
    end?: Date;
    Type?: QuizType;
  }
  