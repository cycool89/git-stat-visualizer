import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullGitHistoryModule } from './modules/full-git-history/full-git-history.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullGitHistoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
