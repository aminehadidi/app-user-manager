import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
      <h2 class="title">{{ importantMsg }}</h2>
      <h3 class="sub-title">
        Sinon vous pouvez accèder à la liste des utilisateurs : <a href="/users">ici</a>
      </h3>`,
  styles: [],
})
export default class ApiDownComponent {
    importantMsg = 'Si l\'API REST est indisponible, veuillez démarrer le micro service backend';


}