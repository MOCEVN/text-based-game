import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const TreasuryObjectAlias: string = "treasury-object";

export class TreasuryObject extends GameObject implements Examine {
    public constructor() {
        super(TreasuryObjectAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Treasury";
    }

    public talk(): ActionResult | undefined {
           return new TextActionResult(["You can't talk to a treasure object, or can you?"]);
      
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.roomSearched) {
            // If the player hasn't searched the room yet
            playerSession.roomSearched = true; // Mark the room as searched

            return new TextActionResult([
              "As you enter the chamber, your eyes fall upon the ancient treasury",
              "Despite your thorough examination, it yielded no clue or hint to aid your quest",
              "The air hangs heavy with disappointment as you realize the mystery remains unsolved.",
            ]);
        } else {
            // If the player has already searched the room
            return new TextActionResult([
                "You have already examined the treasury. Continue your search.",
                
            ]);
        } 
    }
}
