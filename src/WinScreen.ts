import * as PIXI from "pixi.js";
import { GameApplication } from './GameApplication';
export class WinScreen extends PIXI.Container {
    public sprite: PIXI.Sprite;
    private timeoutID: NodeJS.Timeout;
    constructor() {
        super();
        this.init();
    }
    private init() {

        let gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.lineStyle({ width: 2, color: 0xffffff });
        gfx.beginFill(0x000000);
        gfx.drawRect(0, 0, 350, 150);
        gfx.endFill();

        let texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.alpha = 0.9;
        this.sprite.x = GameApplication.STAGE_WIDTH / 2 - this.sprite.width / 2;
        this.sprite.y = GameApplication.STAGE_HEIGHT / 2 - this.sprite.height / 2;
        this.sprite.visible = false;
        let winText: PIXI.Text = new PIXI.Text("You Win!", {
            fontSize: "24",
            fill: 0xFFF01F
        })

        winText.width = 250;
        winText.height = 75;
        winText.resolution = 10;
        winText.x = this.sprite.width / 2 - winText.width / 2;
        winText.y = this.sprite.height / 2 - winText.height / 2;
        this.sprite.addChild(winText);
    }
    public hide() {
        this.sprite.visible = false;
        clearTimeout(this.timeoutID);
    }
    public show() {
        this.sprite.visible = true;
        this.timeoutID = setTimeout(() => {
            this.sprite.visible = false;
        }, 3000);
    }
}