import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication';
import { ReelsContainer } from './ReelContainer';
import { WinScreen } from './WinScreen';
import { MockWallet } from './MockWallet';

export class Game extends PIXI.Container {

    public reelsContainer: ReelsContainer;
    public button: PIXI.Sprite;
    private bgSprite: PIXI.Sprite;
    public static gameWon: Boolean = false;
    private touchstartX: number;
    private touchstartY: number;
    private touchendX: number;
    private touchendY: number;
    private checkWin: NodeJS.Timeout;
    private winScreen: WinScreen;
    private mockWallet: MockWallet;

    constructor() {
        super();
        this.init();
    }
    private init() {
        this.createBackground();
        this.createReels();
        this.createButton();
        this.createMasks();
        this.createWinScreen();
        this.createMockWallet();

    }
    private createBackground() {

        this.bgSprite = PIXI.Sprite.from('./assets/images/SlotFrame.png');
        this.bgSprite.width = GameApplication.STAGE_WIDTH;
        this.bgSprite.height = GameApplication.STAGE_HEIGHT / 2.5;
        this.bgSprite.y = GameApplication.STAGE_HEIGHT / 2 - this.bgSprite.height / 2;
        this.bgSprite.interactive = true;
        this.addChild(this.bgSprite);

    }
    private createButton() {
        this.button = PIXI.Sprite.from('./assets/images/SpinButton_Normal.png');
        this.button.width = 75;
        this.button.height = 75;
        this.button.y = GameApplication.STAGE_HEIGHT - this.button.height;
        this.button.x = GameApplication.STAGE_WIDTH - this.button.width;
        this.button.interactive = true;
        this.addChild(this.button);
        this.button.on('click', () => {
            this.mockWallet.decrementMoney();
            this.winScreen.hide();
            this.reelsContainer.spinReels();
            this.button.texture = PIXI.Texture.from('./assets/images/SpinButton_Active.png');
            this.button.interactive = false;
            this.checkWin = setTimeout(() => {
                if (this.reelsContainer.isSpinning) {
                    this.reelsContainer.stopReels('left to right');
                    setTimeout(() => {
                        this.spinResult();
                    }, 1200);
                }
            }, 2000);
        })

    }
    public spinResult() {


        if (Game.gameWon) {
            this.winScreen.show();
            this.mockWallet.incrementMoney();
        } else if (!Game.gameWon) {
        }
        if (this.mockWallet.moneyNumber > 0) {
            this.button.texture = PIXI.Texture.from('./assets/images/SpinButton_Normal.png');
            this.button.interactive = true;
        }


    }
    private createReels() {
        this.reelsContainer = new ReelsContainer();
        document.addEventListener('mousedown', (e) => {
            this.touchstartX = e.pageX;
            this.touchstartY = e.pageY;
        })
        document.addEventListener('click', (e) => {
            this.touchendX = e.pageX;
            this.touchendY = e.pageY;
            if (ReelsContainer.clickCounter == 5 && this.reelsContainer.isSpinning) {
                clearTimeout(this.checkWin);
                this.reelsContainer.isSpinning = false;
                this.reelsContainer.stopReels('all-clicked');
                setTimeout(() => {
                    this.spinResult();
                }, 300);
                ReelsContainer.clickCounter = 0;
            }
            if ((this.touchstartY / 2 >= this.reelsContainer.container.y && this.touchstartY / 2 <= this.reelsContainer.container.height + this.reelsContainer.container.y && this.touchendY / 2 >= this.reelsContainer.container.y && this.touchendY / 2 <= this.reelsContainer.container.height + this.reelsContainer.container.y) && this.reelsContainer.isSpinning) {
                if (this.touchendX - this.touchstartX >= 300) {
                    this.reelsContainer.stopReels('left to right');

                    clearTimeout(this.checkWin);

                    setTimeout(() => {

                        this.spinResult();
                    }, 1200);

                }
                if (this.touchendX - this.touchstartX <= -300) {
                    this.reelsContainer.stopReels('right to left');

                    clearTimeout(this.checkWin);
                    setTimeout(() => {

                        this.spinResult();
                    }, 1200);

                }
                else {
                    return;
                }


            }
        })
        this.addChild(this.reelsContainer.container);
    }
    private createMasks() {
        let gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x989c99)
        gfx.drawRect(0, 0, 100, 73);
        gfx.endFill();
        let texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        let bgmaskTop: PIXI.Sprite = new PIXI.Sprite(texture);
        bgmaskTop.y = GameApplication.STAGE_HEIGHT / 2 - GameApplication.STAGE_HEIGHT / 2.5 / 2 - 70;
        bgmaskTop.width = GameApplication.STAGE_WIDTH;
        let bgmaskBottom: PIXI.Sprite = new PIXI.Sprite(texture);
        bgmaskBottom.width = GameApplication.STAGE_WIDTH;
        bgmaskBottom.y = GameApplication.STAGE_HEIGHT / 2 + GameApplication.STAGE_HEIGHT / 2.5 / 2 - 3;
        bgmaskBottom.height = 100;
        this.addChild(bgmaskTop);
        this.addChild(bgmaskBottom);
    }

    private createWinScreen() {
        this.winScreen = new WinScreen();
        this.addChild(this.winScreen.sprite);
    }


    private createMockWallet() {
        this.mockWallet = new MockWallet();
        this.addChild(this.mockWallet.sprite);
    }


}