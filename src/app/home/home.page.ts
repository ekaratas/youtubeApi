import { Component } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  kategoriler: any;

  kategori: any;

  videolar: any;

  bayrak: boolean = false;

  constructor(public servis: YoutubeService, public alertController: AlertController) {

    this.kategoriOlustur();
  }

  kategoriOlustur() {
    this.servis.kategoriGetir().subscribe(sonuc => {this.kategoriler = sonuc['items']; }, error => { console.log(error); } );
  }

  kategoriyeGoreVideoGetir(id) {
    this.servis.kategoriyeGoreVideoGetir(id).subscribe(sonuc => {this.videolar = sonuc['items']; this.bayrak = false; }, error => { console.log(error); });
  }

  izle(vid) {

    if (this.bayrak) {
      window.open('https://www.youtube.com/watch?v=' + vid.id.videoId);
  } else {
      window.open('https://www.youtube.com/watch?v=' + vid.id);
    }

  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Video Ara',
      inputs: [
        {
          name: 'anahtar',
          type: 'text',
          placeholder: 'Anahtar kelime giriniz'
        }
      ],
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.videolar = null;
            this.kategori = null;
            console.log('Vazgeç');
          }
        }, {
          text: 'Tamam',
          handler: (value) => {
            console.log('Video aranacak ...');
          }
        }
      ]
    });

    await alert.present();
  }

}
