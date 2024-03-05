import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const SkeletonCharacterAlias: string = "skeleton-character";

export class SkeletonCharacter extends Character implements Examine { 
  public constructor() { 
    super(SkeletonCharacterAlias, ExamineActionAlias);
  }

  public name(): string {
    return "Skeleton";
  }

  public examine(): ActionResult | undefined {
    return new TextActionResult(["This is a skeleton"]);
  }
  public talk(_choiceId?: number | undefined): ActionResult | undefined {
    return new TalkActionResult(this, ["Hello, I am a skeleton"], [
      new TalkChoiceAction(1, "Touch the skeleton")
    ]);
  }

}