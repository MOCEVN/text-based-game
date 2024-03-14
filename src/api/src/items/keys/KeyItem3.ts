import { UseRoom2, UseRoom2ActionAlias } from "../../actions/UseRoom2";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { Room3 } from "../../rooms/Room3";
import { PlayerSession } from "../../types";

export const KeyItem3Alias: string = "key-item-3";

export class KeyItem3 extends Item implements Examine, Pickup, UseRoom2 {
    public constructor() {
        super(KeyItem3Alias, ExamineActionAlias, PickupActionAlias, UseRoom2ActionAlias);
    }

    // TODO: check of dit werkt voor de opgepakte key!!
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        return new Room3().custom(alias,[this]);
    }

    public name(): string {
        return "Right Key";
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["The right key, small and weathered, carries the weight of time in its appearance. Tiny scratches and faded grooves tell tales of countless uses.", "As you run your fingers over its aged surface, a sense of history envelopes you.", "This key has witnessed much, and though it may seem frail, there's a timeless quality to it."]);
    }

    // TODO: zorg ervoor dat de user de juiste key kan gebruiken op de deur!!
    public useroom2(_gameObject: GameObject): ActionResult | undefined {
        return new TextActionResult(["You used the key"]);
    }
    
    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.answeredRiddle === false) {
            if(!playerSession.pickedUpKey3) {
                playerSession.pickedUpKey3 = true;
                (playerSession.inventory.push(KeyItem3Alias));

                return new TextActionResult(["You pick up the right key."]);

            } else {
                return undefined;
            }
        } else {
            return new TextActionResult(["<I should talk to that scary ghost first...>"]);
        }
    }
}