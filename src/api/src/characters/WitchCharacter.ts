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
        return new TextActionResult(["this is the witch"]);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if(choiceId === 1){
            return new TalkActionResult(this, ["Witch: You have to answer my riddle first, o wonderer!"], [
                new TalkChoiceAction(3, "What must I do to earn the potion and escape this accursed place?"),
                new TalkChoiceAction(2, "Leave the conversation")
            ]);
            
        } else if(choiceId === 2){
            return "You left the wich alone";
        }else if(choiceId === 3){
            return new TalkActionResult(this, ["Witch: You have to answer my riddle first, o wonderer!"], [
                new TalkChoiceAction(2, "Leave the conversation")
            ]);
        }else if(choiceId === 4){

        }else if(choiceId === 5){

        }
        return new TalkActionResult(this, ["Witch: this place needs renovation"], [
            new TalkChoiceAction(1, "Ask the witch how to escape the haunted house"),
            new TalkChoiceAction(2, "Leave the conversation")
        ]);
    }
}