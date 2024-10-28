import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GerenciasPage } from './gerencias.page';

describe('GerenciasPage', () => {
  let component: GerenciasPage;
  let fixture: ComponentFixture<GerenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
