import * as PIXI from 'pixi.js';
import { DisplayObject, Sprite } from 'pixi.js';
import { GameApplication } from './GameApplication';
import { ReelsContainer } from './ReelContainer';
export class Reel {
    public container: PIXI.Container;
    public reelSymbolsTextures: Array<PIXI.Texture>;
    public reelSymbolsSprites: Array<PIXI.Sprite>;
    private bounceCount: number = 15;
    public shouldstop: boolean = false;
    public bounced: boolean = false;
    private gameapp: GameApplication;

    constructor(position: number) {
        this.reelSymbolsSprites = [];
        this.container = new PIXI.Container();
        this.reelSymbolsTextures = [
            PIXI.Texture.from('./assets/images/Symbol_1.png'),
            PIXI.Texture.from('./assets/images/Symbol_2.png'),
            PIXI.Texture.from('./assets/images/Symbol_3.png'),
            PIXI.Texture.from('./assets/images/Symbol_4.png'),
            PIXI.Texture.from('./assets/images/Symbol_5.png'),
            PIXI.Texture.from('./assets/images/Symbol_6.png'),
            PIXI.Texture.from('./assets/images/Symbol_7.png'),
            PIXI.Texture.from('./assets/images/Symbol_8.png')
        ];
        this.createReel(position);
    }
    private createReel(position: number) {
        const reelWidth: number = 20;
        const offset: number = 10;
        const rows: number = 3;
        this.container.x = position * reelWidth;
        for (let i = 0; i < rows + 1; i++) {
            const symbol = new PIXI.Sprite(this.reelSymbolsTextures[Math.floor(Math.random() * this.reelSymbolsTextures.length)]);
            symbol.width = 75;
            symbol.height = 75;
            symbol.x = position * symbol.width;
            symbol.y = ((symbol.height) * i + offset);
            this.reelSymbolsSprites.push(symbol);
            this.container.addChild(symbol);

        }
    }
    public createSymbol(x: number, y: number, symbol2: DisplayObject, speed: number) {
        const symbol = new PIXI.Sprite(this.reelSymbolsTextures[Math.floor(Math.random() * this.reelSymbolsTextures.length)]);
        symbol.width = 75;
        symbol.height = 75;
        symbol.x = x;
        symbol.y = y;
        this.reelSymbolsSprites.pop();
        this.reelSymbolsSprites.splice(0, 0, symbol);
        this.container.addChildAt(symbol, 0);
        symbol2.y += speed;

    }
    public update() {
        let speed: number = 20;
        let hitbottom: boolean = false;


        for (let i = this.reelSymbolsSprites.length - 1; i >= 0; i--) {
            let symbol = this.reelSymbolsSprites[i];
            new PIXI.filters.BlurFilter(100);

            if (symbol.y + speed >= (GameApplication.STAGE_HEIGHT / 2 + GameApplication.STAGE_HEIGHT / 2.5) / 2 + 42) {
                hitbottom = true;
                symbol.y = 10;
            } else {
                symbol.y += speed;
                symbol.filters = [new PIXI.filters.BlurFilter(0.8)]
            }


            if (i == this.reelSymbolsSprites.length - 1 && hitbottom) {
                this.container.removeChildAt(i);

                this.createSymbol(symbol.x, symbol.y, this.container.getChildAt(i - 1), speed);
                if (this.shouldstop) {
                    for (let j = 0; j < this.reelSymbolsSprites.length; j++) {
                        this.reelSymbolsSprites[j].filters = [];
                        this.reelSymbolsSprites[j].y = 10 + 15 + (75 * j);
                    }
                    GameApplication.getApp().ticker.remove(this.update, this);
                    GameApplication.getApp().ticker.add(this.bounceEffect, this);
                    this.container.removeAllListeners();
                    return;
                }
            }
        }
    }
    private bounceEffect() {
        this.bounceCount--;
        this.reelSymbolsSprites[0].y -= 1;
        this.reelSymbolsSprites[1].y -= 1;
        this.reelSymbolsSprites[2].y -= 1;
        this.reelSymbolsSprites[3].y -= 1;
        if (this.bounceCount == 0) {
            GameApplication.getApp().ticker.remove(this.bounceEffect, this);
            this.container.interactive = false;
            this.bounceCount = 15;
        }
    }
    public addListenerClick() {
        this.container.interactive = true;
        this.container.addListener('click', () => {
            this.container.removeAllListeners();

            this.shouldstop = true;
            ReelsContainer.clickCounter++;
        })
    }
}