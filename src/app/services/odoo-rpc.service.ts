import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OdooRpcService {
  constructor(private http: HttpClient) {}

  private headers: HttpHeaders;

  /**
   * Hardcoded server link for testing
   */
  private odoo_server: string = "https://demo.marinedeep.com";

  /**
   * Hardcoded session_id for testing
   */
  private session_id: string = "2af6db199cd6447a6f4ca34dfa4f1d2f41f05053";

  /**
   * Builds a request for odoo server
   * @param url Odoo Server URL
   * @param params Object
   */
  private buildRequest(url: String, params: any) {
    return JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: params,
    });
  }

  /**
   * Sends a JSON request to the odoo server
   * @param url Url of odoo
   * @param params Object
   */
  public sendRequest(url: string, params: Object): Observable<any> {
    let body = this.buildRequest(url, params);
    this.headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "X-Openerp-Session-Id": this.session_id,
    });
    return this.http.post(this.odoo_server + url, body, {
      headers: this.headers,
      observe: "response",
      withCredentials: true,
    });
  }

  /**
   * Login to the database
   * @param db Database name of odoo
   * @param login Username
   * @param password password
   */
  public login(db: string, login: string, password: string) {
    let params = {
      db: db,
      login: login,
      password: password,
      base_location: this.odoo_server,
      context: {},
    };
    return this.sendRequest("/web/session/authenticate", params);
  }

  /**
   * Calls the method of that particular model
   * @param model Model name
   * @param method Method name of particular model
   * @param args Array of fields
   * @param kwargs Object
   */
  public call(model: string, method: string, args: any, kwargs?: any) {
    kwargs = kwargs || {};
    let params = {
      model: model,
      method: method,
      args: args,
      kwargs: kwargs == false ? {} : kwargs,
      context: {},
    };
    return this.sendRequest("/web/dataset/call_kw", params);
  }
}
