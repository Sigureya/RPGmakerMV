
//=============================================================================
// Mano_LiefPoint.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================
/*:
 * @plugindesc 戦闘不能などに関わる「ライフポイント」の概念を実装します。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * 
 * @param lpRenderOnBattle
 * @type select 
 * @option TP描画を置き換え
 * @value tpReplace
 * @value non
 * @default tpReplace
 *  
 * @param usingEquip
 * @desc 装備画面でのステータスにLPの変化を追加します。
 * @type boolean
 * @default false
 * 
 * @param removeLPminusEquip
 * @desc <LPbase>が負の値の装備を最強装備の候補から除外します。
 * (他のプラグインとの競合が起きた時以外はtrue推奨)
 * @type boolean
 * @default true
 * 
 * @param message
 * 
 * @param lostLifePointMessage
 * @desc ライフポイントを失った際のメッセージです
 * %1にバトラーの名前、%2に数値が入ります。
 * @default %1は%2のライフを失った…
 * @parent message
 * 
 * @param gainLifePointMessage
 * @desc ライフポイントを失った際のメッセージです
 * %1にバトラーの名前、%2に数値が入ります。
 * @default %1は%2のライフを得た！
 * @parent message
 * 
 * @param reviveFailedMessage
 * @desc 死亡を解除する効果が無効だった場合のメッセージです。
 * @default しかし、%1のライフは残っていない…
 * @parent message
 * 
 * @param mixmumLifePoints
 * @desc LPの最大値。
 * この数値より大きい数値には成長しません。
 * @type number
 * @default 99
 * @max 99
 * 
 * @param defaultLifePoint
 * @desc LPのデフォルト値
 * @type number
 * @default 5
 * @min 1
 * 
 * @help
 * LPにダメージ。
 * <LPdamage:数値>
 * LPを回復。
 * <LPrecover:数値>
 * 
 * <LPdamageAll>
 * <LPrecoverAll>
 * LPを全回復とか。
 * 
 * ■装備のメモ欄などに設定する項目
 * <LPbase:1>
 * LP基礎値を1増える装備にできます。
 * <LPbase:-1>
 * LP基礎値が1減る装備にできます。
 * 
 * アクターの最大LPはactor.baseLifePoint()+装備品などによる<LPbase>の合計値で求められます。
 * actor.baseLifePoint()はレベル/10を返します。
 * 
 * ■装備品の挙動について
 * 装備品に<LPbase>は負の値を指定した場合に一部挙動に問題が発生します。
 * イベントコマンドなどで強制的に装備を切り替えた場合に、アクターが死亡する可能性があります。
 * 最強装備コマンドを使用した場合、装備の候補から除外されます。
 * 
 * ■更新履歴
 * 2018/07/06 装備品にLPがマイナスの装備を設定すると正しく動かないのを修正。
 * LP0の場合の強制死亡処理が機能していないのを修正。
 * また、プラグインパラメータ関係なく死亡するように設定しなおし
 * (LP0で無敵化するバグがあったため)
 * 2018/03/02
 * <LPrecoberAll>と<LPdamageAll>が無効だったのを修正
 * 2018/03/02 細かいバグの修正
 * 
 * 2018/01/30 二重にライフポイントが失われたという表示だったのを修正。
*/

/**
 * TODO
 * オーバーキル判定
 * onDamageで判定できるっぽい
 * 
 */
