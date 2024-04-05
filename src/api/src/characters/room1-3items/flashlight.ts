import { UseAlias, UseRoom5 } from "../../actions/UseRoom5";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../../base/actions/TalkAction";

import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const FlashlightitemAlias: string = "flashlight";

export class flashlight extends Character implements Examine, Talk, UseRoom5 {
    public talk(): ActionResult | undefined {
        return new TextActionResult(["you can't talk to a flashlight"]);
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
    public Use(): ActionResult | undefined {
        getPlayerSession().ventOpened = true;
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.showventilation = true;
        return new TextActionResult([
            "With the beam of my flashlight cutting through the darkness, I swept across the room's forgotten corners until it caught on something unusual. A sliver of metal gleamed back at me from the wall. Curiosity piqued, I approached and brushed away years of dust and cobwebs, revealing a secret air vent cleverly disguised within the wall's design. Its presence was a revelation, a hidden passage that whispered promises of untold stories and secrets lying just beyond its grate.",
        ]);
    }
}
