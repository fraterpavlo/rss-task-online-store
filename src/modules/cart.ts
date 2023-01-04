import { localStorageKeys } from "./common/localStorageKeys";

export class Cart {
  indicator: HTMLOutputElement;
  cartContains: string[];

  constructor(cartNode: HTMLElement) {
    if (!cartNode) throw Error('cartNode not found');
    this.indicator = cartNode.querySelector('.header__cart-indicator')!;
    if (!this.indicator) throw Error('indicator not found');

    this.cartContains = this.initCartContains();
    this.indicator.textContent = this.cartContains.length.toString();
  }

  initCartContains() {
    let cartContains;
    localStorage.getItem(localStorageKeys.cartContains)
      ? (cartContains = JSON.parse(localStorage[localStorageKeys.cartContains]))
      : (cartContains = []);

    return cartContains;
  }

  setContainsValue() {
    this.indicator.textContent = this.cartContains.length.toString();
    localStorage.setItem(localStorageKeys.cartContains, JSON.stringify(this.cartContains));
  }

  uploadCartContains(itemId: string) {
    const indexOf = this.cartContains.indexOf(itemId);

    indexOf !== -1
      ? this.cartContains.splice(indexOf, 1)
      : this.cartContains.push(itemId);

    this.setContainsValue();
  }

  clear() {
    this.cartContains = [];
    this.setContainsValue();
  }
}
