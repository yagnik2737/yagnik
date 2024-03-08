import { Component, Input, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/global/services/user-profile.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
  username: string;
  role: string;
  constructor(private userprofileser: UserProfileService) {}
  ngOnInit(): void {
    this.username = this.userprofileser.UserName;
    this.role = this.userprofileser.Role;
  }
  @Input()
  menuItems: any;

  @Input()
  menuMode: string;

  @Input()
  user: { email: string };
}
