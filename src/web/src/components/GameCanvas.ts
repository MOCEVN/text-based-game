import { ActionReference, GameObjectReference, GameState, score } from "@shared/types";
import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { getLeaderBoard, getState, performAction, sendHighScore } from "../services/routeService";
import { map } from "lit/directives/map.js";
import { range } from "lit/directives/range.js";
import { gameService } from "../services/gameService";
import { miniGameEnd } from "../types/events";
@customElement("game-canvas")
export class GameCanvas extends LitElement {
    public static styles = css`
        .game {
            height: 100%;
            display: grid;
            grid-template-columns: 4fr 4fr 2fr;
            grid-template-rows: auto 1fr;
            grid-column-gap: 0px;
            grid-row-gap: 0px;
        }

        .title {
            text-align: center;
            margin-top: 5px;
            grid-column: 1 / 4;
            background-color: #241f3e;
        }

        .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            margin: 5px 0 0 0;
            grid-column: 1/3;
            grid-row: 2/3;
            z-index: 1;
            overflow: hidden;
        }

        .header img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            object-position: left;
        }

        .header img:nth-child(n + 2) {
            position: absolute;
        }

        .inventory {
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            padding: 10px;
            background-color: #14141060;
            border-radius: 5px;
        }
        
        .inventory p {
            width: 100%;
            margin: 0;
        }
        
        .inventory img {
            width: 20%;
            height: auto;
            min-width: 2.3em;
            aspect-ratio: 1;
            margin-top: 5px;
            margin-right: 5px;
            padding: 5px;
            border-radius: 5px;
            border-width: 3px;
            border-style: solid;
            border-color: #00000000;
        }
        img.inventoryclickable {
            border-color: #332c57;
            cursor: pointer;
        }
        img.inventoryclickable:hover {
            background-color: #332c57;
        }

        .content {
            margin-top: 5px;
            padding: 10px;
            padding-left: 30%;
            background-color: #202020e0;
            background: linear-gradient(to right, #00000000, #141410f0 30% 90%, #141410ff);
            grid-column: 2/3;
            grid-row: 2/3;
            z-index: 2;
            overflow: auto;
        }

        .content p {
            margin: 0 0 10px 0;
        }

        .content p:last-of-type {
            margin: 0;
        }

        .footer {
            border-radius: 10px 0 0 0;
            background-color: #241f3e;
            border: 0 0 0 solid #141410;
            margin-top: 5px;
            display: flex;
            grid-column: 3/4;
            z-index: 2;
            overflow: auto;
        }

        .footer .buttons {
            display: flex;
            flex-direction: column;
            overflow: auto;
            padding: 10px 10px 0 10px;
            width: 100%;
        }

        .footer .buttons div:first-child {
            border-bottom: 2px solid #837aa8;
        }
        .footer .buttons div:nth-child(2) {
            margin-top: 10px;
        }

        .footer .button {
            background-color: #7f6ed7;
            border: 3px solid #332c57;
            border-radius: 5px;
            padding: 5px 10px;
            margin: 0 5px 10px 10px;
            text-transform: uppercase;
            cursor: pointer;
            display: inline-block;
            user-select: none;
        }

        .footer .button.active,
        .footer .button:hover {
            background-color: #332c57;
        }
        .object-buttons {
            flex-grow: 1;
        }
        .hp {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }
        .hp img {
            height: 2.3em;
            width: 2.3em;
            min-width: 18%;
            margin-top: 5px;
            margin-right: 5px;
            image-rendering: pixelated;
            object-fit: contain;
            flex-grow: 1;
        }
    `;

    private roomTitle?: string;
    private roomImages?: string[];
    private audio?: string[];
    private contentText?: string[];
    private actionButtons?: ActionReference[];
    private gameObjectButtons?: GameObjectReference[];
    private hp?: number;
    private inventory?: string[];
    private playingMiniGame: boolean = false;

    private selectedActionButton?: ActionReference;
    private selectedGameObjectButtons: Set<GameObjectReference> = new Set<GameObjectReference>();

    public connectedCallback(): void {
        super.connectedCallback();

        void this.refreshState();
    }

    private async refreshState(): Promise<void> {
        const state: GameState = await getState();

        this.updateState(state);
    }

    private updateState(state: GameState): void {
        //Reset the component
        this.roomTitle = state.roomTitle;
        this.roomImages = state.roomImages;
        this.audio = state.audio;
        this.contentText = state.text;
        this.actionButtons = state.actions;
        this.gameObjectButtons = state.objects;
        this.hp = state.hp;
        this.inventory = state.inventory;

        this.selectedActionButton = undefined;
        this.selectedGameObjectButtons.clear();

        if (this.roomTitle === "minigame") {
            this.playingMiniGame = true;
            gameService.addEventListener("minigame",(e:miniGameEnd) => {
                if (this.playingMiniGame){
                    this.playingMiniGame = false;
                    if (e.data.win) {
                        void this.handleClickAction({alias:"win",label:"",needsObject:false});
                    } else {
                        void this.handleClickAction({alias:"lose",label:"",needsObject:false});
                    }
                }
            });
        }

        this.requestUpdate();
    }

