import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication';

export class MockWallet extends PIXI.Container {
    public sprite: PIXI.Sprite;
    private moneyText: PIXI.Text;
    private winningsText: PIXI.Text;
    public moneyNumber: number;
    private winningsNumber: number;
    private betNumber: number;
    constructor() {
        super();
        this.init();
    }
    private init() {
        this.moneyNumber = 100;
        this.winningsNumber = 0;
        this.betNumber = 5;
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.lineStyle({ width: 2, color: 0xffffff });
        gfx.beginFill(0x000000);
        gfx.drawRect(0, 0, 150, 100);
        gfx.endFill();
        let texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.y = GameApplication.STAGE_HEIGHT - this.sprite.height;
        this.createText();

    }
    private createText() {

        this.moneyText = new PIXI.Text(this.moneyNumber.toString(10), {
            fontSize: 20,
            fill: 0xFFF01F,
        })
        this.moneyText.resolution = 2;
        this.moneyText.anchor.set(0.5)
        this.moneyText.x = this.sprite.width / 1.2;
        this.moneyText.y = this.sprite.height / 4;

        let moneyLabel: PIXI.Text = new PIXI.Text('Money: ', {
            fontSize: 20,
            fill: 0xFFF01F,
        });
        moneyLabel.resolution = 2;
        moneyLabel.anchor.set(0.5)
        moneyLabel.x = this.sprite.width / 2.1;
        moneyLabel.y = this.sprite.height / 4;







        let betNumber = new PIXI.Text(this.betNumber.toString(10), {
            fontSize: 20,
            fill: 0xFFF01F,
        })
        betNumber.resolution = 2;
        betNumber.anchor.set(0.5)
        betNumber.x = this.sprite.width / 1.2;
        betNumber.y = this.sprite.height / 4 + this.moneyText.y;

        let betLabel: PIXI.Text = new PIXI.Text('Bet: ', {
            fontSize: 20,
            fill: 0xFFF01F,
        });
        betLabel.resolution = 2;
        betLabel.anchor.set(0.5)
        betLabel.x = this.sprite.width / 1.75;
        betLabel.y = this.sprite.height / 4 + moneyLabel.y;



        let WinningsLabel: PIXI.Text = new PIXI.Text('Winnings: ', {
            fontSize: 20,
            fill: 0xFFF01F,
        });
        WinningsLabel.resolution = 2;
        WinningsLabel.anchor.set(0.5)
        WinningsLabel.x = this.sprite.width / 2.5;
        WinningsLabel.y = this.sprite.height / 4 + betLabel.y;

        this.winningsText = new PIXI.Text('0', {
            fontSize: 20,
            fill: 0xFFF01F,
        })
        this.winningsText.resolution = 2;
        this.winningsText.anchor.set(0.5)
        this.winningsText.x = this.sprite.width / 1.2;
        this.winningsText.y = this.sprite.height / 4 + betNumber.y;

        this.sprite.addChild(moneyLabel);
        this.sprite.addChild(this.moneyText);
        this.sprite.addChild(betLabel);
        this.sprite.addChild(betNumber);
        this.sprite.addChild(WinningsLabel);
        this.sprite.addChild(this.winningsText);
    }
    public decrementMoney() {
        this.moneyNumber -= this.betNumber;
        this.moneyText.text = this.moneyNumber.toString(10);
    }
    public incrementMoney() {
        this.moneyNumber += this.betNumber * 2;
        this.moneyText.text = this.moneyNumber.toString(10);
        this.winningsNumber += this.betNumber * 2;
        this.winningsText.text = this.winningsNumber.toString(10);
    }
}