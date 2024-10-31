{
  "_$ver": 1,
  "_$id": "mkhg9sc7",
  "_$runtime": "res://20bbf52b-3aa9-482d-9cc9-aeec28e18fc7",
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
      "joinBtn": {
        "_$ref": "jp9shfoz"
      },
      "joinRoomDialogClose": {
        "_$ref": "0yvrxc7k"
      },
      "reconnectDialog": {
        "_$ref": "v241a0m2"
      },
      "enterRoomBtn": {
        "_$ref": "4xmfmrop"
      },
      "reconnectDialogClose": {
        "_$ref": "a0s3iy9r"
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
        "_$uuid": "0a76ea20-fc99-485d-b077-714c12dbd9b8",
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
          "skin": "res://f726b91c-d203-43c4-b3b1-5cd5af3643a5",
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
          "skin": "res://6beeab39-0269-454b-87e3-8f921a10af16",
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
                  "name": "close",
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
                      "font": "KaiTi",
                      "fontSize": 30,
                      "color": "#FFFFFF",
                      "bold": true,
                      "align": "center",
                      "valign": "middle",
                      "overflow": "scroll",
                      "padding": "2,6,2,6",
                      "skin": "res://d76b07e3-3519-4c87-845d-1b21beea75ed",
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
                  "x": 212,
                  "y": 361.99999999999994,
                  "width": 362,
                  "height": 134,
                  "centerX": 0,
                  "skin": "res://a1ef9556-2ee8-47c9-9c36-aa33f09bd456",
                  "useSourceSize": true,
                  "color": "#ffffff"
                }
              ]
            }
          ]
        },
        {
          "_$id": "v241a0m2",
          "_$var": true,
          "_$type": "Dialog",
          "name": "reconnect",
          "x": 197,
          "y": 94,
          "width": 941,
          "height": 562,
          "visible": false,
          "_mouseState": 2,
          "centerX": 0,
          "centerY": 0,
          "isModal": true,
          "_$child": [
            {
              "_$id": "22h50d4e",
              "_$type": "Image",
              "name": "bg",
              "width": 941,
              "height": 562,
              "_mouseState": 2,
              "left": 0,
              "right": 0,
              "top": 0,
              "bottom": 0,
              "skin": "res://d19eb173-a63e-40b2-921e-62b9883bc025",
              "color": "#ffffff",
              "_$child": [
                {
                  "_$id": "a0s3iy9r",
                  "_$type": "Button",
                  "name": "close",
                  "x": 881,
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
                  "_$id": "i1usy0wv",
                  "_$type": "Label",
                  "name": "Label",
                  "x": 256,
                  "y": 219,
                  "width": 421,
                  "height": 28,
                  "centerX": -4,
                  "centerY": -48,
                  "text": "检测到您的牌局还未结束，是否继续牌局，点击右上角则关闭",
                  "font": "KaiTi",
                  "fontSize": 40,
                  "color": "#FFFFFF",
                  "bold": true,
                  "align": "center",
                  "valign": "middle",
                  "wordWrap": true,
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "4xmfmrop",
                  "_$type": "Image",
                  "name": "yes",
                  "x": 755,
                  "y": 417.51589305160786,
                  "width": 86,
                  "height": 42,
                  "right": 100,
                  "skin": "res://baa8f372-a537-4672-b852-53ee19b23d7b",
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