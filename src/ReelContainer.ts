import * as PIXI from 'pixi.js';
import { Reel } from './Reel';
import { GameApplication } from './GameApplication';
import { Game } from './Game';

export class ReelsContainer {
    public reels: Array<Reel> = [];
    public container: PIXI.Container;
    public isSpinning: boolean = false;
    public static clickCounter: number = 0;

    private game: Game;

    constructor() {
        this.reels = [];
        const REEL_OFFSET_LEFT = 20;
        const NUMBER_OF_REELS = 5;
        this.container = new PIXI.Container();
        this.container.y = (GameApplication.STAGE_HEIGHT / 2 - ((GameApplication.STAGE_HEIGHT / 2.5) / 2) - 75);


        for (let i = 0; i < NUMBER_OF_REELS; i++) {
            const reel = new Reel(i);
            this.reels.push(reel);
            this.container.addChild(reel.container);
        }
        this.container.x = REEL_OFFSET_LEFT;

    }
    public spinReels() {
        ReelsContainer.clickCounter = 0;
        let multi = 0;
        this.reels.forEach(reel => {
            setTimeout(() => {
                reel.shouldstop = false;
                GameApplication.getApp().ticker.add(reel.update, reel);
                reel.addListenerClick();

            }, 200 * multi);
            multi++;


        });
        setTimeout(() => {
            this.isSpinning = true;
        }, (200 * multi));


    }

    public stopReels(side: string) {
        if (side === 'left to right') {
            let multi = 0;
            this.isSpinning = false;
            this.reels.forEach(reel => {
                setTimeout(() => {
                    reel.shouldstop = true;
                }, 200 * multi);
                multi++;
            });
            setTimeout(() => {
                this.checkforWin();
            }, 1000);
        }
        else if (side === 'right to left') {
            let multi = 4;
            this.isSpinning = false;
            this.reels.forEach(reel => {
                setTimeout(() => {
                    reel.shouldstop = true;
                }, 200 * multi);
                multi--;
            });
            setTimeout(() => {
                this.checkforWin();
            }, 1000);

        } else if (side == 'all-clicked') {
            this.checkforWin();
        }
        else {
            return;
        }


    }

    public checkforWin() {
        for (let i = 0; i < this.reels[0].reelSymbolsTextures.length; i++) {
            // Longer version
            // if ((this.reels[0].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i] && this.reels[1].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i] && this.reels[2].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i])
            //     ||
            //     (this.reels[1].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i] && this.reels[2].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i] && this.reels[3].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i])
            //     ||
            //     (this.reels[2].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i] && this.reels[3].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i] && this.reels[4].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i]))
            // Scrambled but shorter
            if (((this.reels[1].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i] && (this.reels[0].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i] || this.reels[3].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i]))
                ||
                (this.reels[3].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i] && this.reels[4].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i]))
                &&
                this.reels[2].reelSymbolsSprites[2].texture == this.reels[0].reelSymbolsTextures[i]) {
                Game.gameWon = true;
                return;
            }



        }
        Game.gameWon = false;
        return;
    }

}