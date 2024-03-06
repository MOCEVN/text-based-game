import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const Painting2CharacterAlias: string = "painting2";

export class Painting2Character extends Character implements Examine{

    public constructor(){
        super(Painting2CharacterAlias,ExamineActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You can't shake the feeling that the painting is watching you, its gaze piercing through the canvas and into your soul."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        switch(choiceId){
            case 1: // "Hello?"
                return new TextActionResult(["\"...\""]);
            case 2: // <Leave> (before puzzle)
                return new TextActionResult(["You contemplate speaking to the painting but ultimately dismiss the idea, convinced it won't reply. You move on, leaving the silent artwork undisturbed."]);
            case 3: // choose painting (correct)
                playerSession.paintingPuzzleState = 3;
                return new TextActionResult(["\"You have chosen wisely, mortal,\"", 
                "the chosen painting speaks, its voice resonating with approval.", 
                "\"Behold, your reward awaits.\"", 
                "With a wave of its painted hand, the scene depicted in the painting shifts, directing your gaze to a previously unnoticed object: a sturdy saw nestled among the brushstrokes.",
                "With newfound clarity, you extend your hand towards the painting, feeling a strange tingling sensation as your fingers pass through the canvas. As you grasp the saw, the fabric of reality seems to bend, allowing you to pull out the tangible object from within the painted scene.",
                "The saw materializes in your hand, solid and real despite its origins within the artwork. With the tool now in your possession, you feel a sense of empowerment, ready to face whatever challenges lie ahead."]);
            case 4: // <Leave> (during puzzle)
                return new TextActionResult([]);
        }
        if (playerSession.paintingPuzzleState === 2) {
            return new TalkActionResult(this,["\"The treasure lies with me, and I assure you, I speak the truth.\""],[
                new TalkChoiceAction(3, "I believe you hold the answer to my quest. Please reveal the treasure hidden within your frame."),
                new TalkChoiceAction(4,"<Leave>")
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