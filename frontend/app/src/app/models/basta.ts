import { Krug } from "./krug";
import { Kvadrat } from "./kvadrat";
import { Pravougaonik } from "./pravougaonik";

export class Basta {
    vlasnik: string = '';
    tip_baste: string = '';
    zelenila: Kvadrat[] = [];
    bazeni: Pravougaonik[] = [];
    fontane: Krug[] = [];
    stolovi: Krug[] = [];
    stolice: Pravougaonik[] = [];
    lezaljke: Pravougaonik[] = [];
}