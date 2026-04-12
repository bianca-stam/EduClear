import { Component } from '@angular/core';
import { PageTitle } from "@app/components/page-title";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-inicio',
  imports: [PageTitle, RouterOutlet],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class Inicio {

}
