import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/global/services/user-profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username: any;
  constructor(private userprofileser: UserProfileService) {}
  ngOnInit(): void {
    this.username = [this.userprofileser.UserName, this.userprofileser.Role];
  }
}
