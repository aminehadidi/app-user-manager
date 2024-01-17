# AppUserManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## config url microservice backend

- Mettre à jour l'url dans /src/assets/config/config.json  ; "userManagementUrl": "http://localhost:8080/api/user-management/users" 

- Mettre à jour l'url du microservice dans  /proxy.conf.json; "target": "http://localhost:8080" 

## après avoir importé le projet depuis git
- Lancer la ligne de commande npm i puis npm fund
- Après avoir mis à en marche de l'application backend vous pouvez lancer ng serve et accèder à l'application 

 
