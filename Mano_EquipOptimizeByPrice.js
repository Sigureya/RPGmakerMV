//=============================================================================
// Mano_EquipOptimizeByPrice.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018-2018 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/06/22 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc 最強装備コマンドを値段が高い順で行います。
 * @author しぐれん( https://twitter.com/Sigureya/)
 * 
 * @help
 * デフォルトの最強装備は攻守だけを見るため、追加効果のある装備が無視されがちです。
 * このプラグインでは、値段を評価基準に切り替えます。
 * 高い装備ほど性能が高いはずですので、性能のいい装備が選ばれるはずです。
 * 
 * Game_Actor.calcEquipItemPerformance()を改造しているだけなので、競合は少ないかも。
 * 
 * メモ欄で使用できるタグ
 * <EquipItemPerformance:5000>
 * 売却不能アイテムとして値段を0にしている場合、最適化で選ばれなくなってしまいます。
 * このタグを設定すると、値段ではなくここで指定した数値で評価します。
 * 
 * 
 */

(function(){
"use strict";

/**
 * @returns {Number}
 * @param {RPG.EquipItem} item 
 */
Game_Actor.prototype.calcEquipItemPerformance = function(item) {
    const EquipItemPerformance = item.meta.EquipItemPerformance;
    if(EquipItemPerformance){
        return Number(EquipItemPerformance);
    }
    return item.price;
};


})();
