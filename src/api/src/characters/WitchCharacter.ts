import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession, resetPlayerSession } from "../instances";
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
        if (PlayerSession.witchRightChoise === true) {
            const trys: number = PlayerSession.playertrys;
            if (trys === 0) {
                resetPlayerSession();
                return new TextActionResult(["Game Over"]);
            }
            if (choiceId === 2) {
                return "You left the wich alone";
            }

            return new TalkActionResult(
                this,
                ["Witch: You have completed my riddle!"],
                [new TalkChoiceAction(2, "Leave the conversation")]
            );
        } else {
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
                    [
                        new TalkChoiceAction(
                            4,
                            "I'm ready to face your challenge, witch. Lay your riddle upon me."
                        ),
                        new TalkChoiceAction(2, "Leave the conversation"),
                    ]
                );
            } else if (choiceId === 4) {
                return new TalkActionResult(
                    this,
                    [
                        "Witch: Here is your riddle, brave wanderer, In the first pot lies the answer to this question: I am taken from a mine and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
                    ],
                    [
                        new TalkChoiceAction(5, "Is it coal?"),
                        new TalkChoiceAction(6, "Could it be a pencil?"),
                        new TalkChoiceAction(7, "Maybe it's a shovel?"),
                        new TalkChoiceAction(2, "Leave the conversation"),
                    ]
                );
            } else if (choiceId === 7) {
                const trys: number = PlayerSession.playertrys;
                const remainingTrys: number = 5 - trys;
                PlayerSession.playertrys++;
                console.log(trys);
                return new TalkActionResult(
                    this,
                    [`Incorrect, traveler. Try again. Remember, you have ${remainingTrys} more try.`],
                    [
                        new TalkChoiceAction(5, "Is it coal?"),
                        new TalkChoiceAction(6, "Could it be a pencil?"),
                        new TalkChoiceAction(7, "Maybe it's a shovel?"),
                        new TalkChoiceAction(2, "Leave the conversation"),
                    ]
                );
            } else if (choiceId === 5) {
                const trys: number = PlayerSession.playertrys;
                const remainingTrys: number = 5 - trys;
                PlayerSession.playertrys++;
                console.log(trys);
                return new TalkActionResult(
                    this,
                    [`Not quite, wanderer. Give it another shot. You have ${remainingTrys} more chance.`],
                    [
                        new TalkChoiceAction(5, "Is it coal?"),
                        new TalkChoiceAction(6, "Could it be a pencil?"),
                        new TalkChoiceAction(7, "Maybe it's a shovel?"),
                        new TalkChoiceAction(2, "Leave the conversation"),
                    ]
                );
            } else if (choiceId === 6) {
                PlayerSession.witchRightChoise = true;

                return new TalkActionResult(
                    this,
                    [
                        "Witch Very well, traveler, your next challenge requires more than mere wit. Look around you and heed the clues before you. For in this room lies the answer to my riddle. Listen carefully,In the heart of darkness, I dwell. My hunger knows no bounds, yet I am never sated. Those who dare to seek my presence often find themselves ensnared. What am I?",
                    ],
                    [
                        new TalkChoiceAction(8, "Is it fear?"),
                        new TalkChoiceAction(9, "Could it be fire?"),
                        new TalkChoiceAction(10, "Perhaps it's a curse?"),
                        new TalkChoiceAction(2, "Leave the conversation"),
                    ]
                );
            } else if (choiceId === 8) {
                PlayerSession.witchRightChoise = true;

                return new TalkActionResult(
                    this,
                    [
                        "Witch: You have bested me. The potion you seek lies within the third pot from the left. With it you earn your freedom!",
                    ],
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
}
