//=============================================================================
// Manosasayaki_SkillSealExtend.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015-2016 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/04/19 目立ったバグ報告がなさそうなので、1.0に 
// 0.9.0 2017/04/13 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================


/*:ja
 * @plugindesc スキル封印拡張。
 * 特技の属性などを参照して封印できるようになります。
 * @author しぐれん（魔のささやき）
 * *
 *
 * @help
 * ■設定方法
 * ステートのメモ欄に以下の方法で指定してください。
 * 防具などに設定することはできません。
 * ステート付与防具などのプラグインを併用してください。
 * 
 * パラメータとして渡す数値に0は指定できません。
 * <SealElement:2>      #属性番号2のスキルを封印。
 * <SealElement:炎>     #データベースで属性名が「炎」となっているスキルを封印。
 * <SealElement:2,7>    #属性番号2と7を封印されます。
 * <SealNotElement:2>   #属性番号2以外が封印されます。
 *                       巻き添えで攻撃以外のスキルも封印されるので注意
 * <SealWeaponType:4>   #武器タイプが２に設定されているスキルを封印。
 * <SealWeaponType:剣>  #武器タイプが剣に設定されているスキルを封印。
 * <SealDamage>         #HPにダメージを与えるスキルを封印。
 * <SealNotDamage>      #HPにダメージを与えるスキル以外を封印。
 * <SealHpRecover>      #HPを回復するスキルを封印。特徴の設定も参照します。
 * <SealNotHpRecover>   #HPを回復するスキル以外を封印。
 * 
 * ■拡張用アドバイス
 * 複数属性プラグインを併用する場合、
 * SkillSealExtend.hasElement()を再定義してください。
 * ここでスキルが特定の属性を持っているかどうかを判定しています。
 * 
 * SkillSealExtend.canUse(stateID,skillID)が
 * このプラグインのメインです。
 * バトルイベントなどで参照したい場合、
 * 上記の関数を呼び出すことでこのプラグインで封印されているかを取得できます。
 * trueが返ってきた場合、使用可能な状態です。
 * 
 * SkillSealExtend.userExtendFunction()
 * カスタマイズ用関数です。
 * このプラグインの通常の判定を行った後に、この関数が呼び出されます。
 * この関数でtrueを返した場合、スキルが指定した性質を持っていると判断されます。
 * 
 * SkillSealExtend.notJudge(skill)
 * この関数がtrueを返した場合、そのスキルはこのプラグインによって封印されません。
 * 必要に応じて、ここを書き換えてください。
 * 
 * var 0.9(2017/4/13) 仮公開
 * SealNotについては、仕様変更の可能性あり
 */


