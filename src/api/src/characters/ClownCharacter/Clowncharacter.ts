import { Search, SearchactionAlias } from "../../actions/SearchRoom1";
import { UseAlias } from "../../actions/UseRoom5";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias, TalkChoiceAction } from "../../base/actions/TalkAction";

import { Character } from "../../base/gameObjects/Character";
import { damagePlayer } from "../../instances";

export const ClowncharachterAlias: string = "clown";

export class Clowncharacter extends Character implements Examine, Talk, Search {
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "With a haunting, almost melodious tone, the creepy clown leans closer, the shadows playing across its garish face. 'Solve this riddle, if you dare,' it whispers, its voice a chilling blend of amusement and malice. 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?' The room seems to hold its breath, waiting for your response. The clown's eyes gleam with anticipation, presenting you with three possible answers:",
                ],
                [
                    new TalkChoiceAction(3, "A Whisper"),
                    new TalkChoiceAction(4, "An Echo"),
                    new TalkChoiceAction(5, "A Shadow"),
                ]
            );
        }
        if (choiceId === 1) {
            damagePlayer(1);
            return new TalkActionResult(
                this,
                ["'WRONG' it shouts as it lunges a it's nails at your face."],
                [
                    new TalkChoiceAction(3, "A Whisper"),
                    new TalkChoiceAction(4, "An Echo"),
                    new TalkChoiceAction(5, "A Shadow"),
                ]
            );
        }
        if (choiceId === 5) {
            damagePlayer(1);
            return new TalkActionResult(
                this,
                ["'WRONG' it shouts as it lunges a it's nails at your face."],
                [
                    new TalkChoiceAction(3, "A Whisper"),
                    new TalkChoiceAction(4, "An Echo"),
                    new TalkChoiceAction(5, "A Shadow"),
                ]
            );
        }
        if (choiceId === 4) {
            return new TextActionResult([
                "As the clown utters, 'Here, take this, you fool,' with a sinister grin, it slides an axe towards you. Instinctively, your hand reaches out to grasp the handle, feeling the weight and potential of the tool in your grip. There's a moment of clarity amidst the eerie tension—a silent understanding of the power now at your disposal. Without a word, you know precisely what must be done with the axe, as if the tool itself whispers its intended purpose.",
            ]);
        }
        return new TalkActionResult(
            this,
            ["Finally, you have unearthed my hiding place."],
            [
                new TalkChoiceAction(1, "NOW tel me your riddle"),
                new TalkChoiceAction(2, "Pee your pants again"),
                new TalkChoiceAction(3, "Have a staring contest"),
            ]
        );
    }
    public constructor() {
        super(ClowncharachterAlias, TalkActionAlias, ExamineActionAlias, UseAlias, SearchactionAlias);
    }
    public name(): string {
        return "The Clown";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Upon laying eyes on the clown, a chill runs down your spine. The figure stands eerily still, its painted face a grotesque mask of joy frozen in time. The bright, exaggerated makeup does little to mask the sinister aura that clings to its form. Its eyes, though lifeless, seem to follow your every move, and the faint, unsettling smile carved into its face suggests a macabre glee. The clown's attire, a patchwork of vibrant colors and patterns, hangs off its frame, making it appear both absurd and menacing. As you stand there, the air thick with tension, you can't shake off the feeling that this encounter is far from ordinary.",
        ]);
    }
    public Search(): ActionResult | undefined {
        damagePlayer(1);
        return new TextActionResult(["*It smacks you away for attempting that*"]);
    }
}
