import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";

export const Painting3CharacterAlias: string = "painting3";

export class Painting3Character extends Character implements Examine{

    public constructor(){
        super(Painting3CharacterAlias,ExamineActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The longer you stare at the painting, the more it feels like you're being drawn into its depths, as if it's beckoning you to step inside its world."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        switch(choiceId){
            case 1:
                return new TextActionResult(["..."]);
            case 2:
                return new TextActionResult(["You briefly think about talking to the painting but decide against it, assuming it won't respond. You continue exploring, leaving the silent artwork alone."]);
        }

        return new TalkActionResult(this,["You walk up to the painting."],[
            new TalkChoiceAction(1,"Hello?"),
            new TalkChoiceAction(2,"<Leave>")
        ]);
    }

    public name(): string {
        return "Painting 3";
    }
    
}