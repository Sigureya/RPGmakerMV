//=============================================================================
// Mano_ChestList.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:
 * @plugindesc 現在のマップの宝箱の情報を調べます。
 * 
 * @param balloonId
 * @desc chestFlash()で使用するバルーンです。
 * @type number
 * @default 1
 * 
 * @param flashSound
 * @type file
 * @dir audio/se
 * @default Flash1
 * 
 * @param chestSelfSwitch
 * @desc  
 * @author しぐれん（魔のささやき）
 * @help
 * 宝箱扱いしたいイベントに<宝箱>あるいは<chest>と書いてください。
 * 開いているかどうかは、イベントページが最も大きいページかどうかで判定します。
 * グラフィック無しでも宝箱にできます。
 * 
 * 変数の操作（スクリプト）に以下内容を書くことで、データを取得します。
 * 
 * $gameMap.countChest()
 * 全ての宝箱の数
 * $gameMap.countOpendChest()
 * 開いている宝箱の数
 * $gameMap.countClosedChest()
 * 開けていない宝箱の数
 * 
 * 以下はイベントコマンド「スクリプト」で実行できる内容です。
 * $gameMap.chestFlash()
 * 画面内にある宝箱で、開けていないものをすべて光らせます。
 * 光り方ですが、バルーンの再生で行います。
 * 
*/

/**
 * TODO
 * isChestで、宝箱であるかどうかをチェック
 * レミラーマは、該当するイベントに対してのアニメーション再生で
 * 
 * 指定要素をカウントする関数で、盗賊の鼻
 * タグを切り替えることで、話しかけた重要人物リスト
 * 
 * ■countSelfSwitch(マップID)について
 * 他のマップを調べられるレミラーマです。
 * マップに親子関係がある場合、このマップを再起的に調べます。
 * この関数を使う場合、全てのマップで宝箱に使うセルフスイッチが同じ番号である必要があります。
 * 宝箱以外で指定したセルフスイッチを使うと、正常に動作しません。
 * イベントの簡単作成で宝箱を作成すると、Aが割り当てられるため、Aにすることをお勧めします。
 * 第2引数に'B','C','D'など任意のセルフスイッチに割り当てられるキーを指定することで、
 * 他のセルフスイッチも調べられます。
 * 
 */
(function(){
'use strict'
function createSetting(){
    const params = PluginManager.parameters('Mano_ChestList');
    const result ={
        chestTag:'chest',
        chestTagJP:'宝箱',
        balloonId:Number(params.balloonId),
        flashSound:{
            name:String(params.flashSound),
            pan:0,
            pitch:100,
            volume:90,
        }
    };
    return result;
}
const setting =createSetting();

/**
 * @param {[]} array
 * @param {Function } func
 */
function countIf(array,func){
    var count =0;
    for (var index = 0; index < array.length; index++) {
        if(func( array[index] )){
            ++count;
        }
    }
    return count;
}

Game_Event.prototype.isChest=function(){
    const meta =this.event().meta;
    return meta.hasOwnProperty(setting.chestTag) || meta.hasOwnProperty(setting.chestTagJP);
};
Game_Event.prototype.chestFlash =function(){
    const flash =this.isClosedChest();
    if(flash){
        this.requestBalloon(setting.balloonId);
    }
    return flash;
};

/**
 * @param {Game_Event} event 
 */
function _finalPage(event){
   return event._pageIndex ===event.event().pages.length-1
}
Game_Event.prototype.isOpendChest=function(){
//    const e = this.event();
    return  _finalPage(this) &&this.isChest();
};
Game_Event.prototype.isClosedChest =function(){
    return !_finalPage(this) &&this.isChest();
};

Game_Map.prototype.countOpendChest =function(){
    return countIf(this._events,function(event){
        return event && event.isOpendChest();
    });
};
Game_Map.prototype.countClosedChest =function(){
    return countIf(this._events,function(event){
        return event && event.isClosedChest();
    });
};
Game_Map.prototype.countChest =function(){
    return countIf(this._events,function(event){
        return event && event.isChest();
    });
};

Game_Map.prototype.chestFlash =function(){
    const events = this.events();
    var flashed =false;
    events.forEach(function(event){
        if(event){
            flashed =event.chestFlash() || flashed;
        }
    });
    flashed;
    if(flashed){
        AudioManager.playSe(setting.flashSound);
    }
    return flashed;
};

const Game_Interpreter_pluginCommand =Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand =function(command, args){
    if(command ==='ChestFlash'){
        $gameMap.chestFlash();
    }
    Game_Interpreter_pluginCommand.apply(this,arguments);
};

})();