    private async handleClickAction(button: ActionReference): Promise<void> {
        if (button.needsObject) {
            this.selectedActionButton = button;
            this.selectedGameObjectButtons.clear();

            this.requestUpdate();
        } else {
            if (button.alias === "highscore"){
                let userName: string | null = window.prompt("Fill in your name (max 10 characters)");
                if (userName === null) {
                    return;
                }
                while (true) {
                    if (!userName) {
                        userName = window.prompt("Are you sure you want to leave this blank? Proceed if you want to save your score anonymously");
                        if (userName === null) {
                            return;
                        }
                    }
                    userName = userName.slice(0,10) || "anonymous";
                    if (window.confirm(`Save score as ${userName}?` )){
                        break;
                    }
                    userName = window.prompt("Fill in your name");
                    if (userName === null) {
                        return;
                    }
                }
                if (await sendHighScore(userName)) {
                    this.contentText = ["Score saved successfully"];
                } else {
                    this.contentText = ["Something went wrong."];
                }
                this.requestUpdate();
                return;
            } else if (button.alias === "leaderboard") {
                const scores: score[] = await getLeaderBoard();
                this.contentText = scores.map((val) => `${val.name}> ${val.hp} hp, time: ${new Date(val.time).getUTCMinutes()} min, ${new Date(val.time).getUTCSeconds()} sec`);
                
                this.requestUpdate();
                return;
            }
            
            const state: any = await performAction(button.alias);

            if (state === undefined) {
                return;
            }

            this.updateState(state);
        }
    }

    private async handleClickObject(button: GameObjectReference): Promise<void> {
        if (!this.selectedActionButton) {
            return;
        }

        this.selectedGameObjectButtons.add(button);

        const state: GameState | undefined = await performAction(
            this.selectedActionButton.alias,
            [...this.selectedGameObjectButtons].map((e) => e.alias)
        );

        if (this.selectedGameObjectButtons.size >= 2) {
            this.selectedActionButton = undefined;
            this.selectedGameObjectButtons.clear();
        }

        this.requestUpdate();

        if (state === undefined) {
            return;
        }

        this.updateState(state);
    }

    // private handleAudio(): void {

    // }

    protected render(): TemplateResult {
        if (this.roomTitle === "minigame") {
            return html`<mini-game></mini-game>`;
        } else {   
            return html`
            <div class="game">
                ${this.renderTitle()} ${this.renderHeader()} ${this.renderContent()} ${this.renderFooter()} ${this.renderAudio()}
            </div>
            `;
        }
    }

    private renderTitle(): TemplateResult {
        if (this.roomTitle) {
            return html`<div class="title">${this.roomTitle}</div>`;
        }

        return html`${nothing}`;
    }

    private renderHeader(): TemplateResult {
        if (this.roomImages && this.roomImages.length > 0) {
            return html`
                <div class="header">
                    ${this.roomImages?.map((url) => html`<img src="/assets/img/rooms/${url}.png" draggable=false />`)}
                </div>
            `;
        }

        return html`${nothing}`;
    }

    private renderInventory(): TemplateResult {
        if (this.inventory?.length ?? 0 > 0) {
            return html`
                <div class="inventory">
                    <p>Inventory</p>
                    ${this.inventory?.map((item) => 
                        html`<img 
                        class = "${this.selectedActionButton ? "inventoryclickable" : ""}"
                        src="/assets/img/ui/${item}.png" 
                        draggable=false 
                        @click=${():void => {
                            if (this.selectedActionButton) {
                                void this.handleClickObject({alias: item, name: ""});
                            }
                        }}
                    >`)}
                </div>
            `;
        } else {
            return html``;
        }
    }

    private renderContent(): TemplateResult {
        return html`<div class="content">${this.contentText?.map((text) => html`<p>${text}</p>`)}</div>`;
    }

    private renderFooter(): TemplateResult {
        return html`
            <div class="footer">
                <div class="buttons">
                    <div>
                        ${this.actionButtons?.map(
                            (button) => html`<a
                                class="button ${this.selectedActionButton === button ? "active" : ""}"
                                @click=${(): void => void this.handleClickAction(button)}
                                >${button.label}</a
                            >`
                        )}
                    </div>
                    <div class="object-buttons">
                        ${this.selectedActionButton
                            ? this.gameObjectButtons?.map(
                                  (button) => html`<a
                                      class="button ${this.selectedGameObjectButtons.has(button)
                                          ? "active"
                                          : ""}"
                                      @click=${(): void => void this.handleClickObject(button)}
                                      >${button.name}</a
                                  >`
                              )
                            : nothing}
                    </div>
                    ${this.renderInventory()}
                    <div class="hp">
                        ${map(range(this.hp ?? 0), () => html`<img src="/assets/img/ui/heart.png" draggable="false">`)}
                        ${map(range(10 - (this.hp ?? 10)), () => html`<img src="/assets/img/ui/heartempty.png" draggable="false">`)}
                    </div>
                </div>
            </div>
        `;
    }
    private renderAudio(): TemplateResult {
        return html`
            ${this.audio?.map((name:string) => html`<audio src="/assets/audio/rooms/${name}.mp3" ?autoplay=${true}> </audio>`)}
        `;
    }
}
