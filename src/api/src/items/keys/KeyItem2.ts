import { UseRoom2, UseRoom2ActionAlias } from "../../actions/UseRoom2";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const KeyItem2Alias: string = "key-item-2";

export class KeyItem2 extends Item implements Examine, Pickup, UseRoom2 {
    public constructor() {
        super(KeyItem2Alias, ExamineActionAlias, PickupActionAlias, UseRoom2ActionAlias);
    }

    public name(): string {
        return "Middle Key";
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Turning your attention to the middle key, it seems unremarkable at first glance.", "Its surface is plain, lacking the look of importance. Yet, as you hold it, there's a reassuring weight to it.", "It radiates a certain strength, hinting at a hidden resilience beneath its unassuming exterior."]);
    }

        // Modified useRoom2 method to show only the player's item inventory
        public useroom2(_gameObject: GameObject): ActionResult | undefined {
            const playerSession: PlayerSession = getPlayerSession();
            
            if (!playerSession.answeredRiddle && !playerSession.pickedUpKey2) {
                return new TextActionResult(["<I should talk to that scary ghost first...>"]);
            }
            
            if (!playerSession.inventory.includes(KeyItem2Alias)) {
                return new TextActionResult(["You haven't picked up the key yet."]);
            }
            
            return new TextActionResult(["You used the key"]);
        }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.answeredRiddle === false) {
            if(!playerSession.pickedUpKey2) {
                playerSession.pickedUpKey2 = true;
                playerSession.inventory.push(KeyItem2Alias);
                
                return new TextActionResult(["You pick up the middle key."]);
            } else if (!playerSession.answeredRiddle && playerSession.pickedUpKey2) {
                return new TextActionResult(["<I should talk to that scary ghost first...>"]);
            } else {
                return new TextActionResult(["<I should talk to that scary ghost first...>"]);
            }
        }

        return new TextActionResult(["<I should talk to that scary ghost first...>"]);
    }
}