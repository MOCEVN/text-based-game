import { Search, SearchactionAlias } from "../../actions/SearchRoom1";
import { UseAlias } from "../../actions/UseRoom5";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../../base/actions/TalkAction";

import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const VentAlias: string = "vent";

export class ventilation extends Character implements Examine, Talk, Search {
    public talk(): ActionResult | undefined {
        return new TextActionResult([
            "'Are you looking for me?' the voice says coming from the ventilation shaft",
        ]);
    }
    public constructor() {
        super(VentAlias, TalkActionAlias, ExamineActionAlias, UseAlias, SearchactionAlias);
    }
    public name(): string {
        return "ventilation";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "A vague, indistinct sound filters through the ventilation, its origins elusive, weaving through the shafts like a whisper in the wind. It's difficult to discern its nature, as it seems to dance just beyond the reach of understanding, a tantalizing mystery hidden within the labyrinth of ducts.",
        ]);
    }
    public Search(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.showfinaleclown = true;
        playerSession.showventilation = false;
        return new TextActionResult([
            "Upon spotting the ventilation shaft, the pieces of the puzzle clicked into place, leading to the realization that the mysterious voice originated from there. With determined resolve, I ascended into the ventilation system, navigating through the narrow passages until I discovered an unexpected room. There, amidst the shadows, lurked the clown, the source of the haunting whispers that had echoed through the vents.",
        ]);
    }
}
