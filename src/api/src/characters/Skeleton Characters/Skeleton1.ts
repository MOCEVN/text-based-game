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
      return new TextActionResult([
        "Skeleton: 'Hey there, pal! The name's Boney McRibcage.",
        "Yep, I used to be a regular Joe until this ol' haunted house got the best of me.",
        "Now I'm just hangin' around, quite literally. Heh, get it? Hangin' around?",
        "Anyway, watch your step in this joint, friend. Things can get pretty spooky around here.",
        "So, what's your deal? Looking for treasure? Trying to break the curse? Or just lost your way to the local sandwich shop?",]);
    } else if(choiceId === 2) {
      return new TextActionResult(["You need to investigate the room further."]);
    }
     else if(choiceId === 3) {
      playerSession.inventory = [];

      return new TextActionResult(["You've lost the code..."]);
    } 

    const choiceActions: TalkChoiceAction[] = [
      new TalkChoiceAction(1, "Talk to the skeleton"),
      new TalkChoiceAction(2, "Continue the quest"),
    ];

    if(playerSession.inventory.includes(ThreeNumberItemAlias)) {
        choiceActions.push(new TalkChoiceAction(3, "Throw the code!"));
    }
    
    return new TalkActionResult(this, 
      [ "As you approach the skeletal figure, you notice its weathered bones glistening faintly in the dim light of the room.",
      "The skeleton is propped up against a crumbling pillar, its empty eye sockets seeming to watch your every move.",
      "Despite its appearance, there's a playful aura about it, as if it's waiting for someone to engage in conversation.",
      "Perhaps talking to the skeleton could reveal more about this haunted place and the secrets it holds."], 
      choiceActions
      );
  }

}