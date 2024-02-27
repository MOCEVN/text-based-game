import { ActionReference } from "@shared/types";
import { ActionResult } from "../actionResults/ActionResult";
import { Character } from "../gameObjects/Character";
import { Action } from "./Action";
import { GameObject } from "../gameObjects/GameObject";
import { castTo, implementsInterface } from "../helpers";

/** Alias used to identity the Talk action and interface */
export const TalkActionAlias: string = "talk";

/**
 * Interface for GameObjects that need to support the Talk action
 */
export interface Talk {
    /**
     * Execute the Talk action
     *
     * @param choiceId ID of the specific choice take into consideration
     *
     * @returns Result of the Talk action
     */
    talk(choiceId?: number): ActionResult | undefined;
}

/**
 * Class used to represent the Talk action
 */
export class TalkAction extends Action {
    /**
     * Create a new instance of the Talk action
     */
    public constructor() {
        super(TalkActionAlias, "Talk To", true);
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
        if (implementsInterface(gameObject, TalkActionAlias)) {
            return castTo<Talk>(gameObject).talk(choiceId);
        }

        return undefined;
    }
}

/**
 * Class used to present a dialogue choice
 *
 * @remarks This class does not extend `Action` since it's a subaction of Talk and works fundamentally different than normal actions
 */
export class TalkChoiceAction {
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
            alias: `${TalkActionAlias}:${character.alias}:${this._id}`,
            label: this._text,
            needsObject: false,
        };
    }
}
