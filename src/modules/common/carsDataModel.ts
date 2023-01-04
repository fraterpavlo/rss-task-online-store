import carsDataURL from './carsData.json';
import {ICarData} from '../filters';



export class CarsDataModel {
  data: Array<ICarData> = [];

  constructor() {}

  public async build() {
    this.data = await this.loadCarsData(carsDataURL as unknown as string);
    return this;
  }

  private async loadCarsData(URL: string): Promise<ICarData[]> {
    return (await fetch(URL)).json();
  }
}

// export async function loadCarsData (url: string) {
//   const res = (await fetch(url)).json();
//   console.log(res);
  
//   return res;
// }


