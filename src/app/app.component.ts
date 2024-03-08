import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import dxDataGrid from 'devextreme/ui/data_grid';
import dxPopup from 'devextreme/ui/popup';
import * as $ from 'jquery';
import { ScreenService } from './global/services/screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes)
      .filter((cl) => this.screen.sizes[cl])
      .join(' ');
  }
  constructor( private screen: ScreenService) {
    dxDataGrid.defaultOptions({
      options: {
        loadPanel: null,
        wordWrapEnabled: false,
        showRowLines: true,
        rowAlternationEnabled: true,
        hoverStateEnabled: true,
        allowColumnResizing: true,
        showColumnLines: false,
        columnHidingEnabled: true,
        showBorders: false,
        allowColumnReordering: true,
        columnAutoWidth: true,
        columnResizingMode: 'widget',
        width: '100%',
        keyExpr: 'id',
        columnChooser: {
          enabled: true,
        },
        filterRow: {
          visible: true,
        },
        headerFilter: {
          visible: true,
        },
        // paging: {
        //   pageSize: 100,
        // },
        // pager: {
        //   visible:true,
        //   showPageSizeSelector: true,
        //   allowedPageSizes: [25, 50, 75, 100]
        // }
      },
    });

    dxPopup.defaultOptions({
      options: {
        onShowing: () => {
          $('body').css({ overflow: 'hidden' });
        },
        onHiding: () => {
          const hasShownPopup = $('body div').hasClass('d-con-popup');
          if (!hasShownPopup) {
            $('body').css({ overflow: 'auto' });
          }
        },
      },
    });
  }

 

 
}
