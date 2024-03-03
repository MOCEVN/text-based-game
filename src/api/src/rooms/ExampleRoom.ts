import { Example, ExampleAction, ExampleActionAlias } from "../actions/ExampleAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { ExampleCharacter } from "../characters/ExampleCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { ExampleItem } from "../items/ExampleItem";
import { Room5 } from "./room5";

export const ExampleRoomAlias: string = "example-room";

export class ExampleRoom extends Room implements Example {
    public constructor() {
        super(ExampleRoomAlias, ExampleActionAlias);
    }

    public name(): string {
        return "Example Room";
    }

    public images(): string[] {
        return ["example"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
            new ExampleAction(),
            new CustomAction("room5", "Room 5", false),
        ];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems, new ExampleItem(), new ExampleCharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is an example room."]);
    }

    public example(): ActionResult | undefined {
        return new TextActionResult(["This is an example action executed on a room."]);
    }
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "room5") {
            const room: Room5 = new Room5();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
