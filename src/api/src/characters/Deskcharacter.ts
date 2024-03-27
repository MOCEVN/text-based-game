import { SearchactionAlias } from "../actions/SearchRoom1";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { FlashlightitemAlias } from "./room1-3items/flashlight";

export const DesktopAlias: string = "Desktop";
export class Desktop extends Character {
    public talk(): ActionResult | undefined {
        return new TextActionResult(["what wil you say to a desk?"]);
    }
    public constructor() {
        super(DesktopAlias, TalkActionAlias, ExamineActionAlias, SearchactionAlias);
    }
    public name(): string {
        return "Desktop";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This desktop in the haunted house sends a shiver down my spine, a chilling reminder of the horrors that lurk in the shadows of this place.",
        ]);
    }
    public Search(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(FlashlightitemAlias)) {
            playerSession.inventory.push(FlashlightitemAlias);
        }
        return new TextActionResult([
            "You step forward, your hand hesitating for a moment before pulling open the top drawer of the bureau. It's mostly empty, save for a few old pens and a stack of yellowed papers. You dig deeper, moving to the next drawer. There, among old clothes and forgotten trinkets, your hand brushes against something metallic. You pull it out, revealing a flashlight.",
        ]);
    }
}
