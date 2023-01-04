import { Filters } from './filters';
import { ResultsArea } from './resultsArea';
import { Cart } from './cart';
import { textValues } from './common/textValues';

export class App {
  filters: Filters;
  resultsArea: ResultsArea;
  cart: Cart;

  constructor(appNode: HTMLElement) {
    if (!appNode) throw Error('appNode not found');
    this.filters = new Filters(appNode.querySelector('#filters')!);
    this.resultsArea = new ResultsArea(appNode.querySelector('#results-area')!);
    this.cart = new Cart(appNode.querySelector('#cart')!);

    this.filters.searchFilter.submitBtn.addEventListener(
      'click',
      this.searchListener.bind(this)
    );
    this.filters.sortFilter.selectEl.addEventListener(
      'change',
      this.selectSortListener.bind(this)
    );
    this.filters.brandFilter.childNodes.forEach((el) =>
      el.addEventListener('click', this.brandFilterListener.bind(this))
    );
    this.filters.typeFilter.addEventListener(
      'click',
      this.typeFilterListener.bind(this)
    );
    this.filters.colorFilter.addEventListener(
      'click',
      this.colorFilterListener.bind(this)
    );
    this.filters.priceFilter.noUiSlider!.on(
      'update',
      this.priceFilterListener.bind(this)
    );
    this.filters.yearFilter.noUiSlider!.on(
      'update',
      this.yearFilterListener.bind(this)
    );
    this.filters.onlyElectricFilter.addEventListener(
      'change',
      this.onlyElectricFilterListener.bind(this)
    );
    this.filters.resetFiltersBtn.addEventListener(
      'click',
      this.resetFiltersBtnListener.bind(this)
    );
    this.filters.resetSettingsBtn.addEventListener(
      'click',
      this.resetSettingsBtnListener.bind(this)
    );
  }

  upload() {
    this.filters.setValidDataList();
    this.filters.sortValidDataList();
    this.resultsArea.render(this.filters.validDataList);
    this.markAddedCards();

  }

  markAddedCards() {
    const renderedCards = this.resultsArea.resultsArea.querySelectorAll(
      '.results-area__item'
    );
    renderedCards.forEach((card) => {
      card.addEventListener('click', this.onclickCardListener.bind(this));

      if (!(card as HTMLElement).dataset.id) return;
      const indexOfItemInCart = this.cart.cartContains.indexOf(
        (card as HTMLElement).dataset.id!
      );
      if (indexOfItemInCart !== -1) card.classList.add('added-in-cart');
    });
  }

  searchListener(e: Event) {
    e.preventDefault();
    this.filters.setSearchOptions();
    this.upload();
  }

  selectSortListener() {
    this.filters.setSortOptions();
    this.filters.sortValidDataList();
    this.resultsArea.render(this.filters.validDataList);
  }

  brandFilterListener(e: Event) {
    e.preventDefault();
    const selectedBrandBtn = e.currentTarget as HTMLElement;
    if (!selectedBrandBtn.dataset.brandFilter) return;
    selectedBrandBtn.classList.toggle('selected');

    const selectedBrand = selectedBrandBtn.dataset?.brandFilter.toLowerCase();
    this.filters.setModelOptions(selectedBrand);
    this.upload();
  }

  typeFilterListener(e: Event) {
    e.preventDefault();
    const selectedTypeBtn = e.target as HTMLElement;
    if (!selectedTypeBtn.dataset.typeFilter) return;
    selectedTypeBtn.classList.toggle('selected');

    const selectedType = selectedTypeBtn.dataset.typeFilter?.toLowerCase();
    this.filters.setTypeOptions(selectedType);
    this.upload();
  }

  colorFilterListener(e: Event) {
    e.preventDefault();
    const selectedColorBtn = e.target as HTMLElement;
    if (!selectedColorBtn.dataset.colorFilter) return;
    selectedColorBtn.classList.toggle('selected');

    const selectedColor = selectedColorBtn.dataset.colorFilter?.toLowerCase();
    this.filters.setColorOptions(selectedColor);
    this.upload();
  }

  priceFilterListener(values: Array<number | string>, handle: number) {
    this.filters.setPriceOptions(values, handle);
    this.upload();
  }

  yearFilterListener(values: Array<number | string>, handle: number) {
    this.filters.setYearOptions(values, handle);
    this.upload();
  }

  onlyElectricFilterListener() {
    this.filters.setOnlyElectricOptions();
    this.upload();
  }

  resetFiltersBtnListener() {
    this.filters.resetFilters();
    this.upload();
  }

  resetSettingsBtnListener() {
    this.filters.resetSettings();
    this.cart.clear();
    this.upload();
  }

  onclickCardListener(e: Event) {
    e.preventDefault();
    const targetCard = e.currentTarget as HTMLElement;
    if (!targetCard.dataset.id)
      throw Error(`targetCard has not dataset.dataId`);

    const targetId = targetCard.dataset.id.toLowerCase();
    const cartItemsCount = this.cart.cartContains.length;
    const indexOfItemInCart = this.cart.cartContains.indexOf(targetId);

    if (cartItemsCount >= 20 && indexOfItemInCart === -1) {
      alert(textValues.get('text when trying to add more than 20 items to cart') || 'you can not add more than 20 products');
      return;
    } else {
      targetCard.classList.toggle('added-in-cart');
      this.cart.uploadCartContains(targetId);
    }
  }
}
