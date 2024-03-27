import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";
import { gameService } from "../services/gameService";

@customElement("mini-game")
export class MiniGame extends LitElement{
    public static styles = css`
        .container {
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        img {
            height: 40vh;
            width: 40vh;
            padding-top: 12vh;
            padding-bottom: 10vh;
            object-fit: contain;
            image-rendering: pixelated;
        }
        canvas {
            width: 100%;
            height: 40%;
        }
        p {
            font-size: 2em;
        }
    `;
    
    @query("#canvas")
    private _canvas!: HTMLCanvasElement;
    private _ctx!: CanvasRenderingContext2D;

    @state()
    private _gameStarted: boolean = false;

    @state()
    private _gameProgress: number = 0;

    private _startTime!: DOMHighResTimeStamp;

    private _barX: number = 0;
    private _barWidth: number = 0;
    private _pointerX: number = 0;
    private _keyPressed: boolean = false;

    public gameWon: boolean = false;

    public connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener("keydown", (e) => {
            if (e.key === " "){ // space bar
                if (!this._gameStarted) {
                    this._gameStarted = true;
                    void this.initialiseCanvas();
                } else {
                    this._keyPressed = true;    
                }
            }
        });
    }
    /**
     * Updates the values of the canvas.
     */
    private updateCanvasSize(): void {
        this._canvas.width = Math.floor(window.innerWidth * 0.7);
        this._canvas.height = 70;
        this._canvas.style.width = `${Math.floor(window.innerWidth * 0.7)}px`;
        this._canvas.style.height = "70px";
    }
    /**
     * Initialises the canvas and starts the animation.
     */
    private async initialiseCanvas(): Promise<void> {
        // The page has to be done with updating for the canvas to be found.
        await this.updateComplete;
        this.updateCanvasSize();
        window.addEventListener("resize",this.updateCanvasSize.bind(this));
        // Get the canvas rendering context.
        // This is used to draw on the canvas.
        const context: CanvasRenderingContext2D | null = this._canvas.getContext("2d");
        if (context) {
            this._ctx = context;
        }
        window.requestAnimationFrame(this.frame.bind(this));                
    }
    /**
     * Generates new random values for the green bar.
     */
    private generateBarValues(): void {
        const totalWidth: number = this._canvas.width;
        // The width of the green bar is between 10% and 20% of the total width
        this._barWidth = Math.floor(Math.random() * totalWidth * 0.1 + totalWidth * 0.1);
        const remainingWidth: number = totalWidth - this._barWidth;
        this._barX = Math.floor(Math.random() * remainingWidth);
    }
    /**
     * Draws the bar on the canvas with the values stored.
     */
    private drawFrame():void {
        this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height);
        this._ctx.fillStyle = "#303030";
        this._ctx.fillRect(0,10,this._canvas.width,50);
        this._ctx.fillStyle = "#30a030";
        this._ctx.fillRect(this._barX,10,this._barWidth, 50);
        this._ctx.fillStyle = "#f0f0f0";
        this._ctx.fillRect(this._pointerX - 1,0,3,70);
    }
    /**
     * Callback function for window animation frame.
     * @param timeStamp 
     * @returns void
     */
    private frame(timeStamp: DOMHighResTimeStamp): void {
        // At the start of the game the start time is undefined. 
        // In the first frame the start time will be set and values for the green bar will be generated.
        if (this._startTime === undefined) {
            this._startTime = timeStamp;
            this.generateBarValues();
        }
        // This is used for the position of the pointer.
        const totalTimeElapsed: number = timeStamp - this._startTime;
        // The pointer travels half of the bar per second.
        const distanceTraveled: number = totalTimeElapsed * this._canvas.width * 0.5 / 1000;
        
        // When the space bar is pressed.
        if (this._keyPressed){
            this._keyPressed = false;
            // If the pointer is on the green bar.
            if (this._barX < this._pointerX && this._pointerX < this._barX + this._barWidth) {
                this._gameProgress++;
            } else {
                this._gameProgress--;
            }
            this.generateBarValues();
        }
        // Calculate position of the pointer using the total time elapsed.
        if (Math.floor(distanceTraveled / this._canvas.width) % 2 === 1){
            this._pointerX = this._canvas.width - distanceTraveled % this._canvas.width;
        } else {
            this._pointerX = distanceTraveled % this._canvas.width;
        }

        if (this._gameProgress < 0) {
            gameService.dispatchEvent("minigame",{win:false});
            this.gameWon = false;
            return;
        }
        if (this._gameProgress >= 3) {
            gameService.dispatchEvent("minigame",{win:true});
            this.gameWon = true;
            return;
        }
        this.drawFrame();
        window.requestAnimationFrame(this.frame.bind(this));
    }

    protected render(): TemplateResult{
        return html`
            <div class="container">
                ${choose(this._gameProgress,[
                    [0,():TemplateResult => html`<img src="/assets/img/ui/heartfill1.png" draggable="false">`],
                    [1,():TemplateResult => html`<img src="/assets/img/ui/heartfill2.png" draggable="false">`],
                    [2,():TemplateResult => html`<img src="/assets/img/ui/heartfill3.png" draggable="false">`],
                    [3,():TemplateResult => html`<img src="/assets/img/ui/heart.png" draggable="false">`]
                ],(): TemplateResult => html`<img src="/assets/img/ui/heartempty.png" draggable="false">`)}
                ${this._gameStarted ?
                    html`<canvas id="canvas"></canvas>` :
                    html`<p>Press [space] to Start</p>`
                }
            </div>
        `;
    }
}