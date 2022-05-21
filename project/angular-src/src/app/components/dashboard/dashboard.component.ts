import { Component, OnInit } from "@angular/core";
import { ArticlesService } from "app/services/articles.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  articleList: any;

  constructor(
    private articleService: ArticlesService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {

    // Get all the articles from the DB
    this.articleService.getAllArticles().subscribe((data) => {
      if (data.success) {
        this.articleList = data.articleList;
        console.log(this.articleList)
      } else {
        this.flashMessage.show("Could not load the articles" + data.success, {
          cssClass: "alert-danger",
          timeout: 3000,
        });
      }
    });
  }
}
