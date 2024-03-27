import { UseAlias, UseRoom5 } from "../../actions/UseRoom5";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PotionItemAlias } from "../../items/PotionItem";
import { PlayerSession } from "../../types";

export const FirstPotAlias: string = "Pot1";

export class FirstPot extends Character implements Examine, UseRoom5 {
    public constructor() {
        super(FirstPotAlias, ExamineActionAlias, UseAlias);
    }
    public Use(): ActionResult | undefined {
        const PlayerSession: PlayerSession = getPlayerSession();

        if (PlayerSession.witchRightChoise === true) {
            return new TextActionResult(["Pot: hands off me, traveler"]);
        } else if (PlayerSession.PotRightChoise === true) {
            PlayerSession.inventory.push(PotionItemAlias);
            return new TextActionResult(["You obtained the potion"]);
        } else {
            // eslint-disable-next-line quotes
            return new TextActionResult([
                "Witch: Before you can benefit from its secrets, you must first accept my challenge, traveler.",
            ]);
        }
    }
    public name(): string {
        return "Magic Pot";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Covered in eerie runes, this pot crackles with mysterious energy, emitting faint whispers that send shivers down your spine.",
        ]);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const PlayerSession: PlayerSession = getPlayerSession();

        PlayerSession.talkPotion = true;

        // if (PlayerSession.witchRightChoise === true) {

        // }
        switch (choiceId) {
            case 1:
                if (PlayerSession.witchRightChoise === true) {
                    return new TalkActionResult(
                        this,
                        [
                            "I hear your voice, traveler. Within me lies the elixir of escape, brewed by ancient hands. But only those who have proven their worth may partake of its power.",
                        ],
                        [
                            new TalkChoiceAction(
                                3,
                                "What must I do to earn the potion and escape this accursed place?"
                            ),
                            new TalkChoiceAction(2, "Leave the conversation"),
                        ]
                    );
                } else {
                    PlayerSession.talkPotion = false;
                    return new TextActionResult(["Pot: ....."]);
                }

            case 2:
                PlayerSession.talkPotion = false;
                return new TextActionResult(["You left the pot alone"]);
            case 10:
                PlayerSession.travelers = true;
                return new TextActionResult(["You have completed my test o traveler"]);
            case 1:
            case 1:
        }

        return new TalkActionResult(
            this,
            ["Pot: ..."],
            [
                new TalkChoiceAction(1, "Can you hear me, enchanted pot? What secrets do you hold?"),
                new TalkChoiceAction(2, "Leave the conversation"),
            ]
        );
    }
}
