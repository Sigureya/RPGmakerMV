//=============================================================================
// Mano_StateProtection.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/06/03 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc 加減算によるステート耐性を実装します。
 * 耐性が100を超えた場合、無効化します。
 * @author しぐれん
 * 
 * @help
 * ステートの発生率の計算に以下の式を適用します。
 * 元々の発生率*(100-ステート防御力)/100
 * この式により、ステート防御力が100を超えると、ステートの発生を完全に無効化します。
 * 
 * <StateProtection[4]:50>
 * と書いた場合、ステートID4のステートが発生する確率を半分に抑えます。
 * 
 * <StateProtection[4]:50>と書いてある防具を二つ付けた場合、50+50で100となり完全に無効化します。
 * 
 * ステートに対する防御力はアクター・エネミー・防具などのメモ欄に記述します。
 * 
 * 耐性を貫通させたい場合、耐性を低下させるステートを作成して調整します。
 * 例：毒防御(100)の相手に毒貫通(50)を持つキャラで、相手の毒防御を50扱いで計算したい場合。
 * 毒のステートIDは4とする。
 * ステート・毒防御低下を作成し、メモに<StateProtection[4]:-50>と記述。
 * スキルの効果を以下のようにします。
 * ステートの付与：毒防御低下
 * ステートの付与：毒
 * ステートの解除：毒防御低下
 * 
 * あくまで、スキル単位でしか設定できません。
 * キャラクター自体に適用したい場合、攻撃時属性などをうまく使ってください。
 * 
 * 
 * ■更新履歴
 * var 1.0(2018/06/03) 公開 
 */


( function(){
"use strict";

Game_BattlerBase.prototype.stateProtection =function(stateId){
    const key = "StateProtection["+stateId+"]";
    const list = this.traitObjects();
    let result =0;
    for (const trait of list) {
        const protection =trait.meta[key];//StateProtection;
        if(protection !==undefined){
            result += Number(protection);
        }
    }
    return result;
};

Game_BattlerBase.prototype.stateProtectionRate =function(stateId){
    const protection = this.stateProtection(stateId);

    if(protection>=100){return 0;}
    if(protection<=0){ return 1;}

    return (100-protection) /100;
};
const Game_BattlerBase_stateRate =Game_BattlerBase.prototype.stateRate;
Game_BattlerBase.prototype.stateRate =function(stateId){
    const protectionRate = this.stateProtectionRate(stateId);
    if(protectionRate <=0){ return 0; }
    const baseRate = Game_BattlerBase_stateRate.call(this,stateId);
    return protectionRate * baseRate;
};

})();
