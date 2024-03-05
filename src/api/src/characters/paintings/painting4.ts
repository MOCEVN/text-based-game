import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";

export const Painting4CharacterAlias: string = "painting4";

export class Painting4Character extends Character implements Examine{

    public constructor(){
        super(Painting4CharacterAlias,ExamineActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["As you examine the painting, a sense of dread washes over you, as if the scene depicted holds a dark secret waiting to be uncovered."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        switch(choiceId){
            case 1:
                return new TextActionResult(["..."]);
            case 2:
                return new TextActionResult(["You contemplate speaking to the painting but quickly discard the notion, assuming it won't reply. With a dismissive wave, you move on, leaving the silent artwork unaddressed."]);
        }

        return new TalkActionResult(this,["You walk up to the painting."],[
            new TalkChoiceAction(1,"Hello?"),
            new TalkChoiceAction(2,"<Leave>")
        ]);
    }

    public name(): string {
        return "Painting 4";
    }
    
}