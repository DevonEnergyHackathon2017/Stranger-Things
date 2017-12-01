import { TestBed, inject } from '@angular/core/testing';

import { NgWebSocketService } from './ng-web-socket.service';

describe('NgWebSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgWebSocketService]
    });
  });

  it('should be created', inject([NgWebSocketService], (service: NgWebSocketService) => {
    expect(service).toBeTruthy();
  }));
});
