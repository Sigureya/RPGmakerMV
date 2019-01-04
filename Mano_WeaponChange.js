
//=============================================================================
// Mano_WeaponChange.js
// ----------------------------------------------------------------------------
// Copyright (c) 2019-2019 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================
/*:
 * @plugindesc 戦闘中に武器を切り替えらえるシステムを実装します。
 * 
 * @author しぐれん
 * 
 * @param subWeaponSlots
 * @text サブウェポンの個数
 * @desc サブウェポンを装備できる数を指定します。
 * @type number
 * @default 4
 * @min 1
 *  
 * @param invalidWeaponDisplay
 * @text 不適正な装備の表示方法
 * @desc 装備タイプが不適正なサブウェポンの表示形式を指定します。
 * （戦闘中の設定）
 * @type select
 * @option 表示しない
 * @value 0
 * @option 暗くして表示
 * @value 1
 * @default 0
 * 
 * @param normalAttackSkillList
 * @text 通常攻撃用スキル
 * @desc ここに登録しておくと、武器タイプを見ていい感じに割り当ててくれます。
 * 一つの武器タイプに対して複数登録すると、最後の物のみが有効なります。
 * @type skill[]
 * @default []
 * 
 * @help
 * ■メモ欄の記述
 * <NoDefaultAttack>（武器に設定）
 * 通常攻撃用スキルで登録したスキルの自動追加を無効化します。
 * 特別な武器なので通常武器を違うのにしたい、という場合にどうぞ。
 * 
 * ■概要
 * あらかじめ予備の武器を装備しておき、戦闘中に切り替えるシステムを実装します。
 * 武器に対応するスキルは、スキルの必要武器タイプで判定します。
 * この方法で発動したスキルは、武器振りモーションが適応されます。
 * 
 * 有効となるのは、実際に装備している武器のみです。
 * 
 * 装備が切り替わるのは、実際に攻撃を行う直前です。
 * 行動時に混乱していると、武器の切り替えに失敗します。
 * また、眠りなどの状態異常によって行動不能の場合も切り替えに失敗します。
 * 
 * スキルの表示順
 * 通常攻撃→武器固有スキル→アクターが習得しているスキルの順です。
 * 
 * 二刀流との相性はとても悪いです。
 * 動く気はしますが、保証はしません。
 * 
 * 更新履歴
 * 2019/01/04 ver 1.0 公開
*/


