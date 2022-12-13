import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mealplanner',
  templateUrl: './mealplanner.component.html',
  styleUrls: ['./mealplanner.component.css']
})
export class MealplannerComponent implements OnInit {

  str: string= "Today is:"
  date = new Date(); 
  constructor() { }

  ngOnInit(): void {
  }


}
