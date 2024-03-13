import { Item } from "../base/gameObjects/Item";

export const FlashlightitemAlias: string = "flashlight";

export class flashlightitem extends Item {
    public constructor() {
        super(FlashlightitemAlias);
    }
    public name(): string {
        throw new Error("flashlight");
    }
}
