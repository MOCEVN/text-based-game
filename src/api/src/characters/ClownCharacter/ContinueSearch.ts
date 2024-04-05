import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const ContiniueSearchAlias: string = "Continuesearch";
export class ContiniueSearch extends Character {
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (choiceId === 7) {
            return new TalkActionResult(
                this,
                ["What will you do in this room?"],
                [
                    new TalkChoiceAction(14, "Walk up to the Fishbowl"),
                    new TalkChoiceAction(15, "search the walls"),
                ]
            );
        }
        if (choiceId === 14 && playerSession.showfishbowl === true) {
            playerSession.showfishbowl = true;
            playerSession.contineusearch = true;
            playerSession.noshowclownvoice = true;
            return new TextActionResult(["You already searched the fishbowl"]);
        }
        if (choiceId === 14) {
            playerSession.showfishbowl = true;
            playerSession.contineusearch = true;
            playerSession.noshowclownvoice = true;
            return new TextActionResult([
                "The ornate bowl on the desk, seemingly out of place amidst the papers and tomes, caught your eye. Its opaque water whispered secrets, inviting a closer inspection. Perhaps, within its depths, there lies more than meets the eye. A gentle reach into the cool water might reveal what is hidden beneath the surface.",
            ]);
        }
        if (choiceId === 15) {
            return new TextActionResult([
                "After a thorough examination of the walls, every corner and crevice, the truth reveals itself in the barest whisper of dust - there is nothing here. No hidden compartments, no secret messages or forgotten lore. Just the silent, stoic walls, standing guard over emptiness.",
            ]);
        }
        if (choiceId === 8 && playerSession.showbookcase === false) {
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
        if (choiceId === 8 && playerSession.showdesktop === true && playerSession.showbookcase === true) {
            return new TextActionResult(["You already searched this room"]);
        }
        if (choiceId === 8 && playerSession.showbookcase === true) {
            return new TalkActionResult(
                this,
                [
                    "In the dim light, the player notices a desktop and a bookcase. Wondering where to search first, they consider the desktop, potentially full of immediate clues. Yet, the bookcase's shadow hints at hidden secrets among its tomes. Decision time: the obvious digital trove or the mysterious collection of books?",
                ],
                [new TalkChoiceAction(9, "Walk up to the Desktop")]
            );
        }
        if (choiceId === 10) {
            playerSession.showbookcase = true;
            playerSession.contineusearch = true;
            playerSession.noshowclownvoice = true;
            playerSession.walkinroom = false;
            return new TextActionResult([
                "The bookcase, hinting at concealed mysteries, could be the right place to look.",
            ]);
        }
        if (choiceId === 9) {
            playerSession.showdesktop = true;
            playerSession.showbookcase = false;
            playerSession.noshowclownvoice = true;
            return new TextActionResult([
                "The desktop, with its possible hidden items, might be worth a search.",
            ]);
        }
        if (playerSession.showfishbowl === true) {
            return new TalkActionResult(
                this,
                ["Where will you search for the items?"],
                [
                    new TalkChoiceAction(7, "Search this room"),
                    new TalkChoiceAction(8, "Walk to the second room"),
                ]
            );
        } else playerSession.walkinroom = false;
        return new TalkActionResult(
            this,
            ["Where will you search for the items?"],
            [
                new TalkChoiceAction(7, "Walk back to the main room"),
                new TalkChoiceAction(8, "Search this room"),
            ]
        );
    }
    public constructor() {
        super(ContiniueSearchAlias, TalkActionAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Continuesearch";
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
