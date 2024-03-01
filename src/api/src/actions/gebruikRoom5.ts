import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";

export const GebruikAlias: string = "GebruikenRoom5";

export interface Gebruiken {
    Gebruiken(): ActionResult | undefined;
    // gameObject: GameObject
}

export class Gebruik extends Action {
    public constructor() {
        super(GebruikAlias, "Gebruiken", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, GebruikAlias)) {
            return castTo<Gebruiken>(gameObject).Gebruiken();
            // return (gameObject as unknown as Gebruiken).Gebruiken();
        }

        return undefined;
    }
}
