import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RelationRequestType } from '@modules/requests/relation-request-type.enum';
import { HeaderService } from '@modules/header/header.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsComponent {
  readonly RelationRequestTypeEnum = RelationRequestType;
  constructor(private readonly header: HeaderService) {
    header.setTitle('Relation requests');
  }
}
