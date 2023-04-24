import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { DefectInjectionRateComponent } from './defectinjectionRate/defectinjectionRate.component';
import { NgChartsModule } from 'ng2-charts';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, GraphComponent, DefectInjectionRateComponent],
  imports: [BrowserModule, AppRoutingModule, NgChartsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
