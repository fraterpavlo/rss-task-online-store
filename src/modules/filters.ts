import {data} from './common/data';
// import carsDataJson from './common/carsData.json';
import {CarsDataModel} from './common/carsDataModel';
import * as noUiSlider from 'nouislider';
import { localStorageKeys } from './common/localStorageKeys';
import { SearchFilter } from './searchFilter';
import { SortFilter } from './sortFilter';

export interface IFiltersOptions {
  search: string;
  sortMethod: string;
  brandOptions: string[];
  typeOptions: string[];
  colorOptions: string[];
  priceOptions: [number, number];
  yearOptions: [number, number];
  onlyElectricOptions: boolean;
}

export interface ICarData {
  id: string;
  brand: string;
  model: string;
  country: string;
  count: string;
  year: number;
  type: string;
  color: string;
  price: number;
  electric: boolean;
}

export class Filters {
  carsDataNEW: any;
  carsData: ICarData[];
  validDataList: ICarData[];
  filtersOptions: IFiltersOptions;
  sortFilter: SortFilter;
  brandFilter: HTMLElement;
  typeFilter: HTMLElement;
  colorFilter: HTMLElement;
  priceFilter: noUiSlider.target;
  yearFilter: noUiSlider.target;
  onlyElectricFilter: HTMLInputElement;
  resetFiltersBtn: HTMLElement;
  resetSettingsBtn: HTMLElement;
  searchFilter: SearchFilter;

  constructor(filtersNode: HTMLElement) {
    if (!filtersNode) throw Error('filters not found');

    const dataModel: CarsDataModel = new CarsDataModel();
    dataModel.build();
    this.carsDataNEW = dataModel.data;
    // this.carsDataNEW = new CarsDataModel().build().then(res => res.data);
    // console.log(this.carsDataNEW);
    
    this.carsData = data;
    this.validDataList = data;
    this.filtersOptions = this.initFiltersOptions();

    this.searchFilter = this.initSearchFilter(filtersNode)!;
    // this.sortSelect = this.initSortSelect(filtersNode);
    this.sortFilter = this.initSortFilter(filtersNode)!;
    this.brandFilter = this.initBrandFilter(filtersNode);
    this.typeFilter = this.initTypeFilter(filtersNode);
    this.colorFilter = this.initColorFilter(filtersNode);
    this.priceFilter = this.initPriceRange(filtersNode)!;
    this.yearFilter = this.initYearRange(filtersNode)!;
    this.onlyElectricFilter = this.initOnlyElectricFilter(filtersNode);
    this.resetFiltersBtn = filtersNode.querySelector(
      '.filters__reset-filter-btn'
    )!;
    this.resetSettingsBtn = filtersNode.querySelector(
      '.filters__reset-settings-btn'
    )!;
  }

  initFiltersOptions() {
    const defaultOptions: IFiltersOptions = {
      search: '',
      sortMethod: 'sort-name-increase',
      brandOptions: [],
      typeOptions: [],
      colorOptions: [],
      priceOptions: [0, 99],
      yearOptions: [2000, 2022],
      onlyElectricOptions: false,
    };
    // this.filtersOptions = defaultOptions;

    let filtersOptions: IFiltersOptions;
    localStorage.getItem(localStorageKeys.filtersOptions)
      ? (filtersOptions = JSON.parse(localStorage[localStorageKeys.filtersOptions]))
      : (filtersOptions = defaultOptions);

    return filtersOptions;
  }

  initSearchFilter(filtersNode: HTMLElement) {
    const searchFormEl = filtersNode.querySelector(
      '.search-filter__form'
    ) as HTMLFormElement;
    if (!searchFormEl) {
      console.error('searchFormEl not found');
      return null;
    };
    const searchFilter: SearchFilter = new SearchFilter(searchFormEl);
    searchFilter.value = this.filtersOptions.search;

    return searchFilter;
  }

  // initSortSelect(filtersNode: HTMLElement) {
  //   const sortSelect = filtersNode.querySelector(
  //     '.sort-filter__select'
  //   ) as HTMLSelectElement;
  //   if (!sortSelect) console.error('sortSelect not found');
  //   sortSelect.value = this.filtersOptions.sortMethod;

