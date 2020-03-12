import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTracksComponent } from './common-tracks.component';

describe('CommonTracksComponent', () => {
  let component: CommonTracksComponent;
  let fixture: ComponentFixture<CommonTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
