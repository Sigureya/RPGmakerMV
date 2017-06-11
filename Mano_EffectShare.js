//=============================================================================
// Manosasayaki_EffectShare.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015-2016 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/05/22 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================


/*:ja
 * @plugindesc 味方を対象としたスキルを発動した際に、
 * スキルの効果を使用者にも適用します。
 * @author しぐれん（魔のささやき）
 * 
 *
 *
 * @help
 * スキル・アイテム側にデータを設定します。
 * <SkillEffectShare>と書くことで、対象者に加えて使用者にも同じ効果を発生させます。
 * ただし、使用者自身を対象にする場合、シェアされません。
 * 
 * var 1.0(2017/05/22) 公開
 */

(function (global) {
    'use strict';

    var SkillEffectShare ={};

    Game_Action.prototype.canSkillEffectShare=function(){
        if(!this.isForOne()){return false;}
        if(this.subject().isEnemy()) {return false;}

        var item = this.item();
        var meta = item.meta.SkillEffectShare;
        if(meta != undefined){
            return true;
        }

        return false;
    }

    SkillEffectShare.zz_compActor=function(actorA,actorB){
        var members = $gameParty.members();
        var a = members.indexOf(actorA);
        var b = members.indexOf(actorB);
        return a < b;        
    }


    var zz_Game_Action_prototype_targetsForFriends = Game_Action.prototype.targetsForFriends;
    Game_Action.prototype.targetsForFriends =function(){
       var targets = zz_Game_Action_prototype_targetsForFriends.apply(this,arguments);
       var subject = this.subject();
        if(this.canSkillEffectShare()&&targets.length == 1 && subject !==targets[0]){
                var unshift=SkillEffectShare.zz_compActor( subject,targets[0]);
                if( unshift  ){
                    targets.unshift(subject);
                }else{
                    targets.push(subject);
                }
            }
        
        return targets;
    }
       
    //-------------------------------------------------------
    global.Manosasayaki = global.Manosasayaki||{};
    global.Manosasayaki.SkillEffectShare = SkillEffectShare;

})(this);
