import { FormGroup } from '@angular/forms';

export class GlobalClass {
  constructor() {}

  GetArrayFromCSV(csvText: string): any[] {
    var result: any[] = [];
    if (csvText != null && csvText != '') {
      let str = csvText.split(',').map((a) => a.trim());
      str.forEach((element) => {
        result.push(element);
      });
    }
    return result;
  }

  set_Value_From_Object_To_rForm(obj: any, rForm: FormGroup) {
    for (const fieldName in rForm.controls) {
      try {
        var control: any = rForm.get(fieldName);
        control.setValue(obj[fieldName]);
      } catch (exception) {
        console.log(exception);
      }
    }
  }

  set_Value_From_rForm_To_Object(rForm: FormGroup, obj: any) {
    for (const fieldName in rForm.controls) {
      var control: any = rForm.get(fieldName);
      obj[fieldName] = control.value;
    }
  }

  getCSVFromStringArray(strarray: any): string {
    var str_csv = '';
    str_csv = strarray.join(',');
    return str_csv;
  }
}
