import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const KeyItem1Alias: string = "key-item-1";

export class KeyItem1 extends Item implements Examine, Pickup {
    public constructor() {
        super(KeyItem1Alias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Left Key";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["As you inspect the left key, it glimmers softly in the dim light. The metal is smooth, adorned with delicate patterns that catch your eye.", "It feels cool to the touch, and a faint, melodic hum resonates through your fingertips.", "This key feels important."]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.answeredRiddle === false) {
            if (!playerSession.pickedUpKey1) {
                playerSession.pickedUpKey1 = true;
                playerSession.inventory.push(KeyItem1Alias);

                return new TextActionResult(["You pick up the left key."]);

            } else {
                return undefined;
            }
        } else {
            return new TextActionResult(["<I should talk to that scary ghost first...>"]);
        }
    }
}