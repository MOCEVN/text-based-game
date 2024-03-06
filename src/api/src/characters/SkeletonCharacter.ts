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
    return new TextActionResult(["You've met the skeleton"]);
  }

  public talk(choiceId?: number | undefined): ActionResult | undefined {
    if(choiceId === 1) {
      return new TextActionResult(["Skeleton: What do we have here...I never thought I would see a living soul again. A very brave candidate..To keep your pretty face you first have to solve the riddle."]);
    } else if(choiceId === 2) {
      return new TextActionResult(["You chickened out."]);
    }

    return new TalkActionResult(this, ["You've noticed a couple moving bones"], [
      new TalkChoiceAction(1, "Talk to the skeleton"),
      new TalkChoiceAction(2, "Runaway from the skeleton"),
    ]);
  }

}