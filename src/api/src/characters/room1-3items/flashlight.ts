import { UseAlias } from "../../actions/UseRoom5";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../../base/actions/TalkAction";
import { gebruikaction } from "../../base/actions/useitem";
import { Character } from "../../base/gameObjects/Character";

export const FlashlightitemAlias: string = "flashlight";

export class flashlight extends Character implements Examine, gebruikaction {
    public talk(): ActionResult | undefined {
        throw new Error("Method not implemented.");
    }
    public constructor() {
        super(FlashlightitemAlias, TalkActionAlias, ExamineActionAlias, UseAlias);
    }
    public name(): string {
        return "flashlight";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["it's fully charged flashlight?"]);
    }
    public gebruik(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                ["where will you point the flashlight?"],
                [
                    new TalkChoiceAction(3, "where the noise is coming from"),
                    new TalkChoiceAction(4, "at the door"),
                ]
            );
        }
        if (choiceId === 2) {
            return new TextActionResult([
                "'Are you teetering on the brink of madness already?' whispers the voice, mocking yet chilling, as it echoes in the labyrinth of your mind.",
            ]);
        }
        if (choiceId === 3) {
            return new TextActionResult([
                " the beam of light reveals a chilling sight: a monstrous clown, its grin too wide, too unnatural. It stands motionless, its silhouette a tableau of terror against the cobwebbed walls. The player stands frozen, breath caught in their throat, as the clown's eyes seem to glimmer with a sinister light. The atmosphere is thick with dread, the only sounds the distant drip of a leaky pipe and the soft thud of the player's own heartbeat.",
            ]);
        }
        if (choiceId === 4) {
            return new TextActionResult([
                "you see the closed door and notice that it's stained red in blood.",
            ]);
        }
        return new TalkActionResult(
            this,
            ["What will you do with the charged flashliight"],
            [
                new TalkChoiceAction(1, "turn on the flashlight"),
                new TalkChoiceAction(2, "swing the flashlight"),
            ]
        );
    }
}
