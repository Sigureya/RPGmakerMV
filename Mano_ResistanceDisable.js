//=============================================================================
// Manosasayaki_resistanceDisable.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:ja
 * @plugindesc 耐性を無効化するステートを作成します。
 * このステートになると、指定した属性への耐性を持たないかのように動作します。
 * @author しぐれん（魔のささやき）
 * 
 * @param StateID
 * @desc 耐性無効を適用するステートの番号を指定します。
 * @default 0
 *
 * @param ResistanceLine
 * @desc 耐性の閾値
 * 属性有効度がこの数値を下回ると、耐性として表示します。
 * @default 100
 * 
 * @help
 * 
 * ステートではなく、プラグイン側でどれにつけるかを指定します。
 * 実際の判定はGame_Battler.isElementResistanceDisabledで行います。
 * お好みに合わせて、ここを改造してください。
 * 
 * var 1.0(2017/06/04) 公開
 */

(function () {
    'use strict';
	var params = PluginManager.parameters('Mano_resistanceDisable');

	var stateID = Number(params.StateID);

	var ResistanceLine = Number(params.ResistanceLine)/100;

	Game_BattlerBase.prototype.isElementResistanceDisabled =function(){
		return this.isStateAffected(stateID);
	};

	var zz_MA_resistanceDisable_Game_BattlerBase_elementRate  =Game_BattlerBase.prototype.elementRate;
	Game_BattlerBase.prototype.elementRate =function(elementId){
		var l = ResistanceLine;
		var rate = zz_MA_resistanceDisable_Game_BattlerBase_elementRate.call(this,elementId);
		if(rate < ResistanceLine){
			if(this.isElementResistanceDisabled()){
				return ResistanceLine;
			}
		}
		return rate;
	}

})();
