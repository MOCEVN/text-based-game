import { ActionResult } from "./ActionResult";

/**
 * Class used the represent the textual result of an action
 */
export class TextActionResult extends ActionResult {
    private _text: string[];

    /**
     * Create a new instance of this action result
     * 
     * @param text Text to show
     */
    public constructor(text: string[]) {
        super();

        this._text = text;
    }

    /**
     * Text to show
     */
    public get text(): string[] {
        return this._text;
    }
}
