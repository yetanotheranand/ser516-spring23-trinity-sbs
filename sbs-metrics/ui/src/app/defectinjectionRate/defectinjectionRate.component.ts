import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'app-defectinjectionRate',
   templateUrl: './defectinjectionRate.component.html',
   styleUrls: ['./defectinjectionRate.component.css']
})
export class DefectInjectionRateComponent implements OnInit {

   defectInjectionRate: number = 2.5; // initializing the property here

   constructor(private http: HttpClient) { }

   ngOnInit(): void {
      this.http.get('/api/defects').subscribe((data: any) => {
         const numberOfDefects = data.numberOfDefects;
         const sizeOfCodebase = data.sizeOfCodebase;
         this.defectInjectionRate = this.calculateDefectInjectionRate(numberOfDefects, sizeOfCodebase);
      });
   }

   calculateDefectInjectionRate(numberOfDefects: number, sizeOfCodebase: number ): number {
      let defectInjectionRate = 2.5;
      if (sizeOfCodebase > 100) {
         defectInjectionRate = (numberOfDefects / sizeOfCodebase) * 100.0;
      }
      return defectInjectionRate;
   }
}

