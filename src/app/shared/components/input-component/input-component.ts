import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-component',
  imports: [],
  templateUrl: './input-component.html',
  styleUrl: './input-component.css',
})
export class InputComponent {
  @Input() control: any;
  @Input() inputType!: string;
  @Input() inputLable!: string;
  @Input() inputId!: string;
}
