import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Custom, CustomActionAlias } from "../../base/actions/CustomAction";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { GameObject } from "../../base/gameObjects/GameObject";
import { damagePlayer, getPlayerSession } from "../../instances";
import { Room4 } from "../../rooms/Room4";
import { PlayerSession } from "../../types";

export const Painting3CharacterAlias: string = "painting3";

export class Painting3Character extends Character implements Examine,Custom{

    public constructor(){
        super(Painting3CharacterAlias,ExamineActionAlias,CustomActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The longer you stare at the painting, the more it feels like you're being drawn into its depths, as if it's beckoning you to step inside its world."]);
    }
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        return new Room4().custom(alias,[this]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        switch(choiceId){
            case 1: // "Hello?"
                if (playerSession.paintingsTalkedTo < 2) {
                    ++playerSession.paintingsTalkedTo;
                    return new TextActionResult(["\"...\""]);
                } else {
                    return new TextActionResult(["\"...\"","(Maybe i should yell something into the room to get a response.)"]);
                }
            case 2: // <Leave>
                return new TextActionResult(["You briefly think about talking to the painting but decide against it, assuming it won't respond. You continue exploring, leaving the silent artwork alone."]);
            case 3:
                if (damagePlayer(1)){
                    return new TextActionResult(["GAME OVER", "The painting killed you."]);
                }
                return new TextActionResult(["\"Wrong!\"", 
                "the painting snaps.", 
                "You feel a surge of malevolent energy engulving you, you feel a sharp, searing sensation coursing through your body, leaving you drained and disoriented."]);
            case 4:
                return new TextActionResult([]);
            case 5:
                return new TextActionResult(["\"Long ago, I was someone of importance, but now I am but a shadow of my former self. Yet, within the confines of this painting, I find a sense of peace, knowing that I am remembered, if only for a fleeting moment.\""]);
            case 6:
                return new TalkActionResult(this,["Are you sure?"],[
                    new TalkChoiceAction(3,"Yes"),
                    new TalkChoiceAction(4,"No")
                ]);
        }
        if (playerSession.paintingPuzzleState === 1) {
            return new TalkActionResult(this,["\"Believe me, both The Painting of the Ghostly Gaze and The Painting of the Forgotten Memories are speaking the truth. The treasure awaits you with The Painting of the Forgotten Memories.\""],[
                new TalkChoiceAction(6, "I believe you hold the answer to my quest. Please reveal the treasure hidden within your frame."),
                new TalkChoiceAction(4,"<Leave>")
            ]);
        }
        if (playerSession.paintingPuzzleState >= 2) {
            return new TalkActionResult(this,["You walk up to the painting."],[
                new TalkChoiceAction(5,"Tell me about yourself.")
            ]);
        }

        return new TalkActionResult(this,["You walk up to the painting."],[
            new TalkChoiceAction(1,"Hello?"),
            new TalkChoiceAction(2,"<Leave>")
        ]);
    }

    public name(): string {
        return "Painting of the Whispering Winds";
    }
    
}