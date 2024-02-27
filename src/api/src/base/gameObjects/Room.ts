import { ActionResult } from "../actionResults/ActionResult";
import { Action } from "../actions/Action";
import { Custom, CustomActionAlias } from "../actions/CustomAction";
import { Examine, ExamineActionAlias } from "../actions/ExamineAction";
import { GameObject } from "./GameObject";

/**
 * Base class used to represent a room
 *
 * @remarks Implements the Examine and Custom action by default
 */
export abstract class Room extends GameObject implements Examine, Custom {
    /**
     * Create a new instance of this room
     *
     * @param alias Alias of this room
     * @param interfaces List of interfaces this room implements
     */
    protected constructor(alias: string, ...interfaces: string[]) {
        super(alias, ...interfaces, ExamineActionAlias, CustomActionAlias);
    }

    /**
     * Images used to graphically represent this room
     *
     * @returns List of images
     */
    public images(): string[] {
        return [];
    }

    /**
     * Actions that can be used in this room
     *
     * @returns List of actions
     */
    public actions(): Action[] {
        return [];
    }

    /**
     * Game objects that are located inside this room
     *
     * @returns List of actions
     */
    public objects(): GameObject[] {
        return [];
    }

    public abstract examine(): ActionResult | undefined;

    // @ts-expect-error We don't want to prefix the unused arguments in a base class
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public custom(alias: string, gameObjects: GameObject[] | undefined): ActionResult | undefined {
        return undefined;
    }
}
