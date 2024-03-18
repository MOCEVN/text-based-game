import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { ThreeNumberItemAlias } from "../../items/ThreeNumberItem";
import { PlayerSession } from "../../types";

export const SkeletonCharacter3Alias: string = "skeleton-character-3";

export class SkeletonCharacter3 extends Character implements Examine { 
  public constructor() { 
    super(SkeletonCharacter3Alias, ExamineActionAlias);
  }

  public name(): string {
    return "Skeleton 3";
  }

  public examine(): ActionResult | undefined {
    return new TextActionResult(["The skeleton adorned with the mysterious amulet stands tall.",
    "As you observe closely, you notice a faint, ethereal glow emanating from within the amulet, giving the skeletal figure an otherworldly aura."]);
  }

  public talk(choiceId?: number | undefined): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();

    if(choiceId === 1) {
      const choiceActions: TalkChoiceAction[] = [
        new TalkChoiceAction(4, "Grab the amulet"),
        new TalkChoiceAction(2, "Continue the quest"),
      ];

      if(playerSession.inventory.includes(ThreeNumberItemAlias)) {
          choiceActions.push(new TalkChoiceAction(3, "Throw the code!"));
      }
      

      return new TalkActionResult(this, 
        ["As you attempt to converse with the skeleton wearing the mysterious amulet",
        "It appears this skeletal guardian holds no answers for your quest to escape this mysterious room.",
      "But maybe the amulet will help you escape this mysterious room?"], 
        choiceActions
      );
    } 
    else if(choiceId === 2) {
      return new TextActionResult(["You chickened out."]);
    }
    else if(choiceId === 3) {
      playerSession.inventory = [];
      return new TextActionResult(["You've lost the code..."]);
    } 
    else if(choiceId === 4) {
      return new TextActionResult([
        "a message unfolds: 'Seek out the keeper of riddles, whose bones whisper secrets of the past. Only through conversation with this spectral sage shall the path to enlightenment be revealed' ",
      "The second creature will help you out."]);
    }

    // Default action when no specific choice is selected
    return new TalkActionResult(this,
      ["You see that the skeleton wears an mysterious amulet. Maybe that brings you closer to an outway?"],
      [
          new TalkChoiceAction(1, "Hey there, old bones. Mind sharing some wisdom to help me out?"),
          new TalkChoiceAction(2, "Continue the quest"),
      ]
    );
  }
}


