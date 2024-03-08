import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import dxTreeList from 'devextreme/ui/tree_list';
import { NavigationEnd, Router } from '@angular/router';
import { DxScrollViewComponent } from 'devextreme-angular';
import { ScreenService } from 'src/app/global/services/screen.service';
import { CustomDialogHelper } from 'src/app/global/helpers/custom-dialog.helper';
import { UserProfileService } from 'src/app/global/services/user-profile.service';
import { ComponentHelper } from 'src/app/global/helpers/component.helper';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent {
  title = 'Movies';
  @ViewChild('componentContainer', { static: false, read: ViewContainerRef })
  componentContainer: ViewContainerRef;

  user: any;
  menuOpened: boolean;
  selectedRoute = '';
  menuItems: any = [
    {
      text: 'Change Password',
      icon: 'fa fa-lock',
      onClick: () => {
        this.showChangePassword();
      },
    },
    {
      text: 'Send Message',
      icon: 'fa fa-paper-plane',
      onClick: () => {
        // this.onSendMessageBusttonClick();
      },
    },
    {
      text: 'Logout',
      icon: 'arrowright',
      onClick: () => {
        this.logout();
      },
    },
  ];
  @ViewChild(DxScrollViewComponent, { static: true })
  scrollView: DxScrollViewComponent;

  constructor(
    private screen: ScreenService,
    private router: Router,
    private userProfileService: UserProfileService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    // dxTreeList.defaultOptions({
    //   options: {
    //     loadPanel: null,
    //     showRowLines: true,
    //     hoverStateEnabled: true,
    //     allowColumnResizing: true,
    //     showColumnLines: true,
    //     showBorders: false,
    //     keyExpr: 'id',
    //     parentIdExpr: 'parentId',
    //     scrolling: {
    //       mode: 'standard',
    //     },
    //     paging: {
    //       enabled: false,
    //     },
    //   },
    // });
  }

  ngOnInit(): void {
    this.menuOpened = this.screen.sizes['screen-large'];
    this.screen.changed.subscribe(() => this.updateDrawer());
    setTimeout(() => {
      this.selectedRoute = this.router.url.split('?')[0];
    }, 1000);

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.selectedRoute = val.urlAfterRedirects.split('?')[0];
      }
    });

    this.updateDrawer();
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.menuMode = isLarge ? 'shrink' : 'overlap';
    this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    this.minMenuSize = isXSmall ? 0 : 68;
    this.shaderEnabled = !isLarge;
  }

  toggleMenu = () => {
    this.menuOpened = !this.menuOpened;
  };

  private logout() {
    CustomDialogHelper.confirm('Do you want to sign out?')
      .show()
      .done((popupReuslt) => {
        if (popupReuslt) {
          this.userProfileService.logout();
        }
      });
  }

  get showMenuAfterClick() {
    return !this.menuOpened;
  }

  menuMode = 'shrink';
  menuRevealMode = 'expand';
  minMenuSize = 0;
  shaderEnabled = false;

  navigationChanged(event) {
    const path = event.itemData.path;
    const pointerEvent = event.event;

    if (path && this.menuOpened) {
      if (event.node.selected) {
        pointerEvent.preventDefault();
      } else {
        this.router.navigate([path]);
        this.scrollView.instance.scrollTo(0);
      }

      if (this.hideMenuAfterNavigation) {
        // this.temporaryMenuOpened = false;
        this.menuOpened = false;
        pointerEvent.stopPropagation();
      }
    } else {
      pointerEvent.preventDefault();
    }
  }

  get hideMenuAfterNavigation() {
    return this.menuMode === 'overlap' || this.hideMenuAfterNavigation;
  }

  navigationClick() {
    if (this.showMenuAfterClick) {
      this.menuOpened = true;
    }
  }

  showChangePassword = () => {
    
  };
}
