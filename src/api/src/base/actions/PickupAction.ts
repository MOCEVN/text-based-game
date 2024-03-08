import { ActionResult } from "../actionResults/ActionResult";
import { Action } from "./Action";

export const PickupActionAlias: string = "pickup";

export interface Pickup {
    pickup(): Promise<ActionResult | undefined>;
}
export class PickupAction extends Action {
    public constructor() {
        super(PickupActionAlias, "Pickup", true);
    }
}