 //=============================================================================
// Mano_ItemPocket_DQlikeMode.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================
/*:
 * @author しぐれん（魔のささやき）
 * @plugindesc アイテム個別所持プラグインをDQ風に改造します。
 * 
 * 
 * @help
 * このプラグインはMano_ItemPocketの拡張プラグインです。
 * 単体では動きません。
 * 
 * 
*/

(function(global){
    'use strict'

    if(!global.Mano_ItemPocket){
        const Scene_Boot_start= Scene_Boot.prototype.start;
        Scene_Boot.prototype.start =function(){
            throw Error(
                'Mano_ItemPocket_DQlikeModeを使用する場合、これより上にMano_itemPocketを入れてください'
            );
        }
    }
    const pocketFunction = global.Mano_ItemPocket.pocketFunction;
    const PocketIndex = global.Mano_ItemPocket.PocketIndex;
    const MA_itemPocket = global.Mano_ItemPocket.MA_itemPocket;
    PocketIndex.prototype.addItem =function(item,amount){
        for(var i=0;i < amount; ++i){
            this._data.push(MA_itemPocket.newItem(item,1));
        }
    };
    PocketIndex.prototype.capacity =function(itemId){
        return this.vacant();
    };
    const Window_Pocket =global.Mano_ItemPocket.Window_Pocket;
    Window_Pocket.prototype.amount =function(){
        return this.pocket().amountSumOfItem(this.item());
    };
    Window_Pocket.prototype.drawItemAmount =function(){};

    MA_itemPocket.prototype.releaseItem =function(index,amount){
        const item = this.itemObject(index);
        var released = 0;
        const len =this.length();
        for(var i=0;i <len;i+=1){
            if(released>=amount){
                break;
            }
            if(this._data[i].id ===item.id){
                var releaseCount=Math.min (this._data[i].amount,amount);
                released +=releaseCount;
                this._data[i].amount -=releaseCount;;
            }
        }
        $gameParty.gainItem(item,released);
    };


    //    global.Mano_ItemPocket.PocketIndex.prototype.
})(this);
