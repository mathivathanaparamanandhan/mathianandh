import { Component, OnInit, Input } from "@angular/core";

import { ContainerService } from "../_services/container.service";

import { Filters } from "../_models/container";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
  providers: [ContainerService]
})
export class FilterComponent implements OnInit {
 
  filters: Array<Filters>;
  log = "";
  constructor(private container: ContainerService) {}

  ngOnInit() {
    this.container.getFilter().subscribe(data => {
      this.filters = data;
      console.log(this.filters[1].options);
    });
  }
  logCheckbox(element: HTMLInputElement): any {
    this.log += `Checkbox ${element.value} was ${
      element.checked ? "" : "un"
    }checked\n`;
    console.log(this.log);
  }
}
