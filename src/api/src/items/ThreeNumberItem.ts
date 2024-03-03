import { Item } from "../base/gameObjects/Item";

export const ThreeNumberItemALias: string = "three-number-item";

export class ThreeNumberItem extends Item {
  public constructor() {
    super(ThreeNumberItemALias);
  }

  public name(): string {
    return "Three Number Item";
  }
}