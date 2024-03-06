import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { ExampleCharacter, ExampleCharacterAlias } from "./characters/ExampleCharacter";
import { ExampleItem, ExampleItemAlias } from "./items/ExampleItem";
import { ExampleRoom, ExampleRoomAlias } from "./rooms/ExampleRoom";
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { PlayerSession } from "./types";
import { Room1, Room1Alias } from "./rooms/Room1";
import { Room2, Room2Alias } from "./rooms/Room2";
import { Room3, Room3Alias } from "./rooms/Room3";
import { Room4, Room4Alias } from "./rooms/Room4";
import { Room5, Room5Alias } from "./rooms/room5";
import { EndRoom, EndRoomAlias } from "./rooms/EndRoom";
import { ThreeNumberItem, ThreeNumberItemAlias } from "./items/ThreeNumberItem";
import { SkeletonCharacter, SkeletonCharacterAlias } from "./characters/SkeletonCharacter";
import { ZaagItem, ZaagItemAlias } from "./items/ZaagItem";
import { HeksCharacter, HeksCharacterAlias } from "./characters/HeksCharacter";
import { Painting1CharacterAlias, Painting1Character } from "./characters/paintings/painting1";
import { Painting2CharacterAlias, Painting2Character } from "./characters/paintings/painting2";
import { Painting3CharacterAlias, Painting3Character } from "./characters/paintings/painting3";
import { Painting4CharacterAlias, Painting4Character } from "./characters/paintings/painting4";
import { Painting5CharacterAlias, Painting5Character } from "./characters/paintings/painting5";


/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "startup",
        inventory: [],
        paintingPuzzleState: 0,
    };
}

/**
 * Get the player session from the current request
 *
 * @returns Player session from the current request
 */
export function getPlayerSession(): PlayerSession {
    return getPlayerSessionFromContext<PlayerSession>();
}

/**
 * Reset the player session
 */
export function resetPlayerSession(): void {
    resetPlayerSessionInContext(createNewPlayerSession);
}

/**
 * Get the instance of a room by its alias
 *
 * @param alias Alias of the room
 *
 * @returns Instance of the room
 */
export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();

        case ExampleRoomAlias:
            return new ExampleRoom();

        case Room1Alias:
            return new Room1();

        case Room2Alias:
            return new Room2();

        case Room3Alias:
            return new Room3();

        case Room4Alias:
            return new Room4();

        case Room5Alias:
            return new Room5();

        case EndRoomAlias:
            return new EndRoom();
    }

    return undefined;
}

/**
 * Get the instance of a game object by its alias
 *
 * @param alias Alias of the game object
 *
 * @returns Instance of the game object
 */
export function getGameObjectByAlias(alias: string): GameObject | undefined {
    switch (alias) {
        case ExampleItemAlias:
            return new ExampleItem();

        case ExampleCharacterAlias:
            return new ExampleCharacter();
        
        case Painting1CharacterAlias:
            return new Painting1Character();

        case Painting2CharacterAlias:
            return new Painting2Character();

        case Painting3CharacterAlias:
            return new Painting3Character();

        case Painting4CharacterAlias:
            return new Painting4Character();

        case Painting5CharacterAlias:
            return new Painting5Character();


        // Item van kamer 3 - Megan
        case ThreeNumberItemAlias:
            return new ThreeNumberItem();   

        // Skeleton Character van kamer 3 - Megan
        case SkeletonCharacterAlias:
            return new SkeletonCharacter(); 

        case ZaagItemAlias:
            return new ZaagItem();

        case HeksCharacterAlias:
            return new HeksCharacter();    

        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            return getRoomByAlias(alias);
    }
}

/**
 * Get a list of game objects instances by their alias
 *
 * @param alias List of game object aliases
 *
 * @returns List of game object instances
 */
export function getGameObjectsByAliases(objectAliases?: string[]): GameObject[] {
    return objectAliases?.map((e) => getGameObjectByAlias(e)!).filter((e) => e) || [];
}

/**
 * Get a list of game object instances based on the inventory of the current player session
 *
 * @returns List of game object instances
 */
export function getGameObjectsFromInventory(): GameObject[] {
    return getGameObjectsByAliases(getPlayerSession().inventory);
}
