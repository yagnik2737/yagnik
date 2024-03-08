import { ButtonOptions, DropDownListOptions } from './utility-classes';
import * as $ from 'jquery';
import * as _ from 'lodash';

export class GridListHelper {
  public getListGrdToolbarItems(
    isModal: boolean,
    e: any,
    btnRefreshOptions?: ButtonOptions,
    btnBatchActionsOptions?: ButtonOptions,
    ddlArchiveOptions?: DropDownListOptions,
    customsTarget?: string,
    ddlAddslnOption: DropDownListOptions = null,
    btnOpenFormOptions?: ButtonOptions
  ) {
    e.toolbarOptions.items.unshift(
      {
        location: 'before',
        visible:
          btnBatchActionsOptions == null
            ? false
            : btnBatchActionsOptions.visible,
        template: () => {
          return '<span class="fas fa-level-down-alt d-batch-guide"></span>';
        },
      },
      {
        location: 'before',
        widget: 'dxButton',
        locateInMenu: 'auto',
        visible:
          btnBatchActionsOptions == null
            ? false
            : btnBatchActionsOptions.visible,
        options:
          btnBatchActionsOptions == null
            ? {}
            : {
                elementAttr: this.getBatchActionsElementAttr(
                  isModal,
                  customsTarget
                ),
                icon: 'fa fa-caret-down',
                text: 'Batch actions',
                rtlEnabled: true,
                onClick: btnBatchActionsOptions.onClickHandler,
              },
      },
      {
        location: 'before',
        widget: 'dxSelectBox',
        locateInMenu: 'auto',
        visible: ddlArchiveOptions == null ? false : ddlArchiveOptions.visible,
        showText: 'always',
        options:
          ddlArchiveOptions == null
            ? {}
            : {
                elementAttr: { class: 'd-round-border' },
                width: ddlArchiveOptions.width,
                items: ddlArchiveOptions.items,
                valueExpr: ddlArchiveOptions.valueExpr,
                displayExpr: ddlArchiveOptions.displayExpr,
                dropDownButtonTemplate: () => {
                  return $(
                    $('<div>', { class: 'd-dropdown-arrow' }).append(
                      $('<i>', {
                        class: 'fa fa-caret-down',
                      })
                    )
                  );
                },
                value: ddlArchiveOptions.value,
                onValueChanged: ddlArchiveOptions.valueChangedHandler,
                onInitialized: ddlArchiveOptions.initializedHandler,
              },
      },
      {
        location: 'after',
        widget: 'dxButton',
        locateInMenu: 'auto',
        showText: 'inMenu',
        visible: btnRefreshOptions == null ? false : true,
        options:
          btnRefreshOptions == null
            ? {}
            : {
                icon: 'refresh',
                hint: 'Refresh',
                text: 'Refresh',
                focusStateEnabled: false,
                onClick: btnRefreshOptions.onClickHandler,
              },
      },
      {
        location: 'before',
        widget: 'dxSelectBox',
        locateInMenu: 'auto',
        visible: ddlAddslnOption == null ? false : ddlAddslnOption.visible,
        showText: 'always',
        options:
          ddlAddslnOption == null
            ? {}
            : {
                elementAttr: { class: 'd-round-border' },
                width: ddlAddslnOption.width,
                items: ddlAddslnOption.items,
                valueExpr: ddlAddslnOption.valueExpr,
                displayExpr: ddlAddslnOption.displayExpr,
                dropDownButtonTemplate: () => {
                  return $(
                    $('<div>', { class: 'd-dropdown-arrow' }).append(
                      $('<i>', {
                        class: 'fa fa-caret-down',
                      })
                    )
                  );
                },
                value: ddlAddslnOption.value,
                onValueChanged: ddlAddslnOption.valueChangedHandler,
                onInitialized: ddlAddslnOption.initializedHandler,
              },
      },
      {
        location: 'before',
        locateInMenu: 'auto',
        showText: 'inMenu',
        visible: true,
        text: customsTarget,
      }
    );
  }

  private getBatchActionsElementAttr(isModal: boolean, customsTarget?: string) {
    if (customsTarget) {
      return { id: customsTarget, class: 'd-round-border d-bold-boder' };
    } else {
      if (isModal) {
        return {
          id: 'btnModalBatchActions',
          class: 'd-round-border d-bold-boder ',
        };
      } else {
        return { id: 'btnBatchActions', class: 'd-round-border d-bold-boder' };
      }
    }
  }

  public onDoubleClick(
    e: any,
    AnchorId: string = '',
    callbackFn: any = null
  ): void {
    const component = e.component;
    if (!component.clickCount) {
      component.clickCount = 1;
    } else {
      component.clickCount = component.clickCount + 1;
    }
    if (!component.lastRowClickedId) {
      component.lastRowClickedId = e.rowIndex;
    }
    if (component.clickCount === 1) {
      component.lastClickTime = new Date();
      setTimeout(() => {
        component.lastClickTime = 0;
        component.clickCount = 0;
        component.lastRowClickedId = undefined;
      }, 200);
    } else if (
      component.clickCount === 2 &&
      e.rowIndex === component.lastRowClickedId
    ) {
      const now: any = new Date();
      if (now - component.lastClickTime < 200) {
        if (AnchorId !== '') {
          $('#' + AnchorId + '-' + e.data.id).click();
        } else {
          $('#btnMainAction-' + e.data.id).click();
        }
        if (callbackFn) {
          callbackFn();
        }
      }
      component.clickCount = 0;
      component.lastClickTime = 0;
      component.lastRowClickedId = undefined;
    }
  }
}
