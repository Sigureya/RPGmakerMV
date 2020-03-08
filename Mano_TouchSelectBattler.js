//=============================================================================
// Mano_TouchSelectBattler.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020-2020 Sigureya
//license:MTCM Yellow(https://en.materialcommons.tk/mtcm-y-summary)
//
// Display credit : Required
// Commercial purposes: Authorize (do not sell the material itself)
// Modifying: Authorize
// Redistribution: Prohibited (Distribution of your works that using the material is not redistribution.)
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================


/*:
 * @plugindesc Enables skill target selection by touch operation.
 * 
 * @author sigureya(https://github.com/Sigureya/RPGmakerMV)
 * 
 * @help
 * Enables the use of touch operations for skill target selection.
 * It is a form to touch twice like a normal menu.
 * 
 * license:MTCM Yellow
 * 
 * Display credit : Required
 * Commercial purposes: Authorize (do not sell the material itself)
 * Modifying: Authorize
 * Redistribution: Prohibited (Distribution of your works that using the material is not redistribution.)
 * */
/*:ja
 * @plugindesc タッチ操作によるスキルの対象選択を可能にします。
 * 
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * 
 * @help
 * スキルの対象選択でタッチ操作を使えるようにします。
 * 通常のメニューと同様に2回タッチする形式です。
 * 
 * ライセンス：マテコモ・イエロー
 * 
 * クレジット表示：必須
 * 営利利用：許可（素材そのものの販売は禁止）
 * 改変利用：許可
 * 再配布：禁止（素材を利用した作品の配布は再配布に当たりません。）
 * */
(function(){
    'use strict';
Window_BattleEnemy.prototype.indexOf =function(enemy){
    return this._enemies.indexOf(enemy);
};

Window_BattleActor.prototype.indexOf =function(actor){
    return $gameParty.members().indexOf(actor);
};

/**
 * @param {Sprite_Battler[]} spriteList 
 * @param { Window_BattleEnemy | Window_BattleActor} selectWindow
 */
function BattlerTouchSelect(spriteList,selectWindow){
    for (const iterator of spriteList) {
        if(iterator.getBounds().contains(TouchInput.x,TouchInput.y)){
            const index = selectWindow.indexOf(iterator._battler);
            if(selectWindow.index() ===index){
                selectWindow.processOk();
                return;
            }
            if(index >=0){
                selectWindow.select(index);
                SoundManager.playCursor();
                return;
            }
        }
    }
}

Scene_Battle.prototype.updateTargetTouchSelect =function(){
    if(!TouchInput.isTriggered()){return;}
    if(this._enemyWindow.isCursorMovable()){
        const enemysSprites = this._spriteset._enemySprites.filter(function(enemy){
            return enemy._appeared;
        });
        BattlerTouchSelect( enemysSprites,this._enemyWindow);
    }
    if(this._actorWindow.isCursorMovable()){
        BattlerTouchSelect(this._spriteset._actorSprites,this._actorWindow);
    }
};

const Scene_Battle_update =Scene_Battle.prototype.update;
Scene_Battle.prototype.update =function(){
    this.updateTargetTouchSelect();
    Scene_Battle_update.call(this);
};
})();
