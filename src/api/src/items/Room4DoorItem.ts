import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Custom, CustomActionAlias } from "../base/actions/CustomAction";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Item } from "../base/gameObjects/Item";
import { Room4 } from "../rooms/Room4";

export const Room4DoorItemAlias: string = "room-4-door-item";

export class Room4DoorItem extends Item implements Custom,Examine{
    public constructor(){
        super(Room4DoorItemAlias,CustomActionAlias,ExamineActionAlias);
    }
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        return new Room4().custom(alias,[this]);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The door is a simple wooden slab, devoid of any distinguishing features or mechanisms for opening."]);    
    }

    public name(): string {
        return "Door";
    }
}