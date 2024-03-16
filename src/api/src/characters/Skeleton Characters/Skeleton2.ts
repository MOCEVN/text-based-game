import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { ThreeNumberItemAlias } from "../../items/ThreeNumberItem";
import { PlayerSession } from "../../types";

export const SkeletonCharacter2Alias: string = "skeleton-character-2";

export class SkeletonCharacter2 extends Character implements Examine {
    public constructor() {
        super(SkeletonCharacter2Alias, ExamineActionAlias);
    }

    public name(): string {
        return "Skeleton 2";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You're walking slowly towards a skeleton, hoping you'll get closer to an answer."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (choiceId === 1) {
            let choiceActions: TalkChoiceAction[] = [
                new TalkChoiceAction(1, "Read the book"),
                new TalkChoiceAction(2, "Continue to read the book"),
                new TalkChoiceAction(3, "Run for your life"),
            ];

            if (playerSession.inventory.includes(ThreeNumberItemAlias)) {
                choiceActions.push(new TalkChoiceAction(3, "Throw the code!"));
            }

            return new TalkActionResult(this, ["The skeleton clutching a book seems frozen in time.",
            "As you inspect the book, you decipher fragments of a forgotten tale, a tragic story of love and betrayal.",
            "The faded ink tells..."], 
            choiceActions);
        } else if (choiceId === 2) {
            return new TextActionResult(["Ethel Baker: 'Pathetic mortal, this is not for your eyes! You think you can outwit the darkness that dwells here? Foolishness! Yet, perhaps there's a glimmer of hope for you, hidden within these cursed pages. The item you seek lies within these ancient words, but only the worthy may unlock its secrets. Proceed if you dare, but remember, not all who seek knowledge survive the journey.' "]);
        } else if (choiceId === 3) {
            return new TextActionResult(["You chickened out."]);
        }

        // Default action when no specific choice is selected
        return new TalkActionResult(this,
            ["You see that the skeleton seems to be holding a book. Perhaps talking to it could provide some insight?"
            ],
            [
                new TalkChoiceAction(1, "Read the book"),
                new TalkChoiceAction(3, "Run for your life"),
            ]
        );
    }
}





