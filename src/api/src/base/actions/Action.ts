import { ActionReference } from "@shared/types";

/**
 * Base class used to represent an action
 */
export abstract class Action {
    private _alias: string;
    private _label: string;
    private _needsObject: boolean;

    /**
     * Create a new instance of this action
     * 
     * @param alias Alias used to identify this action
     * @param label Description of this action
     * @param needsObject `true` if this action requires another `GameObject` to work, otherwise `false`.
     */
    protected constructor(alias: string, label: string, needsObject: boolean) {
        this._alias = alias;
        this._label = label;
        this._needsObject = needsObject;
    }

    /**
     * Convert this action into a UI-specific object
     * 
     * @returns UI-specific object representing this action
     */
    public toReference(): ActionReference {
        return {
            alias: this._alias,
            label: this._label,
            needsObject: this._needsObject,
        };
    }
}
