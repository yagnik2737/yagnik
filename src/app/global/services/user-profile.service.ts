import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private router:Router) {}

  private _Role: string;
  set Role(Role: string) {
    this._Role = Role;
    sessionStorage.setItem('userRole', String(Role));
  }

  get Role() {
    var role = sessionStorage.getItem('userRole');
    if (role) {
      return role;
    }
    return this._Role;
  }

  private _RoleId: string;
  set RoleId(RoleId: string) {
    this._RoleId = RoleId;
    sessionStorage.setItem('userRoleId', String(RoleId));
  }

  get RoleId() {
    var role = sessionStorage.getItem('userRoleId');
    if (role) {
      return role;
    }
    return this._RoleId;
  }

  private _UserName: string;
  set UserName(UserName: string) {
    this._UserName = UserName;
    sessionStorage.setItem('UserName', String(UserName));
  }

  get UserName() {
    var Username = sessionStorage.getItem('UserName');
    if (Username) {
      return Username;
    }
    return this._UserName;
  }

  private _Image: string;
  set Image(image: string) {
    this._Image = image;
    sessionStorage.setItem('UserImage', String(image));
  }
  public logout() {
    // localStorage.removeItem("isRememberMe");
    // localStorage.clear();
    // sessionStorage.clear();
    sessionStorage.clear();
    // sessionStorage.removeItem("loggedIn");
    // sessionStorage.removeItem("isSessionExpired");
    // sessionStorage.removeItem("roleId");
    // sessionStorage.removeItem("userId");
    // sessionStorage.removeItem("role");
    // sessionStorage.removeItem("loginId");
    // sessionStorage.removeItem("userName");
    this.router.navigate(['/login']);

}

  get Image() {
    var image = sessionStorage.getItem('UserImage');
    if (image) {
      return image;
    }
    return this._Image;
  }

  private _UserId: string;
  set UserId(id: string) {
    this._UserId = id;
    sessionStorage.setItem('UserId', String(id));
  }

  get UserId() {
    var id = sessionStorage.getItem('UserId');
    if (id) {
      return id;
    }
    return this._UserId;
  }

}
