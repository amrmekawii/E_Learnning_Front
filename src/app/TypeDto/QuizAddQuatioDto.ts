export class QuizAddQuationDto {
    header?: string;
    type?: number;
    quizId?: number;
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