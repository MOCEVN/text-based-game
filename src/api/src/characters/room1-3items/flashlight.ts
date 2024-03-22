import { UseAlias } from "../../actions/UseRoom5";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { UseActionResult } from "../../base/actionResults/UseactionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../../base/actions/TalkAction";
import { Gebruik, gebruiktitemAlias } from "../../base/actions/useitem";
import { UseChoiceAction } from "../../base/actions/useitem";

import { Character } from "../../base/gameObjects/Character";

export const FlashlightitemAlias: string = "flashlight";

export class flashlight extends Character implements Examine, Gebruik, Talk {
    public talk(choiceId: number): ActionResult | undefined {
        this.gebruik(choiceId);
        return new TextActionResult(["you can't talk to a flashlight"]);
    }
    public constructor() {
        super(FlashlightitemAlias, TalkActionAlias, ExamineActionAlias, UseAlias, gebruiktitemAlias);
    }
    public name(): string {
        return "flashlight";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["it's fully charged flashlight?"]);
    }
    public gebruik(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            return new UseActionResult(
                this,
                ["where will you point the flashlight?"],
                [
                    new UseChoiceAction(3, "where the noise is coming from"),
                    new UseChoiceAction(4, "at the door"),
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
        return new UseActionResult(
            this,
            ["What will you do with the charged flashlight"],
            [new UseChoiceAction(1, "turn on the flashlight"), new UseChoiceAction(2, "swing the flashlight")]
        );
    }
}
