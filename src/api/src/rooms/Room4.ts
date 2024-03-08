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
import { Room4DoorItem, Room4DoorItemAlias } from "../items/Room4DoorItem";
import { SawItemAlias } from "../items/SawItem";
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
        return new TextActionResult([
            "The room is dimly lit, with shadows dancing across the walls, creating an eerie atmosphere. Five ornate paintings hang on the walls, their subjects ranging from serene landscapes to stoic portraits. Though the room appears ordinary at first glance, there's an underlying sense of unease, as if something is not quite right.", 
            "In the center of the room, three of the five paintings stand out, their frames more ornate than the others. Despite their stillness, there's a subtle energy emanating from them, giving the impression that they hold some hidden significance.", 
            "At the far end of the room, a wooden door stands, its surface weathered and worn. Unlike the other doors, this one lacks any visible handle or mechanism for opening, adding to the mystery of the room."
        ]);
    }

    public images(): string[] {
        return ["room4"];
    }

    public actions(): Action[] {
        const actions: Action[] = [new ExamineAction(), new TalkAction(),
            // test
            new CustomAction("reset","Reset (temp)",false),
            new CustomAction("skip","Skip(temp)",false)
        ];
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.paintingPuzzleState >= 2) {
            actions.push(new CustomAction("saw", "Saw", true));
        }
        if (playerSession.paintingPuzzleState === 3) {
            actions.push(new CustomAction("room5", "Go Forwards", false));
        }
        return actions;
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();
        return [...inventoryItems, this, new Painting1Character(), new Painting2Character(), new Painting3Character(), new Painting4Character(), new Painting5Character(), new Room4DoorItem()];
    }

    /* 
    > (1) : The treasure lies with me, and I assure you, I speak the truth.
    (2) : Believe me, both [1] and [3] are speaking the truth. The treasure awaits you with [3].
    (3) : Do not be deceived by [1] and [2]. They both speak lies to mislead you. I hold the treasure you seek.
    */

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        switch(playerSession.paintingPuzzleState) {
            case 0:
                switch(choiceId) {
                    case undefined:
                        return new TalkActionResult(this,["You prepare to yell into the room."],[
                            new TalkChoiceAction(1,"Hello? Can anyone hear me?"),
                            new TalkChoiceAction(2,"I demand answers! Who's there?"),
                            new TalkChoiceAction(3,"Reveal your secrets to me!"),
                            new TalkChoiceAction(4,"Is anyone there? Speak up!"),
                            new TalkChoiceAction(5,"Come out and face me, if you dare!")
                        ]);
                    case 3:
                        return new TalkActionResult(this,["\"Ah, a seeker of secrets approaches,\"",
                        "the paintings whisper in unison, their voices sending chills down your spine.", 
                        "\"But to unlock the mysteries hidden within these walls, one must first prove their worth. Solve our puzzle, mortal, and only then shall we divulge our secrets.\""],[
                            new TalkChoiceAction(6,"What must I do to uncover the secrets hidden within these paintings?")
                        ]); 
                    case 6:
                        playerSession.paintingPuzzleState = 1;
                        return new TextActionResult(["\"Ah, curious mortal, you seek the secrets hidden within these walls,\"", 
                        "one painting begins, its voice echoing with an eerie resonance.", 
                        "\"To uncover the truth, you must unravel the puzzle before you. Three paintings hold the key, but beware, for they can either tell the truth or lie.\"", 
                        "The painting continues, \"You must seek out the words of The Painting of the Ghostly Gaze, The Painting of the Whispering Winds, and The Painting of the Forgotten Memories. Each will speak but one sentence, and from their words, you must discern the path to your prize.\""]);
                    default:
                        return new TextActionResult(["\"...\""]);
                    
                }
            case 1:
                return new TextActionResult(["Talk to the paintings to solve the puzzle."]);
            default:
                return new TextActionResult([]);

        }
    }

    public custom(alias: string, gameObjects?: GameObject[]): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (alias === "room5") {
            const room: Room5 = new Room5();

            playerSession.currentRoom = room.alias;

            return room.examine();
        } else if (alias === "reset") {
            playerSession.paintingPuzzleState = 0;
            playerSession.paintingsTalkedTo = 0;
            const idx: number = playerSession.inventory.indexOf(SawItemAlias); 
            if (idx > -1) {
                playerSession.inventory.splice(idx,1);
            }
            return this.examine();
        } else if (alias === "saw"){
            if (gameObjects && gameObjects.length > 0){
                if (gameObjects[0].alias === Room4DoorItemAlias){
                    if (playerSession.paintingPuzzleState === 3) {
                    return new TextActionResult(["The door is already open."]);
                    }
                playerSession.paintingPuzzleState = 3;
                return new TextActionResult(["With a determined effort, you wield the saw, cutting through the door and clearing the way forward."]);
                }
                if (gameObjects[0].alias === SawItemAlias){
                    return new TextActionResult(["You attempt to use the saw on itself, a futile and nonsensical action. Perhaps you should reconsider your approach."]);
                }
                if (gameObjects[0].alias.slice(0,-1) === "painting") {
                    switch(gameObjects[0].alias.slice(-1)){
                        case "1":
                            return new TextActionResult(["\"What do you think you are doing, mortal? Put down that saw this instant!\""]);
                        case "2":
                            return new TextActionResult(["\"What in the realms do you think you're doing? Cease this reckless action at once!\""]);
                        case "3":
                            return new TextActionResult(["\"What do you believe you are doing, foolish mortal? Put down that tool immediately!\""]);
                        case "4":
                            return new TextActionResult(["\"What do you think you're doing, challenging me with that tool? Put it down now!\""]);
                        case "5":
                            return new TextActionResult(["\"What madness drives you to wield that tool against me? Cease this action now!\""]);
                    }
                }
            }
            if (gameObjects && gameObjects.length === 0) {
                if (playerSession.paintingPuzzleState === 2){
                    return new TextActionResult(["You start running around swinging the saw around the room. Your saw touches nothing but air, achieving nothing."]);
                } else {
                    return new TextActionResult(["You start running around swinging the saw around the room, flinging sawdust everywhere. Your saw touches nothing but air, achieving nothing."]);
                }
            }
        } else if (alias === "skip"){
            if (playerSession.inventory.indexOf(SawItemAlias) < 0){
                playerSession.inventory.push(SawItemAlias);
            }
            const room: Room5 = new Room5();
            playerSession.currentRoom = room.alias;
            return room.examine();
        }

        return undefined;
    }
}
