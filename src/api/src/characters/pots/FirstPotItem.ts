import { UseAlias, UseRoom5 } from "../../actions/UseRoom5";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PotionItemAlias } from "../../items/PotionItem";
import { PlayerSession } from "../../types";

export const FirstPotAlias: string = "Pot1";

export class FirstPot extends Item implements Examine, UseRoom5 {
    public constructor() {
        super(FirstPotAlias, ExamineActionAlias, UseAlias);
    }
    public Use(): ActionResult | undefined {
        const PlayerSession: PlayerSession = getPlayerSession();

        if (PlayerSession.witchRightChoise === true) {
            PlayerSession.inventory.push(PotionItemAlias);
            return new TextActionResult(["You obtained the potion"]);
        } else {
            // eslint-disable-next-line quotes
            return new TextActionResult([`The pot remains unmoved, its contents still hidden. Witch: "Before you can benefit from its secrets, you must first accept my challenge, traveler."`]);
        }
    }
    public name(): string {
        return "Pot";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Covered in eerie runes, this pot crackles with mysterious energy, emitting faint whispers that send shivers down your spine.",
        ]);
    }
}
