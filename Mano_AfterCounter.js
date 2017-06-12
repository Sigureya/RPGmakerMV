 //=============================================================================
// Manosasayaki_AfterCounter.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:ja
 * @plugindesc 攻撃を受けた後に、スキルを使います。
 * 条件式や反撃時の行動も設定できます。
 * @author しぐれん（魔のささやき）
 * 
 * @param tagName
 * @desc カウンターの条件設定に使うタグ名を指定します。
 * @default CounterExt
 * 
 * @param msg_format
 * @desc 反撃による行動の時に、挿入する文章を設定します。
 * 空欄の場合、何もしません。
 * @default 反撃！
 * 
 * @help
 * 
 * パラメータは、デフォルトでは以下の形になっています。
 * <CounterExt:
 *    cond   = 'true'   #発動条件
 *    rate   = 100      #発動率
 *    prio   = 0        #優先度
 *    skill  = 1        #使用するスキル
 *    mode   = target   #攻撃対象にならなかった時に判定するか
 *    event  = 0        #判定直前に呼び出すコモンイベント
 * >
 * 
 * 複数の条件を設定したい場合、「CounterExt3」など、
 * 数字を付けて対応してください。
 * 9まで対応しています。
 * 
 * ■cond
 * 条件文を定義します。
 * 比較演算子は >　以外が使用可能です。
 * 条件文内部では以下の変数が参照できます。
 * act      : Game_actionが格納されます。
 * result   : Game_actionResultが格納されます。
 * elementID: 属性番号が格納されます。
 * a        : カウンター使用者。
 * b        : 攻撃してきた相手。
 * skillID  : スキルのID。敵の行動がスキルでない場合は0。
 * itemID   : アイテムのID。敵の行動がアイテムでない場合は0。
 * ■rate
 * 反撃率を定義します。
 * 特徴の「反撃率」とほぼ同様です。
 * デフォルトの反撃率設定はすべて無視します。
 * 
 * 反撃率の判定は、カウンター条件全てで個別に行われます。
 * 一つ目のカウンターが反撃率判定で失敗しても、
 * 残りのカウンターの判定は行われます。
 * 
 * ■skill
 * Nもしくはv(N)の形式で指定します。
 * (Nは整数)
 * v(N)の場合、変数からスキル番号を取り出します
 * 
 * ■prio
 * 優先順位を定義します。
 * 優先順位の高い物から反撃判定を行い、最初に条件を満たしたものから実行されます。
 * なお、prioが同値の場合、
 * ステート > アクター > 職業 > 装備品の順で判定します。
 * この並び順はGame_Battler.traitObjects()の戻り値順です。
 * ただし、この順序は実装によって異なるので保証しません。
 * ※初期版ではpriolityで指定していましたが、長いので省略。
 * priolityでも動きますが、いずれ削除します。
 * 
 * ■mode
 * use,target,hitの3つから指定できます。
 * useは条件を満たすスキルが使用されたときに発動します。
 * targetは、条件を満たすスキルの攻撃対象になったときに発動します。
 * hitは、条件を満たすスキルが自分にヒットしたときに発動します。
 * 
 * ■event
 * カウンターの判定処理の前にコモンイベントを呼び出します。
 * タイミングはrateでの乱数判定がtrueになったあとで、
 * condで指定した条件式の判定前に呼び出します。
 * 「this.変数」の形式で以下の変数が使用できます。
 * 指定したコモンイベントが呼び出した別のコモンイベントではこれらを参照できません。
 * a       :攻撃を受けたBattler。
 * b       :攻撃を行ったBattler。
 * counter :Counterクラス。詳細はプラグインを見てください。
 * act     :相手の行った行動。
 * 
 * ■サンプル
 * 魔法に対して50%で反撃。スキルを指定していないので、通常攻撃で反撃。
 * <CounterExt:
 *    cond  = act.isMagicSkill()
 *    rate  = 50
 * >
 * 魔法に対してID9のスキルで反撃。
 * <CounterExt:
 *    cond  = act.isMagicSkill()
 *    skill = 9
 * >
 * 魔法に対して変数1番で定義したIDのスキルで反撃。
 * <CounterExt:
 *    cond  = act.isMagicSkill()
 *    skill = v(1)
 * >
 * 自分のHPが50%を下回ると反撃。
 * <CounterExt:
 *    cond   = a.hpRate() < 0.5
 * >
 * 自分のHPが50%を下回っている時に、魔法を受けると反撃。
 * <CounterExt:
 *    cond   = a.hpRate() < 0.5 && act.isMagicSkill()
 * >
 * 属性番号2に対して反撃。
 * <CounterExt:
 *    cond   = elementId === 2
 * >
 * スイッチ[1]がONの時に反撃。
 * <CounterExt:
 *    cond   = s(1)
 * >
 * 変数[1]が100の時に反撃。
 * <CounterExt:
 *    cond   = v(1)===100
 * >
 * クリティカルヒットを受けたときに反撃
 * <CounterExt:
 *    cond = result.critical
 * >
 * コモンイベント[1]で処理を行い、スイッチ[5]番がONの時に反撃
 * <CounterExt:
 *    cond  = s(5)
 *    event = 1
 * >
 * 
 * ■その他
 * スキルやアイテムに<CanNotCounter>タグを指定することで、
 * カウンターされないスキルが作れます。
 * 
 * スキルのダメージ式に、
 * this.isCounter()と書くことでそのスキルがカウンターによる発動かチェックできます。
 * 例：カウンター発動時は500、そうでないときは100ダメージを与えるスキル。
 * this.isCounter() ? 500:100
 * 
 * 
 *  
 * ■更新履歴
 * ver 0.9.4(2017/06/11)
 * ヒットした時のみカウンターするmode = hitを追加。
 * ※後日バグ修正
 * その他、細かい修正。
 * 
 * ver 0.9.3(2017/05/27)
 * 優先度が機能していなかったバグを修正
 * ver 0.9.2(2017/05/21)
 *  コモンイベント呼び出し機能を追加。
 * <CanNotCounter>で、カウンターされないスキルが作れる機能を追加。
 * elementIDに統一。
 * priorityは長くて面倒だったので、prioで動くように修正
 * condのaとbが逆になっていたのを修正。
 * エラー発生時に、どこに原因があるか見つけやすいように修正。
 * mode=targetの処理が正しく機能していなかったのを修正。
 * ver 0.9.1(2017/05/19) バグ修正とヘルプの修正
 * ver 0.9.0(2017/05/19) 公開
 */
