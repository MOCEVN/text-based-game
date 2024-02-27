import { GameObjectReference } from "@shared/types";
import { HasInterfaces } from "../helpers";

/**
 * Base class used to represent a game object
 */
export abstract class GameObject implements HasInterfaces {
    private _alias: string;
    private _interfaces: string[];

    /**
     * Create a new instance of this game object
     * 
     * @param alias Alias of this game object
     * @param interfaces List of interfaces this game object implements
     */
    protected constructor(alias: string, ...interfaces: string[]) {
        this._alias = alias;
        this._interfaces = interfaces;
    }

    /**
     * Name of this game object
     */
    public abstract name(): string;

    /**
     * Alias of this game object
     */
    public get alias(): string {
        return this._alias;
    }

    public get interfaces(): string[] {
        return this._interfaces;
    }

    /**
     * Convert this game object into a UI-specific object
     *
     * @returns UI-specific object representing this game object
     */
    public toReference(): GameObjectReference {
        return {
            alias: this._alias,
            name: this.name(),
        };
    }
}
