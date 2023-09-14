import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileDto } from 'src/app/TypeDto/UploadFileDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private myClient: HttpClient) { }

    //This takes a file and return UploadFileDto
    public Upload(file: File): Observable<UploadFileDto> {
      // To send our data as a form data not a json
      var form = new FormData();
      form.append("file", file) //Like we did in post man the key is file and value is the image file itself
      console.log(file)
      return this.myClient.post<UploadFileDto>('https://localhost:7206/api/Assighment', form); //we will submit the form
    }
}
