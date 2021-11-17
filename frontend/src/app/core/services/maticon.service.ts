import { Inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { APP_PORT } from '@shared/tokens/app-port.token';

@Injectable({
  providedIn: 'root'
})
export class MatIconService {
  listIcons = [
    {
      name: 'message',
      src: 'assets/icons/message.svg'
    },
    {
      name: 'relationship',
      src: 'assets/icons/relationship.svg'
    },
    {
      name: 'send',
      src: 'assets/icons/send.svg'
    },
    {
      name: 'user',
      src: 'assets/icons/user.svg'
    },
    {
      name: 'users',
      src: 'assets/icons/users.svg'
    },
    {
      name: 'relations-list',
      src: 'assets/icons/relations-list.svg'
    },
    {
      name: 'result-list',
      src: 'assets/icons/result-list.svg'
    },
    {
      name: 'result-graph',
      src: 'assets/icons/result-graph.svg'
    },
    {
      name: 'upload',
      src: 'assets/icons/upload.svg'
    }
  ];

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              @Inject(APP_PORT) private port: string | number | null) {}

  init(): void {
    this.listIcons.forEach(({name, src}) =>
      this.matIconRegistry.addSvgIcon(
        name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`http://localhost:${this.port}/${src}`)
      )
    );
  }
}


