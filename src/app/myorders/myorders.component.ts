import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ContainerService } from "../_services/container.service";
import { BrowserXhr } from '@angular/http';
import { PagingService } from "../_services/paging.service";
import { Injectable } from '@angular/core';
import { JwtInterceptor } from '../_helpers/index';
import { ITradePortalService } from "../_services/index"
import { RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { InterceptorService } from 'ng2-interceptors';
import { GlobalValues } from "../common/_common";
import * as FileSaver from "file-saver";
import { ToastrService } from 'ngx-toastr';

@Injectable()
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss'],
  providers: [PagingService, JwtInterceptor]
})

export class MyordersComponent implements OnInit {
  public data;
  public name: string;
  username: string;
  Username: string;
  orderlist: number = 0;
  Orders: any;

  p: any;
  totalItems: any;
  error: any;

  downpath: string = "assets/SaleInvoice/";
  constructor(
    private http: Http,
    private service: ContainerService,
    private pagerService: PagingService,
    private helper: JwtInterceptor,
    private ITradePortalService: ITradePortalService,
    private toastr: ToastrService
  ) {
    setInterval(() => {
      this.ngOnInit;
    }, 2000);
  }


  ngOnInit(): void {
    this.Username = JSON.parse(localStorage.getItem('currentUser'));
    this.username = this.Username['username'];
    GlobalValues.username;
    this.ITradePortalService.getOrderDetails(this.username).subscribe(data => {
      this.data = data;
      for (let i in data) {
        this.data[i].Image = 'assets/images/1.jpg';
      }
      this.Orders = this.data;

      this.orderlist = this.data.length;
    }

    );
  }
  downloadFile(fileName: string) {
    this.ITradePortalService
      .getFile(this.downpath + fileName)
      .subscribe(fileData => {
        if (fileData.type == "application/pdf") {
          FileSaver.saveAs(fileData, fileName);
        } else {
          this.toastr.error(
            "Please refresh after a while or logout and check",
            "Invoice"
          );
        }
      },
        err => (this.toastr.error('Please refresh after a while or logout and check', 'Invoice'))
      );
  }
}

  // downloadFile1() {
  //   this.http.get(
  //     'https://mapapi.apispark.net/v1/images/Granizo.pdf').subscribe(
  //       (response) => {
  //         var mediaType = 'application/pdf';
  //         var blob = new Blob([response._body], {type: mediaType});
  //         var filename = 'test.pdf';
  //         saveAs(blob, filename);
  //       });
  // }



