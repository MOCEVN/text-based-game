import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const HeksCharacterAlias: string = "heks";

export class HeksCharacter extends Character implements Examine {
    public constructor() {
        super(HeksCharacterAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Heks";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Dit is de Heks"]);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if(choiceId === 1){
            return new TextActionResult(["Heks: 'Wat heb jij hier te zoeken?'"]);
        } else if(choiceId === 2){
            return "Je hebt de heks met rust gelaten";
        }
        return new TalkActionResult(this, ["Hallo"], [
            new TalkChoiceAction(1, "Groet de heks"),
            new TalkChoiceAction(2, "Verlaat het gesprek")
        ]);
    }
}