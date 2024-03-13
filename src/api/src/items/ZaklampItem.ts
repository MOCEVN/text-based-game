import { Item } from "../base/gameObjects/Item";

export const ZaklampitemAlias: string = "zaklamp";

 export class Zaklampitem extends Item{
  public constructor (){
    super(ZaklampitemAlias);
 }
 public name(): string {
   throw new Error("Bird Feather");
}
}

