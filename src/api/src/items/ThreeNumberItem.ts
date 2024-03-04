import { Item } from "../base/gameObjects/Item";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";

export const ThreeNumberItemALias: string = "three-number-item";

export class ThreeNumberItem extends Item implements Examine {
  public constructor() {
    super(ThreeNumberItemALias, ExamineActionAlias);
  }

  public name(): string {
    return "Three Number code";
  }

  public examine(): ActionResult | undefined {
    return new TextActionResult(["It's a three number code for the next room door"]);
  }
}