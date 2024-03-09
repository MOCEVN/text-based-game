import { UseAlias, UseRoom5 } from "../actions/UseRoom5";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { EndRoom } from "../rooms/EndRoom";
import { PlayerSession } from "../types";
// import { EndRoom } from "../rooms/EndRoom";

export const PotionItemAlias: string = "potion";

export class PotionItem extends Item implements Examine, UseRoom5 {
    public constructor() {
        super(PotionItemAlias, ExamineActionAlias, UseAlias);
    }

    public name(): string {
        return "Potion";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is a potion"]);
    }

    public Use(): ActionResult | undefined {
        const PlayerSession: PlayerSession = getPlayerSession();
        if(PlayerSession.inventory.includes(PotionItemAlias)){
        const room: EndRoom = new EndRoom();

        //Set the current room to the example room
        getPlayerSession().currentRoom = room.alias;

        // return room.examine();
        return new TextActionResult([`After drinking the potion, a wave of dizziness overtook him, and the world twisted into surreal shapes. Darkness enveloped him, and he fell into unconsciousness.

        When he awoke, blinking against the sunlight, he found himself outside the haunted house. The air was sweet with the scent of flowers, and birdsong filled his ears.
        
        Pushing himself up, he reflected on his strange journey. Though uncertain if it was real, he felt victorious, ready to face whatever lay ahead.
        
        With newfound strength, he left the haunted house behind, knowing he could conquer any challenge that came his way.`]);
    }else{
            return undefined;
        }
       
    
}}
