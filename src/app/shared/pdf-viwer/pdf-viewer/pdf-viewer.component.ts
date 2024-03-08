import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Observable, from } from 'rxjs';
import { DetailBase } from 'src/app/global/base-class/Detail-base';
import { ButtonOptions } from 'src/app/global/helpers/utility-classes';
import * as $ from 'jquery';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent extends DetailBase implements OnInit {
  @ViewChild('pdfReportViewer') public pdfReportViewer;
  pdfName: string = '';
  pdfSrc: string = '';

  constructor(public spin: NgxSpinnerService) {
    super(spin);
    $('body').find('.dx-loadpanel-wrapper').css('z-index', '1505');
  }
  ngOnInit(): void {
    this.initPopupToolbarItems();
  }
  ngAfterViewInit() {
    this.viewReport();
  }

  popupToolbarItems: Array<any> = [];
  private initPopupToolbarItems(): void {
    this.popupToolbarItems = super.getTrowserToolbarItems(
      new ButtonOptions('', false, null),
      new ButtonOptions(
        'Cancel',
        true,
        this.onBtnCancelClick,
        this.isDataProcessing
      ),
      new ButtonOptions('', false, null, this.isDataProcessing),
      new ButtonOptions('', false, null, this.isDataProcessing),
      new ButtonOptions('', false, null, this.isDataProcessing),
      new ButtonOptions('', false, null, this.isDataProcessing)
    );
  }

  public viewReport() {
    var base64 = this.pdfSrc.replace('data:application/pdf;base64,', '');
    this.pdfReportViewer.pdfSrc = this.base64toBlob(base64, 'application/pdf');
    this.pdfReportViewer.downloadFileName = this.pdfName;
    this.pdfReportViewer.refresh();
    super.ToggleLoadingPanel(false);
    this.popupVisible = true;
  }

  private base64toBlob(base64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  onBtnCancelClick = () => {
    this.popupVisible = false;
  };
}
