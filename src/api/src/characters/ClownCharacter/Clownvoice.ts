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
            return new TalkActionResult(
                this,
                [
                    "shadow:'You seek to leave my colorful room?' the voice booms, echoing slightly off the walls. The shadow moves as if gesturing to the surroundings. 'Many have entered, drawn by curiosity, but the way forward is not so easily found. Perhaps you can earn your passage, but it requires keen insight and a willingness to see beyond the obvious.'",
                ],
                [
                    new TalkChoiceAction(3, "Respond to the shadow"),
                    new TalkChoiceAction(4, "Insult the voice"),
                    new TalkChoiceAction(5, "Look for your gun"),
                ]
            );
        }
        if (choiceId === 2) {
            return new TextActionResult(["<You pee your pants and stain the floor>"]);
        }
        if (choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "'I'm willing to do what it takes,' you say, your voice steady despite the eerie atmosphere. 'Tell me what I need to do.''A test, then,' the shadow replies, its form rippling as if amused. 'Two truths you shall find amongst my possessions—one within the embrace of written knowledge, and the other, a light in the dark. The third is lost, hidden from view, waiting to be discovered. Bring these to me, and I will grant you the key to your path forward.",
                ],
                [new TalkChoiceAction(6, "Look for the bookcase")]
            );
        }
        if (choiceId === 4) {
            return new TextActionResult([""]);
        }
        if (choiceId === 5) {
            return new TextActionResult(["<antwoord op keuze 3>"]);
        }

        return new TalkActionResult(
            this,
            ["<The laughing stops>"],
            [new TalkChoiceAction(1, "Who is there?"), new TalkChoiceAction(2, "Pee your pants")]
        );
    }
}
