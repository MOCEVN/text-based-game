import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const KeyItem2Alias: string = "key-item-2";

export class KeyItem2 extends Item implements Examine, Pickup {
    public constructor() {
        super(KeyItem2Alias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Middle Key";
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Turning your attention to the middle key, it seems unremarkable at first glance.", "Its surface is plain, lacking the look of importance. Yet, as you hold it, there's a reassuring weight to it.", "It radiates a certain strength, hinting at a hidden resilience beneath its unassuming exterior."]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.answeredRiddle === false) {
            if(!playerSession.pickedUpKey2) {
                playerSession.pickedUpKey2 = true;
                (playerSession.inventory.push(KeyItem2Alias));

                return new TextActionResult(["You pick up the middle key."]);

            } else {
                return undefined;
            }
        } else {
            return new TextActionResult(["<I should talk to that scary ghost first...>"]);
        }
    }
}