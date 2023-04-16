import { Component } from '@angular/core';
import { map, Subject, switchMap, take, timer } from 'rxjs';

@Component({
  selector: 'app-dice-roll',
  templateUrl: './dice-roll.component.html',
  styleUrls: ['./dice-roll.component.css'],
})
export class DiceRollComponent {
  rolling = false;
  selectedRollCount = 1;
  selectedType = 4;
  start$ = new Subject();

  roller$ = this.start$
    .pipe(
      switchMap((max: any) => {
        return timer(0, 50).pipe(take(10), map(_ => {
          let total = 0;
          for (let i = 0; i < this.selectedRollCount; i++) {
            total += this.calcRoll(max);
          }
          return total
        }))
      })
    )

  calcRoll(max: number) {
    const min = 1;
    return Number((Math.random() * (max - min) + min).toFixed(0));
  }

  start(max: number) {
    this.selectedType = max;
    this.start$.next(max);
  }
}