/*:
 * @plugindesc 
 * 
 * After receiving the attack, use the skill.
 * You can also set the trigger condition
 * @author しぐれん(siguren)
 * 
 * @param tagName
 * @desc Define the name part of <name: data>.
 * @default CounterExt
 * 
 * @param msg_format
 * @desc At the time of action by counterattack, set the sentences to be displayed.
 * If it is blank, I do not do anything.
 * @default CounterAttack!
 * 
 * @help
 * 
 * By default, the parameters are in the following form.
 * <CounterExt:
 *    cond     = true   #Invocation condition
 *    rate     = 100    #Activation rate
 *    prio = 0      #Priority when multiple conditions satisfy
 *    skill    = 1      #use skill
 *    mode     = target #Do you decide when it did not become an attack target
 * >
 * 
 * If you want to set multiple conditions, 
 * please attach a number such as "CounterExt3".
 * It corresponds to 9.
 * ■cond
 * Define conditional statements.
 * Comparison operators other than > are available.
 * The following variables can be referred to within the condition statement.
 * act      : Game_action is stored.
 * elementId: The attribute number is stored.
 * a        : Counter user.
 * b        : The opponent who attacked.
 * skillID  : ID of the skill. 0 if the opponent's action is not a skill.
 * itemID   : ID of the item. 0 if the opponent's action is not an item.
 *
 * ■rate
 * Define the counterattack rate.
 * It is almost the same as the characteristic "counter rate".
 * Ignore all default counter rate settings. * 
 * ■skill
 * Specify it in the form of N or v[N].
 * (N is an integer)
 * For v[N], retrieve the skill number from the variable.
 * ■priority
 * Define the priority.
 * Counterattack judgment is done from objects with high priority, 
 * and it will be executed from those that first fulfilled the condition.
 * If priority is the same,
 * State judged in the order of actor> occupation> equipment.
 * However, this order is not guaranteed because 
 * it varies depending on the implementation.
 * ■mode
 * use, target can be specified.
 * use counts when skills that satisfy the criteria are used.
 * target is activated when it becomes an attack target of a skill which satisfies the condition.
 * 

* ■ Sample
 * Counter Attack with 50% against magic. 
 * Because they did not designate skills, they attacked with regular attacks.
 * <CounterExt:
 * Cond = act.isMagicSkill ()
 * Rate = 50
 *>
 * Counterattack with the skill of ID 9 against magic.
 * <CounterExt:
 * Cond = act.isMagicSkill ()
 * Skill = 9
 *>
 * Counterattack with the skill of ID defined with variable 1 against magic.
 * <CounterExt:
 * Cond = act.isMagicSkill ()
 * Skill = v [1]
 *>
 * Counterattack if your HP falls below 50%.
 * <CounterExt:
 * Cond = a.hpRate () <0.5
 *>
 * Counterattack against attribute number 2.
 * <CounterExt:
 * Cond = elementId === 2
 *>
 * Counterattack when switch [1] is ON.
 * <CounterExt:
 * Cond = s (1)
 *>
 * Counterattack when variable [1] is 100.
 * <CounterExt:
 * Cond = v (1) === 100
 * > 
 * 

* ■ Update history
 * Var 0.9.0 (2017/05/21) Published in English
 *  */

