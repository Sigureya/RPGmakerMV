 //=============================================================================
// Mano_StateVariable.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:
 * @plugindesc ステートに変数を設定します。
 * 変数が0になると、そのステートは解除されます。
 * 
 * @author しぐれん（魔のささやき）
 * 
 * @help
 * ステートに変数を設定します。
 * 変数が0になると、そのステートは解除されます。
 * 
 * ステート変数を使いたいステートのメモに以下の記述をしてください。
 * <StateVariable:
 *   init = 5
 *   max  = 10
 * >
 * init =で指定した数値が変数の初期値です。
 * maxは最大値で、この数値よりも大きくはなりません。
 * 
 * スキルには以下の設定を入れます。
 * 減らしたいときは、マイナスの数値を設定してください。
 * stateは対象のステートの番号、valueは変動値です。
 * 数値を減らしたい場合、valueに不の値を設定してください。
 * 
 * 攻撃対象の数値を操作する場合
 * <StateVariableAdd:
 *   state = 5
 *   value = 1
 *  自身の数値を操作する場合
 * <StateVariableAddSelf:
 *   state = 5
 *   value = 1
 * >
 * 
 * var 0.9.0(2017/6/11) 公開
 */

(function (global) {
    'use strict';

var zz_MA_StateVariable_Game_Battler_clearStates =Game_Battler.prototype.clearStates;
Game_BattlerBase.prototype.clearStates =function(){
    zz_MA_StateVariable_Game_Battler_clearStates.call(this);
    this._stateVariable={};
}

var zz_MA_StateVariable_Game_Battler_eraseState =Game_Battler.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function(stateId){
    zz_MA_StateVariable_Game_Battler_eraseState.apply(this,arguments);
    delete this._stateVariable[stateId];
}

Game_BattlerBase.prototype.isStateExpiredWithVariable =function(stateId){
    return ((!!$dataStates[stateId].variable_MA) &&  this._stateVariable[stateId] <= 0);

}

var zz_MA_StateVariable_Game_Battler_Base_isStateExpired =Game_BattlerBase.prototype.isStateExpired;
Game_BattlerBase.prototype.isStateExpired = function(stateId){
    return zz_MA_StateVariable_Game_Battler_Base_isStateExpired.call(this,stateId)
    ||this.isStateExpiredWithVariable(stateId);
}

Game_BattlerBase.prototype.stateVariableUpdate =function(action){
    var sv_param = item.stateVariableAddSelf_MA;
    if(this.isStateAffected( sv_param.state  )){
        this._stateVariable[sv_param.state] += sv_param.value;
    }
}
var zz_MA_StateVariable_Game_Battler_Base_addNewState=Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState =function(stateId){
    zz_MA_StateVariable_Game_Battler_Base_addNewState.call(this,stateId);
    var state = $dataStates[stateId];
    if(state.variable_MA){
        this._stateVariable[stateId] =state.variable_MA.init;
    }
}


function stateVariableUpdate(target,sv_param){
    if(target.isStateAffected(sv_param.state) ){
        var lastVal =target._stateVariable[sv_param.state];
        target._stateVariable[sv_param.state] = Math.min( sv_param.value + lastVal,lastVal);
        if(target.isStateExpiredWithVariable(sv_param.state)){
            target.removeState( sv_param.state );
        }
    }
}

var zz_MA_StateVariable_Game_Action_apply =Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target){
    zz_MA_StateVariable_Game_Action_apply.apply(this,arguments);
    var sv_param =this.item().stateVariableAdd_MA;
    if(sv_param){
        var result = target.result();
        if(result.isHit()){
            stateVariableUpdate(target,sv_param);
        }
    }
}

var zz_MA_AfterCounter_BattleManager_endAction =BattleManager.endAction;
BattleManager.endAction =function(){
    zz_MA_AfterCounter_BattleManager_endAction.call(this);
    var sv_param = this._action.item().stateVariableAddSelf_MA;
    if(sv_param){
        stateVariableUpdate(this._subject,sv_param);
        this._logWindow.displayRemovedStates(this._subject);
    }
}
var zz_MA_StateVariable_BattleManager_invokeNormalAction =BattleManager.invokeNormalAction;
BattleManager.invokeNormalAction=function(subject,target){
    zz_MA_StateVariable_BattleManager_invokeNormalAction.apply(this,arguments);
};

function createSkillAddParam(metaStr){
    const reg = /(state|value)\s*=(.*)/g;
    var stateId =0; 
    var value_=0;
    for(;;){
        var match = reg.exec(metaStr);
        if(!match){break;}
        if(match[1][0]==='s'){
            stateId = Number(match[2]);
        }else{
            value_ = Number(match[2]);
        }
    }
    return {
        state : stateId,
        value :value_
    };
}

function createStateVariableParam(metaStr){
    const reg = /(max|init)\s*=(.*)/g;
    var max_ =10; 
    var init_=0;
    for(;;){
        var match = reg.exec(metaStr);
        if(!match){break;}
        if(match[1][0]==='m'){
            max_ = Number(match[2]);
        }else{
            init_ = Number(match[2]);
        }
    }
    return {
        max : max_,
        init :init_
    };
}


var zz_MA_StateVariable_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages= function() {
    zz_MA_StateVariable_Scene_Boot_loadSystemImages.apply(this,arguments);
    var state = $dataStates;
    for(var i=1; i < state.length; ++i){
        var s = state[i];
        if(!s.meta.StateVariable){continue;}
        s.variable_MA = createStateVariableParam(s.meta.StateVariable);
    }
    for(var i=1; i < $dataSkills.length; ++i){
        var s = $dataSkills[i];
        if(s.meta.StateVariableAddSelf){
            s.stateVariableAddSelf_MA = createSkillAddParam(s.meta.StateVariableAddSelf);
        }
        if(s.meta.StateVariableAdd){
            s.stateVariableAdd_MA = createSkillAddParam(s.meta.StateVariableAdd);
        }
    }

}


})();
