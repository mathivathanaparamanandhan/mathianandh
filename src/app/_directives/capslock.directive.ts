import { Directive, Output, EventEmitter, HostListener } from "@angular/core";

import { AdminloginComponent } from '../adminlogin/adminlogin.component'

@Directive({
  selector: "[appCapslock]"
})
export class CapslockDirective {
  capsOn: boolean;
  @Output("capsLock") capsLock: EventEmitter<Object>;

  constructor(private login: AdminloginComponent) {}

  targetEventObject: any;

  @HostListener("window:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent): void {
    this.capsOn = event.getModifierState && event.getModifierState("CapsLock");
    this.targetEventObject = event.target;
    if (this.capsOn && this.targetEventObject.name == "password") {
      //this.capsLock.emit(true);
      this.login.capslock = "CAPS LOCK is ON";
    } else {
      this.login.capslock = "";
    }
  }
}
