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
      "passBtn": {
        "_$ref": "poapgr96"
      },
      "bumpBtn": {
        "_$ref": "iz5ly6ci"
      },
      "gangBtn": {
        "_$ref": "fhij90hi"
      },
      "winningBtn": {
        "_$ref": "h8jepkrx"
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
          "x": 807,
          "y": 386,
          "width": 395,
          "height": 181,
          "_mouseState": 2,
          "_$child": [
            {
              "_$id": "poapgr96",
              "_$type": "Image",
              "name": "guo",
              "x": 13.16074249575513,
              "y": 38.18969506163813,
              "width": 71,
              "height": 67,
              "skin": "res://0deead69-755a-45a2-b20c-2af2282191d2",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "iz5ly6ci",
              "_$type": "Image",
              "name": "peng",
              "x": 94.99999999999966,
              "y": 15.999999999999943,
              "width": 113,
              "height": 94,
              "skin": "res://3cb4d606-90fc-41af-92e5-3f6b00589bf8",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "fhij90hi",
              "_$type": "Image",
              "name": "gang",
              "x": 212,
              "y": 14,
              "width": 113,
              "height": 94,
              "skin": "res://ef14c4b5-1ed7-478a-96e1-ed574bc0ed77",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "h8jepkrx",
              "_$type": "Image",
              "name": "hu",
              "x": 336,
              "y": 17,
              "width": 113,
              "height": 94,
              "skin": "res://9da22823-6409-4054-8730-fb5f95a510af",
              "useSourceSize": true,
              "color": "#ffffff"
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
    }
  ]
}