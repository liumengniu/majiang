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
        "_$ref": "oh6d5a16"
      },
      "joinRoomBtn": {
        "_$ref": "wjce7fko"
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
          "_$id": "del74y1f",
          "_$type": "TextInput",
          "name": "roomNum",
          "x": 730,
          "y": 590,
          "width": 386,
          "height": 89,
          "_mouseState": 2,
          "text": "",
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
        },
        {
          "_$id": "wjce7fko",
          "_$type": "Image",
          "name": "joinRoom",
          "x": 713.7078216417017,
          "y": 68.65641451783529,
          "width": 405,
          "height": 470,
          "skin": "res://b633d23d-2736-47b4-8b75-27f174eb3495",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "oh6d5a16",
          "_$type": "Image",
          "name": "createRoom",
          "x": 134,
          "y": 81.00000000000003,
          "width": 406,
          "height": 460,
          "skin": "res://767309d1-a17f-43fc-91af-b13ac9c34a0b",
          "useSourceSize": true,
          "color": "#ffffff"
        }
      ]
    }
  ]
}