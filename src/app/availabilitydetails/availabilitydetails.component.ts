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
import { ContainerService } from "../_services/container.service";
import { container, filterValues } from "../_models/container";
import { PagingService } from "../_services/paging.service";
import { Filters, filterValue } from "../_models/container";
import { filter } from "rxjs/operators/filter";
import { forEach } from "@angular/router/src/utils/collection";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { ContainerPipeAvl } from "./container.pipe";
import { SortbyPipeAvl } from "./sortby.pipe";
import { query } from "@angular/core/src/animation/dsl";
import { Title, DomSanitizer } from "@angular/platform-browser";
import { PortaluserprofileService } from "../_services/index";
import { GlobalValues } from "../common/_common";
import { Http } from "@angular/http";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import { $ } from "protractor";
import { retry } from "rxjs/operators";

@Component({
  selector: 'app-availabilitydetails',
  templateUrl: './availabilitydetails.component.html',
  styleUrls: ['./availabilitydetails.component.scss'],
  providers: [ContainerService, PagingService, ContainerPipeAvl, PortaluserprofileService, SortbyPipeAvl],
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
export class AvailabilitydetailsComponent implements OnInit {
  container_detail: Array<container>;
  dropdownList = [];
  sortfilterlist: string;
  selectedSize: boolean;
  selectedSizea: boolean;
  showselected: boolean;
  totalItems: any;
  filters: Filters;
  filterTitle: Array<string>;
  cntyfilterTitle: Array<string>;
  filterList: any;
  FiltersData: Array<any> = [];
  cntyFiltersData: Array<any> = [];
  number_container: number = 0;
  FilterValue: filterValue[] = [];
  cntyFilterValue: filterValue[] = [];
  toggler: boolean = true;
  optionslist: Array<any> = [];
  modalRef: BsModalRef;
  selectedfilter: Array<any> = [];
  cntyselectedfilter: Array<any> = [];
  p: any;

  map: any;
  cntymap: any;
  index: number;
  count: Array<any> = [];
  cntycount: Array<any> = [];
  filtersummary: Array<string> = [];
  summary: Array<string> = [];
  summaryoptions: Array<any> = [];
  userdetails: string;
  username: string;

  orderby: string = "";
  orderstatus: boolean = false;
  orderbyststus: string;
  filterIndex: number = 0;
  cntyfilterIndex: number = 0;
  loadingcnt: boolean = false;

  selcntry: Array<any> = [];
  selcty: Array<any> = [];
  seldopt: Array<any> = [];

  filteredData: Array<any> = [];
  checkboxFilterValue: Array<any> = [];

  LstOfCnty: Array<any> = [];

  sldCnty: Array<any> = [];
  sldCity: Array<any> = [];
  sldDpt: Array<any> = [];
  sldSlCnd: Array<any> = [];
  sldCnttype: Array<any> = [];
  sldCntsize: Array<any> = [];
  sldClrcd: Array<any> = [];
  sldPrc: Array<any> = [];

  fldCnty: Array<any> = [];
  fldCity: Array<any> = [];
  fldDpt: Array<any> = [];
  cmmfld: Array<any> = [];

  cityshowmorecount: number;
  cityshowstatus: boolean;
  cntyshowmorecount: number;
  cntyshowstatus: boolean;
  dptshowmorecount: number;
  dptshowstatus: boolean;
  slcndshowmorecount: number;
  slcndshowstatus: boolean;
  cnttypshowmorecount: number;
  cnttypshowstatus: boolean;
  cntcdshowmorecount: number;
  cntcdshowstatus: boolean;
  prcshowmorecount: number;
  prceshowstatus: boolean;
  cntszshowmorecount: number;
  cntszshowstatus: boolean;

  cntyLst: Array<filterValues> = [];
  cityLst: Array<filterValues> = [];
  dptLst: Array<filterValues> = [];
  slcndLst: Array<filterValues> = [];
  cnttypLst: Array<filterValues> = [];
  cntszLst: Array<filterValues> = [];
  clrcdLst: Array<filterValues> = [];
  pceLst: Array<filterValues> = [];

  name: Array<any> = [];
  unit: Array<any> = [];
  mobFilterTitle: string;
  Priceval: Array<any> = [
    { id: 5, itemName: "0 - 1000" },
    { id: 1, itemName: "1001 - 1500" },
    { id: 2, itemName: "1501 - 2000" },
    { id: 3, itemName: "2001 - 2500" },
    { id: 4, itemName: "2501 - 3000" }
  ];
  constructor(
    private containers: ContainerService,
    private PortaluserprofileService: PortaluserprofileService,
    private pagerService: PagingService,
    private modalService: BsModalService,
    private titleService: Title,
    private http: Http
  ) { }
  get() {
    this.selectedSize = true;
    this.selectedSizea = false;
    return this.selectedSize;
  }
  set() {
    this.selectedSizea = true;
    this.selectedSize = false;
    return this.selectedSizea;
  }
  ngOnInit() {
    // this.optionslist = [];
    this.titleService.setTitle(GlobalValues.containerTitle);

    this.cityshowmorecount = 2;
    this.cityshowstatus = true;
    this.cntyshowmorecount = 2;
    this.cntyshowstatus = true;
    this.dptshowmorecount = 2;
    this.dptshowstatus = true;
    this.slcndshowmorecount = 2;
    this.slcndshowstatus = true;
    this.cnttypshowmorecount = 2;
    this.cnttypshowstatus = true;
    this.cntcdshowmorecount = 2;
    this.cntcdshowstatus = true;
    this.prcshowmorecount = 2;
    this.prceshowstatus = true;
    this.cntszshowmorecount = 2;
    this.cntszshowstatus = true;

    this.getContainers();

    //this.init();

    this.dropdownList = [
      { id: 1, itemName: "Size low-high" },
      { id: 2, itemName: "Size high-low" },
      { id: 3, itemName: "Grade New" },
      { id: 4, itemName: "Grade Used" }
    ];
  }
  key: string = "name"; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  getContainers() {
    const vm = this;
    this.userdetails = JSON.parse(localStorage.getItem("currentUser"));

    if (this.userdetails) {
      this.username = this.userdetails["username"];
    }
    GlobalValues.username = this.username;

    this.containers.getProduct1(this.username).subscribe(data => {


      this.container_detail = data;
      this.number_container = this.container_detail.length;
      GlobalValues.cntrDtls = data;
      for (let i in this.container_detail) {
        this.container_detail[i].Image =
          "assets/images/" +
          this.container_detail[i]["clR_CD_ID"] +
          this.container_detail[i]["cntnR_SZ_CD"] +
          this.container_detail[i]["cntnR_TYP_CD"] +
          ".jpg";
      }

      this.getFilter();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  togglefilter(type: string) {
    if (type == "Country") {
      this.optionslist = this.cntyLst;
      this.mobFilterTitle = type;
      this.selectedfilter = this.sldCnty;
      this.toggler = !this.toggler;
    }
    if (type == "City") {
      this.optionslist = this.cityLst;
      this.mobFilterTitle = type;
      this.selectedfilter = this.sldCity;
      this.toggler = !this.toggler;
    }
    if (type == "Depot") {
      this.optionslist = this.dptLst;
      this.mobFilterTitle = type;
      this.selectedfilter = this.sldDpt;
      this.toggler = !this.toggler;
    }
    if (type == "SaleCondition") {
      this.optionslist = this.slcndLst;
      this.mobFilterTitle = type;
      this.selectedfilter = this.sldSlCnd;
      this.toggler = !this.toggler;
    }
    if (type == "ContainerType") {
      this.optionslist = this.cnttypLst;
      this.mobFilterTitle = type;
      this.selectedfilter = this.sldCnttype;
      this.toggler = !this.toggler;
    }
    if (type == "ContainerSize") {
      this.optionslist = this.cntszLst;
      this.mobFilterTitle = type;
      this.selectedfilter = this.sldCntsize;
      this.toggler = !this.toggler;
    }
    if (type == "ColourCode") {
      this.optionslist = this.clrcdLst;
      this.mobFilterTitle = type;
      this.selectedfilter = this.sldClrcd;
      this.toggler = !this.toggler;
    }

    // this.toggler = !this.toggler;
    // this.index = index;
  }
  toggleback() {
    this.toggler = true;
  }

  logCheckboxmobile(filterval: string, value: any) {
    const vm = this;
    let index: number;
    if (value.checked) {
      vm.selectedfilter.push(filterval);
    } else {
      index = vm.selectedfilter.indexOf(filterval);
      vm.selectedfilter.splice(index, 1);
    }
  }

  filterCheckBoxDetail(type, item, checkbox) {
    const vm = this;
    let index: number;
    let isChecked = checkbox.checked;
    switch (type) {
      case "Country": {
        if (isChecked) {
          this.sldCnty.push(item);
          this.sldCity = [];
          this.sldDpt = [];
          this.sldClrcd = [];
          this.sldCntsize = [];
          this.sldCnttype = [];
          this.sldPrc = [];
          this.sldSlCnd = [];
        } else {
          index = vm.sldCnty.indexOf(item);
          vm.sldCnty.splice(index, 1);
        }
        break;
      }
      case "City": {
        if (isChecked) {
          this.sldCity.push(item);
          // this.sldCity = [];
          this.sldDpt = [];
          this.sldSlCnd = [];
          this.sldClrcd = [];
          this.sldCntsize = [];
          this.sldCnttype = [];
          this.sldPrc = [];
        } else {
          index = vm.sldCity.indexOf(item);
          vm.sldCity.splice(index, 1);
        }
        break;
      }
      case "Depot": {
        if (isChecked) {
          this.sldDpt.push(item);
          // this.sldCity = [];
          // this.sldDpt = [];
          this.sldSlCnd = [];
          this.sldClrcd = [];
          this.sldCntsize = [];
          this.sldCnttype = [];
          this.sldPrc = [];
        } else {
          index = vm.sldDpt.indexOf(item);
          vm.sldDpt.splice(index, 1);
        }
        break;
      }
      case "SaleCondition": {
        if (isChecked) {
          this.sldSlCnd.push(item);
          // this.sldCity = [];
          // this.sldDpt = [];
          // this.sldSlCnd=[];
          this.sldClrcd = [];
          this.sldCntsize = [];
          this.sldCnttype = [];
          this.sldPrc = [];
        } else {
          index = vm.sldSlCnd.indexOf(item);
          vm.sldSlCnd.splice(index, 1);
        }
        break;
      }
      case "ContainerType": {
        if (isChecked) {
          this.sldCnttype.push(item);
          // this.sldCity = [];
          // this.sldDpt = [];
          // this.sldSlCnd=[];
          this.sldClrcd = [];
          this.sldCntsize = [];
          // this.sldCnttype = [];
          this.sldPrc = [];
        } else {
          index = vm.sldCnttype.indexOf(item);
          vm.sldCnttype.splice(index, 1);
        }
        break;
      }
      case "ContainerSize": {
        if (isChecked) {
          this.sldCntsize.push(item);
          // this.sldCity = [];
          // this.sldDpt = [];
          // this.sldSlCnd=[];
          this.sldClrcd = [];
          // this.sldCntsize = [];
          // this.sldCnttype = [];
          this.sldPrc = [];
        } else {
          index = vm.sldCntsize.indexOf(item);
          vm.sldCntsize.splice(index, 1);
        }
        break;
      }
      case "ColourCode": {
        if (isChecked) {
          this.sldClrcd.push(item);
        } else {
          index = vm.sldClrcd.indexOf(item);
          vm.sldClrcd.splice(index, 1);
        }
        break;
      }
    }
  }

  bindCheckBoxDetails(checkBoxType, selectedItem, checkbox) {
    switch (checkBoxType) {
      case "Country":
        // this.bindCityCheckBox(checkBoxType);
        // this.bindDepotCheckBox(checkBoxType);
        break;
      case "City":
        // this.bindDepotCheckBox(checkBoxType);
        break;
      case "Depot":
        break;
      default:
        break;
    }
  }

  bindCountCheckBox(uniquevalue, totalvalue, type) {
    let key: any;
    let list: any;
    let count: number = 0;
    let unit: any = [];
    if (type == "Depot") {
      key = "dpT_CD";
      list = this.dptLst;
    }
    if (type == "City") {
      key = "ctY_NAM";
      list = this.cityLst;
    }
    if (type == "SaleCondition") {
      key = "sL_CNDTN_NAM";
      list = this.slcndLst;
    }
    if (type == "ContainerType") {
      key = "cntnR_TYP_CD";
      list = this.cnttypLst;
    }
    if (type == "ContainerSize") {
      key = "cntnR_SZ_CD";
      list = this.cntszLst;
    }
    if (type == "ColourCode") {
      key = "clR_CD_NM";
      list = this.clrcdLst;
    }
    // if (type == "Price") {
    //   key = "sL_PRC_NC";
    //   list = this.pceLst;
    // }

    for (let j in uniquevalue) {
      for (let i in totalvalue) {
        if (uniquevalue[j] == totalvalue[i][key]) {
          count += totalvalue[i]["avL_UNTS"];
        }
      }
      unit.push(count);
      count = 0;
    }

    for (let index = 0; index < uniquevalue.length; index++) {
      const element = uniquevalue[index];
      const unitelement = unit[index];
      // filteredDepot.push(element);

      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = element;
      obj.avlUnt = unit[index];
      list.push(obj);
    }
    unit = [];
  }

  bindDepotCheckBox(chkType) {
    let country = this.sldCnty;
    let city = this.sldCity;
    let depo = this.sldDpt;
    let containerData: any = GlobalValues.cntrDtls;
    let filteredDepot: any = [];
    this.dptLst = [];

    if (chkType == "Country") {
      let uniqueDepot: any;
      let uniqueSaleCondition: any;
      let uniqueContainerType: any;
      let uniqueCountainerSize: any;
      let uniqueColourCode: any;
      let uniquePrice: any;
      let count: number = 0;
      let unit: any = [];
      if (city.length > 0) {
        for (let index = 0; index < city.length; index++) {
          const element = city[index];
          let containerDetail = containerData.filter(x => x.ctY_NAM == element);
          const depot = containerDetail.map(data => data.dpT_CD);
          uniqueDepot = depot.filter((x, i, a) => x && a.indexOf(x) === i);
          this.bindCountCheckBox(uniqueDepot, containerData, "Depot");

          const SaleCondition = containerDetail.map(data => data.sL_CNDTN_NAM);
          uniqueSaleCondition = SaleCondition.filter(
            (x, i, a) => x && a.indexOf(x) === i
          );
          this.bindCountCheckBox(
            uniqueSaleCondition,
            containerData,
            "SaleCondition"
          );

          const ContainerType = containerDetail.map(data => data.cntnR_TYP_CD);
          uniqueContainerType = ContainerType.filter(
            (x, i, a) => x && a.indexOf(x) === i
          );
          this.bindCountCheckBox(
            uniqueContainerType,
            containerData,
            "ContainerCode"
          );
        }
      } else {
        for (let index = 0; index < country.length; index++) {
          const element = country[index];
          let countryData = containerData.filter(x => x.cntrY_NAM == element);
          const depot = countryData.map(data => data.dpT_CD);
          uniqueDepot = depot.filter((x, i, a) => x && a.indexOf(x) === i);
          this.bindCountCheckBox(uniqueDepot, containerData, "Depot");
        }
      }
    } else if (chkType == "City") {
      let unit: any = [];
      let count: number = 0;
      if (city.length > 0) {
        for (let index = 0; index < city.length; index++) {
          const element = city[index];
          let containerDetail = containerData.filter(x => x.ctY_NAM == element);
          const depot = containerDetail.map(data => data.dpT_CD);
          let uniqueDepot = depot.filter((x, i, a) => x && a.indexOf(x) === i);
          this.bindCountCheckBox(uniqueDepot, containerData, "Depot");
        }
      } else {
        unit = [];
        count = 0;
        for (let index = 0; index < country.length; index++) {
          const element = country[index];
          let countryData = containerData.filter(x => x.cntrY_NAM == element);
          const depot = countryData.map(data => data.dpT_CD);
          let uniqueDepot = depot.filter((x, i, a) => x && a.indexOf(x) === i);
          this.bindCountCheckBox(uniqueDepot, containerData, "Depot");
        }
      }
    }
  }

  // bindCityCheckBox(chkType) {
  //   let country = this.sldCnty;
  //   let city = this.sldCity;
  //   let depo = this.sldDpt;
  //   let containerData: any = GlobalValues.cntrDtls;
  //   let coutContainerData: any = GlobalValues.cntrDtls;
  //   let count: any = 0;
  //   let unit: any = [];

  //   let filteredCity: any = [];
  //   this.cityLst = [];
  //   if (country.length > 0) {
  //     for (let index = 0; index < country.length; index++) {
  //       const element = country[index];
  //       let countryData = containerData.filter(x => x.cntrY_NAM == element);
  //       const cities = countryData.map(data => data.ctY_NAM);
  //       let uniqueCity = cities.filter((x, i, a) => x && a.indexOf(x) === i);
  //       this.bindCountCheckBox(uniqueCity, containerData, "City");
  //     }
  //   } else {
  //     this.getFilter();
  //   }
  // }

  filterCase() {
    let country = this.sldCnty;
    let city = this.sldCity;
    let depo = this.sldDpt;
    if (
      (country.length == 0 && city.length == 0 && depo.length != 0) ||
      (country.length == 0 && city.length != 0 && depo.length != 0) ||
      (country.length != 0 && city.length == 0 && depo.length != 0) ||
      (country.length != 0 && city.length != 0 && depo.length != 0)
    ) {
      return "DPT";
    } else if (
      (country.length == 0 && city.length != 0 && depo.length == 0) ||
      (country.length != 0 && city.length != 0 && depo.length == 0)
    ) {
      return "CTY";
    } else if (country.length != 0 && city.length == 0 && depo.length == 0) {
      return "CNTRY";
    } else {
      return "DEFLT";
    }
  }

  doFilter(checkBoxType, selectedItem, checkbox) {
    let country = this.sldCnty;
    let city = this.sldCity;
    let depo = this.sldDpt;
    let salecondition = this.sldSlCnd;
    let containertype = this.sldCnttype;
    let containersize = this.sldCntsize;
    let colorcode = this.sldClrcd;
    let price = this.sldPrc;

    let containerData: any = GlobalValues.cntrDtls;
    let filteredDetails: any = [];
    let currentContainerData: any = GlobalValues.currentcntrDtls;

    if (country.length != 0 && city.length == 0 && depo.length == 0) {
      this.container_detail = [];
      for (let index = 0; index < country.length; index++) {
        const element = country[index];
        filteredDetails = containerData.filter(x => x.cntrY_NAM == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // GlobalValues.currentcntrDtls = this.container_detail;
      // this.getFilterdata(this.container_detail, "default");
    }
    if (country.length == 0 && city.length != 0 && depo.length == 0) {
      this.container_detail = [];
      for (let index = 0; index < city.length; index++) {
        const element = city[index];
        filteredDetails = containerData.filter(x => x.ctY_NAM == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // GlobalValues.currentcntrDtls = this.container_detail;
      // this.getFilterdata(this.container_detail, "CTY");
    }

    if (country.length == 0 && city.length == 0 && depo.length != 0) {
      this.container_detail = [];
      for (let index = 0; index < depo.length; index++) {
        const element = depo[index];
        filteredDetails = containerData.filter(x => x.dpT_CD == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // GlobalValues.currentcntrDtls = this.container_detail;
      // this.getFilterdata(this.container_detail, "DPT");
    }
    if (country.length != 0 && city.length != 0 && depo.length == 0) {
      this.container_detail = [];
      let tempcountry: any = [];
      for (let index = 0; index < country.length; index++) {
        const element = country[index];

        filteredDetails = containerData.filter(x => x.cntrY_NAM == element);

        filteredDetails.forEach(element => {
          tempcountry.push(element);
        });
      }
      for (let index = 0; index < city.length; index++) {
        const element = city[index];

        filteredDetails = tempcountry.filter(x => x.ctY_NAM == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // GlobalValues.currentcntrDtls = this.container_detail;
      // this.getFilterdata(this.container_detail, "CTY");
    }

    if (country.length == 0 && city.length != 0 && depo.length != 0) {
      this.container_detail = [];
      let tempcity: any = [];
      for (let index = 0; index < city.length; index++) {
        const element = city[index];

        filteredDetails = containerData.filter(x => x.ctY_NAM == element);

        filteredDetails.forEach(element => {
          tempcity.push(element);
        });
      }
      for (let index = 0; index < depo.length; index++) {
        const element = depo[index];

        filteredDetails = tempcity.filter(x => x.dpT_CD == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // GlobalValues.currentcntrDtls = this.container_detail;
      // this.getFilterdata(this.container_detail, "DPT");
    }

    if (country.length != 0 && city.length == 0 && depo.length != 0) {
      this.container_detail = [];
      let tempcountry: any = [];
      for (let index = 0; index < country.length; index++) {
        const element = country[index];

        filteredDetails = containerData.filter(x => x.cntrY_NAM == element);

        filteredDetails.forEach(element => {
          tempcountry.push(element);
        });
      }
      for (let index = 0; index < depo.length; index++) {
        const element = depo[index];

        filteredDetails = tempcountry.filter(x => x.dpT_CD == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // GlobalValues.currentcntrDtls = this.container_detail;
      // this.getFilterdata(this.container_detail, "DPT");
    }

    if (country.length != 0 && city.length != 0 && depo.length != 0) {
      this.container_detail = [];
      let tempcountry: any = [];
      let tempcity: any = [];
      for (let index = 0; index < country.length; index++) {
        const element = country[index];

        filteredDetails = containerData.filter(x => x.cntrY_NAM == element);

        filteredDetails.forEach(element => {
          tempcountry.push(element);
        });
      }
      for (let index = 0; index < city.length; index++) {
        const element = city[index];

        filteredDetails = tempcountry.filter(x => x.ctY_NAM == element);

        filteredDetails.forEach(element => {
          tempcity.push(element);
        });
      }
      for (let index = 0; index < depo.length; index++) {
        const element = depo[index];

        filteredDetails = tempcity.filter(x => x.dpT_CD == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // GlobalValues.currentcntrDtls = this.container_detail;
      // this.getFilterdata(this.container_detail, "DPT");
    }
    GlobalValues.currentcntrDtls = this.container_detail;
    currentContainerData = GlobalValues.currentcntrDtls;
    if (
      salecondition.length != 0 &&
      containertype.length != 0 &&
      containersize.length != 0 &&
      colorcode.length != 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      for (let index = 0; index < salecondition.length; index++) {
        const element = salecondition[index];

        filteredDetails = currentContainerData.filter(
          x => x.sL_CNDTN_NAM == element
        );

        filteredDetails.forEach(element => {
          tempsalecondition.push(element);
        });
      }
      for (let index = 0; index < containertype.length; index++) {
        const element = containertype[index];

        filteredDetails = tempsalecondition.filter(
          x => x.cntnR_TYP_CD == element
        );

        filteredDetails.forEach(element => {
          tempcontainertype.push(element);
        });
      }
      for (let index = 0; index < containersize.length; index++) {
        const element = containersize[index];

        filteredDetails = tempcontainertype.filter(
          x => x.cntnR_SZ_CD == element
        );

        filteredDetails.forEach(element => {
          tempcontainersize.push(element);
        });
      }
      for (let index = 0; index < colorcode.length; index++) {
        const element = colorcode[index];

        filteredDetails = tempcontainersize.filter(x => x.clR_CD_NM == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }

      // this.getFilterdata(this.container_detail, "CLR");
    }
    if (
      salecondition.length != 0 &&
      containertype.length != 0 &&
      containersize.length != 0 &&
      colorcode.length == 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      for (let index = 0; index < salecondition.length; index++) {
        const element = salecondition[index];

        filteredDetails = currentContainerData.filter(
          x => x.sL_CNDTN_NAM == element
        );

        filteredDetails.forEach(element => {
          tempsalecondition.push(element);
        });
      }
      for (let index = 0; index < containertype.length; index++) {
        const element = containertype[index];

        filteredDetails = tempsalecondition.filter(
          x => x.cntnR_TYP_CD == element
        );

        filteredDetails.forEach(element => {
          tempcontainertype.push(element);
        });
      }
      for (let index = 0; index < containersize.length; index++) {
        const element = containersize[index];

        filteredDetails = tempcontainertype.filter(
          x => x.cntnR_SZ_CD == element
        );

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // for (let index = 0; index < colorcode.length; index++) {
      //   const element = colorcode[index];

      //   filteredDetails = tempcontainersize.filter(x => x.clR_CD_NM == element);

      //   filteredDetails.forEach(element => {
      //     this.container_detail.push(element);
      //   });
      // }

      // this.getFilterdata(this.container_detail, "SZE");
    }
    if (
      salecondition.length != 0 &&
      containertype.length != 0 &&
      containersize.length == 0 &&
      colorcode.length != 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      for (let index = 0; index < salecondition.length; index++) {
        const element = salecondition[index];

        filteredDetails = currentContainerData.filter(
          x => x.sL_CNDTN_NAM == element
        );

        filteredDetails.forEach(element => {
          tempsalecondition.push(element);
        });
      }
      for (let index = 0; index < containertype.length; index++) {
        const element = containertype[index];

        filteredDetails = tempsalecondition.filter(
          x => x.cntnR_TYP_CD == element
        );

        filteredDetails.forEach(element => {
          tempcontainertype.push(element);
        });
      }
      // for (let index = 0; index < containersize.length; index++) {
      //   const element = containersize[index];

      //   filteredDetails = tempcontainertype.filter(x => x.cntnR_SZ_CD == element);

      //   filteredDetails.forEach(element => {
      //     tempcontainersize.push(element);
      //   });
      // }
      for (let index = 0; index < colorcode.length; index++) {
        const element = colorcode[index];

        filteredDetails = tempcontainertype.filter(x => x.clR_CD_NM == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }

      // this.getFilterdata(this.container_detail, "CLR");
    }
    if (
      salecondition.length != 0 &&
      containertype.length != 0 &&
      containersize.length == 0 &&
      colorcode.length == 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      for (let index = 0; index < salecondition.length; index++) {
        const element = salecondition[index];

        filteredDetails = currentContainerData.filter(
          x => x.sL_CNDTN_NAM == element
        );

        filteredDetails.forEach(element => {
          tempsalecondition.push(element);
        });
      }
      for (let index = 0; index < containertype.length; index++) {
        const element = containertype[index];

        filteredDetails = tempsalecondition.filter(
          x => x.cntnR_TYP_CD == element
        );

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // for (let index = 0; index < containersize.length; index++) {
      //   const element = containersize[index];

      //   filteredDetails = tempcontainertype.filter(x => x.cntnR_SZ_CD == element);

      //   filteredDetails.forEach(element => {
      //     tempcontainersize.push(element);
      //   });
      // }
      // for (let index = 0; index < colorcode.length; index++) {
      //   const element = colorcode[index];

      //   filteredDetails = tempcontainersize.filter(x => x.clR_CD_NM == element);

      //   filteredDetails.forEach(element => {
      //     this.container_detail.push(element);
      //   });
      // }

      this.getFilterdata(this.container_detail, "TYP");
    }
    if (
      salecondition.length != 0 &&
      containertype.length == 0 &&
      containersize.length != 0 &&
      colorcode.length != 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      for (let index = 0; index < salecondition.length; index++) {
        const element = salecondition[index];

        filteredDetails = currentContainerData.filter(
          x => x.sL_CNDTN_NAM == element
        );

        filteredDetails.forEach(element => {
          tempsalecondition.push(element);
        });
      }
      // for (let index = 0; index < containertype.length; index++) {
      //   const element = containertype[index];

      //   filteredDetails = tempsalecondition.filter(x => x.cntnR_TYP_CD == element);

      //   filteredDetails.forEach(element => {
      //     tempcontainertype.push(element);
      //   });
      // }
      for (let index = 0; index < containersize.length; index++) {
        const element = containersize[index];

        filteredDetails = tempsalecondition.filter(
          x => x.cntnR_SZ_CD == element
        );

        filteredDetails.forEach(element => {
          tempcontainersize.push(element);
        });
      }
      for (let index = 0; index < colorcode.length; index++) {
        const element = colorcode[index];

        filteredDetails = tempcontainersize.filter(x => x.clR_CD_NM == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }

      // this.getFilterdata(this.container_detail, "CLR");
    }
    if (
      salecondition.length != 0 &&
      containertype.length == 0 &&
      containersize.length != 0 &&
      colorcode.length == 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      for (let index = 0; index < salecondition.length; index++) {
        const element = salecondition[index];

        filteredDetails = currentContainerData.filter(
          x => x.sL_CNDTN_NAM == element
        );

        filteredDetails.forEach(element => {
          tempsalecondition.push(element);
        });
      }
      // for (let index = 0; index < containertype.length; index++) {
      //   const element = containertype[index];

      //   filteredDetails = tempsalecondition.filter(x => x.cntnR_TYP_CD == element);

      //   filteredDetails.forEach(element => {
      //     tempcontainertype.push(element);
      //   });
      // }
      for (let index = 0; index < containersize.length; index++) {
        const element = containersize[index];

        filteredDetails = tempsalecondition.filter(
          x => x.cntnR_SZ_CD == element
        );

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // for (let index = 0; index < colorcode.length; index++) {
      //   const element = colorcode[index];

      //   filteredDetails = tempcontainersize.filter(x => x.clR_CD_NM == element);

      //   filteredDetails.forEach(element => {
      //     this.container_detail.push(element);
      //   });
      // }

      // this.getFilterdata(this.container_detail, "SZE");
    }
    if (
      salecondition.length != 0 &&
      containertype.length == 0 &&
      containersize.length == 0 &&
      colorcode.length != 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      for (let index = 0; index < salecondition.length; index++) {
        const element = salecondition[index];

        filteredDetails = currentContainerData.filter(
          x => x.sL_CNDTN_NAM == element
        );

        filteredDetails.forEach(element => {
          tempsalecondition.push(element);
        });
      }
      // for (let index = 0; index < containertype.length; index++) {
      //   const element = containertype[index];

      //   filteredDetails = tempsalecondition.filter(
      //     x => x.cntnR_TYP_CD == element
      //   );

      //   filteredDetails.forEach(element => {
      //     tempcontainertype.push(element);
      //   });
      // }
      // for (let index = 0; index < containersize.length; index++) {
      //   const element = containersize[index];

      //   filteredDetails = tempcontainertype.filter(
      //     x => x.cntnR_SZ_CD == element
      //   );

      //   filteredDetails.forEach(element => {
      //     tempcontainersize.push(element);
      //   });
      // }
      for (let index = 0; index < colorcode.length; index++) {
        const element = colorcode[index];

        filteredDetails = tempsalecondition.filter(x => x.clR_CD_NM == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }

      // this.getFilterdata(this.container_detail, "CLR");
    }
    if (
      salecondition.length != 0 &&
      containertype.length == 0 &&
      containersize.length == 0 &&
      colorcode.length == 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      for (let index = 0; index < salecondition.length; index++) {
        const element = salecondition[index];

        filteredDetails = currentContainerData.filter(
          x => x.sL_CNDTN_NAM == element
        );

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }

      // this.getFilterdata(this.container_detail, "SAL");
    }
    if (
      salecondition.length == 0 &&
      containertype.length != 0 &&
      containersize.length != 0 &&
      colorcode.length != 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      // for (let index = 0; index < salecondition.length; index++) {
      //   const element = salecondition[index];

      //   filteredDetails = currentContainerData.filter(
      //     x => x.sL_CNDTN_NAM == element
      //   );

      //   filteredDetails.forEach(element => {
      //     tempsalecondition.push(element);
      //   });
      // }
      for (let index = 0; index < containertype.length; index++) {
        const element = containertype[index];

        filteredDetails = currentContainerData.filter(
          x => x.cntnR_TYP_CD == element
        );

        filteredDetails.forEach(element => {
          tempcontainertype.push(element);
        });
      }
      for (let index = 0; index < containersize.length; index++) {
        const element = containersize[index];

        filteredDetails = tempcontainertype.filter(
          x => x.cntnR_SZ_CD == element
        );

        filteredDetails.forEach(element => {
          tempcontainersize.push(element);
        });
      }
      for (let index = 0; index < colorcode.length; index++) {
        const element = colorcode[index];

        filteredDetails = tempcontainersize.filter(x => x.clR_CD_NM == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }

      // this.getFilterdata(this.container_detail, "CLR");
    }
    if (
      salecondition.length == 0 &&
      containertype.length != 0 &&
      containersize.length == 0 &&
      colorcode.length != 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      // for (let index = 0; index < salecondition.length; index++) {
      //   const element = salecondition[index];

      //   filteredDetails = currentContainerData.filter(
      //     x => x.sL_CNDTN_NAM == element
      //   );

      //   filteredDetails.forEach(element => {
      //     tempsalecondition.push(element);
      //   });
      // }
      for (let index = 0; index < containertype.length; index++) {
        const element = containertype[index];

        filteredDetails = currentContainerData.filter(
          x => x.cntnR_TYP_CD == element
        );

        filteredDetails.forEach(element => {
          tempcontainertype.push(element);
        });
      }
      // for (let index = 0; index < containersize.length; index++) {
      //   const element = containersize[index];

      //   filteredDetails = tempcontainertype.filter(
      //     x => x.cntnR_SZ_CD == element
      //   );

      //   filteredDetails.forEach(element => {
      //     tempcontainersize.push(element);
      //   });
      // }
      for (let index = 0; index < colorcode.length; index++) {
        const element = colorcode[index];

        filteredDetails = tempcontainertype.filter(x => x.clR_CD_NM == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }

      // this.getFilterdata(this.container_detail, "CLR");
    }
    if (
      salecondition.length == 0 &&
      containertype.length != 0 &&
      containersize.length != 0 &&
      colorcode.length == 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      // for (let index = 0; index < salecondition.length; index++) {
      //   const element = salecondition[index];

      //   filteredDetails = currentContainerData.filter(
      //     x => x.sL_CNDTN_NAM == element
      //   );

      //   filteredDetails.forEach(element => {
      //     tempsalecondition.push(element);
      //   });
      // }
      for (let index = 0; index < containertype.length; index++) {
        const element = containertype[index];

        filteredDetails = currentContainerData.filter(
          x => x.cntnR_TYP_CD == element
        );

        filteredDetails.forEach(element => {
          tempcontainertype.push(element);
        });
      }
      for (let index = 0; index < containersize.length; index++) {
        const element = containersize[index];

        filteredDetails = tempcontainertype.filter(
          x => x.cntnR_SZ_CD == element
        );

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // for (let index = 0; index < colorcode.length; index++) {
      //   const element = colorcode[index];

      //   filteredDetails = tempcontainersize.filter(x => x.clR_CD_NM == element);

      //   filteredDetails.forEach(element => {
      //     this.container_detail.push(element);
      //   });
      // }

      // this.getFilterdata(this.container_detail, "SZE");
    }
    if (
      salecondition.length == 0 &&
      containertype.length == 0 &&
      containersize.length != 0 &&
      colorcode.length != 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      // for (let index = 0; index < salecondition.length; index++) {
      //   const element = salecondition[index];

      //   filteredDetails = currentContainerData.filter(
      //     x => x.sL_CNDTN_NAM == element
      //   );

      //   filteredDetails.forEach(element => {
      //     tempsalecondition.push(element);
      //   });
      // }
      // for (let index = 0; index < containertype.length; index++) {
      //   const element = containertype[index];

      //   filteredDetails = tempsalecondition.filter(
      //     x => x.cntnR_TYP_CD == element
      //   );

      //   filteredDetails.forEach(element => {
      //     tempcontainertype.push(element);
      //   });
      // }
      for (let index = 0; index < containersize.length; index++) {
        const element = containersize[index];

        filteredDetails = currentContainerData.filter(
          x => x.cntnR_SZ_CD == element
        );

        filteredDetails.forEach(element => {
          tempcontainersize.push(element);
        });
      }
      for (let index = 0; index < colorcode.length; index++) {
        const element = colorcode[index];

        filteredDetails = tempcontainersize.filter(x => x.clR_CD_NM == element);

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }

      // this.getFilterdata(this.container_detail, "CLR");
    }
    if (
      salecondition.length == 0 &&
      containertype.length != 0 &&
      containersize.length == 0 &&
      colorcode.length == 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      // for (let index = 0; index < salecondition.length; index++) {
      //   const element = salecondition[index];

      //   filteredDetails = currentContainerData.filter(
      //     x => x.sL_CNDTN_NAM == element
      //   );

      //   filteredDetails.forEach(element => {
      //     tempsalecondition.push(element);
      //   });
      // }
      for (let index = 0; index < containertype.length; index++) {
        const element = containertype[index];

        filteredDetails = currentContainerData.filter(
          x => x.cntnR_TYP_CD == element
        );

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }
      // for (let index = 0; index < containersize.length; index++) {
      //   const element = containersize[index];

      //   filteredDetails = tempcontainertype.filter(
      //     x => x.cntnR_SZ_CD == element
      //   );

      //   filteredDetails.forEach(element => {
      //     tempcontainersize.push(element);
      //   });
      // }
      // for (let index = 0; index < colorcode.length; index++) {
      //   const element = colorcode[index];

      //   filteredDetails = tempcontainersize.filter(x => x.clR_CD_NM == element);

      //   filteredDetails.forEach(element => {
      //     this.container_detail.push(element);
      //   });
      // }

      // this.getFilterdata(this.container_detail, "TYP");
    }
    if (
      salecondition.length == 0 &&
      containertype.length == 0 &&
      containersize.length != 0 &&
      colorcode.length == 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      for (let index = 0; index < containersize.length; index++) {
        const element = containersize[index];

        filteredDetails = currentContainerData.filter(
          x => x.cntnR_SZ_CD == element
        );

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }

      // this.getFilterdata(this.container_detail, "SZE");
    }

    if (
      salecondition.length == 0 &&
      containertype.length == 0 &&
      containersize.length == 0 &&
      colorcode.length != 0
    ) {
      this.container_detail = [];

      let tempsalecondition: any = [];
      let tempcontainertype: any = [];
      let tempcontainersize: any = [];
      let tempcolorcode: any = [];

      for (let index = 0; index < colorcode.length; index++) {
        const element = colorcode[index];

        filteredDetails = currentContainerData.filter(
          x => x.clR_CD_NM == element
        );

        filteredDetails.forEach(element => {
          this.container_detail.push(element);
        });
      }

      // this.getFilterdata(this.container_detail, "CLR");
    }
    GlobalValues.currentcntrDtls = this.container_detail;
    this.getFilterdata(this.container_detail, checkBoxType);
  }

  clearCheckBoxState(checkBoxType, selectedItem, checkbox) {
    const vm: any = this;
    let containerData: any = GlobalValues.cntrDtls;

    if (checkBoxType == "Country") {
      for (let index = 0; index < containerData.length; index++) {
        const element = containerData[index];
        let countryName: any = element.cntrY_NAM;
        if (countryName == selectedItem) {
          let cityName = element.ctY_NAM;
          let depotName = element.dpT_CD;
          let colourCode = element.clR_CD_NM;
          let saleCondition: any = element.sL_CNDTN_NAM;
          let containerType = element.cntnR_TYP_CD;
          let containerSize = element.cntnR_SZ_CD;
          let colorCode = element.clR_CD_NM;
          if (vm.sldCity.length > 0) {
            index = vm.sldCity.indexOf(cityName);
            vm.sldCity.splice(index, 1);
          }
          if (vm.sldDpt.length > 0) {
            index = vm.sldDpt.indexOf(depotName);
            vm.sldDpt.splice(index, 1);
          }
          if (vm.sldClrcd.length > 0) {
            index = vm.sldClrcd.indexOf(colourCode);
            vm.sldClrcd.splice(index, 1);
          }
          if (vm.sldSlCnd.length > 0) {
            index = vm.sldSlCnd.indexOf(saleCondition);
            vm.sldSlCnd.splice(index, 1);
          }

          if (vm.sldCnttype.length > 0) {
            index = vm.sldCnttype.indexOf(containerType);
            vm.sldCnttype.splice(index, 1);
          }
          if (vm.sldCntsize.length > 0) {
            index = vm.sldCntsize.indexOf(containerSize);
            vm.sldCntsize.splice(index, 1);
          }
          if (vm.sldClrcd.length > 0) {
            index = vm.sldClrcd.indexOf(colorCode);
            vm.sldClrcd.splice(index, 1);
          }
        }
      }
    }
    if (checkBoxType == "City") {
      for (let index = 0; index < containerData.length; index++) {
        const element = containerData[index];
        let cityName: any = element.ctY_NAM;
        if (cityName == selectedItem) {
          let depotName = element.dpT_CD;
          let colourCode = element.clR_CD_NM;
          let saleCondition: any = element.sL_CNDTN_NAM;
          let containerType = element.cntnR_TYP_CD;
          let containerSize = element.cntnR_SZ_CD;
          let colorCode = element.clR_CD_NM;
          if (vm.sldDpt.length > 0) {
            index = vm.sldDpt.indexOf(depotName);
            vm.sldDpt.splice(index, 1);
          }
          if (vm.sldClrcd.length > 0) {
            index = vm.sldClrcd.indexOf(colourCode);
            vm.sldClrcd.splice(index, 1);
          }
          if (vm.sldSlCnd.length > 0) {
            index = vm.sldSlCnd.indexOf(saleCondition);
            vm.sldSlCnd.splice(index, 1);
          }

          if (vm.sldCnttype.length > 0) {
            index = vm.sldCnttype.indexOf(containerType);
            vm.sldCnttype.splice(index, 1);
          }
          if (vm.sldCntsize.length > 0) {
            index = vm.sldCntsize.indexOf(containerSize);
            vm.sldCntsize.splice(index, 1);
          }
          if (vm.sldClrcd.length > 0) {
            index = vm.sldClrcd.indexOf(colorCode);
            vm.sldClrcd.splice(index, 1);
          }
        }
      }
    }
    if (checkBoxType == "Depot") {
      for (let index = 0; index < containerData.length; index++) {
        const element = containerData[index];
        let depot: any = element.dpT_CD;

        if (depot == selectedItem) {
          let saleCondition: any = element.sL_CNDTN_NAM;
          let containerType = element.cntnR_TYP_CD;
          let containerSize = element.cntnR_SZ_CD;
          let colorCode = element.clR_CD_NM;
          if (vm.sldSlCnd.length > 0) {
            index = vm.sldSlCnd.indexOf(saleCondition);
            vm.sldSlCnd.splice(index, 1);
          }
          if (vm.sldCnttype.length > 0) {
            index = vm.sldCnttype.indexOf(containerType);
            vm.sldCnttype.splice(index, 1);
          }
          if (vm.sldCntsize.length > 0) {
            index = vm.sldCntsize.indexOf(containerSize);
            vm.sldCntsize.splice(index, 1);
          }
          if (vm.sldClrcd.length > 0) {
            index = vm.sldClrcd.indexOf(colorCode);
            vm.sldClrcd.splice(index, 1);
          }
        }
      }
    }
    if (checkBoxType == "SaleCondition") {
      for (let index = 0; index < containerData.length; index++) {
        const element = containerData[index];
        let saleCondition: any = element.sL_CNDTN_NAM;
        if (saleCondition == selectedItem) {
          let containerType = element.cntnR_TYP_CD;
          let containerSize = element.cntnR_SZ_CD;
          let colorCode = element.clR_CD_NM;
          if (vm.sldCnttype.length > 0) {
            index = vm.sldCnttype.indexOf(containerType);
            vm.sldCnttype.splice(index, 1);
          }
          if (vm.sldCntsize.length > 0) {
            index = vm.sldCntsize.indexOf(containerSize);
            vm.sldCntsize.splice(index, 1);
          }
          if (vm.sldClrcd.length > 0) {
            index = vm.sldClrcd.indexOf(colorCode);
            vm.sldClrcd.splice(index, 1);
          }
        }
      }
    }
    if (checkBoxType == "ContainerType") {
      for (let index = 0; index < containerData.length; index++) {
        const element = containerData[index];
        let containerType = element.cntnR_TYP_CD;
        if (containerType == selectedItem) {
          let containerSize = element.cntnR_SZ_CD;
          let colorCode = element.clR_CD_NM;
          if (vm.sldCntsize.length > 0) {
            index = vm.sldCntsize.indexOf(containerSize);
            vm.sldCntsize.splice(index, 1);
          }
          if (vm.sldClrcd.length > 0) {
            index = vm.sldClrcd.indexOf(colorCode);
            vm.sldClrcd.splice(index, 1);
          }
        }
      }
    }
    if (checkBoxType == "ContainerSize") {
      for (let index = 0; index < containerData.length; index++) {
        const element = containerData[index];
        let containerSize = element.cntnR_SZ_CD;
        if (containerSize == selectedItem) {
          let colorCode = element.clR_CD_NM;

          if (vm.sldClrcd.length > 0) {
            index = vm.sldClrcd.indexOf(colorCode);
            vm.sldClrcd.splice(index, 1);
          }
        }
      }
    }
    // if (checkBoxType == "ColourCode") {
    //   for (let index = 0; index < containerData.length; index++) {
    //     const element = containerData[index];
    //     let cityName: any = element.ctY_NAM;
    //     if (cityName == selectedItem) {
    //       let depotName = element.dpT_CD;
    //       let colourCode = element.clR_CD_NM;
    //       if (vm.sldDpt.length > 0) {
    //         index = vm.sldDpt.indexOf(depotName);
    //         vm.sldDpt.splice(index, 1);
    //       }
    //       if (vm.sldClrcd.length > 0) {
    //         index = vm.sldClrcd.indexOf(depotName);
    //         vm.sldClrcd.splice(index, 1);
    //       }
    //     }
    //   }
    // }
  }
  UndoCheckBoxDetails(checkBoxType, selectedItem, checkbox) {
    let country = this.sldCnty;
    let city = this.sldCity;
    let depo = this.sldDpt;
    let salecondition = this.sldSlCnd;
    let containertype = this.sldCnttype;
    let containersize = this.sldCntsize;
    let colorcode = this.sldClrcd;
    let price = this.sldPrc;

    this.clearCheckBoxState(checkBoxType, selectedItem, checkbox);

    if (
      country.length == 0 &&
      city.length == 0 &&
      depo.length == 0 &&
      salecondition.length == 0 &&
      containertype.length == 0 &&
      containersize.length == 0 &&
      colorcode.length == 0
    ) {
      this.getFilter();
    }
    // else {
    //   this.bindCheckBoxDetails(checkBoxType, selectedItem, checkbox);
    // }
  }

  //CheckBoxFunction

  slectCkBox(checkBoxType, selectedItem, checkbox) {
    let isChecked = checkbox.checked;
    this.filterCheckBoxDetail(checkBoxType, selectedItem, checkbox);

    if (isChecked) {
      // this.bindCheckBoxDetails(checkBoxType, selectedItem, checkbox);
    } else {
      this.UndoCheckBoxDetails(checkBoxType, selectedItem, checkbox);
      // this.clearCheckBoxState(checkBoxType, selectedItem, checkbox)
    }

    this.doFilter(checkBoxType, selectedItem, checkbox);
  }

  DrillDownFilter(title: string) {
    const vm: any = this;
    let containerData: any = GlobalValues.cntrDtls;
    let contryFilter: any;

    if (
      vm.sldCnty.length != 0 &&
      vm.sldCity.length == 0 &&
      vm.sldDpt.length == 0 &&
      title == "Country"
    ) {
      vm.fldCnty = [];
      vm.sldCnty.forEach(function (value) {
        contryFilter = containerData.filter(x => x.cntrY_NAM == value);
        contryFilter.forEach(element => {
          vm.fldCnty.push(element);
        });
      });
      this.fldCnty = this.fldCnty.filter(function (item, i, ar) {
        return ar.indexOf(item) === i;
      });
      vm.filtergetContainers("Country", this.fldCnty);
    }

    if (
      vm.sldCnty.length == 0 &&
      vm.sldCity.length != 0 &&
      vm.sldDpt.length == 0 &&
      title == "City"
    ) {
      vm.fldCity = [];
      vm.sldCity.forEach(function (value) {
        contryFilter = containerData.filter(x => x.ctY_NAM == value);
        contryFilter.forEach(element => {
          vm.fldCity.push(element);
        });
      });
      this.fldCity = this.fldCity.filter(function (item, i, ar) {
        return ar.indexOf(item) === i;
      });
      vm.filtergetContainers("City", this.fldCity);
    }

    if (
      vm.sldCnty.length != 0 &&
      vm.sldCity.length != 0 &&
      vm.sldDpt.length == 0 &&
      title == "City"
    ) {
      vm.fldCity = [];
      vm.sldCity.forEach(function (value) {
        contryFilter = vm.fldCnty.filter(x => x.ctY_NAM == value);
        contryFilter.forEach(element => {
          vm.fldCity.push(element);
        });
      });
      this.fldCity = this.fldCity.filter(function (item, i, ar) {
        return ar.indexOf(item) === i;
      });
      vm.filtergetContainers("City", this.fldCity);
    }

    if (
      vm.sldCnty.length == 0 &&
      vm.sldCity.length == 0 &&
      vm.sldDpt.length != 0 &&
      title == "Depot"
    ) {
      this.fldDpt = [];
      vm.sldDpt.forEach(function (value) {
        contryFilter = containerData.filter(x => x.dpT_CD == value);
        contryFilter.forEach(element => {
          vm.fldDpt.push(element);
        });
      });
      this.fldDpt = this.fldDpt.filter(function (item, i, ar) {
        return ar.indexOf(item) === i;
      });
      vm.filtergetContainers("Depot", this.fldDpt);
    }
    if (
      vm.sldCnty.length == 0 &&
      vm.sldCity.length != 0 &&
      vm.sldDpt.length != 0 &&
      title == "Depot"
    ) {
      vm.fldDpt = [];
      vm.sldDpt.forEach(function (value) {
        contryFilter = vm.fldCity.filter(x => x.dpT_CD == value);
        contryFilter.forEach(element => {
          vm.fldDpt.push(element);
        });
      });
      this.fldDpt = this.fldDpt.filter(function (item, i, ar) {
        return ar.indexOf(item) === i;
      });
      vm.filtergetContainers("Depot", this.fldDpt);
    }
  }

  showmore(title, option) {
    switch (title) {
      case "Country": {
        this.cntyshowmorecount = option;
        this.cntyshowstatus = false;
        break;
      }
      case "City": {
        this.cityshowmorecount = option;
        this.cityshowstatus = false;
        break;
      }
      case "Depot": {
        this.dptshowmorecount = option;
        this.dptshowstatus = false;
        break;
      }
      case "Sale Condition": {
        this.slcndshowmorecount = option;
        this.slcndshowstatus = false;
        break;
      }
      case "Container Type": {
        this.cnttypshowmorecount = option;
        this.cnttypshowstatus = false;
        break;
      }
      case "Container Size": {
        this.cntszshowmorecount = option;
        this.cntszshowstatus = false;
        break;
      }
      case "Colour Code": {
        this.cntcdshowmorecount = option;
        this.cntcdshowstatus = false;
        break;
      }
      case "Price": {
        this.prcshowmorecount = option;
        this.prceshowstatus = false;
        break;
      }
    }
  }
  showless(title) {
    switch (title) {
      case "Country": {
        this.cntyshowmorecount = 2;
        this.cntyshowstatus = true;
        break;
      }
      case "City": {
        this.cityshowmorecount = 2;
        this.cityshowstatus = true;
        break;
      }
      case "Depot": {
        this.dptshowmorecount = 2;
        this.dptshowstatus = true;
        break;
      }
      case "Sale Condition": {
        this.slcndshowmorecount = 2;
        this.slcndshowstatus = true;
        break;
      }
      case "Container Type": {
        this.cnttypshowmorecount = 2;
        this.cnttypshowstatus = true;
        break;
      }
      case "Container Size": {
        this.cntszshowmorecount = 2;
        this.cntszshowstatus = true;
        break;
      }
      case "Colour Code": {
        this.cntcdshowmorecount = 2;
        this.cntcdshowstatus = true;
        break;
      }
      case "Price": {
        this.prcshowmorecount = 2;
        this.prceshowstatus = true;
        break;
      }
    }
  }

  clearfilter() {
    const vm = this;

    vm.sldCity = [];
    vm.sldCnty = [];
    vm.sldDpt = [];
    vm.sldSlCnd = [];
    vm.sldCnttype = [];
    vm.sldCntsize = [];
    vm.sldClrcd = [];
    vm.sldPrc = [];

    vm.fldCity = [];
    vm.fldCnty = [];
    vm.fldDpt = [];

    vm.getFilter();
    vm.selectedfilter = [];
  }

  sortfilter(sortfilter: string, event) {
    this.sortfilterlist = sortfilter;

    if (sortfilter == "Grade New") {
      this.orderbyststus = "NEW";
    } else if (sortfilter == "Grade Used") {
      this.orderbyststus = "USED";
    } else if (sortfilter == "Size low-high") {
      this.orderby = "cntnR_SZ_CD";
      this.orderstatus = false;
      this.orderbyststus = null;
    } else if (sortfilter == "Size high-low") {
      this.orderby = "cntnR_SZ_CD";
      this.orderstatus = true;
      this.orderbyststus = null;
    }
  }

  public binddetail(val: any) {
    localStorage.removeItem("viewDetail");
    localStorage.setItem("viewDetail", JSON.stringify(val));
    // GlobalValues.viewDetail=val;
  }

  getFilter() {
    this.container_detail = GlobalValues.cntrDtls;
    this.cntyLst = [];
    this.cityLst = [];
    this.dptLst = [];
    this.slcndLst = [];
    this.cnttypLst = [];
    this.cntszLst = [];
    this.clrcdLst = [];
    this.pceLst = [];
    //Country

    let val: any;
    let count: number = 0;
    val = null;
    this.name = [];
    this.unit = [];
    for (let i in this.container_detail) {
      val = this.container_detail[i]["cntrY_NAM"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["cntrY_NAM"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.cntyLst.push(obj);
    }

    //City
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["ctY_NAM"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["ctY_NAM"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.cityLst.push(obj);
    }

    //Deopt
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["dpT_CD"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();
    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["dpT_CD"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.dptLst.push(obj);
    }

    //SaleCondition
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["sL_CNDTN_NAM"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["sL_CNDTN_NAM"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.slcndLst.push(obj);
    }

    //Container Type
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["cntnR_TYP_CD"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["cntnR_TYP_CD"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.cnttypLst.push(obj);
    }

    //Container Size
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["cntnR_SZ_CD"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["cntnR_SZ_CD"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.cntszLst.push(obj);
    }

    //Color code
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["clR_CD_NM"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["clR_CD_NM"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.clrcdLst.push(obj);
    }

    //Price
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["sL_PRC_NC"];
      this.name.push(val);
    }

    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();
    let index = this.name.indexOf(0);
    this.name.splice(index, 1);

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["sL_PRC_NC"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.pceLst.push(obj);
    }
    this.number_container = this.container_detail.length;
    GlobalValues.currentcntrDtls = this.container_detail;
  }

  filtergetContainers(title, data: Array<any>) {
    this.slcndLst = [];
    this.cnttypLst = [];
    this.cntszLst = [];
    this.clrcdLst = [];
    this.pceLst = [];
    if (title == "Country") {
      this.cityLst = [];
      this.dptLst = [];
      this.slcndLst = [];
      this.cnttypLst = [];
      this.cntszLst = [];
      this.clrcdLst = [];
      this.pceLst = [];
    }

    let val: any;
    let count: number = 0;
    this.container_detail = data;
    this.name = [];
    this.unit = [];

    //City
    // if(this.sldCity.length != 0){}
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    // if (title != "City") {
    for (let i in this.container_detail) {
      val = this.container_detail[i]["ctY_NAM"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["ctY_NAM"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }
    if (this.sldCity.length == 0) {
      for (let i in this.name) {
        let obj: filterValues = {
          fltNm: "",
          avlUnt: ""
        };
        obj.fltNm = this.name[i];
        obj.avlUnt = this.unit[i];
        this.cityLst.push(obj);
      }
    }
    if (this.sldCity.length == 0) {
      this.cityLst = [];
      for (let i in this.name) {
        let obj: filterValues = {
          fltNm: "",
          avlUnt: ""
        };
        obj.fltNm = this.name[i];
        obj.avlUnt = this.unit[i];
        this.cityLst.push(obj);
      }
    }

    //Deopt
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["dpT_CD"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["dpT_CD"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }
    if (this.sldDpt.length == 0) {
      this.dptLst = [];
      for (let i in this.name) {
        let obj: filterValues = {
          fltNm: "",
          avlUnt: ""
        };
        obj.fltNm = this.name[i];
        obj.avlUnt = this.unit[i];
        this.dptLst.push(obj);
      }
    }

    //SaleCondition
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["sL_CNDTN_NAM"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["sL_CNDTN_NAM"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.slcndLst.push(obj);
    }

    //Container Type
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["cntnR_TYP_CD"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["cntnR_TYP_CD"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.cnttypLst.push(obj);
    }

    //Container Size
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["cntnR_SZ_CD"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["cntnR_SZ_CD"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.cntszLst.push(obj);
    }

    //Color code
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["clR_CD_NM"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["clR_CD_NM"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.clrcdLst.push(obj);
    }

    //Price
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["sL_PRC_NC"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();
    let index = this.name.indexOf(0);
    this.name.splice(index, 1);

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["sL_PRC_NC"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    for (let i in this.name) {
      let obj: filterValues = {
        fltNm: "",
        avlUnt: ""
      };
      obj.fltNm = this.name[i];
      obj.avlUnt = this.unit[i];
      this.pceLst.push(obj);
    }
    this.number_container = this.container_detail.length;
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];
  }

  getFilterdata(data: any, type: any) {
    this.container_detail = data;

    if (type == "Country") {
      // this.cntyLst = [];
      this.cityLst = [];
      this.dptLst = [];
      this.slcndLst = [];
      this.cnttypLst = [];
      this.cntszLst = [];
      this.clrcdLst = [];
      // this.pceLst = [];
    }
    if (type == "Depot") {
      // this.cityLst = [];
      // this.dptLst = [];
      this.slcndLst = [];
      this.cnttypLst = [];
      this.cntszLst = [];
      this.clrcdLst = [];
      // this.pceLst = [];
    }
    if (type == "City") {
      // this.cityLst = [];
      this.dptLst = [];
      this.slcndLst = [];
      this.cnttypLst = [];
      this.cntszLst = [];
      this.clrcdLst = [];
      // this.pceLst = [];
    }
    if (type == "SaleCondition") {
      // this.cityLst = [];
      // this.dptLst = [];
      // this.slcndLst = [];
      this.cnttypLst = [];
      this.cntszLst = [];
      this.clrcdLst = [];
      // this.pceLst = [];
    }
    if (type == "ContainerType") {
      // this.cityLst = [];
      // this.dptLst = [];
      // this.slcndLst = [];
      // this.cnttypLst = [];
      this.cntszLst = [];
      this.clrcdLst = [];
      // this.pceLst = [];
    }
    if (type == "ContainerSize") {
      // this.cityLst = [];
      // this.dptLst = [];
      // this.slcndLst = [];
      // this.cnttypLst = [];
      // this.cntszLst = [];
      this.clrcdLst = [];
      // this.pceLst = [];
    }
    if (type == "ColourCode") {
      // this.cityLst = [];
      // this.dptLst = [];
      // this.slcndLst = [];
      // this.cnttypLst = [];
      // this.cntszLst = [];
      // this.clrcdLst = [];
      // this.pceLst = [];
    }

    let val: any = "";
    let count: number = 0;
    val = null;
    this.name = [];
    this.unit = [];
    //Country

    // for (let i in this.container_detail) {
    //   val = this.container_detail[i]["cntrY_NAM"];
    //   this.name.push(val);
    // }
    // this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);

    // for (let j in this.name) {
    //   for (let i in this.container_detail) {
    //     if (this.name[j] == this.container_detail[i]["cntrY_NAM"]) {
    //       count += this.container_detail[i]["avL_UNTS"];
    //     }
    //   }
    //   this.unit.push(count);
    //   count = 0;
    // }

    // for (let i in this.name) {
    //   let obj: filterValues = {
    //     fltNm: "",
    //     avlUnt: ""
    //   };
    //   obj.fltNm = this.name[i];
    //   obj.avlUnt = this.unit[i];
    //   this.cntyLst.push(obj);
    // }

    //City
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["ctY_NAM"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["ctY_NAM"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }

    if (this.cityLst.length == 0) {
      for (let i in this.name) {
        let obj: filterValues = {
          fltNm: "",
          avlUnt: ""
        };
        obj.fltNm = this.name[i];
        obj.avlUnt = this.unit[i];
        this.cityLst.push(obj);
      }
    }
    // this.cityLst = this.cityLst.filter((v, i, a) => a.indexOf(v) === i);

    //Deopt
    val = null;
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["dpT_CD"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["dpT_CD"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }
    if (this.dptLst.length == 0) {
      for (let i in this.name) {
        let obj: filterValues = {
          fltNm: "",
          avlUnt: ""
        };
        obj.fltNm = this.name[i];
        obj.avlUnt = this.unit[i];
        this.dptLst.push(obj);
      }
    }

    //SaleCondition
    val = "";
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["sL_CNDTN_NAM"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["sL_CNDTN_NAM"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }
    if (this.slcndLst.length == 0) {
      for (let i in this.name) {
        let obj: filterValues = {
          fltNm: "",
          avlUnt: ""
        };
        obj.fltNm = this.name[i];
        obj.avlUnt = this.unit[i];
        this.slcndLst.push(obj);
      }
    }

    //Container Type
    val = "";
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["cntnR_TYP_CD"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["cntnR_TYP_CD"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }
    if (this.cnttypLst.length == 0) {
      for (let i in this.name) {
        let obj: filterValues = {
          fltNm: "",
          avlUnt: ""
        };
        obj.fltNm = this.name[i];
        obj.avlUnt = this.unit[i];
        this.cnttypLst.push(obj);
      }
    }
    this.cnttypLst = this.cnttypLst.filter((v, i, a) => a.indexOf(v) === i);

    //Container Size
    val = "";
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["cntnR_SZ_CD"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();
    if (this.cntszLst.length == 0) {
      for (let j in this.name) {
        for (let i in this.container_detail) {
          if (this.name[j] == this.container_detail[i]["cntnR_SZ_CD"]) {
            count += this.container_detail[i]["avL_UNTS"];
          }
        }
        this.unit.push(count);
        count = 0;
      }
    }
    if (this.cntszLst.length == 0) {
      for (let i in this.name) {
        let obj: filterValues = {
          fltNm: "",
          avlUnt: ""
        };
        obj.fltNm = this.name[i];
        obj.avlUnt = this.unit[i];
        this.cntszLst.push(obj);
      }
    }

    //Color code
    val = "";
    count = 0;
    this.name = [];
    this.unit = [];

    for (let i in this.container_detail) {
      val = this.container_detail[i]["clR_CD_NM"];
      this.name.push(val);
    }
    this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    this.name = this.name.sort();

    for (let j in this.name) {
      for (let i in this.container_detail) {
        if (this.name[j] == this.container_detail[i]["clR_CD_NM"]) {
          count += this.container_detail[i]["avL_UNTS"];
        }
      }
      this.unit.push(count);
      count = 0;
    }
    if (this.clrcdLst.length == 0) {
      for (let i in this.name) {
        let obj: filterValues = {
          fltNm: "",
          avlUnt: ""
        };
        obj.fltNm = this.name[i];
        obj.avlUnt = this.unit[i];
        this.clrcdLst.push(obj);
      }
    }

    //Price
    // val = null;
    // count = 0;
    // this.name = [];
    // this.unit = [];

    // for (let i in this.container_detail) {
    //   val = this.container_detail[i]["sL_PRC_NC"];
    //   this.name.push(val);
    // }

    // this.name = this.name.filter((v, i, a) => a.indexOf(v) === i);
    // let index = this.name.indexOf(0);
    // this.name.splice(index, 1);

    // for (let j in this.name) {
    //   for (let i in this.container_detail) {
    //     if (this.name[j] == this.container_detail[i]["sL_PRC_NC"]) {
    //       count += this.container_detail[i]["avL_UNTS"];
    //     }
    //   }
    //   this.unit.push(count);
    //   count = 0;
    // }

    // for (let i in this.name) {
    //   let obj: filterValues = {
    //     fltNm: "",
    //     avlUnt: ""
    //   };
    //   obj.fltNm = this.name[i];
    //   obj.avlUnt = this.unit[i];
    //   this.pceLst.push(obj);
    // }
    this.number_container = this.container_detail.length;
  }
}
