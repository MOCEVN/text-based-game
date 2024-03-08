import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const GhostCharacterAlias: string = "ghost";

export class GhostCharacter extends Character implements Examine {
    public constructor() {
        super(GhostCharacterAlias, ExamineActionAlias);
    }
    
    public name(): string {
        return "Ghost";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["As you study the ghostly figure, its form shifts and swirls like mist, surrounded by tendrils of energy.", "The specter addresses you in a whisper, 'I am a fabric of memories and echoes, bound to this realm. Ask, and I may share the knowledge woven into my being.'"]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                ["It is green, hangs from a tree, and is deadly when it falls upon you. What is it?"],
                [new TalkChoiceAction(3, "\"a leaf\""), new TalkChoiceAction(4, "\"a bird\""), new TalkChoiceAction(5, "\"a pickle\""), new TalkChoiceAction(6, "\"a pool table\""), new TalkChoiceAction(7, "\"a broccoli\"")]);
            } else if (choiceId === 2) {
                return new TextActionResult(["You walk away from the ghost."]);
            } else if (choiceId === 3) {
                return new TextActionResult(["wrong."]);
            } else if (choiceId === 4) {
                return new TextActionResult(["wrong."]);
            } else if (choiceId === 5) {
                return new TextActionResult(["wrong."]);
            } else if (choiceId === 6) {
                return new TextActionResult(["correct."]);
            } else if (choiceId === 7) {
                return new TextActionResult(["wrong."]);
            }
        
    
        return new TalkActionResult(
            this,
            ["As you tentatively approach the ghostly figure, its gaze fixes upon you with intensity.", "‎ ", "The air around you grows colder as it whispers:", "'Mortal intruder, before you may claim the keys, you must first prove your wit.", "I present to you a riddle, and your answer shall guide your choice.'"],
            [new TalkChoiceAction(1, "\"...\""), new TalkChoiceAction(2, "\"I don't have time for this.\"")]);
    }
    
}