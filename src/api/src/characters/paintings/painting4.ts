import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Custom, CustomActionAlias } from "../../base/actions/CustomAction";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { GameObject } from "../../base/gameObjects/GameObject";
import { getPlayerSession } from "../../instances";
import { Room4 } from "../../rooms/Room4";
import { PlayerSession } from "../../types";

export const Painting4CharacterAlias: string = "painting4";

export class Painting4Character extends Character implements Examine,Custom{

    public constructor(){
        super(Painting4CharacterAlias,ExamineActionAlias,CustomActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["As you examine the painting, a sense of dread washes over you, as if the scene depicted holds a dark secret waiting to be uncovered."]);
    }
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        return new Room4().custom(alias,[this]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        switch(choiceId){
            case 1: // "Hello?"
                if (playerSession.paintingsTalkedTo < 4) {
                    ++playerSession.paintingsTalkedTo;
                    return new TextActionResult(["\"...\""]);
                } else {
                    return new TextActionResult(["\"...\"","(Maybe i should yell something into the room to get a response.)"]);
                }
            case 2: // <Leave>
                return new TextActionResult(["You contemplate speaking to the painting but quickly discard the notion, assuming it won't reply. With a dismissive wave, you move on, leaving the silent artwork unaddressed."]);
            case 3:
                return new TextActionResult(["\"Alas, you have been deceived,\"", 
                "the chosen painting laments, its voice dripping with disappointment.", 
                "\"Return to the puzzle and choose more wisely.\""]);
            case 4:
                return new TextActionResult([]);
            case 5:
                return new TextActionResult(["\"In life, I was a mystery to many, and in death, I remain so. My secrets are forever woven into the fabric of this canvas, waiting to be unraveled by those who dare to seek.\""]);
            case 6:
                return new TalkActionResult(this,["Are you sure?"],[
                    new TalkChoiceAction(3,"Yes"),
                    new TalkChoiceAction(4,"No")
                ]);
        }
        if (playerSession.paintingPuzzleState === 1) {
            return new TalkActionResult(this,["\"Do not be deceived by The Painting of the Ghostly Gaze and The Painting of the Whispering Winds. They both speak lies to mislead you. I hold the treasure you seek.\""],[
                new TalkChoiceAction(6, "I believe you hold the answer to my quest. Please reveal the treasure hidden within your frame."),
                new TalkChoiceAction(4,"<Leave>")
            ]);
        }
        if (playerSession.paintingPuzzleState >= 2) {
            return new TalkActionResult(this,["You walk up to the painting."],[
                new TalkChoiceAction(5,"Tell me about yourself.")
            ]);
        }

        return new TalkActionResult(this,["You walk up to the painting."],[
            new TalkChoiceAction(1,"Hello?"),
            new TalkChoiceAction(2,"<Leave>")
        ]);
    }

    public name(): string {
        return "Painting of the Forgotten Memories";
    }
    
}