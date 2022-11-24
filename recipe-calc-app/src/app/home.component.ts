import { Component } from "@angular/core";


@Component({
  template: `
  <div class = "container">
  <h1>{{ title }}</h1>
  <hr />
  
</div>



  `
})

export class HomeComponent{
  title = 'Recipe Calulator';
}