(function(){
    'use strict';
    function getPluginParam(){ return PluginManager.parameters("Mano_WeaponChange");}
    const InValidWeaponDisplayMode ={
        remove:0,
        disabled:1,
    };

    const ENUM_ACTOR_COMMANDNAME =Object.freeze({
        name:0,
        type:1
    });

    const setting =(function(){
        const param =getPluginParam();
        const result ={
            actorCommandName:Number(param.actorCommandName) ||0,
            commandSymbol:"weaponMA",
            usingIcon:false,
            subWeaponSlots:Number(param.subWeaponSlots) ||1,
            openSymbol:"shift",
//            emptyWeaponOk: (param.emptyWeaponOk ==="true"),
            invalidWeaponDisplay:Number(param.invalidWeaponDisplay),
            /**
             * @type {Map<Number,RPG.Skill>}
             */
            normalAttackSkillMap:new Map(),
        };
        return result;
    })();

const Scene_Boot_Start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function(){
    Scene_Boot_Start.call(this);
    const param =getPluginParam();
    const skillIdList = JSON.parse(param.normalAttackSkillList ||"[]");
    for (const iterator of skillIdList) {
        const skillId = Number(iterator);
        const skill = $dataSkills[skillId];
        if(skill){
            if(skill.requiredWtypeId1 !==0){
                setting.normalAttackSkillMap.set(skill.requiredWtypeId1,skill);
            }
            if(skill.requiredWtypeId2 !==0){
                setting.normalAttackSkillMap.set(skill.requiredWtypeId2,skill);
            }
        }
    }
};

const DataManager_extractSaveContents =DataManager.extractSaveContents;
DataManager.extractSaveContents =function(contents){
    DataManager_extractSaveContents.call(this,contents);
    for (const actor of $gameActors._data) {
        if(actor){
            actor.refreshSubWeaponSlot();
        }
    }
};

/**
 * @param {Game_Actor} actor 
 */
function createSubWeaponSlot(actor){
    const subWaponSlot = actor.numWeaponSlot();
    const slots = actor.equipSlots();
    const result = [];

    result.length = subWaponSlot;
    for(var i =0; i < subWaponSlot; ++i){
        const equipType = slots[i];
        if(equipType ===1){
            result[i]=actor._equips[i];
        }else{
            result[i] =new Game_Item();
        }
    }
    return result;
}
const Game_Actor_setup =Game_Actor.prototype.setup;
Game_Actor.prototype.setup =function(actorId){
    Game_Actor_setup.call(this,actorId);
    this.refreshSubWeaponSlot();
};
Game_Actor.prototype.refreshSubWeaponSlot =function(){
    if(!this._subWeaponSlot){
        this._subWeaponSlot = createSubWeaponSlot(this);
    }
};
Game_Actor.prototype.isSubWeaponChangeOk =function(slotId){
    return !this.isEquipTypeLocked(1);
};

Game_Actor.prototype.clearSubWeapons =function(){
    const length = this._subWeaponSlot.length;
    for(var i =0; i < length; ++i){
        if(this.isSubWeaponChangeOk(i)){
            this.changeSubWeapon(i,null);
        }
    }
};

const Game_Actor_clearEquipments=Game_Actor.prototype.clearEquipments;
Game_Actor.prototype.clearEquipments =function(){
    Game_Actor_clearEquipments.call(this);
    this.clearSubWeapons();

};

/** 
 * @param {Number} sorceIndex
 * @param {Number} targetIndex
*/
Game_Actor.prototype.bindSubWeapon =function(sorceIndex,targetIndex){
    if(!this.canBindSubWeapon(sorceIndex,targetIndex)){
        return false;
    }
    const finalTargetIndex = targetIndex ||0;
    const newWeapon = this._subWeaponSlot[sorceIndex];
    if(newWeapon){
        this._equips[finalTargetIndex] = newWeapon;
        this.refresh();
    }
    return true;
};

/** 
 * @param {Number} SubWeaponIndex
 * @param {Number} targetIndex
*/
Game_Actor.prototype.canBindSubWeapon =function(SubWeaponIndex, targetIndex){

    /**
     * @type {Game_Item}
     */
    const subWeapon = this._subWeaponSlot[SubWeaponIndex];
    if(!subWeapon){
        return false;
    }
    if(!subWeapon.isWeapon()){
        return false;
    }

    if(!this.canEquip(subWeapon.object())){
        return false;
    }
    const finalTargetIndex = targetIndex ||0;
    const item = this._equips[finalTargetIndex];
    if(item){
        const slots =  this.equipSlots();
        if(slots[finalTargetIndex]===1){
            return true;
        }
    }
    return false;
};



/**
 * @returns {Game_Item}
 */
Game_Actor.prototype.getSubWeapon =function(index){
    return this._subWeaponSlot[index];
};


Game_Actor.prototype.numWeaponSlot =function(){
    return setting.subWeaponSlots;
};

Game_Actor.prototype.subWeaponSlot =function(){
    return this._subWeaponSlot;
};
Game_Actor.prototype.isSubWeaponBinded =function(index){
    /**
     * @type {Game_Item}
     */
    const subWeapon =  this._subWeaponSlot[index];
    if(subWeapon){
        for (const equip of this._equips) {
            if(equip ===subWeapon){
                return true;
            }
        }
    }
    return false;
};

/**
 * @param {Number} mainSlotId メインスロットの番号
 * @returns {Number} 対応したスロットにバインドされているサブウェポン。見つからなかった場合、NaNを返す。ただ、NaNを返す時はエラー起こしていると思うよ。
 */
Game_Actor.prototype.getBindedSubWeaponSlot =function(mainSlotId){
    const item = this._equips[mainSlotId];
    if(item){
        const length =this._subWeaponSlot.length
        for(var i=0; i<length ; ++i){
            if(item === this._subWeaponSlot[i] ){
                return i;
            }
        }
    }
    throw (new Error("バインドされてないです"));
    return NaN;
};

/**
 * @param {Number} index
 * @param {RPG.Weapon} weapon
 */
Game_Actor.prototype.changeSubWeapon =function(index,weapon){
    if( weapon &&!DataManager.isWeapon(weapon)){
        return false;
    }
    /**
     * @type {Game_Item}
     */
    const itemClass = this._subWeaponSlot[index];
    if(itemClass){
        const oldItem = itemClass.object();
        if(this.tradeItemWithParty(weapon,oldItem)){
            itemClass.setObject(weapon);
            this.refresh();
            return true;
        }
    }
    return false;
};

Game_Actor.prototype.subWeaponList =function(){
    return this._subWeaponSlot;
};


const Game_Action_setConfusion = Game_Action.prototype.setConfusion;
Game_Action.prototype.setConfusion =function(){
    Game_Action_setConfusion.call(this);
    this._subWeaponIndex_MA =NaN;
};

Game_Action.prototype.setSubWeaponIndex =function(subWeaponIndex){
    this._subWeaponIndex_MA =subWeaponIndex;
};
Game_Action.prototype.getSubWeaponIndex =function(){
    return this._subWeaponIndex_MA;
};

Game_Battler.prototype.canWeaponBind =function(){
    return false;
};


const Game_Action_prepare=Game_Action.prototype.prepare;
Game_Action.prototype.prepare =function(){
    Game_Action_prepare.call(this);

    /**
     * @type {Number}
     */
    const subWeaponIndex =this._subWeaponIndex_MA;
    if(isNaN(subWeaponIndex )){
        return;
    }
    /**
     * @type {Game_Actor}
     */
    const actor = this.subject();
    if(!actor.isActor()){ return;}

    if(!actor.canMove() ){return;}

    actor.bindSubWeapon(subWeaponIndex);
};
Game_Action.prototype.isSubWeaponSkill =function(){
    return !isNaN(this._subWeaponIndex_MA);
};


/**
 * @param {Game_Action} action
 */
Game_Actor.prototype.performActionBySubWeapon =function(action){
    /**
     * @type {Game_Item}
     */
    const item = this.getSubWeapon(action.getSubWeaponIndex());
    if(!item){return;}
    /**
     * @type {RPG.Weapon}
     */
    const weapon = item.object();
    if(!weapon){return;}
    const attackMotion = $dataSystem.attackMotions[weapon.wtypeId];
    if (attackMotion) {
        if (attackMotion.type === 0) {
            this.requestMotion('thrust');
        } else if (attackMotion.type === 1) {
            this.requestMotion('swing');
        } else if (attackMotion.type === 2) {
            this.requestMotion('missile');
        }
        this.startWeaponAnimation(attackMotion.weaponImageId);
    }
};
const Game_Actor_performAction=Game_Actor.prototype.performAction;
Game_Actor.prototype.performAction =function(action){

    const subWeaponIndex = action.getSubWeaponIndex();
    if(isNaN( subWeaponIndex)){
        Game_Actor_performAction.call(this,action);
        return;
    }
    Game_Battler.prototype.performAction.call(this,action);
    this.performActionBySubWeapon(action);
};

//Game_Actor.prototype.
//最強装備の時に、サブウェポンを元に戻すために使う
//マイセットにも使う
Game_Actor.prototype.makeSubWeaponInfo =function(){
    const list = subWeaponList(this);
    list.map(function(item){
//        item.itemId();
    });
};
Game_Actor.prototype.isSubWponsValid =function(){
    const list = subWeaponList(this);
    for (const item of list) {
        if( !item.isNull() && !item.isWeapon() ){
            return false;
        }
    }
    return true;

};
/**
 * @param {Game_Actor} actor 
 * @returns {Game_Item[]}
 */
function subWeaponList(actor){
    if(actor){
        return actor.subWeaponList();
    }
    return [];
}
const Game_Party_isAnyMemberEquipped =Game_Party.prototype.isAnyMemberEquipped;
Game_Party.prototype.isAnyMemberEquipped =function(item){
    return Game_Party_isAnyMemberEquipped.call(this,item)  || this.members().some(function(actor){
        const list = subWeaponList(actor);
        return list.some(function(gameItem){
            return gameItem.object() ===item;
        });
    });
};

//メモ やり方次第では、ヘッダーとしてくっつけるシステムを入れる
class Window_SubWeaponSlot extends Window_Selectable{
    initialize(x,y,w,h){
        this._actor =null;
        super.initialize(x,y,w,h);
        this.openness =0;
        this._mainSlot =-1;
        this.setStatusWindow(null);
    }
    /**
     * @param {Number} index 
     */
    setMainSlot(index){
        this._mainSlot =index;
    }

    /**
     * @returns {Boolean}
     * @param {Number} index 
     */
    isBinded(index){
        return this._actor.isSubWeaponBinded(index);
    }
    needNewItem(){
        const item= this.item(this._index);
        if(item){
            return item.isNull() || this.isBinded(this._index)  || !this._actor.canEquip(item.object());
        }
        return false;
    }

    /**
     * @param {Game_Item} item 
     */
    isBindableItem(item){
        if(item){
           return item.isWeapon() && this._actor.canEquip(item.object());
        }
        return false;
    }

    isCurrentItemEnabled(){
        return this._actor.isSubWeaponChangeOk(this._index);
    }

    /**
     * @param {Game_Actor} actor 
     */
    setActor(actor){
        const needRefresh = this._actor !== actor;
        this._actor = actor;
        if (needRefresh) {
            this.setMainSlot(0);
            this.refresh();
        }
    }

    /**
     * @returns {Game_Item}
     * @param {Number} index 
     */
    item(index){
        return this._actor.getSubWeapon(index);
    }
    /**
     * @param {Window_EquipStatus} statusWindow
     */
    setStatusWindow (statusWindow){
        this._statusWindow =statusWindow;
    }

    updateHelp(){
        super.updateHelp();
        if(this._actor && this._statusWindow){
            /**
             * @type {Game_Actor}
             */
            const actorCopy =JsonEx.makeDeepCopy(this._actor);
            actorCopy.bindSubWeapon(this._index,this._mainSlot);
            this._statusWindow.setTempActor(actorCopy);
        }
    }
    /**
     * @returns {String}
     * @param {Number} index 
     */
    slotName(index){
        return $dataSystem.equipTypes[1] + (index+1);
    }
    slotNameWidth(){
        return 138;
    }
    /**
     * @param {Number} index 
     */
    drawItem(index){
        if(!this._actor){
            return;
        }
        const item = this.item(index);
        if(!item){
            return;
        }
        this.changePaintOpacity(this.isBinded(index)  );
        const rect = this.itemRectForText(index);
        this.changeTextColor(this.systemColor());
        const slotNameWidth =this.slotNameWidth();
        this.drawText(this.slotName(index),rect.x,rect.y,slotNameWidth);
        const itemX = rect.x + slotNameWidth;
        this.drawItemName(item.object(),itemX,rect.y);
    }


    maxItems(){
        return  this._actor ? this._actor.subWeaponSlot().length :0;
    }
};
const Window_EquipSlot_initialize =Window_EquipSlot.prototype.initialize;
Window_EquipSlot.prototype.initialize =function(x,y,w,h){
    Window_EquipSlot_initialize.call(this,x,y,w,h);
    this._slotList_MA=[];
};
const Window_EquipSlot_setActor =Window_EquipSlot.prototype.setActor;
Window_EquipSlot.prototype.setActor =function(actor){
    const needRefresh = this._actor !==actor;
    Window_EquipSlot_setActor.call(this,actor);
    if(needRefresh && actor ){
        this._slotList_MA = actor.equipSlots();
    }
};

Window_EquipSlot.prototype.isWeaponSlot =function(index){
    return this._slotList_MA[index]===1;
};
Window_EquipSlot.prototype.currentSlotIsWeapon =function(){
    return this.isWeaponSlot(this._index);
};

const Scene_Equip_createSlotWindow  =Scene_Equip.prototype.createSlotWindow;
Scene_Equip.prototype.createSlotWindow =function(){
    Scene_Equip_createSlotWindow.call(this);
    this._slotWindow.setHandler('ok',this.onSlotOkEX.bind(this));
    this.createSubWeaponSlotWindow();
};

Scene_Equip.prototype.onSlotOkEX =function(){
    if(this._slotWindow.currentSlotIsWeapon()){
        this.openSubWeaponWindow();
    }else{
        this.onSlotOk();
    }
};

const Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
Scene_Equip.prototype.onItemOk =function(){
    if(!this._subWeaponSlotWindow.isOpen()){
        Scene_Equip_onItemOk.call(this);
        return;
    }
    SoundManager.playEquip();
    const item =this._itemWindow.item();
    const index =this._subWeaponSlotWindow.index();

    this.actor().changeSubWeapon(index,item);
    this._subWeaponSlotWindow.activate();
    this._subWeaponSlotWindow.refresh();
    this._slotWindow.refresh();
    this._itemWindow.deselect();
    this._itemWindow.refresh();
    this._statusWindow.refresh();

};
const Scene_Equip_onItemCancel =Scene_Equip.prototype.onItemCancel;
Scene_Equip.prototype.onItemCancel = function() {
    if(this._subWeaponSlotWindow.isOpen()){
        this._itemWindow.deselect();
        this._subWeaponSlotWindow.activate();
    }else{
        Scene_Equip_onItemCancel.call(this);
    }
};
Scene_Equip.prototype.subWeaponSlotWindowRect =function(){
    return new Rectangle(
        this._slotWindow.x,
        this._slotWindow.y,
        this._slotWindow.width,
        this._slotWindow.height
    );
};

Scene_Equip.prototype.createSubWeaponSlotWindow =function(){
    const rect = this.subWeaponSlotWindowRect();
    const window= new Window_SubWeaponSlot(rect.x,rect.y,rect.width,rect.height);
    window.setHelpWindow(this._helpWindow);
    window.setHandler("ok",this.onSubWeaponSlotOk.bind(this));
    window.setHandler("cancel",this.onSubWeaponSlotCancel.bind(this));
    window.setHelpWindow(this._helpWindow);
    window.setStatusWindow(this._statusWindow);
    this.addWindow(window);
    this._subWeaponSlotWindow = window;
};

Scene_Equip.prototype.onSubWeaponSlotOk =function(){

    if(this._subWeaponSlotWindow.needNewItem()){
        this._itemWindow.select(0);
        this._itemWindow.activate();
        return;
    }
    SoundManager.playEquip();
    this._actor.bindSubWeapon(this._subWeaponSlotWindow.index());
    this._subWeaponSlotWindow.activate();
    this._subWeaponSlotWindow.refresh();
    this._slotWindow.refresh();
    this._statusWindow.refresh();
};

Scene_Equip.prototype.onSubWeaponSlotCancel =function(){
    this._subWeaponSlotWindow.close();
    this._slotWindow.activate();
};

Scene_Equip.prototype.openSubWeaponWindow =function(){
    const index = this._slotWindow.index();
    const newIndex = this._actor.getBindedSubWeaponSlot(index);
    this._subWeaponSlotWindow.setActor(this._actor);
    if(isNaN(newIndex)){
        this._subWeaponSlotWindow.select(0);
        this._subWeaponSlotWindow.setMainSlot(0);
    }else{
        this._subWeaponSlotWindow.select(newIndex);
        this._subWeaponSlotWindow.setMainSlot(index);
    }
    this._subWeaponSlotWindow.open();
    this._subWeaponSlotWindow.refresh();
    this._subWeaponSlotWindow.activate();

};


class LastSkillMemory{
    constructor(){
        this._map={};
    }
    /**
     * @param {RPG.Weapon} weapon 
     * @param {RPG.Skill} skill 
     */
    saveLastSkill(weapon,skill){
        this._map[weapon.id] =skill;
    }

    /**
     * @returns {RPG.Skill}
     * @param {RPG.Weapon} weapon 
     */
    getSkill(weapon){
        if(weapon){
            const skill = this._map[weapon.id];
            return skill;
        }
        return null;
    }
}

class Window_BattleEquipSkill_MA extends Window_BattleSkill{
    /**
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} w 
     * @param {Number} h 
     */
    constructor(x,y,w,h){
        super(x,y,w,h);
        this._weapon =null;
        this._actor =null;
        this._subWeaponIndex =-1;
        this._lastSkillMemory ={};
    }

    /**
     * @param {Number} newIndex 
     */
    setSubWeaponIndex(newIndex){
        this._subWeaponIndex =newIndex;
    }
    getSubWeaponIndex(){
        return this._subWeaponIndex;
    }


    /**
     * @param {RPG.Weapon} weapon 
     * @returns {RPG.Skill}
     */
    normalAttackSkill(weapon){
        if(weapon.meta.NoDefaultAttack){
            return null;
        }

        if(weapon){
           const skill=  setting.normalAttackSkillMap.get(   weapon.wtypeId);
           if(skill){
               return skill;
           }
        }
        return $dataSkills[ this._actor.attackSkillId()] ;
    }

    saveCurrentSkill(){
        this.saveLastSkill(this.item());
    }

    /**
     * @param {RPG.Skill} skill 
     */
    saveLastSkill(skill){
        const memory = this.getLastSkillMemory();
        memory.saveLastSkill(this.weapon(),skill);
    }

    /**
     * @returns {RPG.Weapon}
     */
    weapon(){
        const list= subWeaponList(this._actor);
        const item= list[this._subWeaponIndex];
        if(item){
            return item.object();
        }
        return null;
    }

    /**
     * @returns {LastSkillMemory}
     */
    getLastSkillMemory(){
        const actorId = this._actor.actorId();
        if(!this._lastSkillMemory[actorId]){
            this._lastSkillMemory[actorId] = new LastSkillMemory();
        }
        return this._lastSkillMemory[actorId];
    }

    selectLast(){
        const memory = this.getLastSkillMemory();
        const skill= memory.getSkill(this.weapon());
        if(skill){
            const index = this._data.indexOf(skill);
            if(index >=0){
                this.select(index);
                return;
            }
        }
        this.select(0);
    }

    /**
     * @param {Game_Actor} actor 
     */
    setActor(actor){
        this._actor =actor;
    }

    show(){
        this.refresh();
        super.show();
    }

    /**
     * @param {RPG.Skill} skill 
     */
    includes(skill){
        if(this._weapon && skill){
            const wType =this._weapon.wtypeId;
            return wType=== skill.requiredWtypeId1 || wType ===skill.requiredWtypeId2 ;
        }
        return false;
    }

    /**
     * @param {RPG.Weapon} weapon 
     * @param {RPG.Skill} skill 
     */
    match(weapon,skill){
        const wType = weapon.wtypeId;
        return wType=== skill.requiredWtypeId1 || wType ===skill.requiredWtypeId2 ;
    }

    /**
     * @param {RPG.Skill} skill 
     */
    isEnabled(skill){
        const actor = this._actor;
        return skill &&(actor.meetsUsableItemConditions(skill) 
          && actor.canPaySkillCost(skill)
          && !actor.isSkillSealed(skill.id)
          && !actor.isSkillTypeSealed(skill.stypeId)
        );
    }

    /**
     * 
     * @param {RPG.Weapon} weapon 
     */
    weaponSkills(weapon){
        const result = [];
        const atk = this.normalAttackSkill(weapon);
        if(atk){
            result.push(atk);
        }
        for(const t of  weapon.traits){
            if(t.code ===Game_BattlerBase.TRAIT_SKILL_ADD){
                const skill = $dataSkills[t.dataId];
                if(skill&& this.match(weapon,skill)){
                    result.push(skill);
                }
            }
        }
        return result;
    }

    /**
     * @param {RPG.Weapon} weapon
     * @returns {RPG.Skill[]}
     */
    createSkillList(weapon){
        if(this._actor && weapon){
            const result = this.weaponSkills(weapon);
            const skills = this._actor.skills();
            for (const iterator of skills) {
                if(this.match(weapon,iterator)){
                    if(!result.contains(iterator)){
                        result.push(iterator);
                    }
                }
            }
            return result;
        }
        return [];
    }

    makeItemList(){
        this._data = this.createSkillList(this.weapon());
    }
}

Window_ActorCommand.prototype.isWeaponEnabled =function(weapon){
    return true;
};
Window_ActorCommand.prototype.getSubWeaponIndex =function(){
    const data= this.currentData();
    if(data && data.symbol ===setting.commandSymbol ){
        return data.ext;
    }
    return -1;
};

Window_ActorCommand.prototype.getSubWeapon =function(){
    const data= this.currentData();
    if(data && data.symbol ===setting.commandSymbol ){
        const index = data.ext;
        return this._actor.getSubWeapon(index);
    }
    return null;
};

/**
 * @param {Window_ActorCommand} commandWindow 
 * @param {Game_Actor} actor 
 */
function addSubWeaponCommandByRemove(commandWindow,actor){
    const list = subWeaponList(actor);
    const len = list.length;

    for(var i=0; i <len ;++i){
        const item = list[i];
        const weapon = item.object();
        if(weapon  && commandWindow.isUseableSubWeapon(weapon)){
            commandWindow.addCommand(
                weapon.name,
                setting.commandSymbol,
                true,
                i
            );
        }
    }
}

/**
 * @param {Window_ActorCommand} commandWindow 
 * @param {Game_Actor} actor 
 */
function addSubWeaponCommandBydisabled(commandWindow,actor){
    const list = subWeaponList(actor);
    const len =list.length;
    for(var i=0; i <len ;++i){
        const item = list[i];
        const weapon = item.object();
        if(weapon){
            commandWindow.addCommand(
                weapon.name,
                setting.commandSymbol,
                commandWindow.isUseableSubWeapon(weapon),
                i
            );
        }
    
    }
}
/**
 * @param {RPG.Weapon} weapon 
 * @returns {boolean}
 */
Window_ActorCommand.prototype.addSubWeaponCommand =function(){
    if(InValidWeaponDisplayMode.disabled===setting.invalidWeaponDisplay){
        addSubWeaponCommandBydisabled(this,this._actor);
    }else if(InValidWeaponDisplayMode.remove===setting.invalidWeaponDisplay){
        addSubWeaponCommandByRemove(this,this._actor);
    }
};

Window_ActorCommand.prototype.isUseableSubWeapon =function(weapon){
    return this._actor.canEquip(weapon);
};
const Window_ActorCommand_addSkillCommands=Window_ActorCommand.prototype.addSkillCommands;
Window_ActorCommand.prototype.addSkillCommands =function(){
    Window_ActorCommand_addSkillCommands.call(this);
    this.addSubWeaponCommand();
};

/**
 * @param {Number} index
 */
Window_ActorCommand.prototype.drawWeaponCommand =function(index){
    const data = this._list[index];
    if(!data){
        return;
    }
    const rect = this.itemRectForText(index);
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index)  );
    if(setting.usingIcon){
        this.drawItemName(data.ext,rect.x,rect.y,rect.width);
    }else{
        this.drawText(data.name,rect.x,rect.y,rect.width);
    }
};

