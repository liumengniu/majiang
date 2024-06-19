{
  "_$ver": 1,
  "_$id": "pr6hl2hu",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "88cea8c6-4a81-42db-a610-0031e37e3bcb",
      "scriptPath": "../src/LoginScript.ts",
      "accountTextInput": {
        "_$ref": "b7a6xxay"
      },
      "passwordTextInput": {
        "_$ref": "0tzvyn9e"
      },
      "btn": {
        "_$ref": "ayq758ax"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "d3yz20nd",
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
          "_$id": "0tzvyn9e",
          "_$type": "TextInput",
          "name": "password",
          "x": 457.57891816331687,
          "y": 290.8342835810024,
          "width": 233,
          "height": 72,
          "_mouseState": 2,
          "text": "密码",
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
          "_$id": "ayq758ax",
          "_$type": "Button",
          "name": "loginBtn",
          "x": 458,
          "y": 420,
          "width": 231,
          "height": 72,
          "_mouseState": 2,
          "skin": "res://d4cfd6a8-0d0a-475b-ac93-d85eaa646936",
          "label": "登录",
          "labelSize": 20,
          "labelAlign": "center",
          "labelVAlign": "middle",
          "labelStrokeColor": "#32556b",
          "strokeColors": "#32556b,#32cc6b,#ff0000"
        },
        {
          "_$id": "b7a6xxay",
          "_$type": "TextInput",
          "name": "account",
          "x": 459.99999999999994,
          "y": 187.00000000000006,
          "width": 228,
          "height": 70,
          "_mouseState": 2,
          "text": "账号",
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