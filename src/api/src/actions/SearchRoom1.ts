import { Action } from "../base/actions/Action";
import { ActionResult } from "../base/actionResults/ActionResult";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";

export const SearchactionAlias: string = "Search";
export interface Search {
    Search(): ActionResult | undefined;
}
export class Searchaction extends Action {
    public constructor() {
        super(SearchactionAlias, "Search", true);
    }
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, SearchactionAlias)) {
            return castTo<Search>(gameObject).Search();
        }

        return undefined;
    }
}
