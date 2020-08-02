import { Component } from '@angular/core';
import { AppComponentModel } from './models/app-component-model';
import { AppComponentModelService } from './services/app-component-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public model: AppComponentModel;

  constructor(appComponentModelService: AppComponentModelService) {
    this.model = appComponentModelService.model;
  }
}
