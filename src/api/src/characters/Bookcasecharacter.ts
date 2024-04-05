import { SearchactionAlias } from "../actions/SearchRoom1";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const BookcaseAlias: string = "bookcase";
export class Bookcase extends Character {
    public talk(): ActionResult | undefined {
        return new TextActionResult(["what wil you say to a Bookcase?"]);
    }
    public constructor() {
        super(BookcaseAlias, TalkActionAlias, ExamineActionAlias, SearchactionAlias);
    }
    public name(): string {
        return "Bookcase";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This bookcase in the haunted house whispers secrets of the past, an eerie invitation to uncover the stories hidden within its dusty volumes.",
        ]);
    }
    public Search(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.searchbookcase = true;
        return new TextActionResult([
            "You approach the bookcase, a sense of foreboding hanging in the air. Your fingers trace the spines of ancient tomes before pausing at a book slightly protruding from the rest. With a tentative pull, the bookcase emits a soft click, and suddenly, a hidden compartment springs open. Inside, nestled among shadows, lies an old, dust-covered key, its purpose unknown yet unmistakably important.",
        ]);
    }
}
