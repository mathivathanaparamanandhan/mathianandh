import {Injectable} from '@angular/core';
import {BrowserXhr} from '@angular/http';
import { Http } from "@angular/http";
import 'rxjs/Rx' ;
import { ContainerService } from "../_services/container.service";

@Injectable() 
export class CustomBrowserXhr extends BrowserXhr {

  constructor(private http: Http,private reportservice:ContainerService) {
      super();
  }
  build(): any {
    let xhr = super.build();
    xhr.responseType = "blob";
    return <any>(xhr);
  }

  // downloadFile() {
  //   this.http.get(
  //     'https://mapapi.apispark.net/v1/images/Granizo.pdf').subscribe(
  //       (response) => {
  //         var mediaType = 'application/pdf';
  //         var blob = new Blob([response._body], {type: mediaType});
  //         var filename = 'test.pdf';
  //         saveAs(blob, filename);
  //       });
  //  }
  // click(){
  //   this.reportservice.getReport().subscribe(data => this.downloadFile(data)),//console.log(data),
  //   error => console.log("Error downloading the file."),
  //   () => console.info("OK");
  // }


  //                downloadFile(data: Response){
  //                 var blob = new Blob([data], { type: 'text/csv' });
  //                 var url= window.URL.createObjectURL(blob);
  //                 window.open(url);
  //               }
}