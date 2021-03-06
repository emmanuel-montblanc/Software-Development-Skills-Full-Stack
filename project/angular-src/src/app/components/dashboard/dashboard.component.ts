import { Component, OnInit } from "@angular/core";
import { ArticlesService } from "app/services/articles.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "app/services/auth.service";
import { ValidateService } from "app/services/validate.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  articleList: any;
  commentText: String;
  writer: String;
  sorting: String = "date";

  constructor(
    private articleService: ArticlesService,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.loadUser();
    this.writer = this.authService.user.user;

    // Get all the articles from the DB
    this.articleService.getAllArticles().subscribe((data) => {
      if (data.success) {
        this.articleList = data.articleList;

        // Sort the articles by the number of comments if we clicked on sort by popularity
        if (this.sorting === "popularity") {
          this.articleList.sort((a, b) => {
            return b.comments.length - a.comments.length;
          });
        }

      } else {
        this.flashMessage.show("Could not load the articles" + data.success, {
          cssClass: "alert-danger",
          timeout: 3000,
        });
      }
    });
  }

  addComment(id) {
    const comment = {
      id: id,
      writer: this.writer,
      comment: this.commentText,
    };

    if (this.validateService.validateComment(comment)) {
      this.articleService.commentArticle(comment).subscribe((data) => {
        if (data.success) {
          this.flashMessage.show("Comment added", {
            cssClass: "alert-success",
            timeout: 3000,
          });
        } else {
          this.flashMessage.show("Could not add comment" + data.success, {
            cssClass: "alert-danger",
            timeout: 3000,
          });
        }
        this.ngOnInit();
      });
    } else {
      this.flashMessage.show("Type something to comment", {
        cssClass: "alert-danger",
        timeout: 3000,
      });
    }
  }

  sortByDate() {
    console.log("sortbydate");
    this.sorting = "date";
    this.ngOnInit();
  }

  sortByPopularity() {
    console.log("sortbypopularity");
    this.sorting = "popularity";
    this.ngOnInit();
  }
}
