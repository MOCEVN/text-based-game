import { GameState, PerformActionRequest, ActionReference } from "@shared/types";
import { Router } from "express";
import { ActionResult } from "./base/actionResults/ActionResult";
import { TalkActionResult } from "./base/actionResults/TalkActionResult";
import { TextActionResult } from "./base/actionResults/TextActionResult";
import { CustomAction } from "./base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "./base/actions/ExamineAction";
import { TalkActionAlias, TalkAction } from "./base/actions/TalkAction";
import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { playerSessionMiddleware } from "./base/playerSessionMiddleware";
import {
    createNewPlayerSession,
    getPlayerSession,
    getRoomByAlias,
    getGameObjectByAlias,
    getGameObjectsByAliases,
} from "./instances";
import { PlayerSession } from "./types";
import { ExampleAction, ExampleActionAlias } from "./actions/ExampleAction";

export const router: Router = Router();

router.get("/", (_, res) => {
    res.send("Game");
});

router.use(playerSessionMiddleware("game", createNewPlayerSession));

router.get("/state", (_, res) => {
    const playerSession: PlayerSession = getPlayerSession();

    const room: Room | undefined = getRoomByAlias(playerSession.currentRoom);

    if (room === undefined) {
        res.status(500).end();

        return;
    }

    //NOTE: Rooms always implement Examine
    const examineActionResult: ActionResult = ExamineAction.handle(room)!;

    const gameState: GameState | undefined = convertActionResultToGameState(examineActionResult);

    if (gameState === undefined) {
        res.status(500).end();

        return;
    }

    res.json(gameState);
});

router.post("/action", (req, res) => {
    const actionRequest: PerformActionRequest = req.body as PerformActionRequest;

    const playerSession: PlayerSession = getPlayerSession();

    const room: Room | undefined = getRoomByAlias(playerSession.currentRoom);

    if (room === undefined) {
        res.status(500).end();

        return;
    }

    const actionResult: ActionResult | undefined = handleActionInRoom(
        room,
        actionRequest.action,
        actionRequest.objects
    );

    const gameState: GameState | undefined = convertActionResultToGameState(actionResult);

    if (gameState === undefined) {
        res.status(500).end();

        return;
    }

    res.json(gameState);
});

function handleActionInRoom(room: Room, alias: string, objectAliases?: string[]): ActionResult | undefined {
    const gameObjects: GameObject[] = getGameObjectsByAliases(objectAliases);

    //If there are no GameObjects, execute the action on the room instead.
    if (gameObjects.length < 1) {
        gameObjects[0] = room;
    }

    if (alias.startsWith(TalkActionAlias)) {
        const splitAlias: string[] = alias.split(":");

        if (splitAlias.length < 3) {
            if (!gameObjects || gameObjects.length < 1) {
                return undefined;
            }

            return TalkAction.handle(gameObjects[0]);
        }

        const character: GameObject | undefined = getGameObjectByAlias(splitAlias[1]);

        if (!character) {
            return undefined;
        }

        const choiceId: number = parseInt(splitAlias[2]);

        return TalkAction.handle(character, choiceId);
    }

    switch (alias) {
        case ExamineActionAlias:
            return ExamineAction.handle(gameObjects[0]);

        case ExampleActionAlias:
            return ExampleAction.handle(gameObjects[0]);
    }

    return CustomAction.handle(alias, gameObjects);
}

function convertActionResultToGameState(actionResult?: ActionResult): GameState | undefined {
    //NOTE: Seems like repeated code, but the room can have changed after performing an action!
    const playerSession: PlayerSession = getPlayerSession();

    const room: Room | undefined = getRoomByAlias(playerSession.currentRoom);

    if (!room) {
        return undefined;
    }

    let actions: ActionReference[];

    if (actionResult instanceof TalkActionResult) {
        actions = actionResult.choices.map((e) => e.toReference(actionResult.character));
    } else {
        actions = room.actions().map((e) => e.toReference());
    }

    return {
        roomAlias: room.alias,
        roomTitle: room.name(),
        roomImages: room.images(),
        text: (actionResult as TextActionResult)?.text || ["That doesn't make any sense."],
        actions: actions,
        objects: room.objects().map((e) => e.toReference()),
    };
}
