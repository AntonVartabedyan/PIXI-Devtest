import * as PIXI from 'pixi.js';
import { Game } from './Game';

export class GameApplication extends PIXI.Application {

    public static STAGE_WIDTH: number = 500;
    public static STAGE_HEIGHT: number = 600;

    public static app: GameApplication;
    private game: Game;


    constructor() {
        super(GameApplication.getAppOptions());

        this.init();
    }

    public static getApp(): GameApplication {
        return this.app;
    }

    private init() {

        GameApplication.app = this;
        this.game = new Game();
        this.stage.addChild(this.game);
        window.onload = () => {
            const gameContainer: HTMLCanvasElement = document.getElementById("gameContainer") as HTMLCanvasElement;
            gameContainer.appendChild(this.view);

            this.resizeCanvas();

            this.view.style.position = 'absolute';
            this.view.style.left = '50%';
            this.view.style.top = '50%';
            this.view.style.transform = 'translate3d( -50%, -50%, 0 )';
        };

    }

    private static getAppOptions() {
        return {
            backgroundColor: 0x989c99,
            width: GameApplication.STAGE_WIDTH,
            height: GameApplication.STAGE_HEIGHT,
        }
    }

    private resizeCanvas(): void {
        this.onResize();

        window.addEventListener('resize', this.onResize);
    }

    private onResize() {
        this.renderer.resize(GameApplication.STAGE_WIDTH, GameApplication.STAGE_HEIGHT);
    }

}