import { Component } from '@angular/core';
import { OdooRpcService } from '../services/odoo-rpc.service';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(private odooService: OdooRpcService) {}

  onConnectClick() {
    this.odooService
      .login("dive_ops_13c_demo", "api_user", "f22W7wkdThrs2N6T")
      .subscribe((resp) => {
        console.log("this.odooService.login", resp);
      });
  }

  onSearchUsersClick() {
    this.odooService
      .call("res.partner", "search", [[]])
      .subscribe((resp) => {
        console.log("this.odooService.call search", resp);
      });
  }

  onReadUsersClick() {
    this.odooService
      .call("res.partner", "read", [[1], ["id", "name"]])
      .subscribe((resp) => {
        console.log("this.odooService.call read", resp);
      });
  }
}
