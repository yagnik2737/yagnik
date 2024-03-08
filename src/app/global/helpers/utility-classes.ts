export class Action {
  constructor(
    public code: string,
    public text: string,
    public hasRight: boolean = true,
    public icon: string = '',
    public visible: boolean = true,
    public getVisibleStatus: (data?: any) => boolean = () => true,
    public disabled: boolean = false,
    public items: Action[] = [],
    public template: any = null,
    public closeMenuOnClick: boolean = true,
    public getText?: (data?: any) => any,
    public selected: boolean = false,
    public data: any = null
  ) {}
}

export class ButtonOptions {
  constructor(
    public text: string = '',
    public visible: boolean = true,
    public onClickHandler: () => void = null,
    public disabled: boolean = false,
    public onInitializedHandler: (ev) => void = null,
    public elementAttr: any = null
  ) {}
}

export class DropDownListOptions {
  constructor(
    public width: number,
    public items: any[],
    public valueExpr,
    public displayExpr,
    public value,
    public valueChangedHandler: (args) => void = null,
    public initializedHandler: (e) => void = null,
    public visible: boolean = true
  ) {}
}
