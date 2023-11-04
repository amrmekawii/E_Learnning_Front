export class QuizAddQuationDto {
    header?: string;
    type?: number;
    quizId?: number;
    grade ? :any;
    answerDTOs: AnswerDTO[]=[];
  }
  
  export class AnswerDTO {
    header?: string;
    rightAnswer?: boolean;
  }
  

  export class QuizAddAnswerDto {
    questionid?: number;
    header?: string;
    rightAnswer?: boolean;
  }