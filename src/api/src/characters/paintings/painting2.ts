import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Custom, CustomActionAlias } from "../../base/actions/CustomAction";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { GameObject } from "../../base/gameObjects/GameObject";
import { getPlayerSession } from "../../instances";
import { SawItemAlias } from "../../items/SawItem";
import { Room4 } from "../../rooms/Room4";
import { PlayerSession } from "../../types";

export const Painting2CharacterAlias: string = "painting2";

export class Painting2Character extends Character implements Examine,Custom{

    public constructor(){
        super(Painting2CharacterAlias,ExamineActionAlias,CustomActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You can't shake the feeling that the painting is watching you, its gaze piercing through the canvas and into your soul."]);
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
            case 2: // <Leave> (before puzzle)
                return new TextActionResult(["You contemplate speaking to the painting but ultimately dismiss the idea, convinced it won't reply. You move on, leaving the silent artwork undisturbed."]);
            case 3: // choose painting (correct)
                playerSession.paintingPuzzleState = 2;
                playerSession.inventory.push(SawItemAlias);
                return new TextActionResult(["\"You've chosen wisely\"", 
                "the painting speaks, its voice resonating with approval.", 
                "\"Behold, your reward.\"", 
                "The scene depicted in the painting shifts, directing your gaze to a previously unnoticed object: a sturdy saw nestled among the brushstrokes.", 
                "As you reach for it, the saw materializes in your hand, solid and real. With the tool now in your possession, you feel empowered, ready to face whatever challenges lie ahead."]);


                return new TextActionResult(["\"You have chosen wisely, mortal,\"", 
                "the chosen painting speaks, its voice resonating with approval.", 
                "\"Behold, your reward awaits.\"", 
                "With a wave of its painted hand, the scene depicted in the painting shifts, directing your gaze to a previously unnoticed object: a sturdy saw nestled among the brushstrokes.",
                "With newfound clarity, you extend your hand towards the painting, feeling a strange tingling sensation as your fingers pass through the canvas. As you grasp the saw, the fabric of reality seems to bend, allowing you to pull out the tangible object from within the painted scene.",
                "The saw materializes in your hand, solid and real despite its origins within the artwork. With the tool now in your possession, you feel a sense of empowerment, ready to face whatever challenges lie ahead."]);
            case 4: // <Leave> (during puzzle)
                return new TextActionResult([]);
            case 5:
                return new TextActionResult(["\"I have stood watch over this realm since time immemorial, my gaze unwavering even as the world around me changes. Though my vigil may never end, I find comfort in the knowledge that I serve a greater purpose.\""]);
            case 6:
                return new TalkActionResult(this,["Are you sure?"],[
                    new TalkChoiceAction(3,"Yes"),
                    new TalkChoiceAction(4,"No")
                ]);
        }
        if (playerSession.paintingPuzzleState === 1) {
            return new TalkActionResult(this,["\"The treasure lies with me, and I assure you, I speak the truth.\""],[
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
        return "Painting of the Ghostly Gaze";
    }
    
}