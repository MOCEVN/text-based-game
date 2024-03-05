import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";

export const Painting5CharacterAlias: string = "painting5";

export class Painting5Character extends Character implements Examine{

    public constructor(){
        super(Painting5CharacterAlias,ExamineActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The longer you study the painting, the more you feel as though you're being drawn into its world, losing yourself in its depths with each passing moment."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        switch(choiceId){
            case 1:
                return new TextActionResult(["..."]);
            case 2:
                return new TextActionResult(["Briefly considering speaking to the painting, you ultimately decide against it, anticipating no response. You move forward, leaving the silent artwork untouched."]);
        }

        return new TalkActionResult(this,["You walk up to the painting."],[
            new TalkChoiceAction(1,"Hello?"),
            new TalkChoiceAction(2,"<Leave>")
        ]);
    }

    public name(): string {
        return "Painting 5";
    }
    
}