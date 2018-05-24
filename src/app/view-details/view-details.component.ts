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
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss'],
  providers: [ITradePortalService, PagingService, ContainerPipe],
  animations: [
    trigger("containeranmiate", [
      state("in", style({ opacity: 1, transform: "translateX(0)" })),
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(-100%)"
        }),
        animate("0.2s ease-in")
      ]),
      transition("* => void", [
        animate(
          "0.2s 0.1s ease-out",
          style({
            opacity: 0,
            transform: "translateX(100%)"
          })
        )
      ])
    ])
  ]
})
export class ViewDetailsComponent implements OnInit {

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
  ) {
  this.showselected = true;
    {
      this.route.params.subscribe(params => {
        this.sL_OFFR_UNT_DTL_BIN = +params['sL_OFFR_UNT_DTL_BIN'];
      }
      );
    }
  }

  ngOnInit() {
    this.isLoggedIn=GlobalValues.isLoggedIn
    this.userdetails = JSON.parse(localStorage.getItem('currentUser'));
    this.username = this.userdetails['username'];
     //this.containers.getProduct1(this.username).subscribe(data => {
      this.container_detail = JSON.parse(localStorage.getItem('viewDetail'));      
      this.number_container = this.container_detail.length;
    this.optionslist = [];
    this.titleService.setTitle(GlobalValues.containerTitle);
    this.totalunits=(this.container_detail["avL_UNTS"]+this.container_detail["expctD_UNTS"]);
    this.filterTitle = [

      "City",
      "Depot",
      "Sales Condition",
      "Container Type",
      "Container Size",
      "Color Code",
      "Price"
    ];
    this.showmorecount = new Array(this.filterTitle.length).fill(2);
    this.showstatus = new Array(this.filterTitle.length).fill(true);
    // this.getContainers();

    //this.init();

    this.dropdownList = [
      { id: 1, itemName: "Relevance" },
      { id: 2, itemName: "Price low-high" },
      { id: 3, itemName: "Price high-low" }
    ];
  }
  // getContainers() {
  //   const vm = this;
  //   this.userdetails = JSON.parse(localStorage.getItem('currentUser'));
  //   this.username = this.userdetails['username'];
  //    //this.containers.getProduct1(this.username).subscribe(data => {
  //     this.container_detail = GlobalValues.viewDetail;
  //     // for (let i in this.container_detail) {


  //     //   this.container_detail[0].Image = 'assets/images/' + this.container_detail[0]['clR_CD_ID'] + '.jpg';

  //     // }
  //     //}
 
  //     this.filterList = {

  //       ctY_NAM: [""],
  //       dpT_CD: [""],
  //       sL_CNDTN_NAM: [""],
  //       cntnR_TYP_CD: [""],
  //       cntnR_SZ_CD: [""],
  //       clR_CD_NM: [-1],
  //       sL_PRC_NC: [-1]
  //     };

  //     //************************************* */
  //     // for (let i in vm.filterList) {
  //     //   vm.filterList[i] = vm.container_detail.map(function (obj) {
  //     //     return obj[i];
  //     //   });
  //     //   vm.filterList[i] = vm.filterList[i].filter(function (v, j) {
  //     //     return vm.filterList[i];
  //     //   });
  //     //   vm.map = vm.filterList[i].reduce(function (prev, cur) {
  //     //     prev[cur] = (prev[cur] || 0) + 1;
  //     //     return prev;
  //     //   }, {});

  //     //   vm.count.push(vm.map);
  //     // }

  //     //**************************** */

  //     // for (let i in vm.filterList) {
  //     //   vm.filterList[i] = vm.container_detail.map(function (obj) {
  //     //     return obj[i];
  //     //   });
  //     //   vm.filterList[i] = vm.filterList[i].filter(function (v, j) {
  //     //     return vm.filterList[i].indexOf(v) == j;
  //     //   });
  //     // }

  //     // this.FiltersData = [];
  //     // this.FiltersData.push(vm.filterList);

  //     // vm.FilterValue = [];
  //     // for (let i = 0; i < Object.keys(vm.FiltersData[0]).length; i++) {
  //     //   let obj = {
  //     //     filterTitle: "",
  //     //     filterName: "",
  //     //     options: [],
  //     //     counts: []
  //     //   };

  //     //   obj.filterTitle = vm.filterTitle[i];
  //     //   obj.filterName = Object.keys(vm.FiltersData[0])[i];
  //     //   obj.options = vm.FiltersData[0][Object.keys(vm.FiltersData[0])[i]];
  //     //   obj.counts = vm.count;
  //     //   vm.FilterValue.push(obj);
  //     // }
  //   //});
  // }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  togglefilter(options: any, index: number) {
    this.optionslist = options;
    this.toggler = !this.toggler;
    this.index = index;
  }
  toggleback() {
    this.toggler = true;
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

  addToCart(){
    if(this.isLoggedIn=true)
    {
    if(this.container_detail["sL_PRC_NC"]>0)
    {
      var vlD_TO=new Date(this.container_detail["vlD_TO"])
      if (vlD_TO=>Date.now)
      {
        this.container_detail["nO_OF_UNTS"]=this.countplus;
        this.container_detail["CSTMR_PO_NO"]=this.CSTMR_PO_NO;
        this.itradeportalservice.createCartList(this.container_detail,this.username)
        .subscribe( data => {
          if (data['status'] === 'true') {
            this.toastr.clear();
            this.toastr.success(data['message'], '',{ closeButton: true});
            } else {
            this.toastr.clear();
            this.toastr.error(data['message'], '');
          }
        },
        Error => {
          this.toastr.clear();
          this.toastr.error('There is an Error in Adding to cart Please contact Administrator', '');
        });
        //console.log(this.container_detail);
      }
      else
      {
        this.toastr.clear();
        this.toastr.error('Tarif Valid Date is Expired.Please contact iTrade Admin.', '');
      }
      
    }
    else
    {
      this.toastr.clear();
      this.toastr.error('Sale Price not defined for the selected container Details. Please contact Us.', '');
    }
    
  }
  else
{
  this.toastr.clear();
  this.toastr.error('Please login..', '');
  this.router.navigate(['/login']);
}

}
createSaleCart(){
  if((this.container_detail["avL_UNTS"]+this.container_detail["expctD_UNTS"])){

 
  if(this.container_detail["sL_PRC_NC"]>0)
  {
    var vlD_TO=new Date(this.container_detail["vlD_TO"])
      if (vlD_TO=>Date.now)
      {
        this.viewshow=false;
  this.response =true;
  
  this.container_detail["nO_OF_UNTS"]=this.countplus;
        this.container_detail["CSTMR_PO_NO"]=this.CSTMR_PO_NO;
    this.buymodel.push(this.container_detail)
  this.itradeportalservice.createSaleCart(this.buymodel,this.username)
  .subscribe( data => {
    if (data['status'] === 'true') {
      this.response =false;
      this.viewshow=true;
      this.toastr.clear();
      this.toastr.success(data['message'], '',{ closeButton: true});
      if(this.container_detail["avL_UNTS"]>0){
        this.container_detail["avL_UNTS"]=this.container_detail["avL_UNTS"]-this.countplus;
      } else {
        this.container_detail["expctD_UNTS"]=this.container_detail["expctD_UNTS"]-this.countplus;
      }
     
    
      } else {
        this.response =false;
        this.viewshow=true;
      this.toastr.clear();
      this.toastr.error(data['message'], '');
    }
  },
  Error => {
    this.response =false;
    this.viewshow=true;
    this.toastr.clear();
    this.toastr.error('There is an Error in Creating Sale Cart Please contact Administrator', '');
  });
    }
      else
      {
        this.toastr.clear();
        this.toastr.error('Tarif Valid Date is Expired.Please contact iTrade Admin.', '');
      }
}  else
{
  this.toastr.clear();
  this.toastr.error('Sale Price not defined for the selected container Details. Please contact Us.', '');
}
  } else{
    this.toastr.clear();
  this.toastr.error('Containers Not available . Please contact Us.', '');
  } 

}


}
