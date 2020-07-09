import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginationResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // baseUrl = environment.apiUrl;
  baseUrl = environment .apiUrl;
  constructor(private http: HttpClient) { }

  // getUsers(page?, itemsPerPage?, userParams?): Observable<PaginationResult<User[]>> {
  //   const paginationResult: PaginationResult<User[]> =  new PaginationResult<User[]>();
  //   let params = new HttpParams();

  //   // tslint:disable-next-line: no-conditional-assignment
  //   if (page != null && itemsPerPage != null) {
  //     params = params.append('pagenumber', page);
  //     params = params.append('pagesize', itemsPerPage);
  //   }
  //    // tslint:disable-next-line: align
  //    if (userParams != null) {
  //       params = params.append('minAge', userParams.MinAge);
  //       params = params.append('maxAge', userParams.MaxAge);
  //       params = params.append('gender', userParams.Gender);
  //    }
  //   return this.http.get<User[]>(this.baseUrl + 'User/GetAllUser', {observe: 'response', params})
  //   .pipe(
  //     map(response => {
  //       paginationResult.result = response.body;
  //       if (response.headers.get('Pagination') != null) {
  //         paginationResult.Pagination = JSON.parse(response.headers.get('Pagination'));
  //       }
  //       return paginationResult;
  //     })
  //   );
  // }
  getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginationResult<User[]>> {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.http.get<User[]>(this.baseUrl + 'User/GetAllUser', { observe: 'response', params})
      .pipe(
        map(response => {
          paginationResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginationResult.Pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginationResult;
        })
      );
  }
  getUser(id: number): Observable<User> {
     return this.http.get<User>(this.baseUrl + 'User/GetUserByID/' + id);
  }

  updateUser(id: number, user: User) {
     return this.http.put(this.baseUrl  + 'User/UpdateUser/' + id, user);
  }
  setMainPhoto(userId: number, id: number) {
     return this.http.post(this.baseUrl  + 'users/' + userId + '/photos/'  + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }
}


