import { Component, OnInit } from "@angular/core";
import { ValidateService } from "app/services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "app/services/auth.service";
import { Router } from "@angular/router";

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
    private router: Router
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

    //Register user
    // this.authService.registerUser(user).subscribe(data => {
    //   if(data.success){
    //     this.flashMessage.show('You are now registered and can login', {cssClass: 'alert-success', timeout: 3000});
    //     this.router.navigate(['/login']);
    //   }else{
    //     this.flashMessage.show('Something went wrong' + data.success, {cssClass: 'alert-danger', timeout: 3000});
    //     this.router.navigate(['/register']);
    //   }
    // });

  }
}
