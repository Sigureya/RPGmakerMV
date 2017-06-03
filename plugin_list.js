/*:ja
 * @plugindesc 入れてあるプラグインの一覧を出力します。
 * 
 * @author しぐれん（魔のささやき）
 * 
 * @param writeParamFlag
 * @desc パラメータを出力します。
 * true:出力する/false:出力しない
 * @default false
 *
 * @param ON_only
 * @desc 設定でONになっているプラグインだけ出力するかを設定します。
 * true:ONのみ出力する/false:OFFも出力する
 * @default false
 * 
 * @help
 * デバッグ用の情報チェック用です。
 * パラメータの状態も出力します。
 * 
 * var 1.0(2017/6/4) 公開
 */

(function (global) {
    'use strict';

	var p_params = PluginManager.parameters('plugin_list');

	var ON_only = (!!p_params.ON_only);
	var writeParamFlag = (!!p_params.writeParamFlag);

	var mode =1;
	var dataStr ='';


	function tub(){
		return (' ').repeat(4);
	}
	function endl(){
		return '\r\n';
	}


	function write(str){
		console.log(str);
		dataStr +=str;

	}

	function writeNameAndDesc(plg){
		write('<'+plg.name+'>'+endl());
		write(plg.description+endl());
	}


	function writeParams(plg){
		var param =plg.parameters;
		for(var p in param){
			write( tub()+p + ':'+ param[p]+endl());
		}
	}

	function writePlugin(plg){
		if(ON_only || plg.status ){

			if(true){
				writeNameAndDesc(plg);
			}

			if(writeParamFlag){
				writeParams(plg);
			}
		}
	}

    var zz_Scene_Boot_create_preDef = Scene_Boot.loadSystemImages;
    Scene_Boot.loadSystemImages= function() {
        zz_Scene_Boot_create_preDef.apply(this,arguments);

		var path = require('path');	
		var projectFilePath = decodeURIComponent(path.dirname(window.location.pathname.slice(1))); 
		console.log(projectFilePath);

		var xxx=$plugins;
		
		for(var i=0;i < xxx.length;++i){
			writePlugin(  xxx[i]);
		}
		var  s = dataStr;
		//ファイル書き込み用
		var fs = require('fs');
		fs.writeFileSync(projectFilePath+'/pluginData.txt',dataStr);
    }

}());