(function(){
    'use strict'
const setting =(function(){
    const param = PluginManager.parameters('Mano_LifePoint');
    return {
        LPzeroDead:true,//(param.LPzeroDead ==='true'),
        lostLifePointMessage:String(param.lostLifePointMessage),
        gainLifePointMessage:String(param.gainLifePointMessage),
        defaultLifePoint:Number(param.defaultLifePoint),
        mixmumLifePoints:Number(param.mixmumLifePoints),
        tpReplace:(param.lpRenderOnBattle ==="tpReplace" ),
    };
})();
/**
 * 
 * @param {Game_Battler} battler 
 * @param {Number} point 
 */
function lifePoitLostMessage(battler,point){
    return setting.lostLifePointMessage.format(battler.name(),point);
}

/**
 * @param {RPG.BaseItem[]} itemList 
 */
function eachItem(itemList){
    const len = itemList.length;
   for(var i =1; i < len; i+=1){
       var item = itemList[i];
       if( item.meta.LPdamage ){
          item.meta.LPdamage = Number(item.meta.LPdamage);
       }
       if( item.meta.LPrecover ){           
          item.meta.LPrecover =  Number(item.meta.LPrecover);
       }
   } 
}

/**
 * @param {RPG.BaseItem[]} itemList 
 */
function eachTraits(itemList){
    const len = itemList.length;
    for(var i =1; i < len; i+=1){
        var item = itemList[i];
        if( item.meta.LPbase ){
            item.meta.LPbase = Number(item.meta.LPbase);
        }
    }      
}

const Scene_Boot_start =Scene_Boot.prototype.start ;
Scene_Boot.prototype.start  =function(){
     eachItem($dataItems);
     eachItem($dataSkills);

     eachTraits($dataClasses);
     eachTraits($dataActors);
     eachTraits($dataWeapons);
     eachTraits($dataArmors);
     Scene_Boot_start.apply(this,arguments);
    };
Game_BattlerBase.prototype.baseLifePoint =function(){
    return 1;
};

Game_Actor.prototype.baseLifePoint =function(){
    return setting.defaultLifePoint + Math.round( this.level /10);
};

Game_BattlerBase.prototype.callcurateMaxLifePoint =function(){
    return this.baseLifePoint();
};
/**
 * @return {RPG.Trait[]}  
 * @param {Game_Actor} actor 
 */
function lifePointTraits(actor){
    const traits = actor.equips();
    traits.push( actor.actor() );
    traits.push( actor.currentClass() );
    return traits;
}

/**
 * @returns {Number}
 * @param {RPG.Trait} trait 
 */
function getLifePointValue(trait){

    if(!!trait){
        const value= trait.meta.LPbase;
        if(!isNaN(value)){
            return value;
        }    
    }
    return 0;
}

const Game_Actor_calcEquipItemPerformance= Game_Actor.prototype.calcEquipItemPerformance;
Game_Actor.prototype.calcEquipItemPerformance =function(item){
    const lpValue = getLifePointValue(item);
    if(lpValue<0){
        return -2000;
    }

    return Game_Actor_calcEquipItemPerformance.call(this,item);
};
Game_Actor.prototype.callcurateMaxLifePoint =function(){
    const traits = lifePointTraits(this);
    
    const len = traits.length;
    var value=0;
    for(var i=0; i < len; i+=1){
        const t = traits[i];
        if(!!t){
            value += getLifePointValue(t);
        }
    }
    return  Math.min(setting.mixmumLifePoints,   value + this.baseLifePoint());
};
Game_ActionResult.prototype.hasLifePointDamage =function(){
    return this.lpDamage !==0;
};

const Game_ActionResult_clear =Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear =function(){
    Game_ActionResult_clear.call(this);
    this.lpDamage =0;
};
const Game_BattlerBase_initMembers =Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers =function(){
    Game_BattlerBase_initMembers.call(this);
    this.initLifePoint();
};
Game_BattlerBase.prototype.initLifePoint =function(){
    this._lp =1;
};


const Game_BattlerBase_refresh=Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh=function(){
    Game_BattlerBase_refresh.call(this);
    this._lp = this._lp.clamp(0,this.mlp);
    if(this._lp <=0 && !this.isDeathStateAffected()){
        this.die();
    }
};
const Window_BattleLog_displayActionResults=Window_BattleLog.prototype.displayActionResults;
/**
 * @param {Game_Battler} target 
 */
Window_BattleLog.prototype.displayActionResults =function(subject,target){
    Window_BattleLog_displayActionResults.apply(this,arguments);
    this.displayLostLifePoint(target);
};
/**
 * @return {String}
 * @param {Game_Battler} battler 
 * @param {Number} lostLifePoint 
 */
function lifePointMessage(battler,lostLifePoint){
    if(lostLifePoint>0){
        return setting.lostLifePointMessage.format(battler.name(),lostLifePoint);
    }
    return setting.gainLifePointMessage.format(battler.name(),-lostLifePoint);    
}

/**
 * @param {Game_Battler} target 
 */
Window_BattleLog.prototype.displayLostLifePoint =function(target){
    if(target.isActor()){
        const lostLifePoint = target.result().lpDamage;
        if(lostLifePoint ===0){return;}

        this.push('pushBaseLine');
        this.push('addText',lifePointMessage(target,lostLifePoint));
        this.push('waitForNewLine');
        this.push('popBaseLine');
    }
};

class Sprite_LPdamage extends Sprite_Damage{
    constructor(){
        super();
    }
    update(){
        if(this.visible){
            super.update();
        }
    }
    isPlaying(){
        return !this.visible || super.isPlaying();
    }
}

const Sprite_Battler_isAnimationPlaying=Sprite_Battler.prototype.isAnimationPlaying;
Sprite_Battler.prototype.isAnimationPlaying =function(){
    if(this._lpDamage && this._lpDamage.isPlaying()){
        return true;
    }
    return Sprite_Battler_isAnimationPlaying.call(this) ;
};
const  Sprite_Battler_updateDamagePopup = Sprite_Battler.prototype.updateDamagePopup;
Sprite_Battler.prototype.updateDamagePopup = function(){
    Sprite_Battler_updateDamagePopup.call(this);
    if(this._lpDamage){
        if(this._damages.length ===0){
            this._lpDamage.visible =true;
        }
        if(!this._lpDamage.isPlaying()){
            this.parent.removeChild(this._lpDamage);
            this._lpDamage =null;
        }
    } 
};

const Sprite_Battler_setupDamagePopup =Sprite_Battler.prototype.setupDamagePopup;
Sprite_Battler.prototype.setupDamagePopup = function(){
    if (this._battler.isDamagePopupRequested()) {
        if (this._battler.isSpriteVisible()) {
            const result= this._battler.result();
            if(result.lpDamage!==0){
                const sprite = new Sprite_LPdamage();
                sprite.x = this.x + this.damageOffsetX();
                sprite.y = this.y + this.damageOffsetY()+10;
                sprite.createDigits(0,result.lpDamage);
                sprite.visible =false;
                this.parent.addChild(sprite);
                this._lpDamage = sprite;
            }
        }
    }
    Sprite_Battler_setupDamagePopup.call(this);
};

const Game_BattlerBase_recoverAll =Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll =function(){
    Game_BattlerBase_recoverAll.call(this);
    this._lp = this.mlp;
};



Object.defineProperties(Game_BattlerBase.prototype,{
    lp:{get:function(){return this._lp;},configurable: true},
    mlp:{get:function(){return this.callcurateMaxLifePoint();},configurable: true},
});

Game_BattlerBase.prototype.lostLifePoint = function(){
    return 1;
};
const  Game_Battler_addNewState =Game_Battler.prototype.addNewState;
Game_Battler.prototype.addNewState =function(stateId){
    Game_Battler_addNewState.call(this,stateId);
    if(stateId ===this.deathStateId()){
         const damage= this.lostLifePoint();         
         this.gainLifePoint( -damage);
    }
};

const Game_Actor_removeState =Game_Actor.prototype.removeState;
Game_Actor.prototype.removeState=function(stateId){
    if(this._lp >0){
        Game_Actor_removeState.call(this,stateId);
    }
};


/**
 * @param {Game_Actor} actor 
 * @param {RPG.EquipItem} item 
 */
function canEquip(actor,item){
    const newValue =  getLifePointValue(item);
    if(!!item){
        const oldValue = getLifePointValue( actor._equips[item.etypeId].object());
        if(oldValue >newValue){
            const mlp = actor.mlp;
            if((mlp -oldValue +newValue) <=0){
                return false;
            }
        }
    }
    return true;
}
Game_BattlerBase.prototype.gainLifePoint=function(point){
    this._lp +=point;
    this.result().lpDamage -=point;
    if(setting.LPzeroDead &&  this._lp <=0){
        this.addState(this.deathStateId());
    }
};


Game_Action.prototype.isLpDamage=function(){
    const meta = this.item().meta;
    return meta.LPdamage || meta.LPdamageAll;
};

Game_Action.prototype.isLpRecover=function(){
    const meta = this.item().meta;
    return meta.LPrecover || meta.LPrecoverAll;
};

const Game_Action_testApply =Game_Action.prototype.testApply;
Game_Action.prototype.testApply =function(target){
    if(target._lp <=0  ){
        return this.isLpRecover();
    }
    if(this.isLpRecover() || this.isLpDamage()){
        return true;
    }


    return Game_Action_testApply.call(this,target);
};



const Game_Action_itemEffectRemoveState =Game_Action.prototype.itemEffectRemoveState;
Game_Action.prototype.itemEffectRemoveState =function(target,effect){
    if(effect.dataId === target.deathStateId()){
        if(target._lp <=0){
            return;
        }
    }
    Game_Action_itemEffectRemoveState.call(this,target,effect);
};

const Game_Action_applyItemUserEffect=Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect =function(target){
    const meta = this.item().meta;
    // targetのresultにLPが変動したことを書きこむ

    if(meta.LPdamageAll){
        target.gainLifePoint(-target.lp)
    }else if(meta.LPdamage){
        target.gainLifePoint(-meta.LPdamage);
    }

    if(meta.LPrecoverAll){
        target.gainLifePoint(target.mlp)
    }else if(meta.LPrecover ){
        target.gainLifePoint(meta.LPrecover);
    }

    Game_Action_applyItemUserEffect.call(this,target);
};


const Window_EquipItem_isEnabled =Window_EquipItem.prototype.isEnabled;
Window_EquipItem.prototype.isEnabled =function(item){

    if(!canEquip(this._actor,item) ){
        return false;
    }
    return Window_EquipItem_isEnabled.call(this,item);
};

const Window_Base_drawActorSimpleStatus =Window_Base.prototype.drawActorSimpleStatus;
Window_Base.prototype.drawActorSimpleStatus =function(actor, x, y, width){
    Window_Base_drawActorSimpleStatus.apply(this,arguments);
    //TODO
    this.drawActorLp(actor,x+304 ,y );
};
Window_Base.prototype.lpMaxColor =function(){
    return this.normalColor();
};

/**
 * @param {Game_Actor} actor
 */
Window_Base.prototype.lpColor =function(actor){
    if(actor.lp<=0){
        return this.deathColor();
    }
    if(actor.lp >=actor.mlp){
        return this.lpMaxColor();
    }
    return this.normalColor();
};
Window_Base.prototype.drawLiefPointCurrentAndMax = function(current, max, x, y,    width, color1, color2) {
    var labelWidth = this.textWidth('LP');
    var valueWidth = this.textWidth('00');
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    if (x3 >= x + labelWidth) {
    this.changeTextColor(color1);
    this.drawText(current, x3, y, valueWidth, 'right');
    this.changeTextColor(color2);
    this.drawText('/', x2, y, slashWidth, 'right');
    this.drawText(max, x1, y, valueWidth, 'right');
    } else {
    this.changeTextColor(color1);
    this.drawText(current, x1, y, valueWidth, 'right');
    }
};
Window_Base.prototype.drawLPtext =function(x,y){
    this.changeTextColor(this.systemColor());
    this.drawText('LP',x,y,44);
} ;
Window_Base.prototype.lpAreaWidth =function(){
    return this.textWidth('LP 00');
};

Window_Base.prototype.drawActorLp_ModeA =function(actor,x,y,width){
    this.drawLPtext(x,y);
    this.changeTextColor(this.lpColor(actor));
    this.drawLiefPointCurrentAndMax(
        actor.lp,actor.mlp,
        x,y,366,this.lpColor(actor),this.normalColor());
};
Window_Base.prototype.drawActorLp_ModeB =function(actor,x,y,width){
    const padding = this.textPadding();
    const lpTextW =this.textWidth('LP');
    this.drawLPtext(x,y);
    this.changeTextColor(this.lpColor(actor));

    this.drawText( actor.lp, x + lpTextW + padding,y,this.textWidth('00'),'right' );
};

var drawActorImple =Window_Base.prototype.drawActorLp_ModeB;

Window_Base.prototype.drawActorLp =function(actor,x,y,width){
    drawActorImple.apply(this,arguments);
};
if(setting.tpReplace){
    Window_Base.prototype.drawActorTp =function(actor, x, y, width){
        this.drawActorLp(actor,x,y,width);
    };    
}


function setupLP(actor){
    if(!actor._lp){
        actor._lp = actor.mlp;
    }    
}

const zz_MA_DataManager_extractSaveContents =DataManager.extractSaveContents;
DataManager.extractSaveContents =function(){
    zz_MA_DataManager_extractSaveContents.apply(this,arguments);
    const members = $gameParty.members();
    members.forEach(setupLP);
};


})();
