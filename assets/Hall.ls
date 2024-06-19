{
  "_$ver": 1,
  "_$id": "mkhg9sc7",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "a14bacd4-ac54-4dc4-b597-c83f2d3064a4",
      "scriptPath": "../src/HallScript.ts",
      "createRoomBtn": {
        "_$ref": "zvtmz89l"
      },
      "joinRoomBtn": {
        "_$ref": "8uo8wovt"
      },
      "roomTextInput": {
        "_$ref": "del74y1f"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "sx1kyb58",
      "_$type": "Sprite",
      "name": "Sprite",
      "width": 1334,
      "height": 750,
      "texture": {
        "_$uuid": "bb8c567d-43a6-4933-b438-73695c461efe",
        "_$type": "Texture"
      },
      "_mouseState": 2,
      "_$child": [
        {
          "_$id": "zvtmz89l",
          "_$type": "Button",
          "name": "createRoom",
          "x": 492,
          "y": 228,
          "width": 120,
          "height": 40,
          "_mouseState": 2,
          "skin": "res://d4cfd6a8-0d0a-475b-ac93-d85eaa646936",
          "label": "创建房间",
          "labelSize": 20,
          "labelAlign": "center",
          "labelVAlign": "middle"
        },
        {
          "_$id": "8uo8wovt",
          "_$type": "Button",
          "name": "joinRoom",
          "x": 498,
          "y": 356,
          "width": 120,
          "height": 40,
          "_mouseState": 2,
          "skin": "res://d4cfd6a8-0d0a-475b-ac93-d85eaa646936",
          "label": "加入房间",
          "labelSize": 20,
          "labelAlign": "center",
          "labelVAlign": "middle"
        },
        {
          "_$id": "del74y1f",
          "_$type": "TextInput",
          "name": "roomNum",
          "x": 496,
          "y": 301,
          "width": 147,
          "height": 37,
          "_mouseState": 2,
          "text": "房间号",
          "fontSize": 20,
          "color": "#FFFFFF",
          "valign": "middle",
          "overflow": "scroll",
          "padding": "2,6,2,6",
          "skin": "res://87262606-4dfe-490e-8644-7fd6496c2be7",
          "type": "text",
          "maxChars": 0,
          "prompt": "",
          "promptColor": "#A9A9A9"
        }
      ]
    }
  ]
}