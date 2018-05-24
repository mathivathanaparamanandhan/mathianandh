import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { GlobalValues } from '../common/_common';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataFilterPipe } from './data-filter.pipe';
import { DialogService } from 'ng2-bootstrap-modal';
import { AdmnChangepasswordComponent } from '../admn-changepassword/admn-changepassword.component';
import { PortaluserprofileService } from '../_services/index';
import { UserdetailService } from '../_services/index';


@Component({
  selector: 'app-portaluserprofile',
  templateUrl: './portaluserprofile.component.html',
  styleUrls: ['./portaluserprofile.component.scss'],

})
export class PortaluserprofileComponent implements OnInit {
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
  mode = new FormControl('over');

  approved: boolean = false;
  pending: boolean = false;
  rejected: boolean = false;
  locked: boolean = false;
  deactivate: boolean = false;
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(private http: Http,
    private dialogService: DialogService,
    private userdetail: UserdetailService,
    private portaluserprofile: PortaluserprofileService) { }
  reason = '';
  display = 'none';
  openModal() {
    this.display = "block";
  }
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
  onCloseHandled() {
    this.display = 'none';
  }
  ngOnInit() {
    if (localStorage.getItem("userdetail")) {
      var statue: any = JSON.parse(localStorage.getItem("userdetail"));
      statue = statue.status.toLowerCase();
      this.portaluserprofile.getPortalusers(statue).subscribe(data => {
        this.cars = data;
        for (let i in data) {
          this.data[i] = data[i];
        }
        this.cols = [
          { field: "username", header: "User Name" },
          { field: "userCityName", header: "City" },
          { field: "prtL_USR_COUNTRY_NAM", header: "Country" },
          { field: "status", header: "Status" },
          { field: "userPhoneNo", header: "Phone No" },
          { field: "emailID", header: "Email ID" }
        ];
      });
      this.tabstatus(statue);
    }

    // localStorage.removeItem('userdetail');
    else {
      this.portaluserprofile.getPortalusers('pending')
        .subscribe((data) => {
          this.cars = data;
          for (let i in data) {
            this.data[i] = data[i];

          }
          this.cols = [
            { field: 'username', header: 'User Name' },
            { field: 'userCityName', header: 'City' },
            { field: "prtL_USR_COUNTRY_NAM", header: "Country" },
            { field: 'status', header: 'Status' },
            { field: 'userPhoneNo', header: 'Phone No' },
            { field: 'emailID', header: 'Email ID' }
          ];
        });
        this.tabstatus('pending');
    }


    let name: any = localStorage.getItem('currentAdminUser');
    name = JSON.parse(name);
    this.username = name.username;

  }
  public toInt(num: string) {
    return +num;
  }
  public sortByWordLength = (a: any) => {
    return a.email.length;
  }

  clicked: string = null;

  sideNavClick(clicked: string): void {
    this.clicked = this.clicked == clicked ? null : clicked;
  }
  sideNavAlert(): void {
    alert("sublist item clicked");
  }
  displayedColumns = ['UserName', 'CustomerName', 'Country', 'Status', 'Phone No', 'EmailID'];
  //   dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  logout() {
    GlobalValues.isLoggedIn = false;
  }
  getUsers() {
    this.portaluserprofile.getPortalusers('pending')
      .subscribe((data) => {
        this.cars = data;
        for (let i in data) {
          this.data[i] = data[i];

        }
        this.cols = [
          { field: 'username', header: 'User Name' },
          { field: 'userCityName', header: 'City' },
          { field: "prtL_USR_COUNTRY_NAM", header: "Country" },
          { field: 'status', header: 'Status' },
          { field: 'userPhoneNo', header: 'Phone No' },
          { field: 'emailID', header: 'Email ID' }
        ];
      });
  }
  getUsers_staus(status) {
    this.portaluserprofile.getPortalusers(status)
      .subscribe((data) => {
        this.cars = data;
        for (let i in data) {
          this.data[i] = data[i];

        }
        this.cols = [
          { field: 'username', header: 'User Name' },
          { field: 'userCityName', header: 'City' },
          { field: "prtL_USR_COUNTRY_NAM", header: "Country" },
          { field: 'status', header: 'Status' },
          { field: 'userPhoneNo', header: 'Phone No' },
          { field: 'emailID', header: 'Email ID' }
        ];
      });
      this.cleartabstate();
  }
  showConfirm1() {
    const disposable = this.dialogService.addDialog(AdmnChangepasswordComponent, {
      title: 'Admin Change Password'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          // alert('accepted');
        } else {
          // alert('declined');
        }
      });
    // We can close dialog calling disposable.unsubscribe();
    // If dialog was not closed manually close it by timeout
    // setTimeout(() => {
    //     disposable.unsubscribe();
    // }, 120000);
  }

  called() {
    console.log('tab method called');
  }
  public getdata(val: any) {
    localStorage.setItem('userdetail', JSON.stringify(val));
    GlobalValues.portalUserDetails = val;
    this.userdetail.type1Change(val["userID"])
  }
  tabstatus(statue) {
    switch (statue) {
      case "pending":
        this.pending = true;
        break;
      case "locked":
        this.locked = true;
        break;
      case "approved":
        this.approved = true;
        break;
      case "rejected":
        this.rejected = true;
        break;
      case "deactivate":
        this.deactivate = true;
        break;
      default: {
      }
    }
  }
  cleartabstate() {
    this.pending = false;
    this.locked = false;
    this.approved = false;
    this.rejected = false;
    this.deactivate = false;
  }
}
