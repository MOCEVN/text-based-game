import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { ThreeNumberItemAlias } from "../../items/ThreeNumberItem";
import { PlayerSession } from "../../types";


export const SkeletonCharacter2Alias: string = "skeleton-character-2";

export class SkeletonCharacter2 extends Character implements Examine { 
  public constructor() { 
    super(SkeletonCharacter2Alias, ExamineActionAlias);
  }

  public name(): string {
    return "Skeleton 2";
  }

  public examine(): ActionResult | undefined {
    return new TextActionResult(["You're walking slowly towards a skeleton, hoping you'll get closer to an answer."]);
  }

  public talk(choiceId?: number | undefined): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();

    if(choiceId === 1) {
      return new TextActionResult(["Skeleton 2: Lonely wanderer, your fate may intertwine with mine. Seek the clues to the realm beyond.", "My end came swiftly in the darkness, and now I linger in this eternal state.",
      "To keep your pretty face you first have to solve the riddle."]);
    } else if(choiceId === 2) {
      return new TextActionResult(["You chickened out."]);
    }
    else if(choiceId === 3) {
      playerSession.inventory = [];

      return new TextActionResult(["You've lost the code..."]);
    } 

    const choiceActions: TalkChoiceAction[] = [
      new TalkChoiceAction(1, "Talk to the second skeleton"),
      new TalkChoiceAction(2, "Runaway from the skeleton"),
    ];

    if(playerSession.inventory.includes(ThreeNumberItemAlias)) {
        choiceActions.push(new TalkChoiceAction(3, "Throw the code!"));
    }
    
    return new TalkActionResult(this, 
      [ "The skeleton clutching a faded parchment seems frozen in time, its skeletal hand forever grasping the aged document.",
      "As you inspect the parchment, you decipher fragments of a forgotten tale – a tragic story of love and betrayal.",
      "The faded ink tells of a bygone era, where kingdoms clashed, and an ill-fated romance unfolded amidst the chaos.",
      "Though the details are obscured, the parchment hints at a hidden truth waiting to be unraveled."], 
      choiceActions
      );

  }
}