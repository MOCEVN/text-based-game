import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
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
import { SawItem, SawItemAlias } from "./items/SawItem";
import { WitchCharacter, WitchCharacterAlias } from "./characters/WitchCharacter";
import { Painting1CharacterAlias, Painting1Character } from "./characters/paintings/painting1";
import { Painting2CharacterAlias, Painting2Character } from "./characters/paintings/painting2";
import { Painting3CharacterAlias, Painting3Character } from "./characters/paintings/painting3";
import { Painting4CharacterAlias, Painting4Character } from "./characters/paintings/painting4";
import { Painting5CharacterAlias, Painting5Character } from "./characters/paintings/painting5";
import { Room4DoorItem, Room4DoorItemAlias } from "./items/Room4DoorItem";
import { PotionItem, PotionItemAlias } from "./items/PotionItem";
import { KeyItem1, KeyItem1Alias } from "./items/keys/KeyItem1";
import { KeyItem2, KeyItem2Alias } from "./items/keys/KeyItem2";
import { KeyItem3, KeyItem3Alias } from "./items/keys/KeyItem3";
import { GhostCharacter, GhostCharacterAlias } from "./characters/GhostCharacter";
import { FirstPot, FirstPotAlias } from "./characters/pots/FirstPot";
import { SkeletonCharacter1, SkeletonCharacter1Alias } from "./characters/Skeleton Characters/Skeleton1";
import { SkeletonCharacter2, SkeletonCharacter2Alias } from "./characters/Skeleton Characters/Skeleton2";
import { SkeletonCharacter3, SkeletonCharacter3Alias } from "./characters/Skeleton Characters/Skeleton3";
import { GameOverRoom, GameOverRoomAlias } from "./rooms/GameOverRoom";
import { ActionResult } from "./base/actionResults/ActionResult";
import { clownvoice, clownvoicealias } from "./characters/ClownCharacter/Clownvoice";
import { TreasuryObject, TreasuryObjectAlias } from "./items/objects-room3/treasuryObject";
import { flashlight, FlashlightitemAlias } from "./characters/room1-3items/flashlight";
import { Desktop, DesktopAlias } from "./characters/Deskcharacter";
import { MiniGAmeRoom, MiniGameRoomAlias } from "./rooms/MiniGameRoom";
import { getPlayerSessionGetter, getPlayerSessionReset } from "./base/middlewareService";
import { saveHighScoreToDatabase } from "./base/highScoreService";
import { Bookcase, BookcaseAlias } from "./characters/Bookcasecharacter";
import { ContiniueSearch, ContiniueSearchAlias } from "./characters/ClownCharacter/ContinueSearch";
import { continueenteroom, ContinueenterroomAlias } from "./characters/ClownCharacter/Continueenterroom";
import { Fishbowl, FishbowlAlias } from "./characters/Fishbowlcharachter";
import { VentAlias, ventilation } from "./characters/ClownCharacter/vent";
import { ClowncharachterAlias, Clowncharacter } from "./characters/ClownCharacter/Clowncharacter";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        // global
        currentRoom: "startup",
        inventory: [],
        hp: 10,
        hasRevived: false,
        audio: [],
        startTime: Date.now(),
        // room 1
        showdesktop: false,
        showbookcase: false,
        collectedflashlight: false,
        searchbookcase: false,
        searchdesktop: false,
        walkinroom: false,
        showfishbowl: false,
        contineusearch: false,
        noshowclownvoice: false,
        ventOpened: false,
        showfinaleclown: false,
        showventilation: false,
        // room 2
        pickedUpKey1: false,
        pickedUpKey2: false,
        pickedUpKey3: false,
        answeredRiddle: false,
        openedDoor: false,
        // room 3
        roomSearched: false,
        collectedCode: false,
        correctAnswer: false,
        spokenToSkeleton1: false,
        spokenToSkeleton3: false,
        examinedRoom: false,
        // room 4
        paintingPuzzleState: 0,
        paintingsTalkedTo: 0,
        // room 5
        witchRightChoise: false,
        pickedUpPotion: false,
        playertrys: 0,
        gameOverKamer5: 0,
        talkPotion: false,
        talkWitch: false,
        PotRightChoise: false,
    };
}

