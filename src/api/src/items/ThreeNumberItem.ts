import { Item } from "../base/gameObjects/Item";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Collect, CollectActionAlias } from "../actions/CollectRoom3";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";


export const ThreeNumberItemAlias: string = "three-number-item";

export class ThreeNumberItem extends Item implements Examine, Collect {
  public constructor() {
    super(ThreeNumberItemAlias, ExamineActionAlias, CollectActionAlias);
  }

  public name(): string {
    return "Three Number code";
  }


  public examine(): ActionResult | undefined {
    return new TextActionResult(["It's a three-number code to open the next door"]);
  }
  
  public CollectAction(): ActionResult | undefined {
    // Put the item in the inventory
    const playerSession: PlayerSession = getPlayerSession();

    if (playerSession.correctAnswer) {
      // If the player has answered the riddle correctly
      if (!playerSession.collectedCode) {
        // If the code has not been collected yet
        playerSession.collectedCode = true;
        playerSession.inventory.push(ThreeNumberItemAlias);
        return new TextActionResult([
          "Correct...You've surprised me mortal.",
          "I hope you make it out, my friend with the amulet didn't.",
          "With this item, you can continue your quest. Good luck, and I hope I'll never see you again."
        ]);
      } else {
        // If the code has already been collected
        return new TextActionResult(["You already have the code"]);
      }
    } else {
      // If the player hasn't answered correctly
      return new TextActionResult(["You can not collect it yet...continue your quest."]);
    }
  }

}

