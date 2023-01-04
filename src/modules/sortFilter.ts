export class SortFilter {
  selectEl: HTMLSelectElement;
  _value: string;

  constructor(sortSelectNode: HTMLSelectElement) {
    if (!sortSelectNode) console.error(`invalid searchFormNode: ${sortSelectNode}`);
    
    this.selectEl = sortSelectNode;
    this._value = this.selectEl.value;
  }

  get value() {
    return this._value;
  }

  set value(str) {
    if (typeof str !== 'string') return;
    this._value = str;
    this.selectEl.value = str;
  }

}
