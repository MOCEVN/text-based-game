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
                "As you examine the treasury, hoping to uncover a clue to aid your quest, disappointment washes over you as you find no helpful hint or hidden treasure.", 
                "Suddenly, you notice movement in the shadows, skeletal figures lurking ominously. You sense a lingering presence, waiting to be addressed.", 
                "Perhaps conversing with these spectral figures will shed light on your journey.",
              
            ]);
        } else {
            // If the player has already searched the room
            return new TextActionResult([
                "You have already examined the treasury. Maybe a skeleton will help you.",
                
            ]);
        } 
    }
}
