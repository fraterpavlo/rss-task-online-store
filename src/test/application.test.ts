import { App } from '../modules/application';
import { Filters } from '../modules/filters';
import { ResultsArea } from '../modules/resultsArea';
import { Cart } from '../modules/cart';
import { localStorageKeys } from '../modules/common/localStorageKeys';

describe('class App', () => {

  let app: App;
  let appNode: HTMLElement;
  let cartNode: HTMLElement;
  let filtersNode: HTMLElement;
  let resultsAreaNode: HTMLElement;
  beforeAll( () => {
    document.body.innerHTML = 
    `<div id="app" class="wrapper">
       <div id="cart" class="header__cart-ico">
        <output class="header__cart-indicator">0</output>
       </div>
       <aside id="filters" class="main__filters-wrap filters">
        <input class="search-filter__input" type="search">
        <button class="search-filter__submit-btn" type="submit"></button>
        <select class="sort-filter__select">
          <option value="sort-name-increase"></option>
          <option value="sort-name-decrease"></option>
          <option value="sort-price-increase"></option>
          <option value="sort-price-decrease"></option>
          <option value="sort-year-increase"></option>
          <option value="sort-year-decrease"></option>
        </select>
        <div class="brand-filter__btn-contain">
          <button class="brand-filter__btn" data-brand-filter="audi"></button>
          <button class="brand-filter__btn" data-brand-filter="aurus"></button>
          <button class="brand-filter__btn" data-brand-filter="bmw"></button>
          <button class="brand-filter__btn" data-brand-filter="geely"></button>
          <button class="brand-filter__btn" data-brand-filter="jaguar"></button>
          <button class="brand-filter__btn" data-brand-filter="jeep"></button>
          <button class="brand-filter__btn" data-brand-filter="kia"></button>
        </div>
        <div class="type-filter__btn-contain">
          <button class="type-filter__btn" data-type-filter="купе"></button>
          <button class="type-filter__btn" data-type-filter="кроссовер"></button>
          <button class="type-filter__btn" data-type-filter="хэтчбек"></button>
          <button class="type-filter__btn" data-type-filter="седан"></button>
          <button class="type-filter__btn" data-type-filter="внедорожник"></button>
        </div>
        <div class="color-filter__btn-contain">
          <button class="color-filter__btn" data-color-filter="белый"></button>
          <button class="color-filter__btn" data-color-filter="серый"></button>
          <button class="color-filter__btn" data-color-filter="желтый"></button>
          <button class="color-filter__btn" data-color-filter="красный"></button>
          <button class="color-filter__btn" data-color-filter="синий"></button>
          <button class="color-filter__btn" data-color-filter="зелёный"></button>
        </div>
        <div id="price-filter-range" class="range-contain__range"></div>
        <div id="year-filter-range" class="range-contain__range"></div>
        <input id="only-electric-filters-input" type="checkbox" class="only-electric-filters__input">
        <button class="filters__reset-filter-btn"></button>
        <button class="filters__reset-settings-btn"></button>
       </aside>
       <div id="results-area" class="main__results-area-wrap results-area">
       </div>
     </div>`

    appNode = document.querySelector('#app')!;
    cartNode = document.querySelector('#cart')!;
    filtersNode = document.querySelector('#filters')!;
    resultsAreaNode = document.querySelector('#results-area')!;

    app = new App(appNode);
    app.filters = new Filters(filtersNode);
    app.resultsArea = new ResultsArea(resultsAreaNode);
    app.cart = new Cart(cartNode);
  })

  it('should return throw on invalid argument in constructor', () => {
    const invalidElement = document.createElement('div');
    expect(() => new App(invalidElement)).toThrow();
  })

  it('should mark added to cart cards and remove mark after back', () => {
    resultsAreaNode.innerHTML = `
      <div data-id="1" class="results-area__item card"> </div>
      <div data-id="2" class="results-area__item card"> </div>
      <div data-id="3" class="results-area__item card"> </div>`;
    app.cart.cartContains = ['1', '3'];
    app.markAddedCards();
    const cardWithId1 = resultsAreaNode.querySelector('.card[data-id="1"]')!;
    const cardWithId2 = resultsAreaNode.querySelector('.card[data-id="2"]')!;
    const cardWithId3 = resultsAreaNode.querySelector('.card[data-id="3"]')!;

    expect(cardWithId1.classList.contains('added-in-cart')).toBe(true);
    expect(cardWithId2.classList.contains('added-in-cart')).toBe(false);
    expect(cardWithId3.classList.contains('added-in-cart')).toBe(true);
  })

  it('should mark the card after adding it to cart and remove mark after removing card from the cart', () => {
    resultsAreaNode.innerHTML = `
      <div data-id="1" class="results-area__item card"> </div>
      <div data-id="2" class="results-area__item card"> </div>
      <div data-id="3" class="results-area__item card"> </div>`;
    app.cart.cartContains = [];
    app.markAddedCards();
    const cardWithId1: HTMLElement = resultsAreaNode.querySelector('.card[data-id="1"]')!;
    const cardWithId2: HTMLElement = resultsAreaNode.querySelector('.card[data-id="2"]')!;
    const cardWithId3: HTMLElement = resultsAreaNode.querySelector('.card[data-id="3"]')!;

    cardWithId1.click();
    cardWithId2.click();
    expect(cardWithId1.classList.contains('added-in-cart')).toBe(true);
    expect(cardWithId2.classList.contains('added-in-cart')).toBe(true);
    expect(app.cart.cartContains).toEqual(['1', '2']);

    cardWithId1.click();
    cardWithId2.click();
    cardWithId3.click();
    expect(cardWithId1.classList.contains('added-in-cart')).toBe(false);
    expect(cardWithId2.classList.contains('added-in-cart')).toBe(false);
    expect(cardWithId3.classList.contains('added-in-cart')).toBe(true);
    expect(app.cart.cartContains).toEqual(['3']);
  })

  it('should not add card in cart if cart contains 20 items', () => {
    resultsAreaNode.innerHTML = `
      <div data-id="1" class="results-area__item card"> </div>`;
    app.cart.cartContains = Array(20).fill(null);
    app.markAddedCards();

    const cardWithId1: HTMLElement = resultsAreaNode.querySelector('.card[data-id="1"]')!;
    cardWithId1.click();

    expect(cardWithId1.classList.contains('added-in-cart')).toBe(false);
    expect(app.cart.cartContains).toHaveLength(20);
    expect(app.cart.cartContains.pop()).toBeNull();
  })

  it('should change search settings and render only valid results', () => {
    app.filters.searchFilter.value = "di";
    app.filters.searchFilter.submitBtn.click();

    const localStorageSearchValue = JSON.parse(localStorage.getItem(localStorageKeys.filtersOptions)!).search;
    expect(app.filters.filtersOptions.search).toBe("di");
    expect(localStorageSearchValue).toBe("di"); 

    const renderedCards = app.resultsArea.resultsArea.querySelectorAll('.card');
    const titlesOfCards: string[] = [];
    renderedCards.forEach(card => {
        const cardTitle = card.querySelector('.card__title')?.textContent?.toLocaleLowerCase();
        titlesOfCards.push(cardTitle as string);
    })
    expect(titlesOfCards.every(title => title.includes('di'))).toBe(true);
  })

})
