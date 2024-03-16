import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { ThreeNumberItemAlias } from "../../items/ThreeNumberItem";
import { PlayerSession } from "../../types";

export const SkeletonCharacter1Alias: string = "skeleton-character-1";

export class SkeletonCharacter1 extends Character implements Examine {
    public constructor() {
        super(SkeletonCharacter1Alias, ExamineActionAlias);
    }

    public name(): string {
        return "Skeleton 1";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You noticed a sleepy skeleton, it's holding a weathered book. With a clue maybe?"]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (choiceId === 1) {
            // Action for shaking the skeleton
            const choiceActions: TalkChoiceAction[] = [
                new TalkChoiceAction(4, " 'Is there any way you can help me out of here...' "),
                new TalkChoiceAction(2, "Continue the quest"),
            ];
            if (playerSession.inventory.includes(ThreeNumberItemAlias)) {
                choiceActions.push(new TalkChoiceAction(3, "Throw the code!"));
            }
            return new TalkActionResult(this,
                ["*You gently shake the skeleton, hoping to wake it up*",
                "Boney McRibage: 'Hey there, pal! The name's Boney McRibcage.",
                "Yep, I used to be a regular Joe until this ol' haunted house got the best of me.",
                "Now I'm just hangin' around, quite literally. Heh, get it? Hangin' around?",
                "Anyway, watch your step friend. Things can get pretty spooky around here.",
                "Oh, and about this book I'm holding, don't let it fool ya. It's just a bunch of gibberish, no help to anyone.",
                "So, what's your deal? Trying to break the curse? Or just lost your way to the local sandwich shop?"

                ],
                choiceActions
            );
        } else if (choiceId === 2) {
            // Action for continuing the quest
            return new TextActionResult(["You decide to continue your exploration, perhaps there's more to uncover..."]);
        } else if (choiceId === 3) {
            // Action for throwing the code
            playerSession.inventory = [];
            return new TextActionResult(["You've lost the code..."]);
        } else if (choiceId === 4) {
            // Action for asking for help
            return new TextActionResult([
                "Boney McRibage: 'I'm sorry pal, I cannot help you with that... but maybe one of my friends can.' ",
                " 'I don't remember which one again haha! Goodluck fella.' "
            ]);
        }

        // Default action when no specific choice is selected
        return new TalkActionResult(this,
            ["As you cautiously approach the skeleton, you hear a soft snoring sound emanating from its gaping jaw, indicating that it's asleep.",
                "You realize that you'll need to wake it up to proceed further."
            ],
            [
                new TalkChoiceAction(1, " *shake the skeleton* "),
                new TalkChoiceAction(2, "Continue the quest"),
            ]
        );
    }
}


