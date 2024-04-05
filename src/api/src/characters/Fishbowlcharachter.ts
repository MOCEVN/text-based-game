import { SearchactionAlias } from "../actions/SearchRoom1";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const FishbowlAlias: string = "fishbowl";
export class Fishbowl extends Character {
    public talk(): ActionResult | undefined {
        return new TextActionResult([
            "Just keep swimming, they say, but in circles? I yearn for the ocean's vast embrace.",
        ]);
    }
    public constructor() {
        super(FishbowlAlias, TalkActionAlias, ExamineActionAlias, SearchactionAlias);
    }
    public name(): string {
        return "Fishbowl";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["blub blub blub"]);
    }
    public Search(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.showfishbowl = true;
        return new TextActionResult([
            "The fishbowl on the desk, murky and still, sends chills through the room—a stark reminder of the unseen dread that haunts this place.",
        ]);
    }
}
