import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const Painting3CharacterAlias: string = "painting3";

export class Painting3Character extends Character implements Examine{

    public constructor(){
        super(Painting3CharacterAlias,ExamineActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The longer you stare at the painting, the more it feels like you're being drawn into its depths, as if it's beckoning you to step inside its world."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        switch(choiceId){
            case 1: // "Hello?"
                return new TextActionResult(["\"...\""]);
            case 2: // <Leave>
                return new TextActionResult(["You briefly think about talking to the painting but decide against it, assuming it won't respond. You continue exploring, leaving the silent artwork alone."]);
            case 3:
                return new TextActionResult(["\"Alas, you have been deceived,\"", 
                "the chosen painting laments, its voice dripping with disappointment.", 
                "\"Return to the puzzle and choose more wisely.\""]);
            case 4:
                return new TextActionResult([]);
        }
        if (playerSession.paintingPuzzleState === 2) {
            return new TalkActionResult(this,["\"The treasure lies with me, and I assure you, I speak the truth.\""],[
                new TalkChoiceAction(3, "I believe you hold the answer to my quest. Please reveal the treasure hidden within your frame."),
                new TalkChoiceAction(4,"<Leave>")
            ]);
        }

        return new TalkActionResult(this,["You walk up to the painting."],[
            new TalkChoiceAction(1,"Hello?"),
            new TalkChoiceAction(2,"<Leave>")
        ]);
    }

    public name(): string {
        return "Painting of the Whispering Winds";
    }
    
}