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
    getAnswersDtos: GetAnswersDto[] = [];
}

export class GetQustionWithAnswersDto {
    quizid: number | null = null;
    quizHeader: string | null = null;
    quizType: QuizType | null = null;
    getQuestionsDtos: GetQuestionsDto[] = [];
}

export class UpdateQuestionsDto {
    id?: number ;
    header: string | null = null;
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
