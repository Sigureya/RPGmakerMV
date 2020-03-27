 //=============================================================================
// Mano_AfterCounter.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc 攻撃を受けた後に、スキルを使います。
 * 条件式や反撃時の行動も設定できます。
 * @author しぐれん（魔のささやき）
 * 
 * @param enabledCounter
 * @desc カウンター機能を有効化します。
 * @type boolean
 * @default true
 * 
 * @param enabledChain
 * @desc 連続攻撃機能を有効化します。
 * @type boolean
 * @default true
 * 
 * @param counterTag
 * @desc カウンターの条件設定に使うタグ名を指定します。
 * @default CounterExt
 * 
 * @param chainTag
 * @desc 連携攻撃の条件設定に使うタグ名を指定します。
 * @default chain
 * 
 * @param counterMessage
 * @desc 反撃による行動の時に、挿入する文章を設定します。
 * 空欄の場合、何もしません。
 * @default 反撃！
 * 
 * @param chainMessage
 * @desc 連携による行動の時に、挿入する文章を設定します。
 * 空欄の場合、何もしません。
 * @default 追撃！
 * 
 * @param DefinableAmmount
 * @type number
 * @desc CounterExt5などで、設定できる最大数を設定します。
 * @default 10
 * 
 * @param commonElementId
 * @desc コモンイベント呼び出し時に属性番号を格納します。
 * @type variable
 * @default 0
 * 
 * @param commonSkillId
 * @desc コモンイベント呼び出し時にスキル番号を格納します。
 * @type variable
 * @default 0
 * 
 * @param commonItemId
 * @desc コモンイベント呼び出し時にアイテム番号を格納します。
 * @type variable
 * @default 0
 * 
 * @help
 * 
 * パラメータは、デフォルトでは以下の形になっています。
 * <CounterExt:
 *  cond  = 'true'  #発動条件
 *  rate  = 100     #発動率
 *  prio  = 0       #優先度(複数のカウンターがあるとき、もっとも高い物だけ実行) 
 *  skill = 1       #使用するスキル
 *  mode  = target  #攻撃対象にならなかった時に判定するか
 *  event = 0       #判定直前に呼び出すコモンイベント
 * >
 * 
 * 複数の条件を設定したい場合、「CounterExt3」など、
 * 数字を付けて対応してください。
 * 1からDefinableAmmountで指定した数まで対応しています。
 * 
 * パラメータごとに改行してください。
 * <chain:※条件指定>で味方が行動した後に行動する連携攻撃が可能となります。
 * ■cond
 * JavaScriptによる条件文を定義します。
 * 比較演算子は以下のものが使用可能です。
 * （>は使用できません）
 * X===Y :XとYが等しい。
 * X!==Y :XとYが等しくない。
 * X < Y :XがY未満。 
 * X <=Y :XがY以下。（X>=Yは使えないので、左右を逆にして対応してください） 
 * X >=Y → Y<=X この方法で対応可能。 
 * 
 * 条件文内部では以下の変数が参照できます。
 * act      : Game_actionが格納されます。
 * elementID: 属性番号が格納されます。
 * a        : カウンター使用者。
 * b        : 攻撃してきた相手。
 * skillID  : スキルのID。敵の行動がスキルでない場合は0。
 * itemID   : アイテムのID。敵の行動がアイテムでない場合は0。
 * 
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
 * カウンター時に使用するスキルを設定します。
 * Nもしくはv(N)の形式で指定します。
 * (Nは整数)
 * v(N)の場合、変数からスキル番号を取り出します
 * 
 * ■prio
 * 優先順位を定義します。
 * 複数の反撃条件が同時に満たされた場合、最も優先度の高いものが実行されます。
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
 *    cond   = elementID === 2
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
 * ※実装ミスにより、機能していません
 * ごめんなさい
 * <CounterExt:
 *    cond = result.critical
 * >
 * 
 * 番号8のスキルに対して反撃。
 * <CounterExt:
 *    cond = skillID === 8
 * >
 * 
 * 番号9,12,20のスキルに対して反撃
 * <CounterExt:
 *    cond = [9,12,20].contains(skillID)
 * >
 * 上記の二つのskillIDをitemIDにすると、
 * 特定の番号のアイテムに反応するようになります。
 * 
 * コモンイベント[1]で処理を行い、スイッチ[5]番がONの時に反撃
 * <CounterExt:
 *    cond  = s(5)
 *    event = 1
 * >
 * 
 * アイテムを使用したときに反撃。
 * 「アイテムなぞ使ってんじゃねえ！」byバ〇バトス(TOD,TOD2)
 * <CounterExt:
 *    cond = itemID !== 0
 *    mode = use
 * >
 * 
 * ■追撃設定
 * 味方の行動後に、別のアクターが追撃するような設定ができます。
 * 設定方法はカウンターと同様です。
 * こちらもchain3など番号を書くと複数指定できます。
 * aはスキルを使用するアクター、bは追撃元になるスキルを使ったアクターです。
 * 
 * 味方がスキル9を使ったときに、スキル5を使って追撃
 * <chain:
 *    cond = skillID ===9
 *    skill=5
 * >
 * 味方が属性3のスキルを使ったときにスキル5で追撃
 * <chain:
 *    cond = elementID===3
 *    skill=5
 * >
 * 
 * 自身がステート6でない時に追撃
 * <chain:
 *    cond = !a.isStateAffected(6)
 * >
 * 味方がステート6の時に追撃
 * <chain:
 *    cond = b.isStateAffected(6)
 * >
 * 
 * 
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
 * ■更新履歴
 * ver 1.1.0
 * 条件を複数指定した際に、一部が無効だったバグを修正。
 * 
 * ver 1.0.0(2017/07/17)
 * 公開後目立ったバグ報告がないので1.0にバージョンを格上げ。
 * また、味方の攻撃に連携できる機能を暫定的に追加。
 * 
 * ver 0.9.4(2017/06/11)
 * ヒットした時のみカウンターするmode = hitを追加。
 * ※後日バグ修正
 * その他、細かい修正。
 * 
 * ver 1.0.0(2018/07/06) 本来発動しないタイミングでカウンターが動いていたのを修正
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
/**
 * TODO
 * ステートカウンター
 * ステートが発生した時、カウンター
 * 行動開始時に監視候補をリスト化し、発生したのをチェックする
 * <StateCounter:
 *  state = 1
 * >
 */
