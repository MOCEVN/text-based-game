import { UseRoom2, UseRoom2ActionAlias } from "../../actions/UseRoom2";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const KeyItem1Alias: string = "key-item-1";

export class KeyItem1 extends Item implements Examine, Pickup, UseRoom2 {
    public constructor() {
        super(KeyItem1Alias, ExamineActionAlias, PickupActionAlias, UseRoom2ActionAlias);
    }

    public name(): string {
        return "Left Key";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["As you inspect the left key, it glimmers softly in the dim light. The metal is smooth, adorned with delicate patterns that catch your eye.", "It feels cool to the touch, and a faint, melodic hum resonates through your fingertips.", "This key feels important."]);
    }

        // Modified useRoom2 method to show only the player's item inventory
        public useroom2(_gameObject: GameObject): ActionResult | undefined {
            const playerSession: PlayerSession = getPlayerSession();
            
            if (!playerSession.answeredRiddle && !playerSession.pickedUpKey1) {
                return new TextActionResult(["<I should talk to that scary ghost first...>"]);
            }
            
            if (!playerSession.inventory.includes(KeyItem1Alias)) {
                return new TextActionResult(["You haven't picked up the key yet."]);
            }
            
            return new TextActionResult(["You used the key"]);
        }
    
        public pickup(): ActionResult | undefined {
            const playerSession: PlayerSession = getPlayerSession();
    
            if (!playerSession.answeredRiddle === false) {
                if(!playerSession.pickedUpKey1) {
                    playerSession.pickedUpKey1 = true;
                    playerSession.inventory.push(KeyItem1Alias);
                    
                    return new TextActionResult(["You pick up the left key."]);
                } else if (!playerSession.answeredRiddle && playerSession.pickedUpKey1) {
                    return new TextActionResult(["<I should talk to that scary ghost first...>"]);
                } else {
                    return new TextActionResult(["<I should talk to that scary ghost first...>"]);
                }
            }
    
            return new TextActionResult(["<I should talk to that scary ghost first...>"]);
        }
    }