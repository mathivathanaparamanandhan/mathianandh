// export class GlobalValues {
//   static isLoggedIn: boolean = false;
//   static adminrole : boolean = false;
//   static userrole : boolean =false;
//   static loginAttemptCounts: any[];
//   static loginTitle:string="MultiboxxShop:Login";
//   static registrationTitle:string="MultiboxxShop:Registration";
//   static containerTitle:string="MultiboxxShop:Container";
//   static cartDetail:Array<any> = [];
//   static banks:Array<any>=[];
//   static portalUserDetails:any;
//   static username:string
// }

import { container } from "../_models/container";

export class GlobalValues {
  static isLoggedIn: boolean = false;
  static adminrole : boolean = false;
  static userrole : boolean =false;
  static loginAttemptCounts: any[];
  static loginTitle:string="MultiboxxShop:Login";
  static registrationTitle:string="MultiboxxShop:Registration";
  static containerTitle:string="MultiboxxShop:Container";
  static cartDetail:Array<any> = [];
  static banks:Array<any>=[];
  static portalUserDetails:any;
  static username:string
  static cntrDtls : Array<container>;
  static currentcntrDtls : Array<container>;
}
