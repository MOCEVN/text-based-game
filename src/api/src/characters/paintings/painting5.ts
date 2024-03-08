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

export const Painting5CharacterAlias: string = "painting5";

export class Painting5Character extends Character implements Examine,Custom{

    public constructor(){
        super(Painting5CharacterAlias,ExamineActionAlias,CustomActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The longer you study the painting, the more you feel as though you're being drawn into its world, losing yourself in its depths with each passing moment."]);
    }
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        return new Room4().custom(alias,[this]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.paintingPuzzleState === 1) {
            return new TextActionResult([
                "\"To uncover the truth, you must unravel the puzzle before you. Three paintings hold the key, but beware, for they can either tell the truth or lie.\"", 
                "The painting continues, \"You must seek out the words of The Painting of the Ghostly Gaze, The Painting of the Whispering Winds, and The Painting of the Forgotten Memories. Each will speak but one sentence, and from their words, you must discern the path to your prize.\""
            ]);
        }
        switch(choiceId){
            case 1: // "Hello?"
                if (playerSession.paintingsTalkedTo < 3) {
                    ++playerSession.paintingsTalkedTo;
                    return new TextActionResult(["\"...\""]);
                } else {
                    return new TextActionResult(["\"...\"","(Maybe i should yell something into the room to get a response.)"]);
                }
            case 2: // <Leave>
                return new TextActionResult(["Briefly considering speaking to the painting, you ultimately decide against it, anticipating no response. You move forward, leaving the silent artwork untouched."]);
            case 5:
                return new TextActionResult(["\"I have witnessed countless lives pass before me, each one leaving its mark on the world. Now, I observe in silence, content to bear witness to the passage of time.\""]);
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
        return "Painting of the Lost Souls";
    }
    
}