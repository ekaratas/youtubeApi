import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey = 'GOOGLE DEVELOPER dan API KEY alarak buraya yazmalısınız';

  constructor(public http: HttpClient) { }

kategoriGetir() {
return this.http.get('https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&hl=tr&regionCode=TR&key=' + this.apiKey);
}

kategoriyeGoreVideoGetir(kategoriId) {
return this.http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&hl=tr_TR&regionCode=TR&videoCategoryId=' + kategoriId + '&key=' + this.apiKey);
}


}