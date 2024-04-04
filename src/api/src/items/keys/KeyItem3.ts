import { UseRoom2, UseRoom2ActionAlias } from "../../actions/UseRoom2";
import { ActionResult } from "../../base/actionResults/ActionResult";
// import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
// import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Item } from "../../base/gameObjects/Item";
// import { GhostCharacter } from "../../characters/GhostCharacter";
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
        return new Room3().custom(alias, [this]);
    }

    public name(): string {
        return "Right Key";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The right key, small and weathered, carries the weight of time in its appearance. Tiny scratches and faded grooves tell tales of countless uses.", "As you run your fingers over its aged surface, a sense of history envelopes you.", "This key has witnessed much, and though it may seem frail, there's a timeless quality to it."]);
    }

    public useroom2(_gameObject: GameObject): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.answeredRiddle && !playerSession.pickedUpKey3) {
            return new TextActionResult(["<I should talk to that scary ghost first...>"]);
        }

        if (!playerSession.inventory.includes(KeyItem3Alias)) {
            return new TextActionResult(["You haven't picked up the key yet."]);
        } else if (playerSession.answeredRiddle && playerSession.pickedUpKey3) {
            if (playerSession.answeredRiddle === true) {
                if (playerSession.pickedUpKey3) {
                    playerSession.pickedUpKey3 = false;
                    playerSession.inventory.splice(0);

                    playerSession.openedDoor = true;
                    return new TextActionResult(["As you try to insert the key into the lock, a faint click resonates through the chamber, echoing in the stillness.", "With a gentle push, the door swings open, revealing a path into the unknown. The ghostly figure hovers nearby, its ethereal presence guiding your way.", "\'You have chosen wisely, mortal,' it murmurs, a whisper carried on the winds of fate. 'May the journey ahead be as rewarding as the choices you have made.'"],                    );
                }
            }
        }

        return undefined;
    }

    public proceed(_gameObject: GameObject): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (!playerSession.openedDoor === true) {
            playerSession.openedDoor = true;
        }
        
        return undefined;
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.answeredRiddle === false) {
            if (!playerSession.pickedUpKey3) {
                playerSession.pickedUpKey3 = true;
                playerSession.inventory.push(KeyItem3Alias);

                return new TextActionResult(["You pick up the right key."]);

            } else if (!playerSession.inventory.includes(KeyItem3Alias)) {
                playerSession.pickedUpKey3 = true;
                playerSession.inventory.push(KeyItem3Alias);

                return new TextActionResult(["You pick up the right key."]);
            } else if (playerSession.answeredRiddle && playerSession.pickedUpKey3) {
                return new TextActionResult(["You can't pick up the same object twice, doofus."]);
            } else {
                return undefined;
            }
        }

        return new TextActionResult(["<I should talk to that scary ghost first...>"]);
    }
}
