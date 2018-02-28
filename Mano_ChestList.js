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
 * @plugindesc 現在のマップの宝箱の情報を調べます
 * 
 * @param balloonId
 * @desc chestFlash()で使用するバルーンの番号です。
 * @type select
 * @option びっくり
 * @value 1
 * @option はてな
 * @value 2
 * @option 音符
 * @value 3
 * @option ハート
 * @value 4
 * @option 怒り
 * @value 5
 * @option 汗
 * @value 6
 * @option くしゃくしゃ
 * @value 7
 * @option 沈黙
 * @value 8
 * @option 電球
 * @value 9
 * @option Zzz
 * @value 10
 * @option ユーザー定義1
 * @value 11
 * @option ユーザー定義2
 * @value 12
 * @option ユーザー定義3
 * @value 13
 * @option ユーザー定義4
 * @value 14
 * @option ユーザー定義5
 * @value 15
 * @default 1
 * 
 * @param flashSound
 * @type file
 * @dir audio/se
 * @default Flash1
 * 
 * @param flashWait
 * @desc プラグインコマンド「ChestFlash」の時に
 * ウェイトするかを設定します
 * @type boolean
 * @default true
 * 
 * @param CountChest
 * @desc 簡易版盗賊の鼻を使うかを決めます
 * イベントコマンドを書くのが面倒という人向け
 * @type boolean
 * @default false
 * 
 * @param CountChestText
 * @desc 簡易版盗賊の鼻のメッセージです。
 * @default このあたりにはあと%1個、宝物があるようだ。
 * @parent CountChest
 * 
 * @param CountChestEmptyText
 * @desc 簡易版盗賊の鼻で、
 * アイテムが見つからなかった場合のメッセージ
 * @default このあたりの宝物はすべて手に入れたようだ。
 * @parent CountChest
 * 
 * 
 * 
 * @author しぐれん（魔のささやき）
 * @help
 * 宝箱扱いしたいイベントのメモ欄に<宝箱>あるいは<chest>と書いてください。
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
 * プラグインコマンド「ChestFlash」で、開けていない宝箱にバルーンが付きます
*/
/*~struct~CommonDefine:
 *  
 * @param enableSwitch
 * @desc 指定したスイッチがONの時だけ、呼びだしを行います。
 * ゲームの進行で機能が追加される場合を想定しています。
 * @type switch
 * 
 * @param symbol
 * @desc Input.isTriggered()の引数として使われます
 * 
 * @param text
 * @desc コマンド名称です
 * 
 * @param mandatory
 * @desc inputConfigの方で必須指定されたものとして扱います。
 * @type boolean
 * @default false
 * 
 * @param keycode
 * @desc キーボードの割り当てです
 * キーコードは各自調べてください
 * @type number
 * 
 * @param padButton
 * @desc ゲームパッドの割り当てです
 * カッコ内はツクールのデフォルトでの割り当てです
 * @type select
 * @default -1
 * @option non(割り当てなし)
 * @value -1
 * @type select
 * @option button6
 * @value 6
 * @option button7
 * @value 7
 * @option button8
 * @value 8
 * @option button9
 * @value 9
 * @option button10
 * @value 10
 * @option button11
 * @value 11
 * @option button0(ok/決定)
 * @value 0
 * @option button1(cancel/キャンセル)
 * @value 1
 * @option button2(shift/ダッシュ)
 * @value 2
 * @option button3(menu/メニュー)
 * @value 3
 * @option button4(pageup)
 * @value 4
 * @option button5(pagedown)
 * @value 5
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
 * @param oneButtonCountChestCall
 * @desc キーボードやゲームパッドから1ボタンで盗賊の鼻を起動します。
 * @type boolean
 * @on 機能を使う
 * @off 機能を使わない
 * @default false
 * 
 */
(function(){
'use strict'

function createCommonDefine(param){
    const obj =JSON.parse(param);
    return{
        mandatory:Boolean(obj.mandatory),
        text:String(obj.text),
        symbol:String(obj.symbol),
        enableSwitch:Number(obj.enableSwitch),
        keycode:String(obj.keycode),
        padButton:String(obj.padButton),
    };
}

function createCountChestSetting(params){
    if(params.CountChest!=='true'){
        return null;
    }
    return {
        countChestEmptyText:String(params.CountChestEmptyText),
        inputDefine :createCommonDefine(params.CountChestinputSetting),
    };
}


const setting=(function(){
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
        },
        flashWait:(params.flashWait==='true'),
        countChestText:String(params.CountChestText),
        countChestEmptyText:String(params.CountChestEmptyText),
        countChest:createCountChestSetting(params),
    };
    return result;
})();



//const setting =createSetting();


const KEYSYMBOL_CHESTCOUNT ='ChestCount';

/**
 * @param {[]} array
 * @param {Function } func
 */
function countIf(array,func){
    var count =0;
    const len =array.length;
    for (var index = 0; index < len; index++) {
        var elem =array[index];

        if(elem&& func( elem )){
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
    return  _finalPage(this) &&this.isChest();
};
Game_Event.prototype.isClosedChest =function(){
    return !_finalPage(this) &&this.isChest();
};

Game_Map.prototype.countOpendChest =function(){
    return countIf(this._events,function(event){
        return event.isOpendChest();
    });
};
Game_Map.prototype.countClosedChest =function(){
    return countIf(this._events,function(event){
        return event.isClosedChest();
    });
};
Game_Map.prototype.countChest =function(){
    return countIf(this._events,function(event){
        return event.isChest();
    });
};
/**
 * @return {Game_Event} 最後にバルーンを出したイベント
 */
Game_Map.prototype.chestFlash =function(){
    const events = this.events();
    var lastEvent=null;
    events.forEach(function(event){
        if(event){
            if(event.chestFlash()){
                lastEvent =event;
            }
        }
    });
    if(lastEvent){
        AudioManager.playSe(setting.flashSound);
    }
    return lastEvent;
};

Game_Map.prototype.showChestCountMessage =function(){
    const count = this.countClosedChest();
    if( count >0  ){
        $gameMessage.add(setting.countChestText.format(count));
    }else{
        $gameMessage.add(setting.countChestEmptyText);
    }
};

Game_Interpreter.prototype.chestFlash=function(){
    const event = $gameMap.chestFlash();
    if(setting.flashWait && !!event ){
        this._character =event;
        this.setWaitMode('balloon');
    }
};

const Game_Interpreter_pluginCommand =Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand =function(command, args){
    if(command ==='ChestFlash'){
        this.chestFlash();
        return;
    }
    if(command ==='CountChest'){
        $gameMap.showChestCountMessage()
        return;
    }
    Game_Interpreter_pluginCommand.apply(this,arguments);
};

})();
