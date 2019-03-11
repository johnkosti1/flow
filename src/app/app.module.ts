import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GraphComponent } from './graph/graph.component';
import { AppComponent } from './app.component';
import {NgCytoComponent} from './ng-cyto/ng-cyto.component';
import {HttpClientModule} from '@angular/common/http';

import {ContextMenuModule} from 'ngx-contextmenu';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalComponent } from './components/modal/modal.component';
import {NgDragDropModule} from 'ng-drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    NgCytoComponent,
    GraphComponent,
    AppHeaderComponent,
    SidebarComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ContextMenuModule.forRoot(),
    NgDragDropModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
