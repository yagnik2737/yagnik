import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonOptions } from '../helpers/utility-classes';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomDialogHelper } from '../helpers/custom-dialog.helper';
import { FormGroup } from '@angular/forms';

@Component({
  template: '',
})
export abstract class DetailBase {
  popupHeight;
  popupWidth;
  constructor(public spinner: NgxSpinnerService) {
    this.popupWidth = 800;
    this.popupHeight = 400;
  }

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

  isFormValid(rForm: FormGroup): boolean {
    if (rForm.valid) {
      return true;
    } else {
      return false;
    }
  }
  @Output() popupHiddenEvent = new EventEmitter<any>();
  public isEditMode = false;
  public cnmActionsVisible = false;
  public popupTitle;
  public isDataSaved = false;
  public popupVisible = false;
  public minWidth = 325;
  public minHeight = 253;

  protected isChangesDiscarded = false;
  public isDataProcessing = false;

  public showAnimation = {
    type: 'slideIn',
    direction: 'top',
  };

  public hideAnimation = {
    type: 'slideOut',
    direction: 'top',
  };

  public dtsGender: any = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Other' },
  ];

  public dtsStudBloodGp: any = [
    { id: 1, name: 'A+' },
    { id: 2, name: 'A-' },
    { id: 3, name: 'B+' },
    { id: 4, name: 'B-' },
    { id: 5, name: 'O+' },
    { id: 6, name: 'AB+' },
    { id: 7, name: 'AB-' },
  ];

  protected getTrowserToolbarItems(
    btnActionsOptions: ButtonOptions,
    btnCancelOptions: ButtonOptions,
    btnRefreshOptions: ButtonOptions,
    btnSaveOptions: ButtonOptions,
    btnSaveAndNewOptions: ButtonOptions,
    btnSaveAndDoneOptions: ButtonOptions
  ) {
    const items: any[] = [
      {
        toolbar: 'top',
        location: 'after',
        widget: 'dxButton',
        visible: btnActionsOptions.visible,
        disabled: btnActionsOptions.disabled,
        options: {
          type: 'default',
          icon: 'fa fa-caret-down',
          text: 'Actions',
          rtlEnabled: true,
          elementAttr: { id: 'btnActions bg-primary' },
          onClick:
            btnActionsOptions.onClickHandler === null
              ? () => {
                  this.cnmActionsVisible = true;
                }
              : btnActionsOptions.onClickHandler,
        },
      },
      {
        toolbar: 'bottom',
        location: 'before',
        widget: 'dxButton',
        locateInMenu: 'auto',
        visible: btnCancelOptions.visible,
        disabled: btnCancelOptions.disabled,
        options: {
          text: btnCancelOptions.text !== '' ? btnCancelOptions.text : 'Cancel',
          elementAttr: { class: 'd-round-button ' },
          onClick:
            btnCancelOptions.onClickHandler == null
              ? () => {
                  this.popupVisible = false;
                }
              : btnCancelOptions.onClickHandler,
        },
      },
      {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        locateInMenu: 'auto',
        visible: btnRefreshOptions.visible,
        disabled: btnRefreshOptions.disabled,
        options: {
          text:
            btnRefreshOptions.text !== '' ? btnRefreshOptions.text : 'Refresh',
          type: 'success',
          elementAttr: { class: 'd-round-button' },
          onClick: btnRefreshOptions.onClickHandler,
        },
      },
      {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        locateInMenu: 'auto',
        visible: btnSaveOptions.visible,
        disabled: btnSaveOptions.disabled,
        options: {
          useSubmitBehavior: true,
          icon: 'save',
          text: btnSaveOptions.text !== '' ? btnSaveOptions.text : 'Save',
          elementAttr: { class: 'd-round-button' },
          onClick: btnSaveOptions.onClickHandler,
        },
      },
      {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        locateInMenu: 'auto',
        visible: btnSaveAndNewOptions.visible,
        disabled: btnSaveAndNewOptions.disabled,
        options: {
          useSubmitBehavior: false,
          type: 'default',
          elementAttr: { class: 'd-round-button' },
          onClick: btnSaveAndNewOptions.onClickHandler,
          text:
            btnSaveAndNewOptions.text !== ''
              ? btnSaveAndNewOptions.text
              : 'Save and New',
        },
      },
      {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        locateInMenu: 'never',
        visible: btnSaveAndDoneOptions.visible,
        disabled: btnSaveAndDoneOptions.disabled,
        options: {
          text:
            btnSaveAndDoneOptions.text !== ''
              ? btnSaveAndDoneOptions.text
              : 'Save and Done',
          type: 'default',
          elementAttr: { class: 'd-round-button' },
          onClick: btnSaveAndDoneOptions.onClickHandler,
        },
      },
    ];

    return items;
  }

  public onPopupHidden(e) {
    this.popupHiddenEvent.emit();
    this.setScrollDisplayStatus();
  }

  protected setScrollDisplayStatus() {
    const hasShownPopup = $('body div').hasClass('d-con-popup');
    hasShownPopup
      ? $('body').css({ overflow: 'hidden' })
      : $('body').css({ overflow: 'auto' });
  }

  protected confirmUnsavedChanges(
    saveCallbackFn: any = null,
    unsavedCallbackFn: any = null,
    cancelCallbackFn: any = null
  ) {
    CustomDialogHelper.unsavedChangesConfirm()
      .show()
      .done((popupResult) => {
        const unsavedConfirmResult = sessionStorage.getItem(
          'unsavedConfirmResult'
        );
        if (
          unsavedConfirmResult &&
          popupResult &&
          unsavedConfirmResult === 'Save'
        ) {
          sessionStorage.removeItem('unsavedConfirmResult');
          saveCallbackFn();
        } else if (!unsavedConfirmResult && popupResult) {
          unsavedCallbackFn();
        } else if (!popupResult) {
          if (cancelCallbackFn !== null) {
            cancelCallbackFn();
          }
        }
      });
  }
}
