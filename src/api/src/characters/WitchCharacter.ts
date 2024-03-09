import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const WitchCharacterAlias: string = "Witch";

export class WitchCharacter extends Character implements Examine {
    public constructor() {
        super(WitchCharacterAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Witch";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Cloaked in darkness, the witch's eyes gleam with otherworldly knowledge. Her presence sends a chill down your spine.",
        ]);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const PlayerSession: PlayerSession = getPlayerSession();
        // PlayerSession.witchRightChoise = false;
        // if ((PlayerSession.witchRightChoise = true)) {
        //     if (choiceId === 2) {
        //         return "You left the wich alone";
        //     }

        //     return new TalkActionResult(
        //         this,
        //         ["Witch: You have completed my riddle!"],
        //         [new TalkChoiceAction(2, "Leave the conversation")]
        //     );
        // }
        //  else {
            
            if (choiceId === 1) {
                return new TalkActionResult(
                    this,
                    ["Witch: You have to answer my riddle first, o wonderer!"],
                    [
                        new TalkChoiceAction(
                            3,
                            "What must I do to earn the potion and escape this accursed place?"
                        ),
                        new TalkChoiceAction(2, "Leave the conversation"),
                    ]
                );
            } else if (choiceId === 2) {
                return "You left the wich alone";
            } else if (choiceId === 3) {
                return new TalkActionResult(
                    this,
                    ["Witch: You have to answer my riddle first, o wonderer!"],
                    [new TalkChoiceAction(2, "Leave the conversation")]
                );
            } else if (choiceId === 10) {
                PlayerSession.witchRightChoise = true;

                return new TalkActionResult(
                    this,
                    [
                        "Witch: You have bested me. The potion you seek lies within the third pot from the left. With it you earn your freedom!",
                    ],
                    [new TalkChoiceAction(2, "Leave the conversation")]
                );
            } else if (choiceId === 4) {
            } else if (choiceId === 5) {
            }
            return new TalkActionResult(
                this,
                ["Witch: this place needs renovation"],
                [
                    new TalkChoiceAction(1, "Ask the witch how to escape the haunted house"),
                    new TalkChoiceAction(2, "Leave the conversation"),
                ]
            );
        // }
    }
}
