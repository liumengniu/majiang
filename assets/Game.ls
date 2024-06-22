{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$runtime": "res://cb0e7602-93a5-40c9-ad93-5acbccef11f0",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "7bad1742-6eed-4d8d-81c0-501dc5bf03d6",
      "scriptPath": "../src/Main.ts",
      "startBtn": {
        "_$ref": "o6a9cexi"
      },
      "optionsSpe": {
        "_$ref": "ajigaid2"
      },
      "bumpBtn": {
        "_$ref": "u8w0ytha"
      },
      "winningBtn": {
        "_$ref": "dcctt8oe"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "53gnma78",
      "_$type": "Sprite",
      "name": "Sprite",
      "width": 1334,
      "height": 750,
      "texture": {
        "_$uuid": "3bcdb12e-2fba-4b29-bc6c-4d417d63069f",
        "_$type": "Texture"
      },
      "_mouseState": 2,
      "_$child": [
        {
          "_$id": "bqc9netk",
          "_$type": "Image",
          "name": "time",
          "x": 603,
          "y": 310,
          "width": 130,
          "height": 130,
          "centerX": 1,
          "centerY": 0,
          "skin": "res://0ccff280-642c-419c-bc42-82b7a2d34f2b",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "ajigaid2",
          "_$type": "Sprite",
          "name": "optionsSpe",
          "x": 863,
          "y": 414,
          "width": 261,
          "height": 100,
          "visible": false,
          "_mouseState": 2,
          "_$child": [
            {
              "_$id": "u8w0ytha",
              "_$type": "Button",
              "name": "bumpBtn",
              "x": 61.00000000000023,
              "y": 30,
              "width": 78,
              "height": 50,
              "_mouseState": 2,
              "skin": "res://d4cfd6a8-0d0a-475b-ac93-d85eaa646936",
              "label": "碰",
              "labelSize": 20,
              "labelBold": true,
              "labelColors": "#ffffff,#32cc6b,#ff0000",
              "labelAlign": "center",
              "labelVAlign": "middle"
            },
            {
              "_$id": "dcctt8oe",
              "_$type": "Button",
              "name": "winningBtn",
              "x": 143,
              "y": 30,
              "width": 78,
              "height": 50,
              "_mouseState": 2,
              "skin": "res://d4cfd6a8-0d0a-475b-ac93-d85eaa646936",
              "label": "胡",
              "labelSize": 20,
              "labelBold": true,
              "labelColors": "#ffffff,#32cc6b,#ff0000",
              "labelAlign": "center",
              "labelVAlign": "middle",
              "labelStrokeColor": "#32556b",
              "strokeColors": "#32556b,#32cc6b,#ff0000"
            }
          ]
        },
        {
          "_$id": "o6a9cexi",
          "_$type": "Button",
          "name": "startBtn",
          "x": 608,
          "y": 349,
          "width": 120,
          "height": 40,
          "visible": false,
          "_mouseState": 2,
          "skin": "res://d4cfd6a8-0d0a-475b-ac93-d85eaa646936",
          "label": "开始游戏",
          "labelSize": 20,
          "labelBold": true,
          "labelColors": "#ffffff,#32cc6b,#ff0000",
          "labelAlign": "center",
          "labelVAlign": "middle"
        }
      ]
    },
    {
      "_$id": "zlrm4xso",
      "_$type": "Image",
      "name": "Image",
      "x": 444,
      "y": 474,
      "width": 65,
      "height": 79,
      "skin": "res://e087f878-8627-4d04-8678-837207d7a36f",
      "useSourceSize": true,
      "color": "#ffffff"
    },
    {
      "_$id": "u848hie9",
      "_$type": "Image",
      "name": "Image(1)",
      "x": 952.9999999999999,
      "y": 426.9999957664061,
      "width": 65,
      "height": 79,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "rotation": 90,
      "skin": "res://074f032b-c161-4a15-8ec4-bb8a91be8f57",
      "useSourceSize": true,
      "color": "#ffffff"
    }
  ]
}