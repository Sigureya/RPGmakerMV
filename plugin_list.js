/*:ja
 * @plugindesc 入れてあるプラグインの一覧を出力します。
 * 
 * @author しぐれん（魔のささやき）
 * 
 * @param writeParamFlag
 * @desc パラメータを出力します。
 * true:出力する/false:出力しない
 * @default false
 * @type boolean
 *
 * @param ON_only
 * @desc 設定でONになっているプラグインだけ出力するかを設定します。
 * true:ONのみ出力する/false:OFFも出力する
 * @default false
 * @type boolean
 *
 * @param outputPath
 * @text 出力パス
 * @desc ファイルの出力パスです。相対パス、絶対パスが利用できます。
 * @default ./debug
 * @type string
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
  const outputPath = String(p_params.outputPath || './debug');

  var dataStr = '';


  function tub() {
    return (' ').repeat(4);
  }
  function endl() {
    return '\r\n';
  }


  function write(str) {
    dataStr += str;
  }

  function writeNameAndDesc(plg) {
    write('<' + plg.name + '>' + endl());
    write(plg.description + endl());
  }


  function writeParams(plg) {
    var param = plg.parameters;
    for (var p in param) {
      write(tub() + p + ':' + param[p] + endl());
    }
  }

  function writePlugin(plg) {
    if (!ON_only || plg.status) {
      writeNameAndDesc(plg);

      if (writeParamFlag) {
        writeParams(plg);
      }
    }
  }

  function buildOutputPath() {
    const path = require('path');
    const projectPath = decodeURIComponent(path.dirname(window.location.pathname.slice(1)));
    // ./から始まる相対パス指定
    if (outputPath.startsWith('./')) {
      return projectPath + outputPath.substring(1);
    }
    // windows形式絶対パス指定
    if (outputPath.match(/^[A-Z]:/)) {
      return outputPath;
    }
    // その他は普通に結合する
    return projectPath + outputPath;
  };

  StorageManager.savePluginList = function () {
    let xxx = $plugins;

    for (let i = 0; i < xxx.length; ++i) {
      writePlugin(xxx[i]);
    }
    //ファイル書き込み用
    const outputDir = buildOutputPath();
    const fs = require('fs');
    fs.mkdir(outputDir, { recursive: true }, error => {
      fs.writeFile(outputDir + '/pluginData.txt', dataStr, err => {
        if (err) {
          console.error(err);
        }
      });
    });
  };

  var zz_Scene_Boot_create_preDef = Scene_Boot.loadSystemImages;
  Scene_Boot.loadSystemImages = function () {
    zz_Scene_Boot_create_preDef.apply(this, arguments);

    StorageManager.savePluginList();
  }

}());
