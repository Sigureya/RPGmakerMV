
//=============================================================================
// Mano_InputConfig.js
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
 * @plugindesc 戦闘不能などに関わる「ライフポイント」の概念を実装します。
 * @author しぐれん
 * 
 * @param lpRenderOnBattle
 * @type select 
 * @option TP描画を置き換え
 * @value tpReplace
 * 
 * @default tpReplace
 * 
 * @param LPzeroDead
 * @desc ライフポイントが0になった場合、強制的に死亡させます
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
 * ■職業などに設定する項目
 * <LPbase:1>
 * LP基礎値を1増やします。
 * 
 * アクターの最大LPはactor.baseLifePoint()+装備品などによる<LPbase>の合計値で求められます。
 * actor.baseLifePoint()はレベル/10を返します。
 * 
 * ■更新履歴
 * 2018/01/30 二重にライフポイントが失われたという表示だったのを修正。
*/
(function(){
    'use strict'
const setting =(function(){
    const param = PluginManager.parameters('Mano_LifePoint');
    return {
        LPzeroDead:param.LPzeroDead ==='true',
        lostLifePointMessage:String(param.lostLifePointMessage),
        gainLifePointMessage:String(param.gainLifePointMessage),
        defaultLifePoint:Number(param.defaultLifePoint),
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
 * @return {RPG.BaseItem[]}  
 * @param {Game_Actor} actor 
 */
function lifePointTraits(actor){
    const traits = actor.equips();
    traits.push( actor.actor() );
    traits.push( actor.currentClass() );
    return traits;
}
Game_Actor.prototype.callcurateMaxLifePoint =function(){
    const traits = lifePointTraits(this);
    
    const len = traits.length;
    var value=0;
    for(var i=0; i < len; i+=1){
        if( traits[i] && traits[i].meta.LPbase){
            value+= traits[i].meta.LPbase;
        }
    }
    return value + this.baseLifePoint();
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

Game_Battler.prototype.gainLifePoint=function(point){
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
    if(meta.LPdamage){
        target.gainLifePoint(-meta.LPdamage);
    }
    if(meta.LPrecover ){
        target.gainLifePoint(meta.LPrecover);
    }

    Game_Action_applyItemUserEffect.call(this,target);
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
    var labelWidth = this.textWidth('HP');
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

Window_Base.prototype.drawActorTp =function(actor, x, y, width){
    this.drawActorLp(actor,x,y,width);
};


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
