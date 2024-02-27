export type GameServiceEvent<T = never> = {
    name: string;
    data: T;
};

type GameServiceEventCallback<T extends GameServiceEvent> = (event: T) => void;

//NOTE: This doesn't really have to be a class, since it's a singleton anyway.
class GameService {
    public dispatchEvent<T = never>(name: string, data?: T): void {
        window.dispatchEvent(
            new CustomEvent(`game:${name}`, {
                detail: data,
            })
        );
    }

    public addEventListener<T extends GameServiceEvent>(
        eventName: string,
        callback: GameServiceEventCallback<T>
    ): void {
        window.addEventListener(`game:${eventName}`, (event) => {
            callback({
                name: eventName,
                data: (event as CustomEvent).detail,
            } as T);
        });
    }
}

export const gameService: GameService = new GameService();
