//=============================================================================
// Mano_ActionForAll.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/05/21 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc スキル全体化のプラグインです。
 * 
 * @param defaultForAll
 * @desc スキル選択直後の、全体化の初期値を設定します。
 * @type boolean
 * @on 可能なら全体化
 * @off 常に単体
 * @default false
 * 
 * @param forAllButton
 * @desc 対象選択時に、指定したボタンを押すと全体化します。
 * @type struct<CommonDefine>
 * @default {"text":"全体化","symbol":"forall","mandatory":"false","keyList":"C","padButton":"-1"}
 * 
 * @help
 * 指定のボタン・キーを押すと単体攻撃のスキルを全体化します。
 * メモ欄に<ForAll>と書くことで、スキルが全体化できるようになります。
 * 
 * 全体化可能なのは元々の攻撃対象が単体で、対象を選択できるスキルです。
 * 
 * 全体化に条件を付ける機能はありません。
 * Game_Action.hasForAllTraits()を改造することで、条件を拡張できます。
 * 
 * スキルが全体化されている場合にダメージ式を切り替えたい場合、以下のような式を設定してください。
 * this.isForAllSpecialized() ? 全体化したダメージ:単体時のダメージ
 * 
 * 要望が多ければ、全体化している時に常時ダメージを半減する処理などを追加します。
 * 
 * Mano_InputConfigと連携する機能がついています。
 * ■更新履歴
 * 1.0.0 2018/05/21 初版 
 */

 /*~struct~CommonDefine:
 * @param text
 * @desc コマンド名称です
 * 
 * 
 * @param symbol
 * @desc Input.isTriggered()の引数として使われます。
 * 他のプラグインと重複しないような名前を付けてください。
 * 
 * @param mandatory
 * @desc inputConfigの方で必須指定されたものとして扱います。
 * @type boolean
 * @default false
 * 
 * @param keyList
 * @desc キーボードの割り当てです。(半角・大文字) 
 * Aと入れればAを押したときにイベントを実行します。
 * @type string
 * 
 * @param padButton
 * @desc ゲームパッドの割り当てです
 * カッコ内はツクールのデフォルトでの割り当てです
 * @type select
 * @default -1
 * @option non(割り当てなし)
 * @value -1
 * @type select
 * @option button6(L2)
 * @value 6
 * @option button7(R2)
 * @value 7
 * @option button8(select)
 * @value 8
 * @option button9(start)
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

var MA_InputSymbols =MA_InputSymbols||[];

(function(){
    "use strict";

const setting =(function(){

    function fetchButton(paramText){
        if(paramText ===undefined){
            console.log("ボタン設定忘れているよ");
            return null;
        }

        const obj =JSON.parse(paramText);
        return Object.freeze({
            symbol:String(obj.symbol),
            text:String(obj.text),
            keyList:String(obj.keyList),
            padButtonNumber:Number(obj.padButton),
            mandatory:(obj.mandatory==='true'),   
        });
    }

    const param = PluginManager.parameters("Mano_ActionForAll");
    const result ={
        defaultForAll:(param.defaultForAll)==='true',
        input:fetchButton(param.forAllButton),
    };
    return Object.freeze( result);
})();
(function(){
    const data =setting.input;
    MA_InputSymbols.push({
        mandatory:data.mandatory,
        text:data.text,
        symbol:data.symbol,
    });

    /**
     * 
     * @param {Number} keycode 
     * @param {String} symbol 
     */
    function setKeySymbol(keycode,symbol){
        Input.keyMapper[keycode ] =symbol;
    }
    for(var i=0;i<data.keyList.length;++i ){
        setKeySymbol(data.keyList.charCodeAt(i),data.symbol);
    }
})();

const Game_Action_setItemObject=Game_Action.prototype.setItemObject;
Game_Action.prototype.setItemObject =function(item){
    Game_Action_setItemObject.call(this,item);

    if(setting.defaultForAll && this.canForAllSpecialize()){
        this.forAllSpecialize(true);
    }else{
        this.forAllSpecialize(false);        
    }
};
Game_Action.prototype.flipForAllSpecialize =function(){
    this.forAllSpecialize(!this._allSP_MA);
};

Game_Action.prototype.forAllSpecialize =function(value){
    this._allSP_MA=!!value;
};

const Game_Action_isForOne =Game_Action.prototype.isForOne;
Game_Action.prototype.isForOne =function(){
    if(this.isForAllSpecialized()){
        return false;
    }
    return Game_Action_isForOne.call(this);
};    

function hasForAllImple(item){

    const meta = item.meta.ForAll;
    if(meta){
        return true;
    }
    return false;
}

Game_Action.prototype.hasForAllTraits =function(){
    return hasForAllImple(this.item());
};
Game_Action.prototype.canForAllSpecialize =function(){
    //この部分、元々の定義を呼び出すのでこれが必須
    //また、全体スキルを単体にしてしまうバグを避けるためにこれ
    const forOne =Game_Action_isForOne.call(this);
    if(!forOne){return false;}

    return this.hasForAllTraits();
};
Game_Action.prototype.isForAllSpecialized =function(){
    return !!this._allSP_MA;
};

