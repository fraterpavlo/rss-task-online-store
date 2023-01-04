// import { App } from '../modules/application';
import { localStorageKeys } from '../modules/common/localStorageKeys';
import { Filters, IFiltersOptions } from '../modules/filters';
// import { ResultsArea } from '../modules/resultsArea';
// import { Cart } from '../modules/cart';

describe('class App', () => {

  // let app: App;
  // let appNode: HTMLElement;
  // let cartNode: HTMLElement;
  let filtersNode: HTMLElement;
  let filters: Filters;
  // let resultsAreaNode: HTMLElement;
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

    // appNode = document.querySelector('#app')!;
    // cartNode = document.querySelector('#cart')!;
    filtersNode = document.querySelector('#filters')!;
    // resultsAreaNode = document.querySelector('#results-area')!;

    // app = new App(appNode);
    filters = new Filters(filtersNode);
    // app.resultsArea = new ResultsArea(resultsAreaNode);
    // app.cart = new Cart(cartNode);
  })

  it('should return throw on invalid argument in constructor', () => {
    const invalidElement = document.createElement('div');
    expect(() => new Filters(invalidElement)).toThrow();
  })

  it('should push settings in localStorage', () => {
    const fakeFilterOptions: IFiltersOptions = {
      search: 'null',
      sortMethod: 'null',
      brandOptions: ['null'],
      typeOptions: ['null'],
      colorOptions: ['null'],
      priceOptions: [0, 0],
      yearOptions: [0, 0],
      onlyElectricOptions: true,
    };
    filters.filtersOptions = fakeFilterOptions;
    filters.setFilterOptionsInLocalStorage();
    expect(JSON.parse(localStorage.getItem(localStorageKeys.filtersOptions)!)).toEqual(fakeFilterOptions);
  })

  it('should return throw on invalid argument in constructor', () => {
    filters.filtersOptions = {
      "search": "a",
      "sortMethod": "sort-price-increase",
      "brandOptions": ["aston martin", "chevrole", "nissan", "volkswagen", "rolls-royce", "lexus", "jeep", "geely", "bmw"],
      "typeOptions": ["хэтчбек", "купе", "кроссовер"],
      "colorOptions": ["серый", "синий", "красный"],
      "priceOptions": [1, 18],
      "yearOptions": [2015, 2019],
      "onlyElectricOptions": false
    }
    filters.setValidDataList();
    filters.sortValidDataList();

    const expectResult = [
      {
          "id": "20",
          "brand": "Geely",
          "model": "Atlas",
          "country": "Россия",
          "count": "8",
          "year": 2017,
          "type": "Кроссовер",
          "color": "серый",
          "price": 1,
          "electric": false
      },
      {
          "id": "16",
          "brand": "Chevrole",
          "model": "Camaro",
          "country": "США",
          "count": "3",
          "year": 2019,
          "type": "Купе",
          "color": "синий",
          "price": 2,
          "electric": false
      },
      {
          "id": "11",
          "brand": "BMW",
          "model": "Z4 Roadster",
          "country": "Австрия",
          "count": "11",
          "year": 2018,
          "type": "Купе",
          "color": "красный",
          "price": 3,
          "electric": false
      },
      {
          "id": "13",
          "brand": "BMW",
          "model": "8-series Gran Coupe",
          "country": "Германия",
          "count": "3",
          "year": 2019,
          "type": "Хэтчбек",
          "color": "красный",
          "price": 6,
          "electric": false
      },
      {
          "id": "1",
          "brand": "Aston Martin",
          "model": "DB11",
          "country": "Великобритания",
          "count": "2",
          "year": 2016,
          "type": "Купе",
          "color": "синий",
          "price": 16,
          "electric": false
      }
    ]
    expect(filters.validDataList).toEqual(expectResult);
  })
})

