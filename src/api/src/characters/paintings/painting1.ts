import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";

export const Painting1CharacterAlias: string = "painting1";

export class Painting1Character extends Character implements Examine{

    public constructor(){
        super(Painting1CharacterAlias,ExamineActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Examining the painting, you feel a faint breeze emanating from the scene, as if the landscape depicted is breathing."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        switch(choiceId){
            case 1:
                return new TextActionResult(["..."]);
            case 2:
                return new TextActionResult(["You consider speaking to the painting but shake your head, thinking it won't answer. You move on, leaving it behind."]);
        }

        return new TalkActionResult(this,["You walk up to the painting."],[
            new TalkChoiceAction(1,"Hello?"),
            new TalkChoiceAction(2,"<Leave>")
        ]);
    }

    public name(): string {
        return "Painting 1";
    }
    
}