/**
 * Get the player session from the current request
 *
 * @returns Player session from the current request
 */
export function getPlayerSession(): PlayerSession {
    return getPlayerSessionGetter()();
}

/**
 * Reset the player session
 */
export function resetPlayerSession(): void {
    getPlayerSessionReset()(createNewPlayerSession);
}

/**
 * Sends the player to the game over room
 * @returns Examine text from the game over room
 */
export function sendToGameOver(): ActionResult | undefined {
    const room: GameOverRoom = new GameOverRoom();
    getPlayerSession().currentRoom = room.alias;
    return room.examine();
}
/**
 * Lowers the players hp, also checks if the players hp is 0 or lower and if it is, sends the player to game over or the minigame.
 * @param damageAmount Amount to lower the hp by
 * @returns Whether the player died or not: true if the player is dead, false if the player lives
 */
export function damagePlayer(damageAmount: number): boolean {
    const playerSession: PlayerSession = getPlayerSession();
    playerSession.hp -= damageAmount;
    if (playerSession.hp <= 0) {
        if (playerSession.hasRevived) {
            sendToGameOver();
        } else {
            playerSession.deathRoom = playerSession.currentRoom;
            sendToMiniGame();
        }
        return true;
    }
    return false;
}
/**
 * Sends the player to the minigame
 */
export function sendToMiniGame(): void {
    const playerSession: PlayerSession = getPlayerSession();
    playerSession.currentRoom = MiniGameRoomAlias;
}
/**
 * Adds an audio filename to be played.
 * @param name Filename of the audio file in /public/assets/audio
 */
export function playAudio(name: string): void {
    getPlayerSession().audio.push(name);
}
/**
 * Saves a score to the database
 */
export async function saveHighScore(userName: string): Promise<boolean> {
    const playerSession: PlayerSession = getPlayerSession();
    const startTime: number = playerSession.startTime;
    const endTime: number = playerSession.endTime!;
    const runTime: number = endTime - startTime;
    const hp: number = playerSession.hp;
    return await saveHighScoreToDatabase(userName, runTime, hp);
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
        case GameOverRoomAlias:
            return new GameOverRoom();
        case MiniGameRoomAlias:
            return new MiniGAmeRoom();
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

        case Room4DoorItemAlias:
            return new Room4DoorItem();

        // Item kamer 3 - Megan
        case ThreeNumberItemAlias:
            return new ThreeNumberItem();

        case TreasuryObjectAlias:
            return new TreasuryObject();

        // Skeleton Characters kamer 3 - Megan
        case SkeletonCharacter1Alias:
            return new SkeletonCharacter1();

        case SkeletonCharacter2Alias:
            return new SkeletonCharacter2();

        case SkeletonCharacter3Alias:
            return new SkeletonCharacter3();

        case SawItemAlias:
            return new SawItem();

        case WitchCharacterAlias:
            return new WitchCharacter();

        case FirstPotAlias:
            return new FirstPot();

        // Ghost character room 2 - Giorgio
        case GhostCharacterAlias:
            return new GhostCharacter();

        // Items room 2 - Giorgio
        case KeyItem1Alias:
            return new KeyItem1();

        case KeyItem2Alias:
            return new KeyItem2();

        case KeyItem3Alias:
            return new KeyItem3();

        case PotionItemAlias:
            return new PotionItem();

        // i/3 items you can use to find the clown in room 1 - Omar
        case FlashlightitemAlias:
            return new flashlight();

        // Clownvoice in the distance for room 1 - Omar
        case clownvoicealias:
            return new clownvoice();

        // Dekstop where you can find the flashlight 1 - Omar
        case DesktopAlias:
            return new Desktop();
        // Dekstop where you can find the flashlight 1 - Omar
        case BookcaseAlias:
            return new Bookcase();
        case FishbowlAlias:
            return new Fishbowl();
        case VentAlias:
            return new ventilation();
        case ClowncharachterAlias:
            return new Clowncharacter();
        // Doorgaan met zoeken[Boekenkast optie] - Omar
        case ContiniueSearchAlias:
            return new ContiniueSearch();
        case ContinueenterroomAlias:
            return new continueenteroom();
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
