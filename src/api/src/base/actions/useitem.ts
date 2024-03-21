import { ActionReference } from "@shared/types";
import { ActionResult } from "../actionResults/ActionResult";
import { Character } from "../gameObjects/Character";
import { Action } from "./Action";
import { GameObject } from "../gameObjects/GameObject";
import { castTo, implementsInterface } from "../helpers";

/** Alias used to identity the Talk action and interface */
export const gebruiktitemAlias: string = "use";

/**
 * Interface for GameObjects that need to support the Talk action
 */
export interface Gebruik {
    /**
     * Execute the Talk action
     *
     * @param choiceId ID of the specific choice take into consideration
     *
     * @returns Result of the Talk action
     */
    gebruik(choiceId?: number): ActionResult | undefined;
}

/**
 * Class used to represent the Talk action
 */
export class gebruikaction extends Action {
    /**
     * Create a new instance of the Talk action
     */
    public constructor() {
        super(gebruiktitemAlias, "use item", true);
    }

    /**
     * Handle the Talk action
     *
     * @param gameObject Reference to the GameObject on which the Talk action should be executed
     * @param choiceId ID of the specific choice to handle
     *
     * @returns Result of the action
     */
    public static handle(gameObject: GameObject, choiceId?: number): ActionResult | undefined {
        if (implementsInterface(gameObject, gebruiktitemAlias)) {
            return castTo<Gebruik>(gameObject).gebruik(choiceId);
        }

        return undefined;
    }
}

/**
 * Class used to present a dialogue choice
 *
 * @remarks This class does not extend `Action` since it's a subaction of Talk and works fundamentally different than normal actions
 */
export class UseChoiceAction {
    private _id: number;
    private _text: string;

    /**
     * Create a new instance of a dialogue choice
     *
     * @param id ID of the choice
     * @param text Text of the choice
     */
    public constructor(id: number, text: string) {
        this._id = id;
        this._text = text;
    }

    /**
     * Convert this dialogue choice into a UI-specific object
     *
     * @param character Character who has to handle this dialogue choice
     *
     * @returns UI-specific object representing this dialogue choice
     */
    public toReference(character: Character): ActionReference {
        return {
            alias: `${gebruiktitemAlias}:${character.alias}:${this._id}`,
            label: this._text,
            needsObject: false,
        };
    }
}
