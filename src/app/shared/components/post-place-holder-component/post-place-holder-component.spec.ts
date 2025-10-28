import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPlaceHolderComponent } from './post-place-holder-component';

describe('PostPlaceHolderComponent', () => {
  let component: PostPlaceHolderComponent;
  let fixture: ComponentFixture<PostPlaceHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostPlaceHolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPlaceHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
