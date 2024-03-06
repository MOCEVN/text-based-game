import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const Painting1CharacterAlias: string = "painting1";

export class Painting1Character extends Character implements Examine{

    public constructor(){
        super(Painting1CharacterAlias,ExamineActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Examining the painting, you feel a faint breeze emanating from the scene, as if the landscape depicted is breathing."]);
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
                return new TextActionResult(["\"...\""]);
            case 2: // <Leave>
                return new TextActionResult(["You consider speaking to the painting but shake your head, thinking it won't answer. You move on, leaving it behind."]);
        }

        return new TalkActionResult(this,["You walk up to the painting."],[
            new TalkChoiceAction(1,"Hello?"),
            new TalkChoiceAction(2,"<Leave>")
        ]);
    }

    public name(): string {
        return "Painting of the Enigmatic Woods";
    }
    
}