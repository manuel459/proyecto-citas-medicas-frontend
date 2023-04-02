import { Inject, Injectable } from "@angular/core";
import { Router,CanActivate,ActivatedRouteSnapshot} from "@angular/router";
import { AuthService } from "../service/auth.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private router: Router,
        private apiauthservice: AuthService
        ){

    }
    canActivate(route: ActivatedRouteSnapshot){
        const usuario = this.apiauthservice.usuarioData;
        if(usuario){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}