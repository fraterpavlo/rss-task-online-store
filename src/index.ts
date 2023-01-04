import './styles/general.scss';
import 'nouislider/dist/nouislider.css';
import { App } from './modules/application';

const app = new App(document.querySelector('#app')!);
app.upload();
