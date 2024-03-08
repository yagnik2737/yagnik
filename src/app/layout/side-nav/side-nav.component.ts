import {
  Component,
  EventEmitter,
  Input,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxTreeViewComponent } from 'devextreme-angular';
import * as events from 'devextreme/events';
import { navigation } from './app-navigation';
import { SystemStateService } from 'src/app/global/helpers/system-state.service';
import { UserProfileService } from 'src/app/global/services/user-profile.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @ViewChild(DxTreeViewComponent, { static: true }) menu: DxTreeViewComponent;

  @Output()
  selectedItemChanged = new EventEmitter<string>();
  @Output()
  openMenu = new EventEmitter<any>();

  constructor(
    private elementRef: ElementRef,
    private userprofileSer: UserProfileService
  ) {}

  ngOnInit() {}

  private _menus;
  get menus() {
    if (!this._menus) {
      this._menus = navigation
    }
    return this._menus;
  }

  private _selectedItem: String;

  @Input()
  set selectedItem(value: String) {
    this._selectedItem = value;
    if (!this.menu.instance) {
      return;
    }
    this.menu.instance.unselectAll();
    this.menu.instance.selectItem(value);
    if (this.menu.instance.getSelectedNodeKeys().length > 0)
      this.menu.instance.expandItem(value);
  }

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;

    if (!this.menu.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this._selectedItem);
    }
  }

  onItemClick(event) {
    this.selectedItemChanged.emit(event);
  }

  async ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e) => {
      this.openMenu.next(e);
    });
  }
}
