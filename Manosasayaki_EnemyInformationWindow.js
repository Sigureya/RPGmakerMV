//=============================================================================
// Manosasayaki_EnemyInformationWindow.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:ja
 * @plugindesc 攻撃対象を選ぶ段階で相手の弱点を表示します。
 * また、スキル選択時にエネミーの上に弱点ポップアップを表示することもできます。
 * 
 * @author しぐれん（魔のささやき）
 * 
 * @param WindowWidth
 * @desc ウィンドウの幅
 * @default 300
 * 
 * @param WindowHeight
 * @desc ウィンドウの高さ
 * @default 150
 * 
 * @param WindowX
 * @desc ウィンドウのX座標
 * @default 515
 * 
 * @param WindowY
 * @desc ウィンドウのY座標
 * @default 295
 * 
 * @param WeekLine
 * @desc 弱点の閾値。
 * 属性有効度がこの数値を上回ると、弱点として表示します。
 * @default 100
 * 
 * @param ResistanceLine
 * @desc 耐性の閾値
 * 属性有効度がこの数値を下回ると、耐性として表示します。
 * @default 100
 * 
 * @param WeekName
 * @desc 弱点の表示名。
 * @default 弱点：
 * 
 * @param ResistanceName
 * @desc 耐性の表示名。
 * @default 耐性：
 * 
 * @param displayMode
 * @desc 属性を文字で表示するかアイコンで表示するかを決めます。
 * 0=文字,1=アイコン
 * @default 0
 * 
 * @param iconList
 * @desc アイコンの一覧を定義します。(半角スペース区切り)
 * 属性の並び順と同じように、並べてください。余計な空白禁止。
 * @default 64 65 66 67 68 69 70 71
 *
 * @help
 * エネミーを選んでいる時に弱点を表示します。
 * 
 * Window_EnemyInformation.createTextが実質的な本体です。
 * ここを改造すれば、より詳細に敵の情報を表示できるでしょう。
 * 
 * var 1.0(2017/5/26) 公開
 */

(function (global) {
    'use strict';


	var param = PluginManager.parameters('Manosasayaki_EnemyInformationWindow');
	var enemyInfo ={};
	enemyInfo.weekLine=Number(param.WeekLine)/100;
	enemyInfo.resistanceLine=Number(param.ResistanceLine)/100;
	// enemyInfo.rect = new Rectangle(
	// 	Number(param.WindowX),
	// 	Number(param.WindowY),
	// 	Number(param.WindowWidth),
	// 	Number(param.WindowHeight)
	// );
	enemyInfo.displayMode = Number(param.displayMode);
	enemyInfo.x = Number(param.WindowX);
	enemyInfo.y = Number(param.WindowY);
	enemyInfo.w = Number(param.WindowWidth);
	enemyInfo.h = Number(param.WindowHeight);

	enemyInfo.weekName = String(param.WeekName);
	enemyInfo.resistanceName = String(param.ResistanceName);
	
	enemyInfo.iconList =param.iconList.split(' ').map( function(v){return Number(v);} ) ;
	var zz_MA_EnemyInformationWindow_Window_Selectable_select = Window_Selectable.prototype.select;
	var zz_MA_EnemyInformationWindow_Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
	Window_BattleEnemy.prototype.select =function(index){
		var lastIndex = this.index();
		zz_MA_EnemyInformationWindow_Window_BattleEnemy_select.apply(this,arguments);
		if(this._info && lastIndex!==this.index()){
			this._info.preDraw();
			this._info.drawBattler(this.enemy());
		}
	}

	function Window_EnemyInformation(params) {
		this.initialize.apply(this,arguments);
	}
	Window_EnemyInformation.prototype = Object.create(Window_Base.prototype);
	Window_EnemyInformation.prototype.constructor = Window_EnemyInformation;

	Window_EnemyInformation.prototype.initialize=function(selectIndex){
		Window_Base.prototype.initialize.call(this,enemyInfo.x,enemyInfo.y,enemyInfo.w,enemyInfo.h);
		this.hide();
	};
	Window_EnemyInformation.prototype.preDraw =function(){
		if(this.contents){
			this.contents.clear();
		}
	};
	Window_EnemyInformation.prototype.elementFormat=function(elmentID,rate){
		if( enemyInfo. displayMode ===0){
			return $dataSystem.elements[elmentID];
		}
		return '\\i['+enemyInfo.iconList[  elmentID-1] +']';	
	}
	Window_EnemyInformation.prototype.createText=function(battler){
		var ei = enemyInfo;


		var weekList=[ei.weekName];
		var resistanceList=[ei.resistanceName];
		var de = $dataSystem.elements;

		var text =battler.name();

		for(var i=1;i < de.length;++i){
			var rate = battler.elementRate(i);
			if(rate > ei.weekLine)
			{
				weekList.push(this.elementFormat( i,rate  ));
			}else if(rate < ei.resistanceLine){
				resistanceList.push(this.elementFormat(i,rate));
			}			
		}
		return text +'\n'+ weekList.join('') +'\n'+ resistanceList.join('');
	}

	Window_EnemyInformation.prototype.drawBattler=function(battler){
		this.drawTextEx(this.createText(battler),0,0);
	};

var zz_MA_EnemyInformationWindow_SceneBattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows =function(){
	zz_MA_EnemyInformationWindow_SceneBattle_createAllWindows.call(this);
	this.createEnemyInformationWindows();		
};

Scene_Battle.prototype.selectEnemyInfo =function(){
	var index = this._enemyWindow.index();
};

Scene_Battle.prototype.createEnemyInformationWindows =function(){

	this._enemyInfoWindow = new Window_EnemyInformation();
	this._enemyWindow._info = this._enemyInfoWindow;

	this.addWindow(this._enemyInfoWindow);
};
var zz_MA_EnemyInformationWindow_SceneBattle_selectEnemySelection= Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection =function(){
	zz_MA_EnemyInformationWindow_SceneBattle_selectEnemySelection.call(this);
	this._enemyInfoWindow.show();
	this._enemyInfoWindow.activate();
}
var zz_MA_EnemyInformationWindow_SceneBattle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk =function(){
	zz_MA_EnemyInformationWindow_SceneBattle_onEnemyOk.call(this);
	this._enemyInfoWindow.hide();
};
var zz_MA_EnemyInformationWindow_SceneBattle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel =function(){
	zz_MA_EnemyInformationWindow_SceneBattle_onEnemyCancel.call(this);
	this._enemyInfoWindow.hide();
};

	global.Manosasayaki = (global.Manosasayaki||{});
	global.Manosasayaki.enemyInfo =enemyInfo;

})(this);
