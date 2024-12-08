import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { GoogleMapsModule } from '@angular/google-maps';
import { YouTubePlayerModule } from '@angular/youtube-player';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    GoogleMapsModule, 
    YouTubePlayerModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
