export class AddAssighmentDto {
    filePath?: string;
    header?: string;
    modelAnswerFilePath?: string;
    classid?: number
}


export class DeleteAssighmentDto{
    id?:number;
    name?:string
}