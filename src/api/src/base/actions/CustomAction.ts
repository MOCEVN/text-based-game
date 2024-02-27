import { ActionResult } from "../actionResults/ActionResult";
import { GameObject } from "../gameObjects/GameObject";
import { castTo, implementsInterface } from "../helpers";
import { Action } from "./Action";

/** Alias used to identity the Custom action and interface */
export const CustomActionAlias: string = "Custom";

/**
 * Interface for GameObjects that need to support a custom action
 */
export interface Custom {
    /**
     * Execute a custom action
     * 
     * @param alias Alias of the custom action to execute
     * @param gameObjects 0 or more reference to GameObjects for use during the execution of the custom action
     * 
     * @returns Result of the custom action
     */
    custom(alias: string, gameObjects: GameObject[] | undefined): ActionResult | undefined;
}

/**
 * Class used to represent a custom action
 */
export class CustomAction extends Action {
    /**
     * Create a new instance of the custom action
     *
     * @param alias Alias used to identify this action
     * @param label Description of this action
     * @param needsObject `true` if this action requires another `GameObject` to work, otherwise `false`.
     */
    public constructor(alias: string, label: string, needsObject: boolean) {
        super(alias, label, needsObject);
    }

    /**
     * Handle a custom action
     *
     * @param alias Alias used to identify the custom action
     * @param gameObjects Array of GameObjects, where the first index is a reference to the GameObject on which the Custom action should be executed.
     *
     * @returns Result of the action
     */
    public static handle(alias: string, gameObjects: GameObject[]): ActionResult | undefined {
        if (implementsInterface(gameObjects[0], CustomActionAlias)) {
            return castTo<Custom>(gameObjects[0]).custom(alias, gameObjects.slice(1));
        }

        return undefined;
    }
}
