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
      },
      "joinRoomDialog": {
        "_$ref": "bvm4t3md"
      },
      "joinRoomDialogClose": {
        "_$ref": "0yvrxc7k"
      },
      "joinBtn": {
        "_$ref": "jp9shfoz"
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
          "_$id": "wjce7fko",
          "_$type": "Image",
          "name": "joinRoom",
          "x": 739,
          "y": 68.65641451783529,
          "width": 405,
          "height": 470,
          "right": 190,
          "skin": "res://b633d23d-2736-47b4-8b75-27f174eb3495",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "oh6d5a16",
          "_$type": "Image",
          "name": "createRoom",
          "x": 190,
          "y": 81.00000000000003,
          "width": 406,
          "height": 460,
          "left": 190,
          "skin": "res://767309d1-a17f-43fc-91af-b13ac9c34a0b",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "bvm4t3md",
          "_$type": "Dialog",
          "name": "joinRoom",
          "x": 275,
          "y": 104,
          "width": 785,
          "height": 543,
          "visible": false,
          "_mouseState": 2,
          "centerX": 0,
          "centerY": 0,
          "_$child": [
            {
              "_$id": "fiaf4d4o",
              "_$type": "Image",
              "name": "bg",
              "width": 785,
              "height": 543,
              "_mouseState": 2,
              "left": 0,
              "right": 0,
              "top": 0,
              "bottom": 0,
              "skin": "res://d19eb173-a63e-40b2-921e-62b9883bc025",
              "color": "#ffffff",
              "_$child": [
                {
                  "_$id": "0yvrxc7k",
                  "_$type": "Button",
                  "name": "closeBtn",
                  "x": 725,
                  "width": 60,
                  "height": 60,
                  "_mouseState": 2,
                  "right": 0,
                  "top": 0,
                  "skin": "res://60a9086c-a9c2-4e01-a563-355c117b509e",
                  "label": "",
                  "labelSize": 20,
                  "labelAlign": "center",
                  "labelVAlign": "middle"
                },
                {
                  "_$id": "4xp9wune",
                  "_$type": "HBox",
                  "name": "inputBox",
                  "x": 62,
                  "y": 256,
                  "width": 665,
                  "height": 92,
                  "_mouseState": 2,
                  "centerX": 2,
                  "space": 24,
                  "_$child": [
                    {
                      "_$id": "del74y1f",
                      "_$type": "TextInput",
                      "name": "roomNum",
                      "y": -43,
                      "width": 665,
                      "height": 89,
                      "_mouseState": 2,
                      "left": 0,
                      "right": 0,
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
                    }
                  ]
                },
                {
                  "_$id": "t6vrwcd0",
                  "_$type": "Text",
                  "name": "Text",
                  "x": 288,
                  "y": 51,
                  "width": 179,
                  "height": 49,
                  "text": "输入房间号",
                  "fontSize": 34,
                  "color": "#FFFFFF",
                  "align": "center",
                  "valign": "middle",
                  "leading": 2
                },
                {
                  "_$id": "jp9shfoz",
                  "_$type": "Image",
                  "name": "joinBtn",
                  "x": 230,
                  "y": 361.99999999999994,
                  "width": 325,
                  "height": 95,
                  "centerX": 0,
                  "skin": "res://44188222-3639-4bed-b56d-d86b415fe589",
                  "useSourceSize": true,
                  "color": "#ffffff"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}