 //=============================================================================
// Mano_Sorawotobu.js
// ----------------------------------------------------------------------------
// Copyright (c) 2019-2019 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:
 * @plugindesc 空を飛ぶとか、ルーラを実装するプラグインです。
 * @author しぐれん
 * 
 * @param menuCommandSwtich
 * @text コマンド有効化スイッチ
 * @desc 指定したスイッチがONの場合にのみワープが使えます
 * 指定しない場合、ワープは常に有効です。
 * @type switch
 * @default 0
 * 
 * @param windowOffsetX
 * @desc ウィンドウのX座標です。
 * メニューコマンドの右からの相対座標です。
 * @type number
 * @default 0
 * @parent menuCommandSwtich
 * 
 * @param windowWidth
 * @desc ウィンドウの幅です。
 * @type number
 * @default 400
 * @parent menuCommandSwtich
 * 
 * @param maxCols
 * @type number
 * @min 1
 * @default 1
 * @parent menuCommandSwtich
 * 
 * @param lines
 * @desc 縦方向の要素数です。
 * @type number
 * @default 8
 * @parent menuCommandSwtich
 * 
 * 
 * @param commandName
 * @desc メニューコマンドに追加する場合のコマンド名です。
 * @type string
 * @default ワープ
 * @parent menuCommandSwtich
 * 
 * @param defineEvent
 * @text 登録イベント
 * @desc 移動先を設定するためのコモンイベントです。
 * @type common_event
 * @default 0
 * 
 * @param executeEvent
 * @text 実行用イベント
 * @desc 実際にマップ移動を行うコモンイベントです。
 * @type common_event
 * @default 0
 * 
 * @param nextMapId
 * @desc 次のマップ番号を入れる変数です
 * @type variable
 * @default 0
 * 
 * @param nextX
 * @desc 次のマップでのX座標を入れる変数です
 * @type variable
 * @default 0
 * 
 * @param nextY
 * @desc 次のマップでのY座標を入れる変数です
 * @type variable
 * @default 0
 * 
 * @param boatFlag
 * @text 小型船入手フラグ
 * @desc 小型船の入手フラグです。
 * @type switch
 * @default 0
 * 
 * @param shipFlag
 * @text 大型船入手フラグ
 * @desc 大型船の入手フラグです。
 * @type switch
 * @default 0
 * 
 * @param airShipFlag
 * @text 飛行船入手フラグ
 * @desc 飛行船の入手フラグです。
 * @type switch
 * @default 0
 * 
 * 
 * @help
 * １．プラグインパラメータを調整します。
 * 次のマップ・次のX・次のYという変数を作成し、
 * プラグインパラメータのnextMapIdなどに設定します。
 * ２．登録イベントを作成します。
 * 条件分岐と、場所移動で移動先を登録します。
 * また、場所移動の前に「乗り物の移動」を設定すると、
 * ワープ時に乗り物を指定位置へ動かします。
 * この乗り物の移動は特定のスイッチがONの場合にのみ機能します。
 * 
 * ．実行用イベントを設定します。
 * 以下のような内容にします
 * ◆アニメーションの表示：プレイヤー, 光の柱1 (ウェイト)
 * ◆画面のフェードアウト
 * ◆乗り物の乗降
 * ◆乗り物の位置設定：小型船, {小型船 MAP} ({小型船 X},{小型船 Y})
 * ◆場所移動：{次のマップ} ({次のX},{次のY})
 * ◆画面のフェードイン
 * 場所移動の前にアニメーションを付けるといい感じですよ。
 * 
 * 表示名は、マップのデータ上の名前に依存します。
 * （もっとストレートに言うと、mapinfos.jsonの内容に依存）
 * 広大なワールドマップを使うゲームの場合を想定して表示名改造があります。
 * プラグインコマンドで「name 好きな名前」とすればOKです。
 * （このプラグインコマンドでは、他のプラグインのコマンドは動きません）
 * 
 * ■プラグインコマンド
 * いずれも、場所移動の前に入れてください。
 * desc 文字列
 * 移動先の説明を入れます。
 * ※実装しよう思っていたけど、画面レイアウトが決まらなくて未実装。
 * 
 * name 文字列
 * 表示名を変更します。
 * 
 * ■スクリプト
 * 任意の場所で以下の内容を実行することで、ワープ用のシーンに移動します。
 * SceneManager.push(Mano_Sorawotobu.Scene);
 * スキルからワープしたい場合、
 * 上記の内容をスクリプトで呼び出すコモンイベントを作成してください。
 * 
 * ■余談
 * ドラクエのルーラもDQ7(2000年)の段階で消費MPが1に、
 * DQ9(2009年)で消費MPが0になってます。
 * スキルにしてMPのコストを付ける必要は無いと思いますね。
 * 
