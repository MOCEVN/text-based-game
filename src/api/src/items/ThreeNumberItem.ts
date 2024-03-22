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

    if(!playerSession.correctAnswer){
      playerSession.correctAnswer = true;
      playerSession.inventory.push(ThreeNumberItemAlias);

      return new TextActionResult(["You've collected the three number code! Time to escape this room."]);
    }

    if(!playerSession.collectedCode) {
        playerSession.collectedCode = true;
        playerSession.inventory.push(ThreeNumberItemAlias);

    // The item is now collected
    return new TextActionResult(["You've collected the three number code"]);
    }

    return undefined;
    
  }

}

