import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { throwError } from "rxjs";

@Injectable()
export class HomeService {

  constructor(private http: Http) { }

  load(name:string){
    return this.http.get("https://api.github.com/users/"+name);
  }

  handleErrors(error: Response){
    return throwError(error);
  }
}
