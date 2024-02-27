import { ActionResult } from "../actionResults/ActionResult";
import { TalkActionAlias, Talk } from "../actions/TalkAction";
import { GameObject } from "./GameObject";

/**
 * Base class used to represent a character
 *
 * @remarks Implements the Talk action by default
 */
export abstract class Character extends GameObject implements Talk {
    /**
     * Create a new instance of this character
     *
     * @param alias Alias of this character
     * @param interfaces List of interfaces this character implements
     */
    protected constructor(alias: string, ...interfaces: string[]) {
        super(alias, ...interfaces, TalkActionAlias);
    }

    public abstract talk(choiceId?: number): ActionResult | undefined;
}
