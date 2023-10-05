import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donor } from './donor';
import { Requesting } from './requesting';
import { User } from './user';

const NAV_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})
export class DonorService {

  private bloodGroup: any;

  public userID = 1;

  public userId_2 = 2;

  public requesterData = {id : '', empid: '', bloodGroup: ''};

  public idForMoreInfo:string = "";

  public setBloodGroup(data: string)
  {
    this.bloodGroup = data;
  }

  public getBloodGroup(): any {
    return this.bloodGroup;
  }

  public getDataByBloodGroup(bloodGroup: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/api/blood-request/find/` + bloodGroup);
  }
  
  user = new User();
  
  public getDonorList(): Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/donorlist`);
  }


  public getIncomingRequestHistory(loggedUser:number): Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/api/blood-request/incoming/`+loggedUser);
  }

  public getRequestHistoryByEmail(loggedUser:number): Observable<any>
  {
    console.log(loggedUser,"api call");
    return this._http.get<any>(`${NAV_URL}/api/blood-request/emp/`+loggedUser);
  }

  public getUserList(): Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/userlist`);
  }

  constructor(private _http : HttpClient) { }

  public addDonorFromRemote(donor:Donor):Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/addDonor`,donor);
  }

  public requestForBlood(request:Requesting):Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/api/blood-request/create`,request);
  }

  public requestForAddingDonor(donor:Donor):Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/addAsDonor`,donor);
  }

  public getBloodDetails() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/bloodDetails`);
  }

  public getProfileDetails(loggedUser : string) : Observable<any>
  {
    return this._http.get(`${NAV_URL}/profileDetails/`+loggedUser);
  }
  
  public UpdateUserProfile(user:any):Observable<any>
  {
    return this._http.put<any>(`${NAV_URL}/updateuser`,user)
  }
  
  public acceptRequestForBlood(id : number, loggedUser : number) : Observable<any>
  {
    return this._http.get(`${NAV_URL}/api/blood-request/bdr/update/empid/`+loggedUser+'/brid/'+id);
  }

  //'http://localhost:8080/api/blood-request/bdr/update/empid/2/brid/8

  public rejectRequestForBlood(loggedUser : string) : Observable<any>
  {
    return this._http.get(`${NAV_URL}/rejectstatus/`+loggedUser)
  }

  public getTotalDonors() : Observable<any>
  {
    return this._http.get(`${NAV_URL}/getTotalDonors`);
  }

  public getTotalUsers() : Observable<any>
  {
    return this._http.get(`${NAV_URL}/getTotalUsers`);
  }

  public getTotalBloodGroups() : Observable<any>
  {
    return this._http.get(`${NAV_URL}/getTotalBloodGroups`);
  }

  public getTotalUnits() : Observable<any>
  {
    return this._http.get(`${NAV_URL}/getTotalUnits`);
  }

  public getTotalRequests(loggedUser : string) : Observable<any>
  {
    return this._http.get(`${NAV_URL}/getTotalRequests/`+loggedUser);
  }

  public getTotalDonationCount(loggedUser : string) : Observable<any>
  {
    return this._http.get(`${NAV_URL}/getTotalDonationCount/`+loggedUser);
  }


public sendDataForNotification(requestData : any) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/api/blood-request/send`,requestData);
  }


  public getMoreInfoData(id : string) : Observable<any>
  {
    return this._http.get(`${NAV_URL}/api/blood-request/acceptedstatus/`+id);
  }
  

}