var Imported = (Imported || {});
Imported.Mano_AfterCounter =true;

(function () {
'use strict';

const params = PluginManager.parameters('Mano_AfterCounter');

const setting={
    counterTag :String(params['tagName']||'CounterExt'),
    chainAttackTag :String(params.chainTag),
    modeReg:/(target|use|hit)/,
    msg_format :String( params['msg_format']),
    definableAmmount:Number(params.DefinableAmmount),
    commonElementId:Number(params.commonElementId),
    commonSkillId:Number(params.commonSkillId),
    commonItemId:Number(params.commonItemId),

    fetchIntersectTrait:function(obj,intersect_type) {
        var result =[];
        const note_X =obj.meta[intersect_type.tagName];
        if(note_X){
            var c_base = new IntersectCondition(intersect_type);
            c_base.setMeta(note_X);
            result.push(c_base);
        }
        var max = setting.definableAmmount;
        for(var i=1;i <=max;i+=1 ){
            const note =obj.meta[intersect_type.tagName+i];
            if(note){
                var c_base = new IntersectCondition(intersect_type);
                c_base.setMeta(note);
                result.push(c_base);
            }
        }
        return result;
    },
};
/**
 * 
 * @param {String} name 
 * @param {String} defaultMode 
 * @param {Number} id 
 * @param {String} targetMember 
 * @param {String} message 
 * @param {String} tagName 
 */
function createIntersectType(
    name,
    defaultMode,
    id,
    targetMember,
    message,
    tagName
){
    return {
        name:name,
        defaultMode:defaultMode,
        id:id,
        targetMember:targetMember,
        message:message,
        tagName:tagName
    };
}
//createIntersectType(after_counter.counterTag,"target",1,'counter_MA',params.co)
const INTERSECT_TYPE={    
    COUNTER :{
        name:setting.counterTag,
        defaultMode:'target',
        id:1,
        targetMember:'counter_MA',
        message:String(params.counterMessage),
        tagName:String(params.counterTag),
    },
    CHAIN :{
        name:setting.chainAttackTag,
        defaultMode:'use',
        id:2,
        targetMember:'chain_MA',
        message:String(params.chainMessage),
        tagName:String(params.chainTag),
    },
    STATE:{
        id:3        
    },
};
class NumberProxyC {

    /**
     * @param {Number} id 
     */
    constructor(id){
        this._id =id;
    }
    valueOf(){
        return $gameVariables.value(this._id);
    }
    get value(){
        return this.valueOf();
    }
}

/**
 * @param {String} value 
 */
function asNumber(value){
    let reg = /[(\[](\d)?[)\]]/i;
    const match = reg.exec(value);
    if(match){
        const a =Number(match[1]);
        return new NumberProxyC(a);
    }

    return Number(value);
}

//=============================================================================
// Counter Class
//=============================================================================
class IntersectCondition {

    constructor(type) {
        this.initialize(type);
    }
    initialize(type) {
        this._type = type || INTERSECT_TYPE.COUNTER;
        this._priority = 0;
        this._rate = 100;
        this._cond = null;
        this._mode = type ? type.defaultMode : 'target';
        this._commonEvent = 0;
        this._msg = null;
        this._element = [];
        this._state = [];
        this.setSkillID(0);
    }

    setSourceObject(){
    }

    /**
     * @return {string}
     */
    typename() {
        return this._type.name;
    }
    // skillEmptyItem() {
    //     console.log("ぬるぽ");
    //     return null;
    // }
    // setEmptyItem() {
    //     this._getItemFunc = IntersectCondition.prototype.skillEmptyItem;
    // }
    // /**
    //  * @returns {RPG.Skill}
    //  */
    // skillFromNumber() {
    //     return $dataSkills[this._id];
    // }
    /**
     * @param {Number} id 
     */
    setSkillID(id) {
        this._id = id;
        this._getItemFunc = IntersectCondition.prototype.skillFromNumber;
    }
    // /**
    //  * @returns {RPG.Skill}
    //  */
    // skillFromGameVariables() {
    //     return $dataSkills[$gameVariables.value(this._id)];
    // }
    /**
     * @param {Number} id 
     */
    setSkillVariable(id) {
        this._id = id;
        this._getItemFunc = IntersectCondition.prototype.skillFromGameVariables;
    }
    /**
     * @param {Game_Action} opponentAction 
     */
    skillCopy(opponentAction) {
        return opponentAction.item();
    }
    setSkill(value) {
        this._id = (value);
    }
    item() {
        return $dataSkills[this._id.valueOf()];
        return this._getItemFunc.call(this);
    }
    /**
     * @return {Number}
     */
    rate() {
        return this._rate/100;
    }
    /**
     * @param {Number} rate 
     */
    setRate(rate) {
        this._rate =rate;
    }
    setMode(mode) {
        var match = setting.modeReg.exec(mode);
        if (match) {
            this._mode = match[1];
        }
    }
    /**
     * @returns {Number}
     */
    priority() {
        return this._priority.valueOf();
    }
    /**
     * @param {Number} p 
     */
    setPriority(p) {
        this._priority = p;
    }
    /**
     * @param {String} cond 
     */
    setCondition(cond) {
        this._cond = cond;
    }
    /**
     * @param {Number} eventId 
     */
    setCommonEvent(eventId) {
        this._commonEvent = (eventId);
    }
    /**
     * @param {Game_Actor} subject
     * @param {Game_Action} action
     * @param {RPG.Trait} trait
     * @return {boolean}
     */
    evalCondition(subject, action, trait) {
        const act = action;
        const item = action.item();
        const skill = item;
        const a = subject;
        const b = action.subject();
        const elementID = item.damage.elementId;
        const v = $gameVariables.value.bind($gameVariables);
        const s = $gameSwitches.value.bind($gameSwitches);
        const result = subject.result();
        const skillID = action.isSkill() ? item.id : 0;
        const itemID = action.isItem() ? item.id : 0;
        var condResult = false;
        try {
            condResult = !!eval(this._cond);
        }
        catch (e) {
            console.error(e.toString());
            throw new Error('条件式(cond)が不正です。該当データ(' + trait.name + '<' + this.typename() + '>)式:' + this._cond);
        }
        return condResult;
    }
    numConvertTo(func, value) {
        throw Error("廃止されました");


        const num = Number(value);
        if (!isNaN(num)) {
            func.call(this, num);
        }
        // if(num !==NaN){
        //     func.call(this,num);
        // }
    }
    numOrVariable(str, numFunc, variableFunc) {
        throw Error("廃止されました");
        let reg = /[(\[](\d)?[)\]]/i;
        var match = reg.exec(str);
        if (match) {
            //        console.log(match[1]);
            variableFunc.call(this, match[1]);
        }
        else {
            numFunc.call(this, Number(str));
        }
    }
    /**
     * @param {String} key 
     * @param {String} value 
     */
    patternMatch(key, value) {
        const k = key[0];
        switch (k) {
            //        case 'cond':
            case 'c':
                this.setCondition(value);
                break;
            //        case 'skill':
            case 's':
                this.setSkill(asNumber( value));
                break;
            //        case 'priority':
            //        case 'prio':
            case 'p':
                this.setPriority(asNumber( value));
//                this.numConvertTo(this.setPriority, value);
                break;
            //        case 'rate':
            case 'r':
                this.setRate(asNumber( value));
//                this.numConvertTo(this.setRate, value);
                break;
            //        case 'mode':
            case 'm':
                this.setMode(value);
                break;
            case 'e':
                {
                    if (key[1] === 'v') {
                        this.setCommonEvent(Number(value));
                    }
                }
                break;
            default:
                break;
        }
        ;
    }
    /**
     * @param {String} metaStr 
     */
    setMeta(metaStr) {
        const reg = /(|cond|skill|rate|priority|prio|mode|event)\s*=(.+)/g;
        for (; ;) {
            var match = reg.exec(metaStr);
            if (!match) {
                break;
            }
            this.patternMatch(match[1], match[2]);
        }
    }
    /**
     * 
     * @param {Game_Action} action 
     * @param {Game_Actor} opponent 
     */
    selectTargetIndex(action, opponent) {
        if (action.isForOpponent()) {
            action.setTarget(opponent.index());
        }
        else if (action.isForFriend()) {
            action.setTarget(action.subject().index());
        }
    }
    /**
     * 
     * @param {Game_Actor} subject 
     * @param {Game_Action} opponentAction 
     */
    createAction(subject, opponentAction) {
        const action = new Game_Action(subject);
        const item = this.item();
        if (item) {
            action.setItemObject(item);
        }
        else {
            action.setAttack();
        }
        this.selectTargetIndex(action, opponentAction.subject());
        action._counterObject = this;
        return action;
    }
    /**
     * @param {Game_Actor} subject
     */
    modeMathc(subject) {
        if (this._mode === 'target') {
            return isTargeted(subject);
            //        return !!subject._targetedMA;
        }
        if (this._mode === 'hit') {
            return isHited(subject);
            //        return !!subject._hitMA;
        }
        if (this._mode === 'use') {
            return true;
        }
        return false;
    }


    /**
     * @param {Game_Actor} subject 
     * @param {Game_Action} opponentAction 
     */
    callCommonEvent(subject, opponentAction) {
        if (this._commonEvent !== 0) {
            const item = opponentAction.item();
            $gameVariables.setValue(setting.commonSkillId,item.damage.elementId);
            if(DataManager.isSkill(item)){
                $gameVariables.setValue(setting.commonSkillId,item.id);
                $gameVariables.setValue(setting.commonItemId,0);
            }else if(DataManager.isItem(item)){
                $gameVariables.setValue(setting.commonSkillId,0);
                $gameVariables.setValue(setting.commonItemId,item.id);
            }
            const inter = new Game_Interpreter();
            inter.counter = this;
            inter.a = subject;
            inter.b = opponentAction.subject();
            inter.act = opponentAction;
            inter.setup($dataCommonEvents[this._commonEvent].list);
            inter.update();
        }
    }
    /**
     * @param {Game_Actor} subject 
     */
    canUse(subject) {
        const item = this.item();
        if (item) {
            return subject.canUse(item);
        }
        return true;
    }
    /**
     * 
     * @param {Game_Actor} subject 
     * @param {Game_Action} opponentAction 
     * @param {*} trait 
     */
    Judge(subject, opponentAction, trait) {
        if (!this.modeMathc(subject)) {
            return false;
        }
        if (!(Math.random() < this.rate())) {
            return false;
        }
        this.callCommonEvent(subject, opponentAction);
        var result = true;
        if (this._cond) {
            result = this.evalCondition(subject, opponentAction, trait);
        }
        return result && this.canUse(subject);
    }
    createMessage(myAction) {
        return this._type.message;
    }
}

/**
 * @param {Game_Actor} battler 
 * @returns {Boolean}
 */
function isTargeted(battler){
    const data= BattleManager.findCounterInfo(battler);
    return data && data.target;

    return !!battler._targetedMA;
}

/**
 * @param {Game_Actor} battler 
 * @returns {Boolean}
 */
function isHited(battler){
    const data= BattleManager.findCounterInfo(battler);
    return data && data.hit;
    return !!battler._hitMA;
}


//=============================================================================
// GameAction
//=============================================================================
Game_Action.prototype.isCounter=function(){
    return !!this._counterObject;
};
Game_Action.prototype.createCounterMessage =function(){
    return this._counterObject.createMessage(this  );
};
Game_Action.prototype.counterType =function(){
    return this._counterObject;
};

Game_Action.prototype.canCounter=function(){
    return (!this.item().meta.CanNotCounter) && !this.isCounter() ;
};

Game_Action.prototype.isChainAttack =function(){
    return false;
};
/**
 * @return {boolean}
 */
Game_Action.prototype.canChainAttack=function(){
    return false;
};

Game_Action.prototype.counterSpeed=function(){
    var result = this.speed()
    if(this.subject()._targeted){
        result +=10000;
    }
    return result;
};

class IntersectionVisitor{
    constructor(subject,opponentAction){
        this.intersect =null;
        this.opponentAction = opponentAction;
        this.subject =subject;
    }
    visit(counter,traitObj){
        if(this.intersect){
            if(this.intersect.priority() > counter.priority()){
                return;
            }
        }

        if(counter.Judge(this.subject,this.opponentAction,traitObj)){
            this.intersect = counter;
        }
    }
    getAction(){
        if(this.intersect){
            return this.intersect.createAction(this.subject,this.opponentAction);
        }
        return null;
    }

}

//=============================================================================
// Game_Battler
//=============================================================================
/**
 * @param {Game_Action} opponentAction
 * @return {Game_Action}
 */
Game_Battler.prototype.findCounterAciton=function(opponentAction){
    const visitor =new IntersectionVisitor(this,opponentAction);
    this.acceptForCounter(function(counter,traitObj){
        visitor.visit(counter,traitObj);
    });
    return visitor.getAction();
};
Game_Battler.prototype.acceptForCounter =function(func){
    const list = this.counterTraitObjects();
    for(var i=0; i <list.length;++i){
        var obj = list[i];
        if(obj.counter_MA){
            for(var j =0;j < obj.counter_MA.length;j+=1){
                func(obj.counter_MA[j],obj);
            }
        }
    }
};

/**
 * @param {Game_Action} opponentAction
 * @return {Game_Action}
 */
Game_Battler.prototype.findChainAciton=function(opponentAction){
    const visitor =new IntersectionVisitor(this,opponentAction);
    this.acceptForChain(function(counter,traitObj){
        visitor.visit(counter,traitObj);
    });
    return visitor.getAction();
};


Game_Battler.prototype.acceptForChain =function(func){
    const list = this.counterTraitObjects();
    for(var i=0; i <list.length;++i){
        var obj = list[i];        
        if(obj.chain_MA){
            for(var j =0;j < obj.chain_MA.length;j+=1){
                func(obj.chain_MA[j],obj);
            }
        }
    }
};
/**
 * @param {Number} stateId
 */
Game_Battler.prototype.findStateCounterAction =function(stateId){
    const list = this.counterTraitObjects();
    for(var i=0; i <list.length;++i){
        var obj = list[i];        
        if(obj.stateCounter_MA){
            for(var j =0;j < obj.chain_MA.length;j+=1){
                func(obj.chain_MA[j],obj);
            }
        }
    }
};

Game_Battler.prototype.acceptForStateCounter =function(func){
    const list = this.counterTraitObjects();
    for(var i=0; i <list.length;++i){
        var obj = list[i];
        if(obj.stateCounter_MA){
            for(var j =0;j < obj.stateCounter_MA.length;j+=1){
                func(obj.stateCounter_MA[j],obj);
            }
        }
    }
};

const Game_Battler_addNewState =Game_Actor.prototype.addNewState;
Game_Actor.prototype.addNewState =function(stateId){
    Game_Battler_addNewState.call(this,stateId);
};
Game_Battler.prototype.counterTraitObjects=function(){
    return this.traitObjects();
};
function setCounterTrait_ForObjectList(objList,intersect_type){
    if(!objList){return;}

    const len = objList.length;
    for(var i =1; i< len;i+=1){
        const obj = objList[i];
        obj[intersect_type.targetMember]=setting.fetchIntersectTrait(obj,intersect_type);
    }
}
function setCounterTrait(intersect_type){
    const list =[
        $dataEnemies,
        $dataArmors,
        $dataStates,
        $dataActors,
        $dataClasses
    ];
    list.forEach(function(data){
        setCounterTrait_ForObjectList(data,intersect_type);
    });
}


const Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create =function(){
    Scene_Map_create.call(this);
};
//const zz_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
const Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start= function() {
    setCounterTrait(INTERSECT_TYPE.COUNTER);
    setCounterTrait(INTERSECT_TYPE.CHAIN);
    Scene_Boot_start.apply(this,arguments);
};

//=============================================================================
// BattleManager
//=============================================================================
const zz_MA_AfterCounter_BattleManager_initMembers =BattleManager.initMembers;
BattleManager.initMembers =function(){
    zz_MA_AfterCounter_BattleManager_initMembers.call(this);
    this._reservedCounter =[];
    this._reservedChainAttack=[];
    this._targetsCounterInfo=[];
};

BattleManager.isCounterReserved =function(){
    return this._reservedCounter.length > 0;
};
BattleManager.isChainAttackReserved =function(){
    return this._reservedChainAttack.length > 0;
};
BattleManager.isIntersectActionReserved =function(){
    return this.isCounterReserved() ;
};


BattleManager.getNextCounterAction=function(){
    if(this.isCounterReserved()){
        return this._reservedCounter.shift();
    }
    return this._reservedChainAttack.shift();
};

BattleManager.intersectCounterAction =function(){
    const intersectAction = this.getNextCounterAction();
    if(intersectAction){
        if(!this._orgSubject){
            this._orgSubject =this._subject;
        }
        this._subject = intersectAction.subject();
        this._subject._actions.unshift(intersectAction);
    }else{
        if(this._orgSubject){
            this._subject = this._orgSubject;
            this._orgSubject = null;
        }
    }
};


/**
 * @param {Game_Actor[]} targets 
 */
function createTargetsInfo(targets){
    return targets.map(function(b){
        return {
            battler:b,
            target:false,
            hit:false
        };
    });
}

const BattleManager_startAction=BattleManager.startAction;
BattleManager.startAction =function(){
    BattleManager_startAction.call(this);
//  this._targetsCopy = this._targets.clone();

    this._targetsCounterInfo = createTargetsInfo(this._targets);
};

const zz_MA_AfterCounter_BattleManager_updateTurn = BattleManager.updateTurn;
BattleManager.updateTurn =function(){
    this.intersectCounterAction();
    zz_MA_AfterCounter_BattleManager_updateTurn.call(this);
};
/**
 * 
 * @param {[]} list 
 * @param {Game_Actor} battler 
 */
function hage(list,battler){
    for (const data of list) {
        if(data.battler ===battler){
            return data;
        }
    }
    return null;
};

/**
 * @param {Game_Actor} battler 
 */
BattleManager.findCounterInfo =function(battler){
    return hage(this._targetsCounterInfo,battler);
};


const zz_MA_AfterCounter_BattleManager_invokeNormalAction =BattleManager.invokeNormalAction;
BattleManager.invokeNormalAction=function(subject,target){
    zz_MA_AfterCounter_BattleManager_invokeNormalAction.apply(this,arguments);
    const data = hage(this._targetsCounterInfo,target);
    if(!!data){
        data.target=true;
        data.hit =data.hit||target.result().isHit();
    }
};
BattleManager.counterActionSort =function(){
    this._reservedCounter.sort(function(a,b){
        return b.counterSpeed()-a.counterSpeed();
    });
};

const zz_MA_AfterCounter_BattleManager_endAction =BattleManager.endAction;
BattleManager.endAction =function(){
    zz_MA_AfterCounter_BattleManager_endAction.call(this);
    this.reserveCounter();
    this.reserveChainAttack();
};
BattleManager.pushCounter =function(counterAction){
    this._reservedCounter.push(counterAction);
};
/**
 * @param {Game_Actor} subject
 * @param {Number} skillId
 * @param {Game_Actor} target
 */
BattleManager.intersectActionFromId =function(subject,skillId,target){
    if(subject){
        const finalTarget = target ||-1;
        const action = new Game_Action(subject);
        action.setSkill(skillId);
        action.setTarget(finalTarget);
        this.pushCounter(action);
    }
};

/**
 * @param {Number} enemyIndex 
 * @param {Number} skillId 
 * @param {Game_Actor} target 
 */
BattleManager.intersectEnemyActionFromId =function(enemyIndex,skillId,target){
    this.intersectActionFromId( $gameTroop.members()[enemyIndex],skillId,target);
};

/**
 * @param {Number} enemyIndex 
 * @param {Number} skillId 
 * @param {Game_Actor} target 
 */
BattleManager.intersectActorActionFromId =function(enemyIndex,skillId,target){
    this.intersectActionFromId( $gameParty.members()[enemyIndex],skillId,target);
};

/**
 * @param {Game_Action} action
 */
BattleManager.canCounter =function(action){
    return action.canCounter();
};

BattleManager.reserveCounter =function(){
    const act =this._action;

    if(this.canCounter(act)){
        const counterUser = act.opponentsUnit().aliveMembers();
        for (const battler of counterUser) {
            const counterAction= battler.findCounterAciton(act);
            if(counterAction){
                this.pushCounter(counterAction);
            }
            
        }

        // for(var i=0;i <counterUser.length;i+=1){
        //     const counterAction= counterUser[i].findCounterAciton(act);
        //     if(counterAction){
        //         this.pushCounter(counterAction);
        //     }
        // }
        this.counterActionSort();
    }
};
/**
 * @param {Game_Action} action
 */
BattleManager.canChainAttack =function(action){
    return !this.isCounterReserved() && !action.isCounter() ;
};

/**
 * @param {Game_Action} action 
 */
BattleManager.pushChainAttack =function(action){
    this._reservedChainAttack.push(action);
};
BattleManager.reserveChainAttack =function(){
    const act = this._action;
    if(this.canChainAttack(act)){
        var chainUser = act.friendsUnit().aliveMembers();
        for (const battler of chainUser) {
            const chainAction = battler.findChainAciton(act);
            if(chainAction){
                this.pushChainAttack(chainAction);
            }
            
        }
        // for(var i=0;i <chainUser.length;i+=1){
        //     var chainAction = chainUser[i].findChainAciton(act);
        //     if(chainAction){
        //         this.pushChainAttack(chainAction);
        //     }
        // }
    }
};

const  zz_MA_AfterCounter_Window_BattleLog_startAction =Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction=function(subject,action,targets){
    if(action.isCounter()){
        const msg = action.createCounterMessage();
        if(msg){
            this.push('addText',msg);
        }
    }
    zz_MA_AfterCounter_Window_BattleLog_startAction.apply(this,arguments);
};


})();
