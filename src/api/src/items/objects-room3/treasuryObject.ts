import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";

export const TreasuryObjectAlias: string = "treasury-object";

export class TreasuryObject extends GameObject implements Examine {
  public constructor() {
    super(TreasuryObjectAlias, ExamineActionAlias);
  }

  public name(): string {
    return "Treasury";
  }

  public examine(): ActionResult | undefined {
    return new TextActionResult([ "After thoroughly searching the treasury, you notice a faint draft coming from behind a large tapestry.",
    "Pulling it aside, you reveal a hidden passage leading deeper into the room.",
    "As you cautiously venture forth, the air grows cooler, and the sound of echoing footsteps fills your ears.",
    "You sense you're approaching something significant, and as you step further, the dim light reveals the eerie silhouettes of skeletons."
]);
  }
}