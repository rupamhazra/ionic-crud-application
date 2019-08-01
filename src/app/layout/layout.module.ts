import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LayoutPage } from './layout.page';
import { LayoutRoutingModule } from './layout-routing.module'
import { HeaderComponent } from "../core/components/header/header.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutRoutingModule,
    
  ],
  declarations: [LayoutPage,HeaderComponent]
})
export class LayoutPageModule {}
