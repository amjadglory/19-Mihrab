import { TestBed } from '@angular/core/testing';

import { CreateComment } from './create-comment';

describe('CreateComment', () => {
  let service: CreateComment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateComment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
