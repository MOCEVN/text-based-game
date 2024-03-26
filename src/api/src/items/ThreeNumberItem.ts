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
    const playerSession: PlayerSession = getPlayerSession();

    if(!playerSession.correctAnswer) {
      return new TextActionResult(["Solve the riddle first."]);
    }

    return new TextActionResult(["It's a three-number code to open the next door"]);
  }

  public CollectAction(): ActionResult | undefined {
    // Put the item in the inventory
    const playerSession: PlayerSession = getPlayerSession();

    if (playerSession.correctAnswer) {
        // Check if the player has answered the riddle correctly
        if (!playerSession.collectedCode) {
            // If the player hasn't collected the code yet
            playerSession.collectedCode = true;
            playerSession.inventory.push(ThreeNumberItemAlias);

            // The item is now collected
            return new TextActionResult(["You've collected the three number code"]);
        } else {
            // If the player has already collected the code, inform them
            return new TextActionResult(["You already have the code"]);
        }
    } else {
        // If the player hasn't answered correctly, inform them
        return new TextActionResult(["You can not collect it yet...continue your quest."]);
    }
}

}

