import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstructuraOrganizacionalPage } from './estructura-organizacional.page';

describe('EstructuraOrganizacionalPage', () => {
  let component: EstructuraOrganizacionalPage;
  let fixture: ComponentFixture<EstructuraOrganizacionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraOrganizacionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
