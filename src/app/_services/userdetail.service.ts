import { Injectable } from '@angular/core';

@Injectable()
export class UserdetailService {

  constructor() { }
  public type1S : any;

  public  type1Change(selected:any)
  
  {
      this.type1S=selected;
  
   }
}
