//=============================================================================
// Mano_EquipTag.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:
 * @plugindesc 装備品にタグを指定し、同じタグの装備品がある場合、装備を禁止します。
 * 
 * @author しぐれん（魔のささやき）
 * 
 *
 * @help
 * 装備品に<EquipTag:タグ名>と記述します。
 * 同じタグ名を持つアイテムの装備を禁止します。
 * 
 * Windowの動作を改造しているだけなので、イベントコマンドで装備させた場合、
 * 重複チェックが働きません。
 * もし条件をチェックしたい場合、
 * actor.isEquipTagDuplication(item)で調べてください。
 * (itemはアイテムオブジェクトを指定します。番号ではないです)
 * 
 * var 1.0(2017/08/06) 公開
 */

(function () {
    'use strict';
/**
 * 
 * @param {RPG.EquipItem} item1 
 * @param {RPG.EquipItem} item2 
 */
function isEquipTagDuplication(item1,item2 ){
    if(item1 && item2){
        return item1.meta.EquipTag ===item2.meta.EquipTag;
    }
    
    return false;
}
Game_Battler.prototype.isEquipTagDuplication =function(item){
    if(!item){
        return false; 
    }
    const tag = item.meta.EquipTag;
    if(!tag){return false;}

    const equipList = this.equips();
    for(var i=0; i <equipList.length;i+=1){
        if(i!==slotId){
            if(isEquipTagDuplication(item,equipList[i])){
                return true;
            }
        }    
    }
    return false;
};

Window_EquipItem.prototype.isEquipTagDuplication =function(item){
    if(!item){
        return false; 
    }
    const tag = item.meta.EquipTag;
    if(!tag){return false;}

    const slotId = this._slotId;
    const equipList = this._actor.equips();

    for(var i=0; i <equipList.length;i+=1){
        if(i!==slotId){
            if(isEquipTagDuplication(item,equipList[i])){
                return true;
            }
        }
    }
    return false;
};
const Window_EquipItem_isEnabled= Window_EquipItem.prototype.isEnabled;
Window_EquipItem.prototype.isEnabled = function(item) {
    return Window_EquipItem_isEnabled.call(this,item) && !this.isEquipTagDuplication(item);
};
})();