// const Window_ActorCommand_drawItem = Window_ActorCommand.prototype.drawItem;
// Window_ActorCommand.prototype.drawItem = function(index){
//     const commandSymbol=this.commandSymbol(index);
//     if(  commandSymbol ===setting.commandSymbol){
//         this.drawWeaponCommand(index);
//     }else{
//         Window_ActorCommand_drawItem.call(this,index);
//     }
// };

Scene_Battle.prototype.commandSubWeapon_MA =function(){
    const actor =BattleManager.actor();
    const weaponIndex = this._actorCommandWindow.getSubWeaponIndex();
    this._equipSkillWindow_MA.setSubWeaponIndex(weaponIndex);
    this._equipSkillWindow_MA.setActor(actor);
    this._equipSkillWindow_MA.show();
    this._equipSkillWindow_MA.activate();

};
const Scene_Battle_createActorCommandWindow =Scene_Battle.prototype.createActorCommandWindow ;
Scene_Battle.prototype.createActorCommandWindow =function(){
    Scene_Battle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler(setting.commandSymbol,this.commandSubWeapon_MA.bind(this));
};

Scene_Battle.prototype.createBattleEquipSkillWindow_MA =function(){
    const wy = this._helpWindow.y + this._helpWindow.height;
    const wh = this._statusWindow.y - wy;
//    const x = this.
    const window = new  Window_BattleEquipSkill_MA(0, wy, Graphics.boxWidth, wh);

    window.setHandler("ok",this.onWeaponSkillOk_MA.bind(this));
    window.setHandler("cancel",this.onWeaponSkillCancel_MA.bind(this));
    window.setHelpWindow(this._helpWindow);
    this._equipSkillWindow_MA =window;
    this.addWindow(window);
};
Scene_Battle.prototype.onWeaponSkillCancel_MA =function(){
    this._equipSkillWindow_MA.hide();
    this._actorCommandWindow.activate();
};

Scene_Battle.prototype.onWeaponSkillOk_MA =function(){
    /**
     * @type {RPG.Skill}
     */
    const skill = this._equipSkillWindow_MA.item();
    const action = BattleManager.inputtingAction();
    action.setSkill(skill.id);
    action.setSubWeaponIndex(this._equipSkillWindow_MA.getSubWeaponIndex());
    this._equipSkillWindow_MA.saveCurrentSkill();
    this.onSelectAction();
    this._equipSkillWindow_MA.hide();
};

const Scene_Battle_createSkillWindow =Scene_Battle.prototype.createSkillWindow;
Scene_Battle.prototype.createSkillWindow =function(){
    Scene_Battle_createSkillWindow.call(this);
    this.createBattleEquipSkillWindow_MA();
};
const Scene_Battle_isAnyInputWindowActive=Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive =function(){
   return this._equipSkillWindow_MA.active  ||Scene_Battle_isAnyInputWindowActive.call(this);
};
const Scene_Battle_onEnemyCancel =Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel =function(){
    Scene_Battle_onEnemyCancel.call(this);
    if(this._actorCommandWindow.currentSymbol()===setting.commandSymbol){
        this._equipSkillWindow_MA.show();
        this._equipSkillWindow_MA.activate();
    }
};

})();