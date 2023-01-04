import { ICarData } from './filters';
import { textValues } from './common/textValues';

export class ResultsArea {
  resultsArea: HTMLElement;

  constructor(resultsAreaNode: HTMLElement) {
    if (!resultsAreaNode) throw Error('results-area not found');
    this.resultsArea = resultsAreaNode;
  }

  // clear (): void {
  //   this.resultsArea.innerHTML = '';
  // }

  render(carsData: ICarData[]): void {
    function createCard(itemData: ICarData): string {
      let isElectricItemStr: string = itemData.electric ? 'Да' : 'Нет';

      return `<div data-id="${itemData.id}" class="results-area__item card">
              <span class="card__title">${itemData.brand} ${itemData.model}</span>
              <div class="card__img-contain">
                <img src="./assets/img/cars/${itemData.id}.jpg" alt="car" class="card__img">
              </div>
              <div class="card__type">Тип кузова:
                <span class="card__type-output">${itemData.type}</span>
              </div>
              <div class="card__country">Страна сборки:
                <span class="card__country-output">${itemData.country}</span>
              </div>
              <div class="card__year">Год производства:
                <span class="card__year-output">${itemData.year}</span>
              </div>
              <div class="card__price">Цена от:
                <span class="card__price-output">${itemData.price} &#128176;</span>
              </div>
              <div class="card__electric">Электрокар:
                <span class="card__electric-output">${isElectricItemStr}</span>
              </div>
            </div>`;
    }

    carsData.length === 0
      ? (this.resultsArea.innerHTML =
        textValues.get('text if no results are found with the specified characteristics') || 'no results')
      : (this.resultsArea.innerHTML = `${carsData.map(createCard).join('\n')}`);
  }
}
