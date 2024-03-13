import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";

export const clownvoicealias: string = "swan";
export class clownvoice extends Character {
    public constructor() {
        super(clownvoicealias, TalkActionAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Distant clown laughter?";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You feel someone or something looking at you from the same direction you hear the distant laughing.",
        ]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            return new TextActionResult([
                "<you see a clown like shadow being cast on the wal it starts speaking: you seek to leave my colerful room?",
            ]);
        } else if (choiceId === 2) {
            return new TextActionResult(["<You pee your pants and stain the floor>"]);
        }
        return new TalkActionResult(
            this,
            ["<The laughing stops>"],
            [new TalkChoiceAction(1, "Who is there?"), new TalkChoiceAction(2, "Pee your pants")]
        );
    }
}
