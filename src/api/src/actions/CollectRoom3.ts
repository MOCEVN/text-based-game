import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";


export const CollectActionAlias: string = "pickup-code";

export interface Collect {
  CollectAction(): ActionResult | undefined;
  }

export class CollectAction extends Action{
  public constructor() {
      super(CollectActionAlias, "Collect", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
      if (implementsInterface(gameObject, CollectActionAlias)) {
          return castTo<Collect>(gameObject).CollectAction();
      }

      return undefined;
  }

  }