  //   return sortSelect;
  // }

  initSortFilter(filtersNode: HTMLElement) {
    const sortSelectEl = filtersNode.querySelector(
      '.sort-filter__select'
    ) as HTMLSelectElement;
    if (!sortSelectEl) {
      console.error('sortSelect not found');
      return null;
    };
    const sortSelectFilter = new SortFilter(sortSelectEl);
    sortSelectFilter.value = this.filtersOptions.sortMethod;

    return sortSelectFilter;
  }

  initBrandFilter(filtersNode: HTMLElement) {
    const brandFilter = filtersNode.querySelector(
      '.brand-filter__btn-contain'
    ) as HTMLElement;
    if (!brandFilter) console.error('brandFilter not found');

    this.filtersOptions.brandOptions.forEach((el) => {
      const activeElement = brandFilter.querySelector(
        `.brand-filter__btn[data-brand-filter="${el}"]`
      );

      if (!activeElement)
        console.error(`activeElement data-brand-filter="${el}" not found`);

      activeElement?.classList.add('selected');
    });

    return brandFilter;
  }

  initTypeFilter(filtersNode: HTMLElement) {
    const typeFilter = filtersNode.querySelector(
      '.type-filter__btn-contain'
    ) as HTMLElement;
    if (!typeFilter) console.error('typeFilter not found');

    this.filtersOptions.typeOptions.forEach((el) => {
      const activeElement = typeFilter.querySelector(
        `.type-filter__btn[data-type-filter="${el}"]`
      );

      if (!activeElement)
        console.error(`activeElement data-type-filter="${el}" not found`);

      activeElement?.classList.add('selected');
    });

    return typeFilter;
  }

  initColorFilter(filtersNode: HTMLElement) {
    const colorFilter = filtersNode.querySelector(
      '.color-filter__btn-contain'
    ) as HTMLElement;
    if (!colorFilter) console.error('colorFilter not found');

    this.filtersOptions.colorOptions.forEach((el) => {
      const activeElement = colorFilter.querySelector(
        `.color-filter__btn[data-color-filter="${el}"]`
      );

      if (!activeElement)
        console.error(`activeElement data-color-filter="${el}" not found`);

      activeElement?.classList.add('selected');
    });

    return colorFilter;
  }

  initPriceRange(filtersNode: HTMLElement) {
    const priceFilter = filtersNode.querySelector(
      '#price-filter-range'
    ) as noUiSlider.target;
    if (!priceFilter) console.error('priceFilter not found');

    if (priceFilter.classList.contains('noUi-target')) return;

    const maxPriceInData = Math.max.apply(
      null,
      this.carsData.map((el) => el.price)
    );
    const minPriceInData = Math.min.apply(
      null,
      this.carsData.map((el) => el.price)
    );
    const currentValues = this.filtersOptions.priceOptions;

    noUiSlider.create(priceFilter, {
      start: [minPriceInData, maxPriceInData],
      tooltips: true,
      format: {
        to(value) {
          return Math.floor(+value);
        },
        from(value) {
          return Math.floor(+value);
        },
      },
      connect: [false, true, false],
      range: {
        min: minPriceInData,
        max: maxPriceInData,
      },
      step: 1,
    });

    priceFilter.noUiSlider?.set(currentValues);
    return priceFilter;
  }

  initYearRange(filtersNode: HTMLElement) {
    const yearFilter = filtersNode.querySelector(
      '#year-filter-range'
    ) as noUiSlider.target;
    if (!yearFilter) console.error('yearFilter not found');

    if (yearFilter.classList.contains('noUi-target')) return;

    const maxYearInData = Math.max.apply(
      null,
      this.carsData.map((el) => ((el as unknown) = el.year))
    );
    const minYearInData = Math.min.apply(
      null,
      this.carsData.map((el) => ((el as unknown) = el.year))
    );
    const currentValues = this.filtersOptions.yearOptions;

    noUiSlider.create(yearFilter, {
      start: [minYearInData, maxYearInData],
      tooltips: true,
      format: {
        to(value) {
          return Math.floor(+value);
        },
        from(value) {
          return Math.floor(+value);
        },
      },
      connect: [false, true, false],
      range: {
        min: minYearInData,
        max: maxYearInData,
      },
      step: 1,
    });

    yearFilter.noUiSlider?.set(currentValues);
    return yearFilter;
  }

