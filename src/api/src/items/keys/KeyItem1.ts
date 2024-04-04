import { UseRoom2, UseRoom2ActionAlias } from "../../actions/UseRoom2";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { UseActionResult } from "../../base/actionResults/UseActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
import { UseChoiceAction } from "../../base/actions/useitem";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Item } from "../../base/gameObjects/Item";
import { GhostCharacter } from "../../characters/GhostCharacter";
import { damagePlayer, getPlayerSession } from "../../instances";
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

    public useroom2(_gameObject: GameObject): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.answeredRiddle && !playerSession.pickedUpKey1) {
            return new TextActionResult(["<I should talk to that scary ghost first...>"]);
        }

        if (!playerSession.inventory.includes(KeyItem1Alias)) {
            return new TextActionResult(["You haven't picked up the key yet."]);
        } else if (playerSession.answeredRiddle && playerSession.pickedUpKey1) {

            if (playerSession.answeredRiddle === true) {
                if (playerSession.pickedUpKey1) {
                    playerSession.pickedUpKey1 = false;
                    playerSession.inventory.splice(0);

                    if (damagePlayer(10)){
                        return new TextActionResult(["GAME OVER", "The ghost killed you."]);
                    }
                    return new UseActionResult(
                        new GhostCharacter(),
                        ["As you try the  key, chilly air fills the room. You turn around, the ghost's eyes narrow, and with a hiss, darkness engulfs you. In a flash, you're consumed by the ghost's wrath."],
                        [new UseChoiceAction(10, "Continue"),
                        new UseChoiceAction(11, "Explore further")]
                    );
                }
            }
        }

        return undefined;
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.answeredRiddle === false) {
            if (!playerSession.pickedUpKey1) {
                playerSession.pickedUpKey1 = true;
                playerSession.inventory.push(KeyItem1Alias);

                return new TextActionResult(["You pick up the left key."]);
            } else if (playerSession.answeredRiddle && !playerSession.pickedUpKey1) {
                playerSession.pickedUpKey1 = true;
                playerSession.inventory.push(KeyItem1Alias);

                return new TextActionResult(["You pick up the left key."]);
            } else if (!playerSession.inventory.includes(KeyItem1Alias)) {
                playerSession.pickedUpKey1 = true;
                playerSession.inventory.push(KeyItem1Alias);

                return new TextActionResult(["You pick up the left key."]);
            } else if (playerSession.answeredRiddle && playerSession.pickedUpKey1) {
                return new TextActionResult(["You can't pick up the same object twice, doofus."]);
            } else {
                return undefined;
            }
        }

        return new TextActionResult(["<I should talk to that scary ghost first...>"]);
    }
}