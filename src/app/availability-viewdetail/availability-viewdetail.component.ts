import { ITradePortalService } from "../_services/index";
import { container } from "../_models/container";

import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import {
  animate,
  style,
  state,
  transition,
  trigger,
  stagger,
  group
} from "@angular/animations";
import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ViewChildren,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild
} from "@angular/core";
import { Observable } from "rxjs/Observable";


import { PagingService } from "../_services/paging.service";

import { Filters, filterValue } from "../_models/container";
import { filter } from "rxjs/operators/filter";
import { forEach } from "@angular/router/src/utils/collection";

import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

import { ContainerPipe } from "../buycontainer/container.pipe";
import { query } from "@angular/core/src/animation/dsl";

import { Title, DomSanitizer } from "@angular/platform-browser";

import { GlobalValues } from "../common/_common";

@Component({
  selector: 'app-availability-viewdetail',
  templateUrl: './availability-viewdetail.component.html',
  styleUrls: ['./availability-viewdetail.component.scss'],
  providers: [ITradePortalService, PagingService, ContainerPipe]
})
export class AvailabilityViewdetailComponent implements OnInit {
  @Input() countplus: number = 1;
   CSTMR_PO_NO: string ;

  @Input() countmin: number = 1;
  container_detail: Array<container>;
  dropdownList = [];
  sortfilterlist: string;
  showselected: boolean;
  filters: Filters;
  filterTitle: Array<string>;
  filterList: any;
  FiltersData: Array<any> = [];
  number_container: number = 0;
  FilterValue: filterValue[] = [];
  toggler: boolean = true;
  optionslist: Array<any> = [];
  modalRef: BsModalRef;
  selectedfilter: Array<any> = [];
  showmorecount: Array<number> = [];
  showstatus: Array<boolean> = [];
  map: any;
  index: number;
  count: Array<any> = [];
  filtersummary: Array<string> = [];
  summary: Array<string> = [];
  summaryoptions: Array<any> = [];
  userdetails: any;
  username: string;
  totalunits:number;
  isLoggedIn:boolean=false;
  public sL_OFFR_UNT_DTL_BIN;
  buymodel: any = [];
  response:boolean=false;
  viewshow:boolean=true;

  p:boolean;
  totalItems: any;
  constructor(
    private itradeportalservice: ITradePortalService,
    private pagerService: PagingService,
    private modalService: BsModalService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.isLoggedIn=GlobalValues.isLoggedIn
    // this.userdetails = JSON.parse(localStorage.getItem('currentUser'));
    // this.username = this.userdetails['username'];
     //this.containers.getProduct1(this.username).subscribe(data => {
      this.container_detail = JSON.parse(localStorage.getItem('viewDetail'));      
      this.number_container = this.container_detail.length;
    this.optionslist = [];
    this.titleService.setTitle(GlobalValues.containerTitle);
    this.totalunits=(this.container_detail["avL_UNTS"]+this.container_detail["expctD_UNTS"]);
  }
  increment1() {

    if(this.totalunits>this.countplus)
    {
        if (this.countplus >= 1) {
          this.countplus = this.countplus + 1;
        }
      }
     
      }
      decrement1() {
        if (this.countplus >1) {
          this.countplus = this.countplus - 1;
        }
      }
   

}
