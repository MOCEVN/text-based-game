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
    return new TextActionResult(["It's a three-number code for the next room door"]);
  }

  public CollectAction(): ActionResult | undefined {
    // Put the item in the inventory
    const playerSession: PlayerSession = getPlayerSession();

    if(playerSession.inventory.includes(ThreeNumberItemAlias)) {
        playerSession.inventory.push(ThreeNumberItemAlias);
    }

    // The item is now collected
    return new TextActionResult(["You've collected the three number code"]);
  }


}