(function (global) {
    'use strict';

    var SkillSealExtend = {
        name: 'SkillSealExtend',
    };

    function fliped_array(array_){
        var result = new Object;
        for(var i=1; i < array_.length; ++i){
            result[array_[i]]=i;
        }
        return result;
    }

    function createLookUpTable(){
        SkillSealExtend.ENUM={
                SealDamage:{
                    id:1,
                },                
                SealHpRecover:{
                    id:2,
                },
                SealSupport:{
                    id:3,
                },
                SealElement:{
                    id:11,convertTable:fliped_array( $dataSystem.elements ),
                },
                SealWeaponType:{
                    id:12,convertTable:fliped_array( $dataSystem.weaponTypes),
                },                                
            };

    }
    /**
     * @param skill これから使おうとするスキル
     * @return そのスキルが封印対象から除外されているか。
     * <pre>
     * en:Define conditions to exclude from seal.
     * ja:封印対象から除外する条件を定義します。
     * </pre>
     */
    SkillSealExtend.notJudge=function(skill){
        return skill.id <4; 
        return false;
    }

    SkillSealExtend.ENUM ={};

    SkillSealExtend.test =function(msg,bool){
        console.log(
            msg+ ':'+(bool ? 'success':'fauld')
            );
    };
    SkillSealExtend.debugLog=function(str){
        return;
        console.log(str);
    }

    SkillSealExtend.isNormalAttack=function(skill) {
        return skill.effects.some( function (ef) {
            return ef.code==21 && ef.dataId ==0;
        } );
    }

    SkillSealExtend.checkDamageType =function(skill,list){
        return list.contains(skill.damage.type);
    }

    SkillSealExtend.isHpEffect = function(skill) {
        return SkillSealExtend.checkDamageType(skill,[1, 3, 5]);
    };

    SkillSealExtend.isMpEffect = function(skill) {
        return SkillSealExtend.checkDamageType(skill,[2, 4, 6]);
    };

    SkillSealExtend.isDamage = function(skill) {
        return SkillSealExtend.checkDamageType(skill,[1, 2]);
    };
    SkillSealExtend.isHpDamage_or_HPDrain = function(skill) {
        return SkillSealExtend.checkDamageType(skill,[1, 5]);
    };
    SkillSealExtend.isMpDamage = function(skill) {
        return SkillSealExtend.checkDamageType(skill,[2, 6]);
    };

    SkillSealExtend.isRecover = function(skill) {
        return checkDamageType(skill,[3, 4]);
    };

    SkillSealExtend.isDrain = function(skill) {
        return SkillSealExtend.checkDamageType(skill,[5, 6]);
    };

    SkillSealExtend.isHpRecover = function(skill) {
        return SkillSealExtend.checkDamageType(skill,[3]);
    };
   SkillSealExtend.isHpRecover_or_HpDrain = function(skill) {
        return SkillSealExtend.checkDamageType(skill,[3,5]);
    };

    SkillSealExtend.isMpRecover_or_HpDrain = function(skill) {
        return SkillSealExtend.checkDamageType(skill,[4,6]);
    };

    SkillSealExtend.isHpRecoverSkill =function(skill){
        if(SkillSealExtend.isHpRecover_or_HpDrain(skill) ){
            return true;
        }
        var effects = skill.effects;
        effects.some(function(ef){  
            return ef.code == 11;
         }); 
        return false;
    };

    SkillSealExtend.isDamageSkill=function (skill) {
        return SkillSealExtend.isHpDamage_or_HPDrain(skill);
    }
    SkillSealExtend.isSupportSkill=function(skill){
        return !(SkillSealExtend.isHpRecoverSkill(skill) || SkillSealExtend.isDamageSkill(skill));
    }

    SkillSealExtend.hasElement= function(value,skill){
        return value == skill.damage.elementId;
    };

    SkillSealExtend.requiredWeaponType = function(value ,skill){
        if(skill.requiredWtypeId1!=0){

           var w1_result =  value== skill.requiredWtypeId1;
            if(w1_result){  return true;    }
        }
        if(skill.requiredWtypeId2!=0){
            var w2_result = value== skill.requiredWtypeId2;
            if(w2_result){  return true;    }
        }
        return false;
    };

    SkillSealExtend.userExtendFunction = function(trait,skill){
        return false;
    };

    function SkillSealExtendTrait(){
        this.initialize.apply(this,arguments);
    }

    SkillSealExtendTrait.prototype.initialize = function(){
        this._trait =[];
        this._isValid =false;
    }
    SkillSealExtendTrait.prototype._add =function(funtionID_,value_){
            this._trait.push({
                    funtionID:funtionID_,
                    value:value_,
                });
                this._isValid =true;
    }

    function strToArg(str ,convertTable){
        if(convertTable == undefined){
            convertTable ={};
        }
        var resultArray = str.split(',')
                .map(function(str){
                    var val = convertTable [str];
                     if(val == undefined){ return parseInt(str); }                    
                    return val;
                })
                .filter(function(v){ return !isNaN(v)} );
        return resultArray;
    }

    SkillSealExtendTrait.prototype.hasTrait = function(skill){

        var result= this._trait.some( function(trait){
                switch (trait.funtionID) {
                    case SkillSealExtend.ENUM.SealDamage.id:
                        return SkillSealExtend.isDamageSkill(skill);
                    case SkillSealExtend.ENUM.SealHpRecover.id:
                        return SkillSealExtend.isHpRecoverSkill(skill); 
                    case SkillSealExtend.ENUM.SealSupport.id:
                        return SkillSealExtend.isSupportSkill(skill);
                    case SkillSealExtend.ENUM.SealElement.id:
                        return SkillSealExtend.hasElement(trait.value,skill);
                    case SkillSealExtend.ENUM.SealWeaponType.id:
                        return SkillSealExtend.requiredWeaponType(trait.value,skill);                        
                }
            return SkillSealExtend.userExtendFunction(trait,skill);
        });
        return result;
    };

    SkillSealExtendTrait.prototype.isValid=function(){
        return this._isValid;
    };


    function SealExtendJudge(){
        this.initialize.apply(this,arguments);
    };
    SealExtendJudge.prototype.initialize_imple=function(state,tag,targetTraitObj,funtionID,convertTable){
        var meta = state.meta[tag];
        if(meta ==undefined){return;}
        SkillSealExtend.debugLog('initialize_imple');
        SkillSealExtend.debugLog('state:'+state.name+',tag:'+tag+'funcID:'+funtionID);
        if(meta ===true){
            targetTraitObj._add( funtionID,-1  );
            return;
        }

        var arg = strToArg( meta,convertTable );
        for(var i=0;i < arg.length; ++i){
            SkillSealExtend.debugLog(arg[i]);
            targetTraitObj._add( funtionID,arg[i]  );
        }
    }
    SealExtendJudge.prototype.initialize =function(state){
        this._stateId = state.id;
        this._removeTrait = new SkillSealExtendTrait();
        this._sealTrait = new SkillSealExtendTrait();
     
        for(var tag in SkillSealExtend.ENUM){

            var notTag =tag.replace('Seal','SealNot');
            var obj= SkillSealExtend.ENUM[tag];
            this.initialize_imple(state,tag,this._sealTrait,obj.id,obj.convertTable);
            this.initialize_imple(state,notTag,this._removeTrait,obj.id,obj.convertTable);
        }

    }
    SealExtendJudge.prototype.canUse =function(skill){
        if(SkillSealExtend.notJudge(skill))
        {
            return true;
        }

        if(this._removeTrait.isValid())
        {
            return this._removeTrait.hasTrait(skill);
        }
        return !this._sealTrait.hasTrait(skill);
    }
    SealExtendJudge.prototype.isSeald =function(skill){
        return !this.canUse(skill);
    }
    SealExtendJudge.prototype.isValid = function(){
        return this._sealTrait.isValid() || this._removeTrait.isValid() ;
    }
    SealExtendJudge.prototype.stateID=function(){
        return this._stateId;
    }

    SkillSealExtend.canUse = function(stateID,skillID){
        var extendDefine = $dataStates[stateID].sealExtendJudge;
        if(extendDefine ==undefined){return true;}

        return extendDefine.canUse($dataSkills[skillID]);
    }

    SkillSealExtend.canUseFromBattler=function(battler,skill){

        return battler.states().every(function(state){
            return state.sealExtendJudge.canUse( skill );
           });
    };

    var SealExtendJudgeDummyObject={
        canUse:function(skill){
            return true;
        },
    };

    SkillSealExtend.boot =function(){
        createLookUpTable();
        var len = $dataStates.length;
        len;
        for(var i =1; i < len; ++i){
            
            var judge = new SealExtendJudge($dataStates[i]);
            if( judge.isValid() ){
                $dataStates[i].sealExtendJudge=judge;

            }else{
                $dataStates[i].sealExtendJudge=SealExtendJudgeDummyObject;
                
            }
        }
        var sss = $dataStates;
        sss;
    };

    var zz_Scene_Boot_create_preDef = Scene_Boot.loadSystemImages;
    Scene_Boot.loadSystemImages= function() {
        zz_Scene_Boot_create_preDef.apply(this,arguments);
        SkillSealExtend.boot();
    }

    var zz_Game_BattlerBase_meetsSkillConditions_preDef=Game_BattlerBase.prototype.meetsSkillConditions;
    Game_BattlerBase.prototype.meetsSkillConditions = function(skill){
        return SkillSealExtend.canUseFromBattler( this,skill ) && zz_Game_BattlerBase_meetsSkillConditions_preDef.apply(this,arguments);
    };

})();
