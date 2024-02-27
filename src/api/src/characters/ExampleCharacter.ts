import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const ExampleCharacterAlias: string = "example-character";

export class ExampleCharacter extends Character implements Examine {
    public constructor() {
        super(ExampleCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Example Character";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is an example character."]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        if (_choiceId === 1) {
            return new TextActionResult(["You greet the example character."]);
        }
        else if (_choiceId === 2) {
            return new TextActionResult(["You do not wish to communicate any further."]);
        }

        return new TalkActionResult(
            this,
            ["Hello!"],
            [new TalkChoiceAction(1, "Hello!"), new TalkChoiceAction(2, "Bye!")]
        );
    }
}
