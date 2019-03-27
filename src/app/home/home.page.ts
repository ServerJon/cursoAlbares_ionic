import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { HomeService } from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  base64Image: string;

  constructor(private homeService: HomeService, private alertController: AlertController,
    private camera: Camera){ }

  ngOnInit() {
    this.select_user();
  }

  load_profile(name:string){
    this.homeService.load(name).subscribe(
      response => {
        this.user = response.json();
        this.base64Image = this.user.avatar_url;
      },
      error => {
        this.homeService.handleErrors(error);
      }
    );
  }

  async select_user(){
    const alert = await this.alertController.create({
      header: 'Elige usuario de Github',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Usuario'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            this.load_profile(data.name);
          }
        }
      ]
    });

    await alert.present();
  }

  openCamara(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
}