const Game_Action_isForAll=Game_Action.prototype.isForAll;
Game_Action.prototype.isForAll=function(){
    return  Game_Action_isForAll.call(this) || this.isForAllSpecialized();
};


function isForAllTriggered(){
    return Input.isTriggered(setting.input.symbol);    
}
/**
 * @param {Game_Action} action 
 * @param {Window_Selectable} window 
 */
function actionChnageForAll(action,window){
    action.flipForAllSpecialize();
    window.setCursorAll(action.isForAll() );
    SoundManager.playCursor();
    window.updateCursor();
}

const Window_MenuActor_processHandling=Window_MenuActor.prototype.processHandling;
Window_MenuActor.prototype.processHandling =function(){
    if (this.isOpenAndActive()) {
        if(isForAllTriggered() &&this._forallAble){
            this.deactivate();
            this.callHandler("forall");
            return;
        }
    }
    Window_MenuActor_processHandling.call(this);
};
/**
 * @param {Game_Action} action
 */
Window_MenuActor.prototype.selectForAction =function(action){

    this._forallAble = action.canForAllSpecialize();

    if(action.isForUser()){
        this.setCursorFixed(action.isSkill());
        this.setCursorAll(false);
        this.select(action.subject().index());
    }else{
        this.setCursorFixed(!action.needsSelection());
        this.setCursorAll(!action.isForOne());
        this.selectLast();    
    }
};
const Scene_Skill_createActorWindow=Scene_Skill.prototype.createActorWindow;
Scene_Skill.prototype.createActorWindow=function(){
    Scene_Skill_createActorWindow.call(this);
    this._actorWindow.setHandler("forall",this.onForallChange.bind(this));
};

Scene_Skill.prototype.onForallChange =function(){

    actionChnageForAll(this._action,this._actorWindow);    
    this._actorWindow.activate();
};
const Scene_Skill_initialize=Scene_Skill.prototype.initialize;
Scene_Skill.prototype.initialize =function(){
    Scene_Skill_initialize.call(this);
    this._action =null;
};

Scene_Skill.prototype.action=function(){
    return this._action;
    var action = new Game_Action(this.user());
    var item = this.item();
    action.setItemObject(item);
    return action;
};

Scene_Skill.prototype.determineItem = function() {
    var action = new Game_Action(this.user());
    var item = this.item();
    action.setItemObject(item);

    this._action =action;
    if (action.isForFriend()) {
        this.showSubWindow(this._actorWindow);
//        this._actorWindow.selectForItem(this.item());
        this._actorWindow.selectForAction(action);

    } else {
        this.useItem();
        this.activateItemWindow();
    }
};


Scene_Skill.prototype.itemTargetActors =function(){
    var action = this.action();
    if (!action.isForFriend()) {
        return [];
    } else if (action.isForAll()) {
        return $gameParty.members();
    } else {
        return [$gameParty.members()[this._actorWindow.index()]];
    }
};

Scene_Skill.prototype.isItemEffectsValid = function() {
    var action = this.action();
    return this.itemTargetActors().some(function(target) {
        return action.testApply(target);
    }, this);
};

Scene_Skill.prototype.applyItem =function(){
    var action = this.action();
    var targets = this.itemTargetActors();
    targets.forEach(function(battler) {
        var repeats = action.numRepeats();
        for (var i = 0; i < repeats; i++) {
            action.apply(battler);                    
        }
    });
    action.applyGlobal();
};


const Window_BattleActor_processHandling=Window_BattleActor.prototype.processHandling;
Window_BattleActor.prototype.processHandling =function(){
    if (this.isOpenAndActive()) {
        if(isForAllTriggered()) {
            const action = BattleManager.inputtingAction();
            if(action.canForAllSpecialize()){
                this.deactivate();
                this.callHandler("forall");    
                return;
            }
        }
    }
    Window_BattleActor_processHandling.call(this);
};

const Window_BattleEnemy_processHandling=Window_BattleEnemy.prototype.processHandling;
Window_BattleEnemy.prototype.processHandling =function(){
    if (this.isOpenAndActive()) {
        if(isForAllTriggered()) {
            const action = BattleManager.inputtingAction();
            if(action.canForAllSpecialize()){
                this.deactivate();
                this.callHandler("forall");    
                return;
            }
        }
    }
    Window_BattleEnemy_processHandling.call(this);
};

Scene_Battle.prototype.onActorForall =function(){
    actionChnageForAll(BattleManager.inputtingAction(),this._actorWindow);
    this._actorWindow.activate();
};
const Scene_Battle_createActorWindow=Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow =function(){
    Scene_Battle_createActorWindow.call(this);
    this._actorWindow.setHandler("forall",this.onActorForall.bind(this));
};

Scene_Battle.prototype.onEnemyForall =function(){
    actionChnageForAll(BattleManager.inputtingAction(),this._enemyWindow);
    this._enemyWindow.activate();
};
const Scene_Battle_createEnemyWindow=Scene_Battle.prototype.createEnemyWindow;
Scene_Battle.prototype.createEnemyWindow =function(){
    Scene_Battle_createEnemyWindow.call(this);
    this._enemyWindow.setHandler("forall",this.onEnemyForall.bind(this));
};

})();