  initOnlyElectricFilter(filtersNode: HTMLElement) {
    const onlyElectricInput = filtersNode.querySelector(
      '.only-electric-filters__input'
    ) as HTMLInputElement;
    if (!onlyElectricInput) console.error('OnlyElectricInput not found');

    onlyElectricInput.checked = this.filtersOptions.onlyElectricOptions;

    return onlyElectricInput;
  }

  setFilterOptionsInLocalStorage() {
    localStorage.setItem(localStorageKeys.filtersOptions, JSON.stringify(this.filtersOptions));
  }

  setValidDataList() {
    const searchOptions = this.filtersOptions.search;
    const brandOptions = this.filtersOptions.brandOptions;
    const typeOptions = this.filtersOptions.typeOptions;
    const colorOptions = this.filtersOptions.colorOptions;
    const priceOptions = this.filtersOptions.priceOptions;
    const yearOptions = this.filtersOptions.yearOptions;
    const onlyElectricOptions = this.filtersOptions.onlyElectricOptions;

    function isValidItem(item: ICarData) {
      let isValidSearch: boolean;
      searchOptions.length === 0
        ? (isValidSearch = true)
        : (isValidSearch = `${item.brand} ${item.model}`
            .toLowerCase()
            .includes(searchOptions));

      let isValidBrand: boolean;
      brandOptions.length === 0
        ? (isValidBrand = true)
        : (isValidBrand = brandOptions.includes(item.brand.toLowerCase()));

      let isValidType: boolean;
      typeOptions.length === 0
        ? (isValidType = true)
        : (isValidType = typeOptions.includes(item.type.toLowerCase()));

      let isValidColor: boolean;
      colorOptions.length === 0
        ? (isValidColor = true)
        : (isValidColor = colorOptions.includes(item.color.toLowerCase()));

      let isValidElectricProp: boolean;
      onlyElectricOptions === false
        ? (isValidElectricProp = true)
        : (isValidElectricProp = item.electric);

      let isValidPrice: boolean =
        item.price >= priceOptions[0] && item.price <= priceOptions[1];

      let isValidYear: boolean =
        item.year >= yearOptions[0] && item.year <= yearOptions[1];

      const result =
        isValidSearch &&
        isValidBrand &&
        isValidType &&
        isValidColor &&
        isValidElectricProp &&
        isValidPrice &&
        isValidYear;

      return result;
    }

    this.validDataList = this.carsData.filter(isValidItem);
  }

  setSearchOptions() {
    this.filtersOptions.search = this.searchFilter.inputEl.value.toLowerCase().trim();
    this.setFilterOptionsInLocalStorage();
  }

  setSortOptions() {
    this.filtersOptions.sortMethod = this.sortFilter.value;
    this.setFilterOptionsInLocalStorage();
  }

  sortValidDataList() {
    const sortMethod = this.filtersOptions.sortMethod;

    function sortStringIncrease(a: string, b: string): number {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }

    function sortNumberIncrease(a: number, b: number): number {
      return a - b;
    }

    switch (sortMethod) {
      case 'sort-name-increase':
        this.validDataList = this.validDataList.sort((a, b) => {
          const nameA = `${a.brand} ${a.model}`.toLowerCase();
          const nameB = `${b.brand} ${b.model}`.toLowerCase();
          return sortStringIncrease(nameA, nameB);
        });

        break;

      case 'sort-name-decrease':
        this.validDataList = this.validDataList.sort((a, b) => {
          const nameA = `${a.brand} ${a.model}`.toLowerCase();
          const nameB = `${b.brand} ${b.model}`.toLowerCase();
          return -sortStringIncrease(nameA, nameB);
        });

        break;

      case 'sort-price-increase':
        this.validDataList = this.validDataList.sort((a, b) =>
          sortNumberIncrease(a.price, b.price)
        );

        break;

      case 'sort-price-decrease':
        this.validDataList = this.validDataList.sort(
          (a, b) => -sortNumberIncrease(a.price, b.price)
        );

        break;

      case 'sort-year-increase':
        this.validDataList = this.validDataList.sort((a, b) =>
          sortNumberIncrease(a.year, b.year)
        );

        break;

      case 'sort-year-decrease':
        this.validDataList = this.validDataList.sort(
          (a, b) => -sortNumberIncrease(a.year, b.year)
        );

        break;

      default: 
        this.validDataList = this.validDataList.sort((a, b) => {
          const nameA = `${a.brand} ${a.model}`.toLowerCase();
          const nameB = `${b.brand} ${b.model}`.toLowerCase();
          return sortStringIncrease(nameA, nameB);
        });

        break;
    }
  }

