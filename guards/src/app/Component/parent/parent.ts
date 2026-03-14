import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-parent',
  imports: [RouterOutlet ,FormsModule],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})
export class Parent {

  sucre : boolean = false;
  sel : boolean = false

  ngOnInit(){
   this.sucre = localStorage.getItem("sucre") != null;
   this.sel = localStorage.getItem("sel") != null;
  }

  updateSweet(){
    if(this.sucre){
      localStorage.setItem("sucre", "true")
    }
    else{
      localStorage.removeItem("sucre")

    }

  }
  updateSalty(){
    if(this.sel){
      localStorage.setItem("sel", "true")
    }
    else{
      localStorage.removeItem("sel")

    }

  }

}
