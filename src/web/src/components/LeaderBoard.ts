import { LitElement, TemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLeaderBoard } from "../services/routeService";
import { score } from "@shared/types";


@customElement("leader-board")
export class LeaderBoard extends LitElement {
    public static styles = css`
        .container {
            display: flex;
            flex-direction: column;
            align-content: center;
            flex-wrap: wrap;
        }
        .content {
            margin-top: 5px;
            padding: 30px;
            max-width: 1500px;
            min-width: 600px;
        }

        .content div {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
        }

        .content p {
            margin: 0 0 10px 0;
            text-align: center;
        }

    `;
    public connectedCallback(): void {
        super.connectedCallback();
        void this.refresh();
    }

    private async refresh(): Promise<void> {
        this.scores = await getLeaderBoard();
        this.requestUpdate();
    }

    private scores?: score[];

    protected render(): TemplateResult {
        return html`
            <div class="container">
                <div class="content">
                    <div>
                        <p>Name</p>
                        <p>HP</p>
                        <p>Time</p>
                    </div>
                </div>
                <div class="content">
                    ${this.scores?.map((val) => html`
                    <div>
                        <p>${val.name}</p>
                        <p>${val.hp}</p>
                        <p>${new Date(val.time).getUTCMinutes()} min, ${new Date(val.time).getUTCSeconds()} sec</p>
                    </div>
                    `)}
                </div>
            </div>
        `;
    }
}