  setModelOptions(brand: string) {
    const indexOf = this.filtersOptions.brandOptions.indexOf(brand);

    indexOf !== -1
      ? this.filtersOptions.brandOptions.splice(indexOf, 1)
      : this.filtersOptions.brandOptions.push(brand);

    this.setFilterOptionsInLocalStorage();
  }

  setTypeOptions(type: string) {
    const indexOf = this.filtersOptions.typeOptions.indexOf(type);

    indexOf !== -1
      ? this.filtersOptions.typeOptions.splice(indexOf, 1)
      : this.filtersOptions.typeOptions.push(type);

    this.setFilterOptionsInLocalStorage();
  }

  setColorOptions(color: string) {
    const indexOf = this.filtersOptions.colorOptions.indexOf(color);

    indexOf !== -1
      ? this.filtersOptions.colorOptions.splice(indexOf, 1)
      : this.filtersOptions.colorOptions.push(color);

    this.setFilterOptionsInLocalStorage();
  }

  setPriceOptions(values: Array<number | string>, handle: number) {
    if (typeof Number(values[handle]) !== 'number')
      throw Error(`invalid value (${values[handle]}) of handle ${handle}`);
    if (handle > 1)
      throw Error('invalid handle index. range should has only 2 handle');
    this.filtersOptions.priceOptions[handle] = +values[handle];

    this.setFilterOptionsInLocalStorage();
  }

  setYearOptions(values: Array<number | string>, handle: number) {
    if (typeof Number(values[handle]) !== 'number')
      throw Error(`invalid value (${values[handle]}) of handle ${handle}`);
    if (handle > 1)
      throw Error('invalid handle index. range should has only 2 handle');
    this.filtersOptions.yearOptions[handle] = +values[handle];

    this.setFilterOptionsInLocalStorage();
  }

  setOnlyElectricOptions() {
    this.filtersOptions.onlyElectricOptions = this.onlyElectricFilter.checked;
    this.setFilterOptionsInLocalStorage();
  }

  resetFilters() {
    this.searchFilter.value = '';
    this.brandFilter
      .querySelectorAll('.brand-filter__btn')
      .forEach((el) => el.classList.remove('selected'));
    this.typeFilter
      .querySelectorAll('.type-filter__btn')
      .forEach((el) => el.classList.remove('selected'));
    this.colorFilter
      .querySelectorAll('.color-filter__btn')
      .forEach((el) => el.classList.remove('selected'));
    this.priceFilter.noUiSlider?.reset();
    this.yearFilter.noUiSlider?.reset();
    this.onlyElectricFilter.checked = false;

    const priceResetValues =
      this.priceFilter.noUiSlider?.get() as IFiltersOptions['priceOptions'];
    const yearResetValues =
      this.yearFilter.noUiSlider?.get() as IFiltersOptions['yearOptions'];
    const resetFiltersOptions: IFiltersOptions = {
      search: '',
      sortMethod: this.filtersOptions.sortMethod,
      brandOptions: [],
      typeOptions: [],
      colorOptions: [],
      priceOptions: priceResetValues,
      yearOptions: yearResetValues,
      onlyElectricOptions: false,
    };
    this.filtersOptions = resetFiltersOptions;
  }

  resetSettings() {
    this.resetFilters();
    this.filtersOptions.sortMethod = 'sort-name-increase';
    this.sortFilter.value = 'sort-name-increase';
    localStorage.clear();
  }
}
