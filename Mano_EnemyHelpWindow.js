//=============================================================================
// Manosasayaki_EnemyInformationWindow.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:
 * @plugindesc 攻撃対象を選ぶ段階で相手の弱点を表示します。
 * 
 * @author しぐれん（魔のささやき）
 * 
 * @param WindowRect
 * 
 * @param WindowWidth
 * @type number
 * @desc ウィンドウの幅
 * @default 300
 * @parent WindowRect
 * 
 * @param WindowHeight
 * @type number
 * @desc ウィンドウの高さ
 * @default 150
 * @parent WindowRect
 * 
 * @param WindowX
 * @type number
 * @desc ウィンドウのX座標
 * @default
 * @parent WindowRect
 * 
 * @param WindowY
 * @type number
 * @desc ウィンドウのY座標
 * @default
 * @parent WindowRect
 * 
 * @param 弱点判定ライン
 * 
 * @param WeakLine
 * @type number
 * @desc 弱点の閾値。
 * 属性有効度がこの数値を上回ると、弱点として表示します。
 * @default 100
 * @parent 弱点判定ライン
 * 
 * @param ResistanceLine
 * @type number
 * @desc 耐性の閾値
 * 属性有効度がこの数値を下回ると、耐性として表示します。
 * @default 100
 * @parent 弱点判定ライン
 * 
 * @param displayName
 * @param WeakName
 * @desc 弱点の表示名。
 * @default 弱点：
 * @parent displayName
 * 
 * @param ResistanceName
 * @desc 耐性の表示名。
 * @default 耐性：
 * @parent displayName
 * 
 * @param displayMode
 * @type select
 * @option text
 * @option icon
 * @desc 属性を文字で表示するかアイコンで表示するかを決めます。
 * @default text
 * 
 * @param elementIconList
 * @desc 属性アイコン用にスキルデータを参照します。
 * （属性が重複している場合、未定義の動作）
 * @type skill[]
 * @default []
 *  
 * @param hiddenState
 * @desc 指定したステートが発生している場合、
 * 弱点・耐性を非表示にします。
 * @type state
 * 
 * @param hiddenIcon
 * @desc 敵の弱点が隠されている場合、
 * 耐性と弱点の代わりに表示するアイコンを指定します。
 * 
 * @help
 * エネミーを選んでいる時に弱点を表示します。
 * プラグインを編集できるのであれば、
 * elementIconにアイコンIDを指定する配列を入れれば動きます。
 * 
 * バトラーのメモ欄に<EnemyHelpHide>と書くことで、
 * 弱点・耐性を表示しない設定ができます。
 * var 1.0(2017/7/16) 公開
 */

