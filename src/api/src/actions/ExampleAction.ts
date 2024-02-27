import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";

export const ExampleActionAlias: string = "example-action";

export interface Example {
    example(): ActionResult | undefined;
}

export class ExampleAction extends Action {
    public constructor() {
        super(ExampleActionAlias, "Example Action", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, ExampleActionAlias)) {
            return castTo<Example>(gameObject).example();
        }

        return undefined;
    }
}
