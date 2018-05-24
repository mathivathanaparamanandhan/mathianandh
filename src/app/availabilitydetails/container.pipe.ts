import { filter } from "rxjs/operator/filter";
import { Pipe, PipeTransform, Injectable } from "@angular/core";

import { container } from "../_models/container";

@Pipe({
  name: "containerfilter",
  pure: false
})
export class ContainerPipeAvl implements PipeTransform {
  transform(products: container[], selectedIds: any[]): any[] {
    if (selectedIds.length <= 0) {
      return products;
    } else {
      let filtered = [];
      for (let i in products) {
        for (let j in products[i]) {
          for (let k in selectedIds) {
            if (selectedIds[k] == products[i][j]) {
              filtered.push(products[i]);
            }
          }
        }
      }
      // Remove the duplicate elements
      let uniqueArray = filtered.filter(function(el, index, array) {
        return array.indexOf(el) == index;
      });

      return uniqueArray;
      //return filtered;
    }
  }
}