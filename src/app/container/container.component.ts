import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ContainerService } from "../_services/container.service";
import { container } from "../_models/container";
import { FilterComponent } from "../filter/filter.component";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"],
  providers: [ContainerService]
})
export class ContainerComponent implements OnInit {
  @Input() message: string;
  container_detail: Array<container>;
  constructor(private container: ContainerService) {}

  ngOnInit() {
    this.container.getProduct().subscribe(data => {
      this.container_detail = [];
      for (let i = 0; i < data.length; i++) {
        this.container_detail[i] = data[i];
      }
    });
  }
}
