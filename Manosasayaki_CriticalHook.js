//=============================================================================
// Manosasayaki_CriticalHook.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/04/13 説明を追加。また、自動でステートを解除しないようにした。
// 0.9.0 2017/04/13 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc When a critical hit occurs, temporarily grant state
 * @author　Sigurey
 * 
 * @param StateID
 * @desc When a critical hit occurs, the state temporarily assigned 
 * @default 4
 * 
 * @help
*/

/*:ja
 * @plugindesc クリティカル時にステートを付与することで、
 * ダメージ式などを疑似的に変更できます。
 * @author しぐれん（魔のささやき）
 * 
 * @param StateID
 * @desc クリティカルヒットが発生したときに、一時的に付与するステートを指定します。
 * @default 4
 *  
 *
 * @help
 * クリティカルヒットが発生したときに、
 * そのダメージ計算を行う直前に、指定した番号のステートを発生させます。
 * クリティカル時は防御の計算をしないなどの設定が可能です。
 * 例えば、対応するステートに防御0%の特徴を指定すれば、
 * クリティカルが防御無視になります。
 * 
 * ■ステートの解除条件は？
 * ・そのターン中ずっと防御０％なら「１ターン終了時」
 * ・会心時一回だけなら「ダメージで解除１００％」
 * 
 * このプラグインで指定したステートは、
 * 他のスキルなどでは発生しないようにしてください。
 * ■バグかな？と思ったら
 * Game_Action.makeDamageValue()を再定義しています。
 * 導入順の影響を受けますので、下の方に置くのを推奨。
 * ■更新履歴
 * var 1.00(2017/4/13) 公開
 */

(function (global) {
    'use strict';
    var stateID=4;
    var Manosasayaki_criticalHook={name:'Manosasayaki_criticalHook'};
    var params = PluginManager.parameters('Manosasayaki_CriticalHook');
    stateID = Number(params['StateID'] || 4);


    Manosasayaki_criticalHook.selectState=function(skill){
        return stateID;
    }

    var zz_Game_Action_prototype_makeDamageValue_preDef = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue　=function (target,critical) {
        if( critical ){
            
            var s_ID = Manosasayaki_criticalHook.selectState(this.item());
            target.addState(s_ID);
        }
        return zz_Game_Action_prototype_makeDamageValue_preDef.apply(this,arguments);
    }
//    var zz_Game_Action_prototype_apply_preDef =Game_Action.prototype.apply;

 //   Game_Action.prototype.apply =function(target){
 //       zz_Game_Action_prototype_apply_preDef.apply(this,arguments);
 //       target.eraseState(stateID);
 //   }


})();
