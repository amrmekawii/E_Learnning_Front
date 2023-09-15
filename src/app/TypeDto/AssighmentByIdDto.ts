export interface AssignmentByIdDto {
    id: number;
    filePath: string;
    header: string;
    modelAnswerFilePath: string;
    classid: number;
    updatedBy: string;
    updatedat: string;
    userAssighments: any[];
}