import { filter } from "rxjs/operator/filter";
import { Pipe, PipeTransform, Injectable } from "@angular/core";

import { container } from "../_models/container";

@Pipe({
  name: "sortby",
  pure: false
})
export class SortbyPipe implements PipeTransform {
  transform(products: container[], selectedIds: any): any[] {
    let filtered = [];
    let filterednext = [];
    if (selectedIds == null) {
      return products;
    } else {
      for (let i in products) {
        // for (let j in products[i]) {
        // for (let k in selectedIds) {
        if (selectedIds == products[i]['sL_CNDTN_NAM']) {
          filtered.push(products[i]);
        } else {
          filterednext.push(products[i]);
        }
        // }
        // }
      }

      filtered = filtered.concat(filterednext);
      // Remove the duplicate elements
      let uniqueArray = filtered.filter(function(el, index, array) {
        return array.indexOf(el) == index;
      });

      return uniqueArray;
      //return filtered;
    }
  }
}
