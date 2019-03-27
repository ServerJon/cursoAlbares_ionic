import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { HomePage } from './home.page';

import { HomeService } from './home.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
    ])
  ],
  declarations: [HomePage],
  providers: [
    HomeService
  ]
})
export class HomePageModule {}