*/
/*~struct~BoundaryValue:
 * @param mapId
 * @desc マップ番号です。
 * @type number
 * @default 0
 * 
 * @param value
 * @type number
 * @default 0
 * 
 */

//$dataMapInfos.
var Mano_Sorawotobu = (function(){

'use strict';
function getPluginParam(){ return PluginManager.parameters("Mano_Sorawotobu");}
const setting =(function(){
    const param =getPluginParam();
    const result ={
        menuCommandSwtich:Number(param.menuCommandSwtich),
        boatFlag:Number(param.boatFlag),
        shipFlag:Number(param.shipFlag),
        airShipFlag:Number(param.airShipFlag),
        windowOffsetY:Number(0),
        windowOffsetX:Number(param.windowOffsetX),
        windowWidth:Number(400),
        lines:Number(param.lines),
        maxCols:Number(param.maxCols),
        commandName:String(param.commandName),
        nextMapId:Number(param.nextMapId),
        nextX:Number(param.nextX),
        nextY:Number(param.nextY),
        executeEvent:Number(param.executeEvent),
        defineEvent:Number(param.defineEvent),
    };
    return result;
})();

function mapName(mapId){
    const map = $dataMapInfos[mapId];
    if(map){
        return map.name;
    }
}
/**
 * @param {Game_Vehicle} vehicle 
 * @param {MapDefine} def
 */
function xxxx(vehicle,def){
    if(vehicle && def){
        vehicle.setLocation(def.mapId,def.x,def.y);
    }
}

class SorawotobuTask{

    constructor(){
        this.clear();
    }
    clear(){
        this.boat=null;
        this.ship =null;
        this.airship =null;
        this.player =null;
        this.description ="";
        this.name =null;
    }

    /**
     * @param {MapDefinePlayer} def 
     */
    setPlayer(def){
        this.player=def;        
    }
    movePlayer(){
        if(this.player){
            $gamePlayer.reserveTransfer(
                this.player.mapId,
                this.player.x,this.player.y,this.player.dir);
        }
    }

    moveVehicle(){
        const map = $gameMap;
        if($gameSwitches.value(setting.shipFlag)){
            xxxx(map.ship(),this.ship);
        }
        if($gameSwitches.value(setting.boatFlag)){
            xxxx(map.boat(),this.boat);
        }
        if($gameSwitches.value(setting.airShipFlag)){
            const a =map.airship();
            xxxx(a,this.airship);
            a._altitude =0;
        }
        this.clear();
    }
    /**
     * @param {MapDefineVehicle} def 
     */
    setBoat(def){
        this.boat = def;
    }

    /**
     * @param {MapDefineVehicle} def 
     */
    setShip(def){
        this.ship =def;
    }
    /**
     * @param {MapDefineVehicle} airship
     */
    setAirShip(airship){
        this.airship =airship;
    }

    /**
     * @param {String} name 
     */
    setName(name){
        this.name = name;
    }

    /**
     * @param {String} desc 
     */
    setDescription(desc){
        this.description =desc;
    }
}
/**
 * @type {SorawotobuTask}
 */
let sorawotobuTask =null;
Scene_Map.prototype.forceGetoffVehicle_MA =function(){
    if(this._transfer){
        if(sorawotobuTask){
            sonobaShipGetOff($gamePlayer);
            sorawotobuTask.moveVehicle();
            sorawotobuTask =null;
        }
    }
};

const Scene_Map_onMapLoaded =Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded =function(){
    this.forceGetoffVehicle_MA();
    Scene_Map_onMapLoaded.call(this);
};


const Scene_Load_onLoadSuccess =Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess =function(){
    sorawotobuTask =null;
    Scene_Load_onLoadSuccess.call(this);
};

/**
 * @param {Game_Player} player 
 */
function sonobaShipGetOff(player){
    const v = player.vehicle();
    if(v){
        v.getOff();
        player.setMoveSpeed(4);
        player._vehicleGettingOff=true;
        player.setThrough(false);
    }
}

/**
 * @param {SorawotobuTask} task 
 */
function executeWARP(task){
    task.player.executeWARP();
    sorawotobuTask = task;
}

class MapDefine{
    /**
     * @param {Number} id 
     * @param {Number} x 
     * @param {Number} y
     */
    constructor(id,x,y){
        this.mapId =id;
        this.x =x;
        this.y =y;
        this.dir =0;
    }
}

class MapDefineVehicle extends MapDefine{
    /**
     * @param {Number} mapId 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(mapId,x,y){
        super(mapId,x,y);
        this.vehicle=-1;
    }
    /**
     * @param {Number} id 
     */
    setVehicleId( id ){
        this.vehicle = id;
    }
}

class MapDefinePlayer extends MapDefine{
    /**
     * @param {Number} id 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(id,x,y){
        super(id,x,y);
        this.name = mapName(id);
        this.description="";
        this.dir =2;
        this.fade =0;
    }

    /**
     * @param {Number} dir 
     */
    setDir(dir){
        this.dir =dir;
    }
    /**
     * @param {Number} fade 
     */
    setFade(fade){
        this.fade =fade;
    }
    exec2(){
        $gamePlayer.reserveTransfer(this.mapId,this.x,this.y,this.dir,this.fade);
    }
    executeWARP(){
        const b=  $gameMap.ship();
        $gameVariables.setValue(setting.nextMapId,this.mapId);
        $gameVariables.setValue(setting.nextX,this.x);
        $gameVariables.setValue(setting.nextY,this.y);
        $gameTemp.reserveCommonEvent(setting.executeEvent);
    }
}
//GBAのポケモンみたいに、飛ぶ場所をマップで表示するアレ
class Window_SorawotobuMap{
    mapBitmapName(){
        return "";
    }
    cursorCharacterName(){
        return "";
    }

    createCursorCharacter(){
        
    }

}

class SorawotobuInterpriter extends Game_Interpreter{
    constructor(){
        super();
        this._nextItem =new SorawotobuTask();
        this._mapList =[];
    }
    /**
     * @param {Number} commonEventId 
     */
    setupDefineEvent(commonEventId){
        const event = $dataCommonEvents[commonEventId];
        if(event){
            this.setup(event.list);
            this._mapList =[];
            while(this._index < this._list.length){
                this.executeCommand()
            }
        }
    }

    /**
     * @returns {SorawotobuTask[]}
     */
    getList(){
        return this._mapList;
    }
    /**
     * @param {String} name 
     */
    setName(name){
        this._nextItem.setName(name);
        this._name = name;
    }
    /**
     * @param {String} desc 
     */
    setDescription(desc){
        this._desc = desc;
        this._nextItem.setDescription(desc);
    }

    clearNextInfo(){
        this._nextItem = new SorawotobuTask();
    }
    /**
     * @param {Number} mapId 
     * @param {Number} x 
     * @param {Number} y
     * @param {Number} dir
     * @param {Number} fade
     */
    addNextMap(mapId,x,y,dir,fade){
        const def =new MapDefinePlayer(mapId,x,y);
        def.setDir(dir);
        def.setFade(fade);
        if(this._name){
            this._nextItem.setName( this._name );
        }else{
            this._nextItem.setName(mapName(def.mapId) );
        }
        if(this._desc){
            def.description =this._desc;
        }
        this._nextItem.setPlayer(def);

        this._mapList.push(this._nextItem);
        this.clearNextInfo();
    }
    /**
     * @param {Number} mapId 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} type 
     */
    addVehicleDef(mapId,x,y,type){
        const def = new MapDefineVehicle(mapId,x,y);
        switch (type) {
            case 0:
                this._nextItem.setBoat(def);
                break;
            case 1:
                this._nextItem.setShip(def);
                break;
                case 2:
                this._nextItem.setAirShip(def);
                break;        
            default:
                break;
        }
    }


    command201(){
        const dir  = this._params[4];
        const fade = this._params[5];
        if(this._params[0]===0){
            this.addNextMap(this._params[1],this._params[2],this._params[3],dir,fade);
        }else{
           const mapId = $gameVariables.value(this._params[1]);
           const x = $gameVariables.value(this._params[2]);
           const y = $gameVariables.value(this._params[3]);
           this.addNextMap(mapId,x,y,dir,fade);
        }
        return true;
    }

    command202(){
        const mapId  = this._params[2];
        const x =this._params[3];
        const y =this._params[4];
        const VehicleType = this._params[0];
        if(this._params[1]===0){
            this.addVehicleDef(mapId,x,y,VehicleType);
        }else{
            this.addVehicleDef(mapId,x,y,VehicleType);
        }
        return true;
    }
    /**
     * @param {String} cmd 
     * @param {string[]} args 
     */
    pluginCommand(cmd ,args){
        const p = args[0];
        switch (cmd) {
            case "name":
                this.setName(p);
                break;
            case "desc":
                this.setDescription(p);
                break;
            default:
                break;
        }
    }    
}


class Window_Sorawotobu extends Window_Selectable{
    /**
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(x,y){
        super(x,y);
    }
    windowHeight(){
        return this.fittingHeight(setting.lines);;
    }
    windowWidth(){
        return setting.windowWidth;
    }
    initialize(x,y){
        const w = this.windowWidth();
        const h = this.windowHeight();
        const finalY = Math.min(y,  (Graphics.boxHeight - h) );
        this._defineEvent = new SorawotobuInterpriter();
        this.makeItemList();
        super.initialize(x,finalY,w,h);
    }
    makeItemList(){
        this._list=this._defineEvent.getList();
    }

    /**
     * @param {Number} commonEventId 
     */
    setSorceEventId(commonEventId){
        this._defineEvent .setupDefineEvent(commonEventId);
        this.makeItemList();
        this.refresh();
    }
    maxItems(){
        return this._list.length;
    }

    /**
     * @param {Number} index 
     */
    item(index){
        return this._list[index];
    }
    currentItem(){
        return this.item(this._index);
    }
    drawItem(index){
        const item = this._list[index];
        if(item){
            const rect = this.itemRectForText(index);
            this.drawText(item.name,rect.x,rect.y,rect.width);
        }
    }
}




    const MySceneSymbol ='sorawotobu';

    Scene_Menu.prototype.openSorawotobu =function(){
        this._sorawotobuWindow.show();
        this._sorawotobuWindow.activate();
        this._sorawotobuWindow.select(0);
    };

    const Scene_Menu_createCommandWindow= Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow=function(){
        Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler(MySceneSymbol,this.openSorawotobu.bind(this));
    };
    Scene_Menu.prototype.onSorawotobuCancel =function(){
        this._sorawotobuWindow.hide();
        this._commandWindow.activate();
    };

    Scene_Menu.prototype.onSorawotobuOk =function(){
        const def =(this._sorawotobuWindow.currentItem());
        executeWARP(def);
        if($gameTemp.isCommonEventReserved()){
            this.popScene();
            return;
        }

        this._sorawotobuWindow.activate();
    };

    const Scene_Menu_createStatusWindow=Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow =function(){
        Scene_Menu_createStatusWindow.call(this);
        this.createSorawotobuWindow();
    };

    Scene_Menu.prototype.createSorawotobuWindow =function(){
        const x =this._commandWindow.x  + this._commandWindow.width + setting.windowOffsetX;
        const y = this._commandWindow.y +setting.windowOffsetY;
        const window = new (Mano_Sorawotobu.Window)(x,y);
        window.setSorceEventId(setting.defineEvent);

        window.setHandler("ok",this.onSorawotobuOk.bind(this));
        window.setHandler("cancel",this.onSorawotobuCancel.bind(this));
        window.hide();

        this._sorawotobuWindow = window;
        this.addWindow(window);
    };


    function sorawotobuEnabled(){
        if(setting.menuCommandSwtich>0){
            return $gameSwitches.value(setting.menuCommandSwtich); 
        }

        return true;

    }

    const Window_MenuCommand_addOriginalCommands=  Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands =function(){
    Window_MenuCommand_addOriginalCommands.call(this);
        const name =setting.commandName;
        this.addCommand(name,MySceneSymbol,sorawotobuEnabled());
    };

class Scene_Sorawotobu extends Scene_MenuBase{
    create(){
        super.create(); 
        this.createSorawotobuWindow();      
    }
    windowX(){
        return (Graphics.boxWidth/2) -this._sorawotobuWindow.width /2;
    }
    windowY(){
        return 0;
    }
    createSorawotobuWindow(){
        const window = new Window_Sorawotobu(0,0);
        this._sorawotobuWindow =window;
        this.addWindow(window);
        window.x = this.windowX();
        window.y = this.windowY();
        window.setHandler("cancel",this.onSorawotobuCancel.bind(this));
        window.setHandler("ok",this.onSorawotobuOk.bind(this));
        window.setSorceEventId(this.defineCommonEventId());
        window.select(0);
        window.activate();
    }

    onSorawotobuOk(){
        const def = this._sorawotobuWindow.currentItem();
        if(def){
            def.executeWARP();
        }
        if($gameTemp.isCommonEventReserved()){
            this.popScene();
            return;
        }
        this._sorawotobuWindow.activate();
    }
    onSorawotobuCancel(){
        this.popScene();
    }
    defineCommonEventId(){
        return setting.defineEvent;
    }
}

return {
    Interpriter :SorawotobuInterpriter,
    Window:Window_Sorawotobu,
    Scene:Scene_Sorawotobu
};

})();
