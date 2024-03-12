import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { ThreeNumberItemAlias } from "../../items/ThreeNumberItem";
import { PlayerSession } from "../../types";

export const SkeletonCharacter1Alias: string = "skeleton-character-1";

export class SkeletonCharacter1 extends Character implements Examine { 
  public constructor() { 
    super(SkeletonCharacter1Alias, ExamineActionAlias);
  }

  public name(): string {
    return "Skeleton 1";
  }

  public examine(): ActionResult | undefined {
    return new TextActionResult(["You've met the first skeleton"]);
  }

  public talk(choiceId?: number | undefined): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();

    if(choiceId === 1) {
      return new TextActionResult(["Skeleton: What do we have here...I never thought I would see a living soul again.",
                                "But unfortunately, you're not quite there yet."]);
    } else if(choiceId === 2) {
      return new TextActionResult(["You need to investigate the room."]);
    }
     else if(choiceId === 3) {
      playerSession.inventory = [];

      return new TextActionResult(["You've lost the code..."]);
    } 

    const choiceActions: TalkChoiceAction[] = [
      new TalkChoiceAction(1, "Talk to the first skeleton"),
      new TalkChoiceAction(2, "Continue the quest"),
    ];

    if(playerSession.inventory.includes(ThreeNumberItemAlias)) {
        choiceActions.push(new TalkChoiceAction(3, "Throw the code!"));
    }
    
    return new TalkActionResult(this, 
      ["You've noticed a couple moving bones"], 
      choiceActions
      );
  }

}