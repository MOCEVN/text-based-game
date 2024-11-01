import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { damagePlayer, getPlayerSession } from "../instances";
import { KeyItem1Alias } from "../items/keys/KeyItem1";
import { KeyItem2Alias } from "../items/keys/KeyItem2";
import { KeyItem3Alias } from "../items/keys/KeyItem3";
import { GameOverRoom } from "../rooms/GameOverRoom";
// import { Room3 } from "../rooms/Room3";
import { PlayerSession } from "../types";

export const GhostCharacterAlias: string = "ghost";

export class GhostCharacter extends Character implements Examine {
    public constructor() {
        super(GhostCharacterAlias, ExamineActionAlias);
    }
    
    public name(): string {
        return "Ghost";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["As you study the ghostly figure, its form shifts and swirls like mist, surrounded by tendrils of energy.", "The specter addresses you in a whisper, 'I am a fabric of memories and echoes, bound to this realm. Ask, and I may share the knowledge woven into my being.'"]);
    }

    public sendToGameOver(): ActionResult | undefined {
        const room: GameOverRoom = new GameOverRoom();
        getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public damagePlayer(damageAmount: number): boolean {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.hp -= damageAmount;
        if (playerSession.hp <= 0) {
            this.sendToGameOver();
            return true;
        }
        return false;
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                ["\"It is green, hangs from a tree, and is deadly when it falls upon you. What is it?\""],
                [new TalkChoiceAction(3, "\"a leaf\""), new TalkChoiceAction(3, "\"a bird\""), new TalkChoiceAction(3, "\"a pickle\""), new TalkChoiceAction(4, "\"a pool table\""), new TalkChoiceAction(3, "\"a broccoli\"")]);
            } 
            
            else if (choiceId === 2) {
                return new TextActionResult(["You walk away from the ghost."]);
            }

            else if (choiceId === 9) {
                return new TextActionResult(["You ran away like a little girl."]);
            }

            else if (choiceId === 11) {
            }

            else if (choiceId === 12) {
                playerSession.openedDoor = true;
            }

            else if (choiceId === 13) {
                return new TextActionResult(["\"As I have already told you... The rightmost key upon the table holds the answer to your quest.\""]);
            }
            
            else if (choiceId === 3) {
                if (damagePlayer(1)){
                    return new TextActionResult(["GAME OVER", "The ghost killed you."]);
                }
                return new TalkActionResult(this,
                ["The ghost scares you!", "\"Mortal, your answer does not unlock the gate to understanding. You may try again... If you dare.\"", "\"It is green, hangs from a tree, and is deadly when it falls upon you. What is it?\""],
                [new TalkChoiceAction(3, "\"a leaf\""), new TalkChoiceAction(3, "\"a bird\""), new TalkChoiceAction(3, "\"a pickle\""), new TalkChoiceAction(4, "\"a pool table\""), new TalkChoiceAction(3, "\"a broccoli\""), new TalkChoiceAction(9, "cry and run away")]);
            }
            
            else if (choiceId === 4) {
                playerSession.answeredRiddle = true;
                return new TextActionResult(["\"Ah, astute mortal! Your wit shines brightly amidst the shadows of this realm.\"", "\"Indeed, the answer you have provided is correct,\" the ghost intones, its ethereal form pulsating with a faint glow of approval.", "\"As promised, the key you seek lies within your grasp. The rightmost key upon the table holds the answer to your quest.", "Choose wisely, for it is the gateway to your destiny.\""]);
            } 
            
            else if (choiceId === 5) {
                const removeKey1Item: number = playerSession.inventory.indexOf(KeyItem1Alias);
                if (removeKey1Item !== -1) {
                    playerSession.inventory.splice(removeKey1Item);
                    playerSession.pickedUpKey1 = false;
                }

                return new TextActionResult(["He puts the left key back on the table."]);

            } else if (choiceId === 6) {
                const removeKey2Item: number = playerSession.inventory.indexOf(KeyItem2Alias);
                if (removeKey2Item !== -1) {
                    playerSession.inventory.splice(removeKey2Item, 1);
                    playerSession.pickedUpKey2 = false;

                }

                return new TextActionResult(["He puts the middle key back on the table."]);

            } else if (choiceId === 7) {
                const removeKey3Item: number = playerSession.inventory.indexOf(KeyItem3Alias);
                if (removeKey3Item !== -1) {
                    playerSession.inventory.splice(removeKey3Item, 1);
                    playerSession.pickedUpKey3 = false;
                }

                return new TextActionResult(["He puts the right key back on the table."]);
            }
        
            const choiceActions: TalkChoiceAction[] = [
                new TalkChoiceAction(1, "\"...\""), new TalkChoiceAction(2, "\"I don't have time for this.\"")
            ];

            const choiceActions1: TalkChoiceAction[] = [
                new TalkChoiceAction(13, "\"What key should I use again..?\""), new TalkChoiceAction(2, "\"I don't have time for this.\"")
            ];
            

            if(playerSession.inventory.includes(KeyItem1Alias)) {
                choiceActions.push(new TalkChoiceAction(5, "Give the left key to the ghost"));
            }
            
            if(playerSession.inventory.includes(KeyItem2Alias)) {
                choiceActions.push(new TalkChoiceAction(6, "Give the middle key to the ghost"));
            }
            
            if(playerSession.inventory.includes(KeyItem3Alias)) {
                choiceActions.push(new TalkChoiceAction(7, "Give the right key to the ghost"));
            }
            
            if (playerSession.answeredRiddle === false) {
                return new TalkActionResult(
                this,
                ["As you tentatively approach the ghostly figure, its gaze fixes upon you with intensity.", "‎ ", "The air around you grows colder as it whispers:", "'Mortal intruder, before you may claim the keys, you must first prove your wit.", "I present to you a riddle, and your answer shall guide your choice.'"],
                choiceActions
                );
            } else if (playerSession.openedDoor) {
                return new TextActionResult(["Shoo! Go away already."]);
            } else {
                return new TalkActionResult(
                    this,
                    ["\"You have already sought counsel from the depths of my knowledge", "There are no more riddles to unravel, no more secrets to unearth.\""],
                choiceActions1);
            }
        }    
}