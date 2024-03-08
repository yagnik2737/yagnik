import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  DxButtonModule,
  DxLoadPanelModule,
  DxDataGridModule,
  DxTemplateModule,
  DxToolbarModule,
  DxDrawerModule,
  DxScrollViewModule,
  DxTreeViewModule,
  DevExtremeModule,
  DxDropDownBoxModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxContextMenuModule,
  DxTabsModule,
  DxFormModule,
  DxPopupModule,
  DxResponsiveBoxModule,
  DxNumberBoxModule,
  DxRadioGroupModule,
  DxListModule,
  DxTreeListModule,
  DxFileUploaderModule,
  DxTextBoxModule,
  DxTagBoxModule,
  DxTextAreaModule,
  DxDateBoxModule,
  DxValidatorModule,
  DxValidationGroupModule,
  DxColorBoxModule,
  DxSwitchModule,
  DxTabPanelModule,
} from 'devextreme-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPanelComponent } from './layout/user-panel/user-panel.component';
import { UserHomeComponent } from './layout/user-home/user-home.component';
import { SystemStateService } from './global/helpers/system-state.service';
import { ScreenService } from './global/services/screen.service';
import { UserProfileService } from './global/services/user-profile.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GridListHelper } from './global/helpers/GridListHelper';

import { AdreessService } from './global/services/adreess.service';
import { GlobalClass } from './global/helpers/globalClass';
import { CustomDialogHelper } from './global/helpers/custom-dialog.helper';
import { PdfViewerComponent } from './shared/pdf-viwer/pdf-viewer/pdf-viewer.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { SystemSpinnerComponent } from './shared/system-spinner/system-spinner.component';
import { HomeComponent } from './shared/home/home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { CreateMovieComponent } from './pages/create-movie/create-movie.component';
import { ListMovieComponent } from './pages/list-movie/list-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    UserPanelComponent,
    UserHomeComponent,
    PdfViewerComponent,
    SystemSpinnerComponent,
    HomeComponent,
    CreateMovieComponent,
    ListMovieComponent,
  ],
  imports: [
    DevExtremeModule,
    CommonModule,
    FormsModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxButtonModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxContextMenuModule,
    DxFormModule,
    DxPopupModule,
    // NgApexchartsModule,
    DxScrollViewModule,
    DxResponsiveBoxModule,
    DxNumberBoxModule,
    DxRadioGroupModule,
    DxListModule,
    DxTreeListModule,
    DxFileUploaderModule,
    DxTextBoxModule,
    DxTagBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxTreeViewModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxColorBoxModule,
    DxSwitchModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    DxToolbarModule,
    // DxFileUploaderModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxLoadPanelModule,
    // DxHtmlEditorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    // EmailEditorModule,
    // NgApexchartsModule,
    PdfJsViewerModule,
    // NgxDropzoneModule,
    // NgxQRCodeModule,
    NgxTypedJsModule,
  ],
  providers: [
    SystemStateService,
    ScreenService,
    UserProfileService,
    GridListHelper,
    AdreessService,
    GlobalClass,
    CustomDialogHelper,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
