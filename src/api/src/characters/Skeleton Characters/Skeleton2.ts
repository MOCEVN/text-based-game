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
    return new TextActionResult(["You see that the skeleton seems to be holding a book. Perhaps reading it could provide some insight?"]);
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

        return new TalkActionResult(this, [
            "As you inspect the book, you decipher fragments of a forgotten tale, a tragic story of love and betrayal.",
            "The faded ink tells..."], 
            choiceActions);

    } else if (choiceId === 2) {            
        let choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(4, "I'm ready for your challenge!")
        ];

        return new TalkActionResult(this, [
            " *The skeleton wakes up* ",
            "Ethel Baker: 'Pathetic mortal, this is not for your eyes! You think you can outwit the darkness that dwells here? Foolishness! Yet, perhaps there's a glimmer of hope for you, hidden within these cursed pages. The item you seek lies within these ancient words, but only the worthy may unlock its secrets. Proceed if you dare, but remember, not all who seek knowledge survive the journey.' "],
            choiceActions);
            
    } else if (choiceId === 3) {
        return new TextActionResult(["You chickened out."]);

    } else if (choiceId === 4) {
        return new TextActionResult([
            "Ethel Baker: Well well, then here it comes brave soul."
        ]);
    }

    // Default action when no specific choice is selected
    return new TalkActionResult(this,
        ["In her skeletal hands rests an tattered book, its pages whispering secrets of a bygone era, a silent testament to the knowledge she once held in life."],
        [
            new TalkChoiceAction(1, "Read the book"),
            new TalkChoiceAction(3, "Run for your life"),
        ]
    );
}
}





