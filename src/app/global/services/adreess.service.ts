import { Injectable } from '@angular/core';
import { ServiceBase } from '../base-class/service-base';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdreessService extends ServiceBase {
  private readonly DefaultURL = this.apiUrlDomain + 'Area';
  private readonly GetAllStateURL = this.DefaultURL + '/getAllStates';
  private readonly GetAllCitiesBySIDURL =
    this.DefaultURL + '/getAllCityBySID?sid=';

  constructor(private http: HttpClient) {
    super();
  }

  GetAllState() {
    return this.http.get(this.GetAllStateURL);
  }

  GetAllCitiesBySID(sid: any) {
    return this.http.get(this.GetAllCitiesBySIDURL + sid);
  }
}
