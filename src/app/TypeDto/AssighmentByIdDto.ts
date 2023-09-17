import { UserAssighmentDto } from "./AssighmentsUserDto";

export class AssignmentByIdDto {
    id?: number;
    filePath?: string;
    header?: string;
    modelAnswerFilePath?: string;
    classid?: number;
    updatedBy?: string;
    updatedat?: string;
    userAssighments: UserAssighmentDto[]=[];
}