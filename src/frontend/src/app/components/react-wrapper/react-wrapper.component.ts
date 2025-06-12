import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-react-wrapper',
  imports: [],
  templateUrl: './react-wrapper.component.html',
  styleUrl: './react-wrapper.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReactWrapperComponent implements OnInit {
  ngOnInit(): void {
    console.log("on innt")
  }
}
