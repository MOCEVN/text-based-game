import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { Talk, TalkAction, TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { Painting1Character } from "../characters/paintings/painting1";
import { Painting2Character } from "../characters/paintings/painting2";
import { Painting3Character } from "../characters/paintings/painting3";
import { Painting4Character } from "../characters/paintings/painting4";
import { Painting5Character } from "../characters/paintings/painting5";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { Room5 } from "./room5";

export const Room4Alias: string = "room4";

export class Room4 extends Room implements Talk{
    public constructor() {
        super(Room4Alias,TalkActionAlias);
    }
    
    public name(): string {
        return "Haunted Gallery";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.paintingPuzzleState === 0) {
            playerSession.paintingPuzzleState = 1;
        }
        return new TextActionResult([
            "Inside this room, ornate frames line the walls, showcasing vivid scenes from serene landscapes to eerie portraits.", 
            "The room is dimly lit, casting shadows across the floor.", 
            "You notice a slight movement from the corner of your eye, but dismiss it as a trick of the light."
        ]);
    }

    public images(): string[] {
        return ["room4"];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(),
            // temporary actions for testing
            new CustomAction("room5", "Room 5 (temp)", false),
            new CustomAction("reset", "Reset (temp)", false)
        ];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();
        if (getPlayerSession().paintingPuzzleState === 0){
            return [this, ...inventoryItems];
        }
        return [this, ...inventoryItems, new Painting1Character(), new Painting2Character(), new Painting3Character(), new Painting4Character(), new Painting5Character()];
    }

/* 
> (1) : The treasure lies with me, and I assure you, I speak the truth.
(2) : Believe me, both [1] and [3] are speaking the truth. The treasure awaits you with [3].
(3) : Do not be deceived by [1] and [2]. They both speak lies to mislead you. I hold the treasure you seek.
*/

    
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.paintingPuzzleState === 2) {
            return new TextActionResult(["Talk to the paintings to solve the puzzle."]);
        }
        if (choiceId) {
            switch(choiceId){
                case 3:
                   return new TalkActionResult(this,["\"Ah, a seeker of secrets approaches,\"",
                    "the paintings whisper in unison, their voices sending chills down your spine.", 
                    "\"But to unlock the mysteries hidden within these walls, one must first prove their worth. Solve our puzzle, mortal, and only then shall we divulge our secrets.\""],[
                        new TalkChoiceAction(6,"What must I do to uncover the secrets hidden within these paintings?")
                    ]); 
                case 6:
                    playerSession.paintingPuzzleState = 2;
                    return new TextActionResult(["\"Ah, curious mortal, you seek the secrets hidden within these walls,\"", 
                    "one painting begins, its voice echoing with an eerie resonance.", 
                    "\"To uncover the truth, you must unravel the puzzle before you. Three paintings hold the key, but beware, for they can either tell the truth or lie.\"", 
                    "The painting continues, \"You must seek out the words of The Painting of the Ghostly Gaze, The Painting of the Whispering Winds, and The Painting of the Forgotten Memories. Each will speak but one sentence, and from their words, you must discern the path to your prize.\""]);
                default:
                    return new TextActionResult(["\"...\""]);
            }
        }
        return new TalkActionResult(this,["You prepare to yell into the room."],[
            new TalkChoiceAction(1,"Hello? Can anyone hear me?"),
            new TalkChoiceAction(2,"I demand answers! Who's there?"),
            new TalkChoiceAction(3,"Reveal your secrets to me!"),
            new TalkChoiceAction(4,"Is anyone there? Speak up!"),
            new TalkChoiceAction(5,"Come out and face me, if you dare!")
        ]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "room5") {
            const room: Room5 = new Room5();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        } else if (alias === "reset") {
            getPlayerSession().paintingPuzzleState = 0;
            return this.examine();
        }

        return undefined;
    }
}
