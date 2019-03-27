import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      type: '1',
      icon: 'home'
    },
    {
      title: 'List',
      type: '2',
      icon: 'list'
    },
    {
      title: 'Social Share',
      type: '3',
      icon: 'share'
    },
    {
      title: 'Camera',
      type: '4',
      icon: 'camera'
    }
  ];

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  base64Image: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private socialSharing: SocialSharing,
    private camera: Camera
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  event(item){
    console.log("item: ",item)
    switch(item.type){
      case '1':
        this.router.navigate(['/home']);
        break;
      case '2':
        this.router.navigate(['/list']);
        break;
      case '3':
        this.socialSharing.share('Text','subject',null,'https://www.marca.com/index.html');
        break;
      case '4':
        this.camera.getPicture(this.options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
          // Handle error
        });
        break;
    }
  }
}
