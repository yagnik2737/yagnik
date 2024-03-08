import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';

export class ListBase {
  public isDataProcessing: boolean = false;
  public ddlArchiveInstance: any = null;
  public selectedState: any = 0;
  constructor(public spinner: NgxSpinnerService) {}

  ToggleLoadingPanel(Position: boolean) {
    if (Position) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }

  TogglegridLoadingPanel(Position: boolean) {
    if (Position) {
      this.spinner.show('grdspinner');
    } else {
      this.spinner.hide('grdspinner');
    }
  }
  public dtsRoles = [
    {
      id: 1,
      role: 'Administrator',
    },
    {
      id: 4,
      role: 'Teacher',
    },
    {
      id: 3,
      role: 'Student',
    },
    {
      id: 2,
      role: 'Clerk',
    },
  ];

  getRoleNameBYID(id) {
    var rolname;
    this.dtsRoles.forEach((ele) => {
      if (ele.id == id) {
        rolname = ele.role;
      }
    });
    return rolname;
  }

  protected ondropInit = (e: any) => {
    this.ddlArchiveInstance = e.component;
    console.log(e.component);
  }

  public onTileClick (tile) {
   console.log(this.ddlArchiveInstance.option('items'));

    if (this.ddlArchiveInstance && this.selectedState !== tile) {
      if (this.ddlArchiveInstance.option('items').find(x => x.value === tile)) {
        this.ddlArchiveInstance.option('value', tile);
      }
    }
  }

  onExporting(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Vision.xlsx');
      });
    });
  }
}
