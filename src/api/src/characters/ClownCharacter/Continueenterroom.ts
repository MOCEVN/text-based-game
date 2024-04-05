import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const ContinueenterroomAlias: string = "continueenteroom";
export class continueenteroom extends Character {
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.walkinroom = true;
        if (choiceId === 9) {
            playerSession.showdesktop = true;
            playerSession.showbookcase = false;
            playerSession.noshowclownvoice = true;
            return new TextActionResult([
                "The desktop, with its possible hidden items, might be worth a search.",
            ]);
        }
        if (choiceId === 10) {
            playerSession.showbookcase = true;
            playerSession.contineusearch = true;
            playerSession.noshowclownvoice = true;
            return new TextActionResult([
                "The bookcase, hinting at concealed mysteries, could be the right place to look.",
            ]);
        }
        return new TalkActionResult(
            this,
            [
                "In the dim light, the player notices a desktop and a bookcase. Wondering where to search first, they consider the desktop, potentially full of immediate clues. Yet, the bookcase's shadow hints at hidden secrets among its tomes. Decision time: the obvious digital trove or the mysterious collection of books?",
            ],
            [
                new TalkChoiceAction(9, "Walk up to the Desktop"),
                new TalkChoiceAction(10, "Walk up to the Bookcase"),
            ]
        );
    }
    public constructor() {
        super(ContinueenterroomAlias, TalkActionAlias, ExamineActionAlias);
    }
    public name(): string {
        return "continueenteroom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This bookcase in the haunted house whispers secrets of the past, an eerie invitation to uncover the stories hidden within its dusty volumes.",
        ]);
    }
    public Search(): ActionResult | undefined {
        return new TextActionResult([
            "You approach the bookcase, a sense of foreboding hanging in the air. Your fingers trace the spines of ancient tomes before pausing at a book slightly protruding from the rest. With a tentative pull, the bookcase emits a soft click, and suddenly, a hidden compartment springs open. Inside, nestled among shadows, lies an old, dust-covered key, its purpose unknown yet unmistakably important.",
        ]);
    }
}
