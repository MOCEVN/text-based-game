import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { damagePlayer, getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const clownvoicealias: string = "swan";
export class clownvoice extends Character {
    public constructor() {
        super(clownvoicealias, TalkActionAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Distant clown laughter?";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You feel someone or something looking at you from the same direction you hear the distant laughing.",
        ]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "shadow:'You seek to leave my colorful room?' the voice booms, echoing slightly off the walls. The shadow moves as if gesturing to the surroundings. 'Many have entered, drawn by curiosity, but the way forward is not so easily found. Perhaps you can earn your passage, but it requires keen insight and a willingness to see beyond the obvious.'",
                ],
                [
                    new TalkChoiceAction(3, "Respond to the shadow"),
                    new TalkChoiceAction(4, "Insult the voice"),
                    new TalkChoiceAction(5, "Look for your gun"),
                ]
            );
        }
        if (choiceId === 2) {
            return new TextActionResult(["<You pee your pants and stain the floor>"]);
        }
        if (choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "'I'm willing to do what it takes,' you say, your voice steady despite the eerie atmosphere. 'Tell me what I need to do.''A test, then,' the shadow replies, its form rippling as if amused. 'one truths you shall find amongst my possessions—one within the embrace of written knowledge, and the other, a light in the dark. The last 2 are lost, hidden from view, waiting to be discovered. Bring these to me, and I will grant you the key to your path forward.",
                ],
                [
                    new TalkChoiceAction(6, "Start searching for the items"),
                    new TalkChoiceAction(13, "try to run away"),
                    new TalkChoiceAction(11, "refuse to search for the items"),
                ]
            );
        }
        if (choiceId === 4) {
            damagePlayer(3);
            return new TextActionResult([
                "You shout an insult into the darkness, mocking the unseen clown's twisted games. Silence hangs heavy for a moment, then, from the shadows, your fate is sealed with a chilling laugh.",
            ]);
        }
        if (choiceId === 11) {
            return new TalkActionResult(
                this,
                [
                    "You're simply standing there, unwilling to search for the items. Your lack of effort is quite evident.",
                ],
                [
                    new TalkChoiceAction(6, "Start searching for the items"),
                    new TalkChoiceAction(13, "try to run away"),
                ]
            );
        }
        if (choiceId === 5) {
            return new TextActionResult(["You reach for your holster, only to find it empty."]);
        }
        if (choiceId === 6) {
            return new TalkActionResult(
                this,
                ["Where will you search for the items?"],
                [
                    new TalkChoiceAction(7, "Search this room"),
                    new TalkChoiceAction(8, "Go to the next room"),
                    new TalkChoiceAction(
                        12,
                        "Inquire with the clown about the location where he believes he may have left the items."
                    ),
                ]
            );
        }
        if (choiceId === 12) {
            return new TalkActionResult(
                this,
                [
                    "'Ah, the last spot I recall having that handy thing that brightens up dim corners... Well, let me think.' says with an evil smirk 'But to be honest, I can't seem to recall exactly...'",
                ],
                [new TalkChoiceAction(7, "Search this room"), new TalkChoiceAction(8, "Go to the next room")]
            );
        }
        if (choiceId === 13) {
            damagePlayer(1);
            return new TextActionResult([
                "You try to run away and feel you legs giving out under neath you, this results in you hitting your head against a table",
            ]);
        }
        if (choiceId === 8) {
            playerSession.walkinroom = true;
            playerSession.noshowclownvoice = true;
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
        if (choiceId === 9) {
            playerSession.showdesktop = true;
            playerSession.showbookcase = false;
            playerSession.noshowclownvoice = true;
            playerSession.walkinroom = false;
            return new TextActionResult([
                "The desktop, with its possible hidden items, might be worth a search.",
            ]);
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

        return new TalkActionResult(
            this,
            ["<The laughing stops>"],
            [new TalkChoiceAction(1, "Who is there?"), new TalkChoiceAction(2, "Pee your pants")]
        );
    }
}
