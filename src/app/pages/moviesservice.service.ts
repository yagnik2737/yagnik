import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceBase } from 'src/app/global/base-class/service-base';

@Injectable({
  providedIn: 'root'
})
export class MoviesserviceService extends ServiceBase {
  private readonly defaultURL = "https://localhost:44386/api/";
  private readonly getAllStudentURL = 'https://localhost:44386/api/Movies/';
  private readonly getByIdURL = 'https://localhost:44386/api/Movies/';
  private readonly InsertUpdateStudentURL =  'https://localhost:44386/api/Movies/';
  private readonly DeleteStudentURL = "https://localhost:44386/api/Movies"
  constructor(private http: HttpClient) {
    super();
   }

   getMovieById(id: any) {
    return this.http.get(this.getByIdURL + `${id}`);
  }

  getAllMovie() {
      return this.http.get(this.getAllStudentURL);
  }

  InsertMovie(object: any) {
    return this.http.post(this.InsertUpdateStudentURL, object);
  }
  UpdateMovie(object: any) {
    return this.http.put(this.InsertUpdateStudentURL, object);
  }

  deleteMovie(id : any){
    return this.http.delete(this.DeleteStudentURL + '?movieID='+id);
  }
}
