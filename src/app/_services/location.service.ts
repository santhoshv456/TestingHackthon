import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Payload } from '../_models/payload';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendDistance(data:any) {
    return this.http.post(this.baseUrl+'/student/updateStudentcurrentLocation',data);
  }

  getStudentLoacation(studentId) {
    let params = new HttpParams();
    params = params.append('id', studentId);
    return this.http.get(this.baseUrl+'/student/GetstudentcurrentLocation',{params: params});
  }

}
