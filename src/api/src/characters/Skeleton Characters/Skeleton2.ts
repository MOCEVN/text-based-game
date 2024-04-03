import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { damagePlayer, getPlayerSession } from "../../instances";
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
    const playerSession: PlayerSession = getPlayerSession();

    // Check if the player already examined the treausry
    if (!playerSession.roomSearched) {
        return new TextActionResult(["Examine the treasury first"]);
    }
    return new TextActionResult(["You see that the skeleton seems to be holding a book. Perhaps reading it could provide some insight?"]);
}

public talk(choiceId?: number | undefined): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();

    // Function to give the item back
    // if (playerSession.inventory.includes(ThreeNumberItemAlias)) {
    //     choiceActions.push(new TalkChoiceAction(3, "Throw the code!"));
    // }

    // Check if the player already examined the treausry
    if (!playerSession.roomSearched) {
        return new TextActionResult(["Examine the treasury first"]);
    }

    if (!playerSession.spokenToSkeleton1){
        return new TextActionResult(["Skeleton 1 maybe has a clue"]);
    }

    if (!playerSession.spokenToSkeleton3) {
        return new TextActionResult(["Skeleton 3 maybe has a clue"]);
    }

      // Check if the player has already solved the riddle
      if (playerSession.correctAnswer) {
        return new TextActionResult(["You've already solved the riddle. Collect the item and continue to the next room."]);
    }

    else if (choiceId === 1) {
        let choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(2, "Continue to read the book"),
            new TalkChoiceAction(3, "Take a step back"),
        ];

        // Give the item back
    if (playerSession.inventory.includes(ThreeNumberItemAlias)) {
        choiceActions.push(new TalkChoiceAction(9, "Throw the code!"));
    }

        return new TalkActionResult(this, [
            "As you inspect the book, you decipher fragments of a forgotten tale, a tragic story of love and betrayal.",
            "The faded ink tells..."], 
            choiceActions);

    }
    else if (choiceId === 2) {            
        let choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(4, "I'm ready for your challenge!"),
            new TalkChoiceAction(3, "*run silently away*"),
        ];

        return new TalkActionResult(this, [
            " *The skeleton wakes up* ",
            "Ethel Baker: 'Pathetic mortal, this is not for your eyes! You think you can outwit the darkness that dwells here? Foolishness! Yet, perhaps there's a glimmer of hope for you, hidden within these cursed pages. The item you seek lies within these ancient words, but only the worthy may unlock its secrets. Proceed if you dare, but remember, not all who seek knowledge survive the journey.' "],
            choiceActions);
            
    } else if (choiceId === 3) {
        return new TextActionResult(["You chickened out...That wasn't a succes"]);

    } else if (choiceId === 4) {
        return new TalkActionResult(this, [
            "Ethel Baker: Well well, then here it comes brave soul.",
            "What appears once in a minute, twice in a moment, but never in a thousand years?"
        ],
        [
            new TalkChoiceAction(6, "A second?"),
            new TalkChoiceAction(10, "Ghost"),
            new TalkChoiceAction(8, "Can I have a clue maybe?"),
        ]);
    }
    else if (choiceId === 6 || choiceId === 10) {
        // Level down when the player asnwers the question wrong
        if (damagePlayer(1)){
            return new TextActionResult(["The skeleton got you in chokehold"]);
        }; 
        return new TalkActionResult(this, 
            ["I think youre a little slow, did that even made sense?"],
        [
            new TalkChoiceAction(4, "Try again"),
            new TalkChoiceAction(3, "*run silently away*"),
        ]);
        
    }
// Correct answer with the item
else if (choiceId === 7) {
    // Check if the player has answered the riddle correctly
    if (!playerSession.correctAnswer) {
        playerSession.correctAnswer = true;
        // Check if the player has already collected the code
        if (!playerSession.collectedCode) {
            // If not, collect the code and provide a success message
            playerSession.collectedCode = true;
            return new TextActionResult([
                "Correct...You've surprised me mortal.",
                "I hope you make it out, my friend with the amulet didn't.",
                "With this item, you can continue your quest. Good luck, and I hope I'll never see you again."
            ]);
        } 
    } else {
        // If the player already solved the riddle
        return new TextActionResult(["You already solved the riddle"]);
    }
}

    else if (choiceId === 8) {
        return new TalkActionResult(this, ["Ethel Baker: Mortals aren't really that clever..What a waste of brains.",
    "It's not an animal anyway."],
    [
            new TalkChoiceAction(6, "A second?"),
            new TalkChoiceAction(10, "Ghost"),
            new TalkChoiceAction(7, "The Letter M"),
            new TalkChoiceAction(3, "*run silently away*"),
        ]);
    }
    
    if(choiceId === 9) {
        return new TextActionResult(["You've lost your only way out of here"]);
    }
    
    return new TalkActionResult(this,
        ["In her skeletal hands rests an tattered book, its pages whispering secrets of a bygone era, a silent testament to the knowledge she once held in life."],
        [
            new TalkChoiceAction(1, "Read the book"),
            new TalkChoiceAction(3, "Take a step back"),
        ]
    );
}
}





