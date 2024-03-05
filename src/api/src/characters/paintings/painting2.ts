import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";

export const Painting2CharacterAlias: string = "painting2";

export class Painting2Character extends Character implements Examine{

    public constructor(){
        super(Painting2CharacterAlias,ExamineActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You can't shake the feeling that the painting is watching you, its gaze piercing through the canvas and into your soul."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        switch(choiceId){
            case 1:
                return new TextActionResult(["..."]);
            case 2:
                return new TextActionResult(["You contemplate speaking to the painting but ultimately dismiss the idea, convinced it won't reply. You move on, leaving the silent artwork undisturbed."]);
        }

        return new TalkActionResult(this,["You walk up to the painting."],[
            new TalkChoiceAction(1,"Hello?"),
            new TalkChoiceAction(2,"<Leave>")
        ]);
    }

    public name(): string {
        return "Painting 2";
    }
    
}