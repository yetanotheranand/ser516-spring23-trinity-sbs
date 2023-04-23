import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'app-defect-injection-rate',
   templateUrl: './defect-injection-rate.component.html',
   styleUrls: ['./defect-injection-rate.component.css']
})
export class DefectInjectionRateComponent implements OnInit {

   defectInjectionRate: number;

   constructor(private http: HttpClient) { }

   ngOnInit(): void {
      this.http.get('/api/defects').subscribe((data: any) => {
         const numberOfDefects = data.numberOfDefects;
         const sizeOfCodebase = data.sizeOfCodebase;
         this.defectInjectionRate = this.calculateDefectInjectionRate(numberOfDefects, sizeOfCodebase);
      });
   }

   calculateDefectInjectionRate(numberOfDefects: number, sizeOfCodebase: number): number {
      let defectInjectionRate = 0.0;
      if (sizeOfCodebase > 0) {
         defectInjectionRate = (numberOfDefects / sizeOfCodebase) * 100.0;
      }
      return defectInjectionRate;
   }
}
