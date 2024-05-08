import {FormControl, FormGroup} from "@angular/forms";

export class Util{
  static createFormGroup(formControlModel: any): FormGroup {
    const group: any = {};
    Object.keys(formControlModel).forEach(key => {
      group[formControlModel[key].NAME] = new FormControl({
        value: formControlModel[key].VALUE || '',
        disabled: formControlModel[key].DISABLED
      }, formControlModel[key].VALIDATORS || []);
    });
    return new FormGroup(group);
  }
  static getDataFormSearch(group: FormGroup): any {
    const result = {};
    Object.keys(group.controls).forEach(key => {
      const val = group.controls[key].value;
      if (!(val == null || val === '' || val.length === 0)) {
        if (key === 'area') {
          const areaSelect = group.controls[key].value;
          // @ts-ignore
          result[key] = JSON.stringify(areaSelect.map(ard => ard.id));
        } else if (val instanceof Date) {
          // @ts-ignore
          result[key] = this.convertDateToTimeStamp(group.controls[key].value);
        } else if (Array.isArray(val)) {
          // @ts-ignore
          result[key] = JSON.stringify(val);
        } else {
          // @ts-ignore
          result[key] = val;
        }
      }
    });
    return result;
  }
  static convertDateToTimeStamp(date: Date): number {
    return date.getTime();
  }
  // @ts-ignore
  static checkExportFile(res, fileName) {
    const blob = new Blob([res], {type: 'application/octet-stream'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName + '.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
