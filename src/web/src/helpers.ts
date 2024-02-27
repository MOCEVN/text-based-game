export async function getJsonApi<T1, T2 = any>(path: string, data?: T2): Promise<T1> {
    const response: Response = await fetch(
        `${viteConfiguration.API_URL}${path}${data ? `?${new URLSearchParams(data).toString()}` : ""}`,
        {
            method: "GET",
            headers: {
                "X-PlayerSessionId": getPlayerSessionId(),
            },
        }
    );

    if (parseInt(response.headers.get("content-length")!) > 0) {
        return response.json() as T1;
    }

    //NOTE: Trick TypeScrupt into returning a void
    return Promise.resolve(undefined as T1);
}

export async function postJsonApi<T1, T2>(path: string, data?: T2): Promise<T1> {
    return methodJsonApi("POST", path, data);
}

export async function methodJsonApi<T1, T2>(method: string, path: string, data?: T2): Promise<T1> {
    const response: Response = await fetch(`${viteConfiguration.API_URL}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "X-PlayerSessionId": getPlayerSessionId(),
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    if (parseInt(response.headers.get("content-length")!) > 0) {
        return response.json() as T1;
    }

    //NOTE: Trick TypeScript into returning a void
    return Promise.resolve(undefined as T1);
}

function getPlayerSessionId(): string {
    let playerSessionId: string | null = localStorage.getItem("playerSessionId");

    if (!playerSessionId) {
        playerSessionId = crypto.randomUUID();

        localStorage.setItem("playerSessionId", playerSessionId);
    }

    return playerSessionId;
}
