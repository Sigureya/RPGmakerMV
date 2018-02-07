

 //=============================================================================
// Mano_XorShift.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
// ----------------------------------------------------------------------------
//=============================================================================


/*:
 * @author しぐれん
 * @plugindesc XorShiftによる乱数生成を行います。
 * 乱数エンジンがセーブされるため、リセットしても同じ結果になります。
 *
 * @param list
 * @type struct<RandomEngine>[]
 * 
 * @help
 * プラグインパラメータで、乱数エンジンを作成して使います。
 * プラグインコマンド「XorRand 変数番号 エンジン名」で動かします。
 * 名前付きのエンジンは、セーブデータに含まれます。
 * 名前を省略した場合、デフォルトのエンジンが使用されます。
 * 
 * ■使い方
 * 以下の方法で乱数を取得します。
 * 
 * 
 * ・イベントコマンド「変数の操作」を使う方法
 * スクリプトで以下の記述
 * $gameSystem.XorRandom("乱数エンジンの名前",最小値,最大値);
 * 
 * ・プラグインコマンドを使う方法
 * XorRandom 代入先の変数番号 乱数エンジンの名前 最小値 最大値
 * 
 * ■更新履歴
 * 2018/02/07 ver1.0　公開
*/
/*~struct~RandomEngine:
 * @param name
 * @desc 乱数の名前です。
 * 異なる名前の乱数は、それぞれ独立した状態を持ちます。
 * @type string
 * 
 * @param seed
 * @desc 初期シードです。
 * @type number
 * @default 13331639
 */

function Mano_XorShift(){
    this.initialize.apply(this,arguments);
}
Mano_XorShift.prototype.initialize =function(seed){
    this.x = 16195942;
    this.y = 41209827;
    this.z = 82044279;
    this.w = seed || 16178681;
};

Mano_XorShift.prototype. next=function() {
    var t= this.x ^ (this.x << 11);
    this.x = this.y; this.y = this.z; this.z = this.w;
    return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8)); 
};
Mano_XorShift.prototype.nextInt =function(min, max) {
    var r = Math.abs(this.next());
    return min + (r % (max + 1 - min));
  };
(function(){
    'use strict'


const Game_System_initialize =Game_System.prototype.initialize;
Game_System.prototype.initialize =function(){
    Game_System_initialize.call(this);
    this.makeXorShiftEngine_MA();
};

/**
 * @param {String} name 
 * @param {Number} seed 
 */
Game_System.prototype.addXorShiftEngine_MA =function(name,seed){
    if(name){
        const rand = new Mano_XorShift(seed);
        this._XorRandom[name]=rand;    
    }
};
Game_System.prototype.makeXorShiftEngine_MA =function(){
    const param =PluginManager.parameters("Mano_XorShift");
    const List = JSON.parse( param.list );
    this._XorRandom ={};
    for (const paramText of List) {
        const data =JSON.parse(paramText);
        this.addXorShiftEngine_MA(data.name,Number(data.seed));
    }
};
/**
 * @param {String} name 
 * @param {Number} min 
 * @param {Number} max 
 */
Game_System.prototype.XorRandom =function(name,min,max){
    const rand = this._XorRandom[name];
    if(isNaN(min)){
        min =0;
    }
    if(isNaN(max)){
        max =Number.MAX_SAFE_INTEGER;
    }
    if(rand){
        return rand.nextInt(min,max);
    }
    return 0;
};
const zz_MA_DataManager_extractSaveContents =DataManager.extractSaveContents;
DataManager.extractSaveContents =function(){
    zz_MA_DataManager_extractSaveContents.apply(this,arguments);
    if(!$gameSystem._XorRandom){
        $gameSystem.makeXorShiftEngine_MA();
    }
};
const Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if(command ==="XorRandom"){
        const valueId = Number(args[0]);
        const name = args[1];
        const min = args[2] ? Number(args[2]): undefined;
        const max = args[3] ? Number(args[3]): undefined;
        $gameVariables.setValue(valueId,$gameSystem.XorRandom( name,min,max ));
        return;
    }
    Game_Interpreter_pluginCommand.call(this,command,args);
};


})();