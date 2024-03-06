import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const WitchCharacterAlias: string = "Witch";

export class WitchCharacter extends Character implements Examine {
    public constructor() {
        super(WitchCharacterAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Witch";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Dit is de Heks"]);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if(choiceId === 1){
            return new TalkActionResult(this, ["What is it you're looking for here?"], [
                new TalkChoiceAction(3, "Ask what the puzzel of this room is"),
                new TalkChoiceAction(2, "Leave the conversation")
            ]);
            
        } else if(choiceId === 2){
            return "You left the wich alone";
        }
        return new TalkActionResult(this, ["Hello"], [
            new TalkChoiceAction(1, "Greet the witch"),
            new TalkChoiceAction(2, "Leave the conversation")
        ]);
    }
}