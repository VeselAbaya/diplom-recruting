import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent {
  readonly experienceSliderConfig = {
    min: 0,
    max: 10,
    displayWith: (value: number) => {
      switch (value) {
        case 0: return '<1';
        case 10: return '≥10';
        default: return value.toString();
      }
    }
  };
}
