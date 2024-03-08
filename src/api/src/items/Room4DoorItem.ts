import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Custom, CustomActionAlias } from "../base/actions/CustomAction";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Talk, TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { Room4 } from "../rooms/Room4";
import { SawItemAlias } from "./SawItem";

export const Room4DoorItemAlias: string = "room-4-door-item";

export class Room4DoorItem extends Item implements Custom,Examine,Talk{
    public constructor(){
        super(Room4DoorItemAlias,CustomActionAlias,ExamineActionAlias,TalkActionAlias);
    }
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        return new Room4().custom(alias,[this]);
    }

    public examine(): ActionResult | undefined {
        if (getPlayerSession().paintingPuzzleState === 3) {
            return new TextActionResult(["The door, now broken and splintered, lies on the ground, its frame stripped of its former solidity."]);
        }
        if (getPlayerSession().inventory.indexOf(SawItemAlias) > -1) {
            return new TextActionResult(["The door is a simple wooden slab, devoid of any distinguishing features or mechanisms for opening.","(I could use the saw to open this.)"]);
        }
        return new TextActionResult(["The door is a simple wooden slab, devoid of any distinguishing features or mechanisms for opening."]);    
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1){
            return new TextActionResult(["You stand before the door and, with a dramatic flourish, exclaim 'Open sesame!' in a hopeful tone. However, the door remains unmoved, clearly unimpressed by your attempt at magical incantations. It seems you'll need to find a more practical solution to open it."]);
        }
        return new TalkActionResult(this,["You walk up to the door."],[
            new TalkChoiceAction(1,"Open Sesame!")
        ]);
    }

    public name(): string {
        return "Door";
    }
}