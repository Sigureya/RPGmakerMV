//=============================================================================
// Mano_InfoWindow.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/03/30 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc 情報ウィンドウを出します
 * 
 * @author しぐれん（魔のささやき）
 * 
 * @param list
 * @desc 表示する情報の一覧です
 * @type struct<DataSet>[]
 * @default []
 * 
 * @param enableSwitch
 * @desc 指定したスイッチがONの時だけ表示します。
 * @type switch
 * @default 0
 * 
 * @param windowX
 * @desc ウィンドウのX座標です
 * @type number
 * @default 0
 * 
 * @param windowY
 * @desc ウィンドウのY座標です
 * @type number
 * @default 0
 * 
 * @param windowWidth
 * @type number
 * @default 200
 * 
 * 
*/

/*~struct~DataSet:
 * @param text
 * @type string
 * 
 * @param textColor
 * @type number
 * @default 0
 * @min 0
 * 
 * @param valueId
 * @desc 変数の読み込み元です
 * @type variable
 * @default 0
 * 
 * @param paddingX
 * @desc 数字部分の表示位置をずらします
 * @type number
 * @default 0
 */

(function(){
    'use strict'

    class DataSet{
        constructor(jsonObj){
            this.text =String(jsonObj.text);
            this.textColor =Number(jsonObj.textColor);
            this.valueId = Number(jsonObj.valueId);
            this.paddingX =Number(jsonObj.paddingX);
        }
    }
    const setting =(function(){
        const param = PluginManager.parameters("Mano_InfoWindow");

        function makeList(){
            if(!param.list){
                return []
            };
            const baseList = JSON.parse(param.list);
            const result =[];
            const len =baseList.length;
            for(var i=0;i <len;++i ){
                const item = baseList[i];
                if(item){
                    const data = new DataSet(JSON.parse( item));                    
                    if(data.valueId!==0){
                        result.push(data);
                    }
                }
            }
            return result;
        }
        const result ={
            list :makeList(),
            enableSwitch:Number(param.enableSwitch),
            windowX :Number(param.windowX),
            windowY :Number(param.windowY),
            windowWidth :Number(param.windowWidth)
        };
        return result;
    })();
class Window_Info extends Window_Selectable{


    initialize(){
        const x = setting.windowX;
        const y = setting.windowY;
        const width =setting.windowWidth;
        const height = this.fittingHeight(setting.list.length*2);
        super.initialize(x,y,width,height);
        this.update();
        this.refresh();
    }
    maxItems(){
        return setting.list.length;
    }
    itemHeight(){
        return super.itemHeight()*2;
    }
    update(){
        if(setting.enableSwitch ===0){
            this.visible =true;
        }else{
            this.visible = $gameSwitches.value(setting.enableSwitch);
        }
        if(Window_Info.needRefresh){
            this.refresh();
            Window_Info.needRefresh=false;
        }
    }

    drawItem(index){
        const data= setting.list[index];
        const rect = this.itemRectForText(index);
        this.changeTextColor(this.textColor(data.textColor));
        this.drawText(data.text,rect.x,rect.y,rect.width);
        this.changeTextColor(this.normalColor());
        const value = $gameVariables.value(data.valueId);
        this.drawText(value, rect.x+ data.paddingX,rect.y + this.lineHeight(),rect.width,'right');
    }
};
Window_Info.needRefresh =false;



const Game_Variables_setValue =Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue =function(variableId, value){
    Game_Variables_setValue.call(this,variableId,value);
    const len = setting.list.length;
    for(var i=0;i <len; ++i){
        if(setting.list[i].valueId ===variableId){
            Window_Info.needRefresh =true;
            return;
        }
    }
};

Scene_Map.prototype.createInfoWindow_MA =function(){
    const window = new Window_Info();
    this._windowInfo_MA =window;
    this.addWindow(window);

};
const Scene_Map_createAllWindows=Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows=function(){
    Scene_Map_createAllWindows.call(this);
    this.createInfoWindow_MA();

};

})()