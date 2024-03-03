import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
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
  public talk(): ActionResult | undefined {
    return new TextActionResult(["Hello, I am a skeleton"]);
  }
}