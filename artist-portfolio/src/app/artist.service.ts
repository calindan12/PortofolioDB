import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) {}

  createArtist(artist: any){
    console.log("artist: " , artist)
    return this.http.post<any>('http://localhost:3000/artists/create', artist);
  }

  getArtist(artistId: any){
    console.log("artist: " , artistId)
    return this.http.get<any>(`http://localhost:3000/artists/${artistId}`);
  }


  allArtists(){
    return this.http.get<any[]>('http://localhost:3000/artists/findAllArtists');
  }

  getWorksByArtistId(artistId: string){
    return this.http.get<any[]>(`http://localhost:3000/works/artist/${artistId}`);
  }

  // createWork(artistId: string, workData: any){
  //   console.log("work: " , workData , artistId)
  //   return this.http.post(`http://localhost:3000/works/create/${artistId}`, workData);
  // }


  createWork(artistId: string, workData: FormData): Observable<any> {
    console.log("workData: " , workData)
    return this.http.post<any>(`http://localhost:3000/works/create/${artistId}`, workData);
  }

  getWorkById(workId: string){
    return this.http.get<any>(`http://localhost:3000/works/${workId}`);
  }

  // Metodă pentru a actualiza o lucrare pe baza ID-ului
  updateWork(workId: string, workData: FormData){
    console.log("am trimis: " , workData)
    return this.http.put<any>(`http://localhost:3000/works/update/${workId}`, workData);
  }

  deleteWork(workId: string) {
    return this.http.delete<void>(`http://localhost:3000/works/delete/${workId}`);
  }  

  getVisibleWorksByArtist(artistId: string){
    return this.http.get<any>(`http://localhost:3000/works/visible?artistId=${artistId}`);
  }


  
}