(function (global) {
    'use strict';

    function toIcon(elementId){
        return '\\['+setting.elementIcon[elementId]+']';
    }
    function toElementName(elementId){        
        return $dataSystem.elements[elementId];
    }
    /**
     * @return {number[]}
     */
    function createIconLiset(param){
        const px = JSON.parse(param.iconList);
        const result=px.map(function(v){
            return Number(v);
        });
        result.unshift(null);
        return result;
    }
    function myParams(){
        return PluginManager.parameters('Mano_EnemyHelpWindow');;
    }


	const setting =(function(){
        const param = myParams();

        const result= {
            weakLine:Number(param.WeakLine)/100,
            resistanceLine:Number(param.ResistanceLine)/100,
            weakName : String(param.WeakName),
            resistanceName :String(param.ResistanceName),
            displayMode : String(param.displayMode),
            rect :{
                x:parseInt(param.WindowX),
                y:parseInt(param.WindowY),
                width:Number(param.WindowWidth),
                height:Number(param.WindowHeight)
            },
//            elementIcon:createIconLiset( param),
            hiddenState:Number(param.hiddenState),
            hiddenIcon:Number(param.hiddenIcon),
            elementIcon:[],
      };
      return result;
    })();
const elementItemFunc=setting.displayMode==='text' ? toElementName:toIcon;




function iconSampling(){
    const param = myParams();
    const array =[];
    array.length = $dataSystem.elements.length;
    for(var i=0;i <array.length;++i){
        array[i]=0;
    }


    const list = JSON.parse(param.elementIconList);
    const listLen =list.length;
    for(var i=0;i <listLen;++i){
        let skillID= Number(list[i]);
        let skill = $dataSkills[skillID];
        let elm= skill.damage.elementId;
        array[elm] = skill.iconIndex;
    }

    setting.elementIcon =array;
}


const Scene_Boot_start=Scene_Boot.prototype.start;
Scene_Boot.prototype.start =function(){
    Scene_Boot_start.call(this);
    iconSampling();


};

class Window_EenmyHelp extends Window_Selectable{
    constructor(x,y,w,h){
        super(x,y,240,120);
        
        this.move(x,y,w,this.fittingHeight(2));
        this._textCache =[];
        this._infoX = Math.max(this.textWidth( setting.weakName) ,this.textWidth(setting.resistanceName));
        this._batller=null;
    }
    /**
     * @param {Game_Battler} battler 
     */
    isBattlerDataHidden(battler){
        return battler.isStateAffected(setting.hiddenState);
    }

    /**
     * @return {Game_Battler}
     */
    battler(){
        return this._batller;
    }
    windowWidth(){
        return 240;
    }
    windowHeight(){
        return this.fittingHeight(2);
    }
    /**
     * @param {Game_Battler} battler 
     */
    createWeakList(battler){
        const len = $dataSystem.elements.length;
        const weakList=[];
        const resistanceList=[];
        for(var i=1; i< len;i+=1){
            const rate =battler.elementRate(i);
            if(rate> setting.weakLine){
                weakList.push(i);
            }else  if(rate < setting.resistanceLine){
                resistanceList.push(i);
            }
        }
        return {
            weakList:weakList,
            resistanceList:resistanceList
        };
    }

    clearCache(){
        this._textCache.length=0;
    }

    drawBaseText(){
        this.drawText(setting.weakName,0,0);
        this.drawText(setting.resistanceName,0,this.lineHeight());
    }
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number[]} elementList 
     */
    drawIcons(x,y,elementList){
        for(var i =0 ;i<elementList.length;++i){
            var iconId = setting.elementIcon[elementList[i]];
            this.drawIcon(  iconId, x + Window_Base._iconWidth *i,y);
        }
    }
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number[]} elementList 
     */
    drawElementText(x,y,elementList){
        var str ='';
        for(var i =0 ;i<elementList.length;++i){
            var index = elementList[i];
            str += $dataSystem.elements[index];
        }
        this.drawText(str,x,y);
    }

    drawDataUnknow(){
        if(setting.displayMode==='icon'){
            const iconId = setting.hiddenIcon;
            if(iconId){
                this.drawIcon(  iconId, this._infoX ,0);
                this.drawIcon(  iconId, this._infoX ,this.lineHeight());
            }
        }else{
            const textUnknow ='????';
            this.drawText(textUnknow,this._infoX,0);
            this.drawText(textUnknow,this._infoX,this.lineHeight());
        }
    }

    drawItem(){
        const battler = this.battler();
        if(this.isBattlerDataHidden(battler)){
            this.drawDataUnknow();
            return;
        }


        const list = this.createWeakList(battler);
        
        if(setting.displayMode==='icon'){
            this.drawIcons(this._infoX,0,list.weakList);
            this.drawIcons(this._infoX,this.lineHeight(),list.resistanceList);
        }else{
            this.drawElementText(this._infoX,0,list.weakList);
            this.drawElementText(this._infoX,this.lineHeight(),list.resistanceList);            
        }
    }
    /**
     * @param {Game_Battler} enemyBattler 
     */
    setBattler(enemyBattler){
        this._batller =enemyBattler;
        this.contents.clear();
        this.drawBaseText();
        this.drawItem();
    }
};
	
const Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows=function(){
    Scene_Battle_createAllWindows.call(this);
    const r = setting.rect;
    const x = !Number.isNaN(r.x) ? r.x : Graphics.boxWidth- r.width;
    const y = !Number.isNaN(r.y) ? r.y : this._enemyWindow.y - r.height;
    var help =new Window_EenmyHelp(x,y,r.width,r.height);
    this.addChild(help);
    help.hide();
    this._enemyHelpWindow_MA =help;
    this._enemyWindow.setEnemyHelpWindow(help);
};

Scene_Battle.prototype.isInputCompleted =function(){
    return !BattleManager.isInputting();
};
Scene_Battle.prototype.onInputComplete =function(){
    this._enemyHelpWindow_MA.clearCache();
};
const Scene_Battle_selectNextCommand = Scene_Battle.prototype.selectNextCommand;
Scene_Battle.prototype.selectNextCommand = function() {
    Scene_Battle_selectNextCommand.call(this);
    if(this.isInputCompleted()){
        this.onInputComplete();
    }
};


/**
 * @param {Window_EenmyHelp} help
 */
Window_BattleEnemy.prototype.setEnemyHelpWindow=function(help){
    const w = help.windowWidth();
    const h = help.windowHeight();
    const x =this.x + this.windowWidth()-w;
    const y = this.y -h;
    help.move(x,y,w,h);
    
    this._enemyHelpWindow_MA =help;

};

const Window_BattleEnemy_show = Window_BattleEnemy.prototype.show;
Window_BattleEnemy.prototype.show = function() {
    Window_BattleEnemy_show.call(this);
    this._enemyHelpWindow_MA.show();
};

const Window_BattleEnemy_hide = Window_BattleEnemy.prototype.hide;
Window_BattleEnemy.prototype.hide = function() {
    Window_BattleEnemy_hide.call(this);
    if(this._enemyHelpWindow_MA){
        this._enemyHelpWindow_MA.hide();
    }
};

const Window_BattleEnemy_callUpdateHelp=Window_BattleEnemy.prototype.callUpdateHelp;
Window_BattleEnemy.prototype.callUpdateHelp = function() {
    Window_BattleEnemy_callUpdateHelp.call(this);
    if(this._enemyHelpWindow_MA){
        this._enemyHelpWindow_MA.setBattler(this.enemy());
    }
};

})();
