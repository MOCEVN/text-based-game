import { Example, ExampleActionAlias } from "../actions/ExampleAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Item } from "../base/gameObjects/Item";
import { resetPlayerSession } from "../instances";

export const ExampleItemAlias: string = "example-item";

export class ExampleItem extends Item implements Example {
    public constructor() {
        super(ExampleItemAlias, ExampleActionAlias);
    }

    public name(): string {
        return "Example Item";
    }

    public example(): ActionResult | undefined {
        resetPlayerSession();

        return new TextActionResult(["This is an example action executed on an item, which caused your game to reset.", "<GAME OVER>"]);
    }
}
