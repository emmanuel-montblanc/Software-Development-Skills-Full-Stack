import { Component, OnInit } from "@angular/core";
import { ValidateService } from "app/services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "app/services/auth.service";
import { Router } from "@angular/router";
import { ArticlesService } from "app/services/articles.service";

@Component({
  selector: "app-write",
  templateUrl: "./write.component.html",
  styleUrls: ["./write.component.css"],
})
export class WriteComponent implements OnInit {
  title: String;
  bodytext: String;
  writer: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private articleService: ArticlesService
  ) {}

  ngOnInit() {
    this.authService.loadUser();
    this.writer = this.authService.user.user;
  }

  onRegisterSubmit() {
    const article = {
      title: this.title,
      bodytext: this.bodytext,
      writer: this.writer
    };

    console.log(article)
    // Checks required fields
    if (!this.validateService.validateArticle(article)) {
      this.flashMessage.show('Please fill in all the fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // write article to the DB
    this.articleService.writeArticle(article).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Article writen', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      }else{
        this.flashMessage.show('Something went wrong' + data.success, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/write']);
      }
    })
  }
}
