export class SearchFilter {
  inputEl: HTMLInputElement;
  submitBtn: HTMLButtonElement;
  _value: string;

  constructor(searchFormNode: HTMLElement) {
    if (!searchFormNode) console.error(`invalid searchFormNode: ${searchFormNode}`);
    
    this.inputEl = searchFormNode.querySelector('.search-filter__input')!;
    this.submitBtn = searchFormNode.querySelector('.search-filter__submit-btn')!;
    this._value = this.inputEl.value;
  }

  get value() {
    return this._value;
  }

  set value(str) {
    if (typeof str !== 'string') return;
    this._value = str;
    this.inputEl.value = str;
  }

}
