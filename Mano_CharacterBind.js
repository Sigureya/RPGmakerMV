//=============================================================================
// Mano_CaracterBind.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 0.9.0 2017/04/13 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc マップ上でのキャラクターを対象とする処理をジャックします。
 * 代入した数値のキャラクターを操作対象にします。
 * 
 * @author しぐれん（魔のささやき）
 *
 * @help
 * プラグインコマンドで有効化します。
 * Game_Interpreter.characterの挙動を書き換えて制御しています。
 * 
 * CharacterBind event イベント番号
 * -1はプレイヤーです。
 * 記述例 CharacterBind 1
 * 
 * CharaceterBind 変数番号 V
 * 指定した変数の数値を読み取り、キャラクターを固定します。
 * 記述例 CharaceterBind 20 V
 * 
 * ver 2.0(2020/05/02)
 * 変数で指定できるように改良。
 * var 1.0(2017/05/14) 公開
 */

(function () {
    'use strict';

const zz_Game_Interpreter_prototype_character =Game_Interpreter.prototype.character;
Game_Interpreter.prototype.character =function(param){
    if(!isNaN(  this.bindedChar_manosasayaki)){
        return zz_Game_Interpreter_prototype_character.call(this,this.bindedChar_manosasayaki);
    }
    return zz_Game_Interpreter_prototype_character.apply(this,arguments);
}
Game_Interpreter.prototype.bindCharacter =function(param){
    this.bindedChar_manosasayaki =param;
};

function getTargetEventId(value,type){
    if(type ==="V"){
        return $gameVariables.value(value);
    }
    return value;
}

const zz_Game_Interpreter_prototype_pluginCommand =Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if(command == "CharacterBind"){
        const targetEventId = getTargetEventId(args[0],Number(  args[1]));
        this.bindCharacter(targetEventId);
        return;
    }
    zz_Game_Interpreter_prototype_pluginCommand.apply(this,arguments);
};

})();
