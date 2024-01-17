import { AbstractControl } from "@angular/forms";

export default class Utils {
    static getFormControlErrorText(ctrl: AbstractControl): string {
        if (ctrl.hasError('required')) {
            return 'Ce champ est requis';
        } else if (ctrl.hasError('email')) {
            return 'Merci d\'entrer une adresse mail valide';
        } else if (ctrl.hasError('emailUsed')) {
            return 'Cet Email est dejà utilisé par un autre utilisateur';
        }
        else {
            return 'Ce champ contient une erreur';
        }
    }

    static isEmail(search: string): boolean {
        let serchfind: boolean;

        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        serchfind = regexp.test(search);
        return serchfind
    }
}