var Imported = (Imported || {});
Imported.Mano_AfterCounter =true;

(function () {
'use strict';
var counter={};
var params = PluginManager.parameters('Mano_AfterCounter');

counter.tagName = params['tagName']||'CounterExt';
counter.modeReg =/(target|use|hit)/;
counter.msg_format = String( params['msg_format']);

//=============================================================================
// Counter Class
//=============================================================================
function Counter() {
    this.initialize.apply(this,arguments);
}
Counter.prototype.initialize=function()
{
    this._priority = 0;
    this._rate = 1;
    this._cond = null;
    this._mode = 'target';
    this._commonEvent =0;
    this.setSkillID(1);
};
Counter.prototype.skillFromNumber=function(){
    return $dataSkills[this._id];
};

Counter.prototype.setSkillID =function(id){
    this._id =id;
    this._getItemFunc = Counter.prototype.skillFromNumber;
};
Counter.prototype.skillFromGameVariables=function(){
    return $dataSkills[$gameVariables.value(this._id)];
};
Counter.prototype.setSkillVariable =function(id){
    this._id =id;
    this._getItemFunc = Counter.prototype.skillFromGameVariables;
};

Counter.prototype.skillCopy=function(opponentAction){
    return opponentAction.item()
};

Counter.prototype.setSkill=function(value){
    this.numOrVariable(value, this.setSkillID, this.setSkillVariable );
};

Counter.prototype.item =function(){
    return this._getItemFunc.call(this);
};
Counter.prototype.rate =function(){
    return this._rate;

};
Counter.prototype.setRate=function(rate){
    this._rate = rate/100;

};
Counter.prototype.setMode =function(mode){
    var match = counter.modeReg.exec(mode);
    if(match){
        this._mode = match[1];
    }
};
Counter.prototype.priority =function(){
    return this._priority;
};
Counter.prototype.setPriority =function(p){
    this._priority = p;
};


Counter.prototype.setCondition =function(cond){
    this._cond=cond;
};

Counter.prototype.setCommonEvent =function(eventId){
    this._commonEvent = Number( eventId);
};

Counter.prototype.evalCondition=function(subject,action,trait){

    var act       = action;
    var item      = action.item();
    var skill     = item;
    var a         = subject;
    var b         = action.subject();
    var elementID = item.damage.elementId;
    var v         = $gameVariables.value.bind($gameVariables);
    var s         = $gameSwitches.value.bind($gameSwitches);
    var result    = subject.result();
    
    var skillID = action.isSkill() ? item.id : 0;
    var itemID  = action.isItem()  ? item.id : 0;

    var condResult = false;
    try {
         condResult=!!eval(this._cond);
        
    } catch (e) {
        console.error(e.toString());
        throw new Error('条件式(cond)が不正です。該当データ('+trait.name+')式:' + this._cond);
    }
    return condResult;
};
Counter.prototype.numConvertTo =function(func,value){
    var num = Number(value);
    if(num !==NaN){
        func.call(this,num);
    }

};
Counter.prototype.numOrVariable =function(str,numFunc,variableFunc){
    let reg =/[(\[](\d)?[)\]]/i;
    var match = reg.exec(str);
    if(match){
//        console.log(match[1]);
        variableFunc.call(this,match[1]);
    }else{
        numFunc.call(this,Number( str ));
    }
};

Counter.prototype.patternMatch=function(key ,value){
    var k = key[0];

    switch (k) {
//        case 'cond':
        case 'c':
            this.setCondition(value);
            break;
//        case 'skill':
        case 's':
            this.setSkill(value);
            break;
//        case 'priority':
//        case 'prio':
        case 'p':
            this.numConvertTo(this.setPriority,value);
            break;        
//        case 'rate':
        case 'r':
            this.numConvertTo(this.setRate,value);
            break;
//        case 'mode':
        case 'm':
            this.setMode(value);
            break;
        case 'e':
            this.setCommonEvent(value);
        default:
            break;
    };
    
};

Counter.prototype.setMeta=function(metaStr){
    const reg = /(cond|skill|rate|priority|prio|mode|event)\s*=(.*)/g;
    for(;;){
        var match = reg.exec(metaStr);
        if(!match){break;}
            this.patternMatch(match[1],match[2]);
    }
};
Counter.prototype.selectTargetIndex=function(action,opponent ){
    if(action.isForOpponent()){
        action.setTarget( opponent.index()  );
    }else if(action.isForFriend()){
        action.setTarget( action.subject().index()  );
    }
};

Counter.prototype.createAction=function(subject,opponentAction)
{
    var action = new Game_Action(subject);
    var item = this.item();
    if(item){
        action.setItemObject(item);
    }else{
        action.setAttack();
    }
    this.selectTargetIndex(action,opponentAction.subject());
    return action;
};
Counter.prototype.modeMathc=function(subject){
    if(this._mode ==='target'){
        return !!subject._targetedMA;
    }

    if(this._mode ==='hit'){
        return !!subject._hitMA;
    }


    return true;
};

Counter.prototype.callCommonEvent=function(subject,opponentAction){
    if(this._commonEvent ===0){return;}

    var inter = new Game_Interpreter();
    inter.counter = this;
    inter.a = subject;
    inter.b = opponentAction.subject();
    inter.act = opponentAction;

    inter.setup($dataCommonEvents[this._commonEvent].list);
    inter.update();
};

Counter.prototype.Judge =function(subject,opponentAction,trait){
    if(! (Math.random() < this.rate())){return false;}
    this.callCommonEvent(subject,opponentAction);
    var result = true;
    if(this._cond){
        result = this.evalCondition(subject,opponentAction,trait);
    }

    return result && subject.canUse(this.item());
};
//=============================================================================
// DefineCounterTrait
//=============================================================================
counter.defineCounterTraitImple =function(obj,tagName){

    var counterEX = obj.meta[tagName];
    if( !counterEX ){
        return; 
    }

    var c_base = new Counter();
    c_base.setMeta(counterEX);
    obj.counter_Manosasayaki.push(c_base);
};

counter.defineCounterTrait=function(obj) {
    var ct = obj.counter_Manosasayaki;
    if(ct !==undefined){return;}

    obj.counter_Manosasayaki=[];
    var tagName = counter.tagName;
    counter.defineCounterTraitImple(obj,tagName);
    for(var i=0;i <=9;i+=1 ){
        counter.defineCounterTraitImple(obj,tagName+i);
    }
};

//=============================================================================
// GameAction
//=============================================================================
Game_Action.prototype.isCounter=function(){
    return !!this._isCounter;
};

Game_Action.prototype.canCounter=function(){
    return (!this.item().meta.CanNotCounter) && !this.isCounter() ;
};

Game_Action.prototype.counterSpeed=function(){

    var result = this.speed()
    if(this.subject()._targeted){
        result +=10000;
    }
    return result;
};

//=============================================================================
// Game_Battler
//=============================================================================
Game_Battler.prototype.findCounterAciton=function(opponentAction){
    var traits= this.traitObjects();
    var counterObj =null;
    var tn = counter.tagName
    traits.forEach(function(trait){
        var c_ext = trait.meta[tn];
        if(!c_ext){return;}

        var cm = trait.counter_Manosasayaki;
        if(cm ===undefined){
            counter.defineCounterTrait(trait);
            cm = trait.counter_Manosasayaki;
        }
        for(var i=0,len = cm.length ;i < len; i+=1 ){
            var co_i = cm[i];
            if(!co_i.modeMathc(this)){continue;}
            if(counterObj){
                if(  co_i.priority() < counterObj.priority ()){continue;}                    
            }   
            if(co_i.Judge(this,opponentAction,trait) ){
                counterObj = co_i;
            }
        }
    },this);
    if(counterObj){
        var act = counterObj.createAction(this,opponentAction);
        act._isCounter =true;
        return act;
    }

    return null;
};
//=============================================================================
// BattleManager
//=============================================================================
var zz_MA_AfterCounter_BattleManager_BattleManager_initMembers =BattleManager.initMembers;
BattleManager.initMembers =function(){
    this._reservedCounter =[];
};

BattleManager.intersectCounterAction =function(){
    if(this._reservedCounter.length > 0){
        if(!this._orgSubject){
            this._orgSubject =this._subject;
        }
        var counter = this._reservedCounter.shift();
        this._subject = counter.subject();
        this._subject._actions.unshift(counter);
    }else{
        if(this._orgSubject){
            this._subject = this._orgSubject;
            this._orgSubject = null;
        }
    }
    var battlers = this.allBattleMembers();
    for(var i=0,len =battlers.length; i<len; i +=1){
        battlers[i]._targetedMA=false;
        battlers[i]._hitMA=false;
    }
};


var zz_MA_AfterCounter_BattleManager_updateTurn = BattleManager.updateTurn;
BattleManager.updateTurn =function(){
    this.intersectCounterAction();
    zz_MA_AfterCounter_BattleManager_updateTurn.call(this);
};
var zz_MA_AfterCounter_BattleManager_invokeNormalAction =BattleManager.invokeNormalAction;
BattleManager.invokeNormalAction=function(subject,target){
    zz_MA_AfterCounter_BattleManager_invokeNormalAction.apply(this,arguments);
    target._targetedMA =true;
    target._hitMA = target._hitMA||target.result().isHit();

};
BattleManager.counterActionSort =function(){
    this._reservedCounter.sort(function(a,b){
        return b.counterSpeed()-a.counterSpeed();
    });
};



var zz_MA_AfterCounter_BattleManager_endAction =BattleManager.endAction;
BattleManager.endAction =function(){

    zz_MA_AfterCounter_BattleManager_endAction.call(this);
    this.reserveCounterr();
}
BattleManager.reserveCounterr =function()    {
    var act =this._action;
 
    if(act.canCounter()){
        var counterUser = act.opponentsUnit().aliveMembers();

        for(var i=0;i <counterUser.length;i+=1){
            var counterAction= counterUser[i].findCounterAciton(act);
            if(counterAction){
                this._reservedCounter.push(counterAction);
            }        
        }
        this.counterActionSort();
    }
};
if( counter.msg_format ){
    var  zz_MA_AfterCounter_Window_BattleLog_startAction =Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction=function(subject,action,targets){
        if(action.isCounter()){
            this.push('addText',counter.msg_format);
        }
        zz_MA_AfterCounter_Window_BattleLog_startAction.apply(this,arguments);
    };
}


})();
