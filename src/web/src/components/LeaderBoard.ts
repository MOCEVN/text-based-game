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
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        .content p {
            margin: 0 0 10px 0;
            text-align: center;
        }

    `;
    public connectedCallback(): void {
        super.connectedCallback();
        setInterval(() => {void this.refresh();},10000);
        void this.refresh();
    }

    private async refresh(): Promise<void> {
        console.log("Fetching leaderboard");
        const newScores: score[] = await getLeaderBoard(100);
        if (JSON.stringify(newScores) !== JSON.stringify(this.scores)) {
            this.scores = newScores;
            this.requestUpdate();
            console.log("Leaderboard refreshed");
        }
    }

    private scores?: score[];

    protected render(): TemplateResult {
        return html`
            <div class="container">
                <div class="content">
                    <div>
                        <p>#</p>
                        <p>Name</p>
                        <p>HP</p>
                        <p>Time</p>
                    </div>
                </div>
                <div class="content">
                    ${this.scores?.map((val,idx) => {
                        const time: Date = new Date(val.time);
                        return html`
                            <div>
                                <p>${idx + 1}</p>
                                <p>${val.name}</p>
                                <p>${val.hp}</p>
                                <p>
                                    ${time.getUTCMinutes()} min, 
                                    ${time.getUTCSeconds()}.${time.getUTCMilliseconds().toString().padStart(3,"0")} sec
                                </p>
                            </div>
                        `;
                    })}
                </div>
            </div>
        `;
    }
}