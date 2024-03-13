import { ActionResult } from "../actionResults/ActionResult";
import { GameObject } from "../gameObjects/GameObject";
import { castTo, implementsInterface } from "../helpers";
import { Action } from "./Action";

export const PickupActionAlias: string = "pickup";

export interface Pickup {
    pickup(): ActionResult | undefined;
}
export class PickupAction extends Action {
    public constructor() {
        super(PickupActionAlias, "Pickup", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, PickupActionAlias)) {
            return castTo<Pickup>(gameObject).pickup();
        }
        
        return undefined;
    }
}