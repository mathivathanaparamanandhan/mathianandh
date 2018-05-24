
import { ITradePortalService } from "../_services/index";
import { PagingService } from "../_services/paging.service";
import { ContainerPipe } from "../buycontainer/container.pipe";
import { ToastrService } from 'ngx-toastr';
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
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  providers: [ITradePortalService, PagingService, ContainerPipe],
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  @Input() countplus: number = 1;
  username: string;
  userdetails: any;
  CurrentDate: Date;
  cartList: any;
  totalunits: number;
  no_of_units: any;
  crT_ID: any;
  model: any = [];
  buymodel: any = [];
  cartID: Array<any> = [];
  cartCount: any;
  p: number;
  totalItems: number;
  constructor(private itradeportalservice: ITradePortalService, private toastr: ToastrService, ) { }


  ngOnInit() {
    this.userdetails = JSON.parse(localStorage.getItem('currentUser'));

    this.bindCartDetails();


    this.CurrentDate = new Date();
  }

  removeItem(crT_ID: any) {
    for (let i in this.cartList) {
      if (this.cartList[i].crT_ID == crT_ID) {
        this.model.push(this.cartList[i]);
      }
    }

    this.itradeportalservice.removeCartItem(this.model)
      .subscribe(data => {
        if (data['status'] === 'true') {
          this.toastr.clear();
          this.toastr.success(data['message'], '',{ closeButton: true});
          this.bindCartDetails();
        } else {
          this.toastr.clear();
          this.toastr.error(data['message'], '');
        }
      },
        Error => {
          this.toastr.clear();
          this.toastr.error('There is an Error in Adding to cart Please contact Administrator', '');
        });

  }

  increment1(avL_UNTS: number, expctD_UNTS: number, no_of_units: number, crT_ID: any) {
    var totalunits
    this.totalunits = avL_UNTS + expctD_UNTS;
    if (this.totalunits > no_of_units) {
      if (no_of_units >= 1) {
        for (let i in this.cartList) {
          if (this.cartList[i].crT_ID == crT_ID) {
            this.cartList[i].nO_OF_UNTS = no_of_units + 1;
          }


        }
      }
    }

  }
  decrement1(crT_ID: any) {
    for (let i in this.cartList) {
      if (this.cartList[i].crT_ID == crT_ID) {
        if (this.cartList[i].nO_OF_UNTS > 1) {
          this.cartList[i].nO_OF_UNTS = this.cartList[i].nO_OF_UNTS - 1;
        }
      }
    }
  }

  bindCartDetails() {
    this.username = this.userdetails['username'];
    this.itradeportalservice.getCartList(this.username).subscribe(data => {
      this.cartList = data;
      this.cartCount = this.cartList.length;
      for (let i in this.cartList) {


        this.cartList[i].Image = 'assets/images/' + this.cartList[i]['clR_CD_ID'] +this.cartList[i]['cntnR_SZ_CD']+this.cartList[i]['cntnR_TYP_CD'] + '.jpg';



      }
    });

  }


  addToSaleCart() {
    this.buymodel = [];
    for (let i in this.cartList) {
      var vlD_TO = new Date(this.cartList[i]["vlD_TO"]).toDateString
      var To_day = Date.now.toString

      if (vlD_TO <= To_day || this.cartList[i]["sL_PRC_NC"] < 0) {
        this.cartList[i].removeItem;
      }
      else {

        this.buymodel.push(this.cartList[i])
      }
    }
    this.itradeportalservice.createSaleCart(this.buymodel, this.username)
      .subscribe(data => {
        if (data['status'] === 'true') {
          this.toastr.clear();
          this.toastr.success('Sale Cart Created Successfully', '' ,{ closeButton: true});
          this.itradeportalservice.removeCartItem(this.buymodel)
            .subscribe(data1 => {
              if (data1['status'] === 'true') {
                this.bindCartDetails();
              } else {

              }
            });
          this.bindCartDetails();
        } else {
          this.toastr.clear();
          this.toastr.error(data['message'], '');
        }
      },
        Error => {
          this.toastr.clear();
          this.toastr.error('There is an Error in Creating Sale Cart Please contact Administrator', '');
        });


  }

}
