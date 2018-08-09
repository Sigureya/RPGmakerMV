/*:
 * @plugindesc ピクチャの使用状況を調査し、出力します。
 * ラーニングポイントを実装します。
 * @author しぐれん
*/

(function(){
class EventInfoBase{
    constructor(eventName){

    }
}

class EventInfo_Picture{
    constructor(){
        this.eventName="";
        this.type ="";
        this.eventId =0;
        this.pictureId =0;
        this.imageName ="";
    }
}

class Window_PictureUsage extends Window_Selectable{

    initialize(x,y){
        /**
         * @type {EventInfo_Picture[]}
         */
        this._list=[];
        const height = this.fittingHeight(8);
        const width = Graphics.boxWidth;
        super.initialize(x,y,width,height);
    }

    itemHeight(){
        return super.itemHeight()*2;
    }
    
    drawItem(index){
        const info = this._list[index];
        if(info){
            const rect = this.itemRectForText(index);
            const y= rect.y;

            const idWidth =this.textWidth("00");
            this.drawText(info.pictureId,rect.x,rect.y , idWidth);
            const nameX = rect.x + idWidth +8;
            const nameWidth = rect.width *4/10;
//            this.drawText(info.imageName,nameX,y,nameWidth);




        }

    }

    /**
     * @param {String} eventName 
     * @param {String} type 
     * @param {Number} id 
     * @param {RPG.EventCommand[]} list 
     * @param {Number[]} outCommonEvents
     */
    read(eventName,type,id,list,outCommonEvents){
        for (const code of list) {
            if(code.code ===231){
                const info = new EventInfo_Picture();
                info.eventName =eventName;
                info.type = type;
                info.eventId =id;
                info.pictureId =code.parameters[0];
                info.imageName = code.parameters[1];
                this._list.push(info);
            }
            if(code ===117){
                const commonId = code.parameters[0];
                if(!outCommonEvents.contains(commonId)){
                    outCommonEvents.push(commonId);
                }
            }
        }
    }



    /**
     * @returns {Number[]}
     */
    autoCommonEvents(){
        const result =[];
        for (const common of $dataCommonEvents) {
            if(common.trigger !==0){
                result.push( common.id);
            }
        }
        return result;
    }
    /**
     * @param {Game_Map} map 
     */
    readMap(map){
        const eventList= map.events();
        const commonList=this.autoCommonEvents();
        for (const event of eventList) {
            const data= event.event();
            const eventName =data.name;
            const eventId =data.id;
            for (const page of data.pages) {
                this.read(eventName,"map",eventId,page.list,commonList);
            }
        }

        for (const commonId of commonList) {
            this.readCommon(commonId);
        }
    }

    readCommon(eventId){
        const event = $dataCommonEvents[eventId];
        if(event){
            this.read(event.name,"common",eventId,event.list);
        }
    }

    makeItemList(){

    }
    readCurrentMap(){

    }
}
const Scene_Map_createAllWindows=Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows =function(){
    Scene_Map_createAllWindows.call(this);
    this.createPicuterUsageWindow();

};

Scene_Map.prototype.createPicuterUsageWindow =function(){
    const window = new Window_PictureUsage(0,0);
    this._pictureUsageWindow=window;
    this.addWindow(window);


};


})();
