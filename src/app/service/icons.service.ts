import { Injectable } from '@angular/core';
import icWhatsapp from "@iconify/icons-fa-brands/whatsapp";
@Injectable({
  providedIn: 'root'
})
export class IconsService {

  private iconsByName: Record<string, object> = {};

  register(name: string, icon: object) {
    this.iconsByName[name] = icon;
  }

  registerAll(iconsByName: Record<string, object>){
    Object.assign(this.iconsByName, iconsByName);
  }

  get(name: string): object {
    const icon = this.iconsByName[name];
    if (!icon) {
      throw new Error(`[Iconify]: No icon registered for name '${name}'. Use 'IconService' to register icons.`);
    }
    return icon;
  }

}
