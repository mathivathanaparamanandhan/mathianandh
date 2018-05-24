import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Validators, FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Http } from "@angular/http";
import { GlobalValues } from "../common/_common";
import { MatPaginator, MatTableDataSource } from "@angular/material";
// import { DataFilterPipe } from './data-filter.pipe';
import { DialogService } from "ng2-bootstrap-modal";
import { AdmnChangepasswordComponent } from "../admn-changepassword/admn-changepassword.component";
import { ITradePortalService } from "../_services/index";
import { UserdetailService } from "../_services/index";
import { CalendarModule } from "primeng/calendar";
import { NgModule, ElementRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { Calendar, DataTable, Column, InputMask } from "primeng/primeng";
import { empty } from "rxjs/observable/empty";
import { ToastrService } from "ngx-toastr";
import * as FileSaver from "file-saver";


@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"]
})
export class OverviewComponent implements OnInit {
  model: any = {};
  date1: Date;

  //date2: Date;

  //date3: Date;

  date4: Date;

  date5: Date;

  date6: Date;

  date7: Date;

  date8: Date;

  date9: Date;

  date10: Date;

  date11: Date;

  dates: Date[];

  rangeDates: Date[];

  minDate: Date;

  maxDate: Date;
  error: any;
  es: any;
  tr: any;
  downpath: string = "assets/SaleInvoice/";
  invalidDates: Array<Date>;
  public data: Array<any> = [];
  isLoggedIn: boolean;
  username: string;
  selectedCars1: any[];
  cars: any = [];
  cars1: any = [];
  cols: any[];
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";
  mode = new FormControl("over");

  approved: boolean = false;
  pending: boolean = false;
  rejected: boolean = false;
  locked: boolean = false;
  deactivate: boolean = false;
  @ViewChild("sidenav") sidenav: MatSidenav;
  @ViewChild("date3") date3: Date;
  @ViewChild("date2") date2: Date;
  constructor(
    private http: Http,
    private dialogService: DialogService,
    private userdetail: UserdetailService,
    private itradeportalservice: ITradePortalService,
    private toastr: ToastrService
  ) { }
  reason = "";
  display = "none";
  openModal() {
    this.display = "block";
  }
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
  onCloseHandled() {
    this.display = "none";
  }
  ngOnInit() {
    this.itradeportalservice.getOverviewDetails(null, null).subscribe(data => {
      this.cars = data;
      for (let i in data) {
        this.data[i] = data[i];
      }
      this.cols = [
        { field: "usR_NAM", header: "User" },
        { field: "cstmR_NAM", header: "Customer" },
        { field: "sL_OFFR_LCTN_CD", header: "Organisation" },
        { field: "sL_OFFR_TCD", header: "Cart No" },
        { field: "dpT_CD", header: "Depot" },
        { field: "dpT_CNTRY", header: "Depot Country" },
        { field: "sL_INVC_DT_FRMTD", header: "Invoice Date" },
        { field: "crrncY_CD", header: "Currency" },
        { field: "actL_AMT", header: "Inv Amount" },
        { field: "sL_INVC_TCD", header: "Invoice" },
        { field: "rlsE_TCD", header: "Sale Rel No" }
      ];
    });

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado"
      ],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
      ],
      monthNamesShort: [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic"
      ],
      today: "Hoy",
      clear: "Borrar"
    };

    this.tr = {
      firstDayOfWeek: 1
    };

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }

  fetchData(f: NgForm) {
    // | date:'yyyy-MM-dd

    this.itradeportalservice
      .getOverviewDetails(
        this.date3["inputFieldValue"],
        this.date2["inputFieldValue"]
      )
      .subscribe(data => {
        this.cars = data;
        for (let i in data) {
          this.data[i] = data[i];
        }
        if (this.cars.length === 0) {
          this.toastr.clear();
          this.toastr.info('No Records Found Between Selected Date', '', { closeButton: true })
        }
        this.cols = [
          { field: "usR_NAM", header: "User Name" },
          { field: "cstmR_NAM", header: "Customer Name" },
          { field: "sL_OFFR_LCTN_CD", header: "Organisation" },
          { field: "sL_OFFR_TCD", header: "Order No" },
          { field: "dpT_CD", header: "Depot" },
          { field: "dpT_CNTRY", header: "Depot Country" },
          { field: "sL_INVC_DT_FRMTD", header: "Invoice Date" },
          { field: "crrncY_CD", header: "Currency" },
          { field: "actL_AMT", header: "Inv Amount" },
          { field: "sL_INVC_TCD", header: "Invoice" },
          { field: "rlsE_TCD", header: "Sale Rel No" }
        ];

      }

      );

  }
  clear() {


    this.date3["inputFieldValue"] = null;
    this.date2["inputFieldValue"] = null;

  }
  getdata(rowData: any) {
    console.log(rowData);
  }
  downloadFile(fileName: string) {
    this.itradeportalservice
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
