import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

@Injectable()
export class ArticlesService {

  constructor(private http: Http) { }

  
  writeArticle(article) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/articles/write", article, { headers: headers })
      .map((res) => res.json());
  }
}
