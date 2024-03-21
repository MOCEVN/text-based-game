import { ActionReference, GameObjectReference, GameState } from "@shared/types";
import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { getState, performAction } from "../services/routeService";
import { map } from "lit/directives/map.js";
import { range } from "lit/directives/range.js";
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

        .content {
            margin-top: 5px;
            padding: 10px;
            padding-left: 30%;
            background-color: #202020e0;
            background: linear-gradient(to right, #00000000, #141410f0 30% 90%, #141410ff);
            box-shadow: #202020ff 10px 0;
            grid-column: 2/3;
            grid-row: 2/3;
            z-index: 2;
        }

        .content p {
            margin: 0 0 10px 0;
        }

        .content p:last-of-type {
            margin: 0;
        }

        .footer {
            border-radius: 5px 0 0 0;
            background-color: #241f3e;
            border: 0 0 0 solid #141410;
            margin-top: 5px;
            display: flex;
            grid-column: 3/4;
            z-index: 2;
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
    private contentText?: string[];
    private actionButtons?: ActionReference[];
    private gameObjectButtons?: GameObjectReference[];
    private hp?: number;

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
        this.contentText = state.text;
        this.actionButtons = state.actions;
        this.gameObjectButtons = state.objects;
        this.hp = state.hp;

        this.selectedActionButton = undefined;
        this.selectedGameObjectButtons.clear();

        this.requestUpdate();
    }

    private async handleClickAction(button: ActionReference): Promise<void> {
        if (button.needsObject) {
            this.selectedActionButton = button;
            this.selectedGameObjectButtons.clear();

            this.requestUpdate();
        } else {
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

    protected render(): TemplateResult {
        return html`
            <div class="game">
                ${this.renderTitle()} ${this.renderHeader()} ${this.renderContent()} ${this.renderFooter()}
            </div>
        `;
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
                    ${this.roomImages?.map((url) => html`<img src="/assets/img/rooms/${url}.png" />`)}
                </div>
            `;
        }

        return html`${nothing}`;
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
                    <div class="hp">
                        ${map(range(this.hp ?? 0), () => html`<img src="/assets/img/rooms/heart.png" draggable="false">`)}
                    </div>
                </div>
            </div>
        `;
    }
}
