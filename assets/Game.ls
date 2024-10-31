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
      "gameLayout": {
        "_$ref": "53gnma78"
      },
      "roomNum": {
        "_$ref": "ga000bxe"
      },
      "startBtn": {
        "_$ref": "ma3m3k1q"
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
      },
      "time0": {
        "_$ref": "hvpp6fz8"
      },
      "time1": {
        "_$ref": "ahs2xr0v"
      },
      "time2": {
        "_$ref": "bkxkwcx7"
      },
      "time3": {
        "_$ref": "6faz5vr0"
      },
      "countdown0": {
        "_$ref": "m495doq0"
      },
      "countdown1": {
        "_$ref": "siibza38"
      },
      "remainingLabel": {
        "_$ref": "buknf47g"
      },
      "playedCards0": {
        "_$ref": "u2y1yagb"
      },
      "playedCards1": {
        "_$ref": "9527mv4g"
      },
      "playedCards2": {
        "_$ref": "0gsuxczc"
      },
      "playedCards3": {
        "_$ref": "v6nayp4q"
      },
      "activePlayedImg": {
        "_$ref": "9b76limq"
      },
      "settlementDialog": {
        "_$ref": "2uu16eqe"
      },
      "status": {
        "_$ref": "5xqpbv1p"
      },
      "playerCards0": {
        "_$ref": "uslg19rv"
      },
      "playerCards1": {
        "_$ref": "81huwths"
      },
      "playerCards2": {
        "_$ref": "xdavdao4"
      },
      "playerCards3": {
        "_$ref": "cug0t3t0"
      },
      "backHall": {
        "_$ref": "i6uwav6s"
      },
      "backHallOverlay": {
        "_$ref": "pjqq8j7a"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "53gnma78",
      "_$type": "Sprite",
      "name": "gameLayout",
      "width": 1334,
      "height": 750,
      "texture": {
        "_$uuid": "f8c92db8-47b8-4c44-8b04-0674469646c8",
        "_$type": "Texture"
      },
      "_mouseState": 2,
      "_$comp": [
        {
          "_$type": "Animator2D",
          "controllerLayers": []
        }
      ],
      "_$child": [
        {
          "_$id": "o8o91qnt",
          "_$type": "Image",
          "name": "roomTime",
          "x": 602,
          "y": 310,
          "width": 130,
          "height": 130,
          "centerX": 0,
          "centerY": 0,
          "skin": "res://19247533-1fae-4dd0-9827-e310a38706b3",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "hvpp6fz8",
          "_$type": "Image",
          "name": "time0",
          "x": 603.4717135689623,
          "y": 308.6242814316442,
          "width": 130,
          "height": 130,
          "visible": false,
          "skin": "res://781d1928-1c56-4338-a728-a5e0a6d71dbd",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "ahs2xr0v",
          "_$type": "Image",
          "name": "time1",
          "x": 604,
          "y": 310.00000000000006,
          "width": 130,
          "height": 130,
          "visible": false,
          "skin": "res://69b75b1a-d48f-47c8-b7b4-21e7c09372ca",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "bkxkwcx7",
          "_$type": "Image",
          "name": "time2",
          "x": 602.1636130889623,
          "y": 309.7932262316442,
          "width": 130,
          "height": 130,
          "visible": false,
          "skin": "res://cbc0e896-9ed9-4a9b-9247-f5687f7aede9",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "6faz5vr0",
          "_$type": "Image",
          "name": "time3",
          "x": 603.8230703689622,
          "y": 310.7391558316442,
          "width": 130,
          "height": 130,
          "visible": false,
          "skin": "res://cc697ed2-1dba-469e-aa3a-382b626e74a0",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "m495doq0",
          "_$type": "Image",
          "name": "countdown0",
          "x": 641,
          "y": 352,
          "width": 30,
          "height": 40,
          "visible": false,
          "skin": "res://c13c1b8e-c516-4a0f-98ad-e356f45f0365",
          "color": "#ffffff"
        },
        {
          "_$id": "siibza38",
          "_$type": "Image",
          "name": "countdown1",
          "x": 667,
          "y": 352,
          "width": 30,
          "height": 40,
          "visible": false,
          "skin": "res://c13c1b8e-c516-4a0f-98ad-e356f45f0365",
          "color": "#ffffff"
        },
        {
          "_$id": "ma3m3k1q",
          "_$type": "Image",
          "name": "startBtn",
          "x": 582.2121168755192,
          "y": 459.14752901013577,
          "width": 362,
          "height": 134,
          "scaleX": 0.5,
          "scaleY": 0.5,
          "visible": false,
          "skin": "res://a1ef9556-2ee8-47c9-9c36-aa33f09bd456",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "e6wo5qwt",
          "_$type": "Image",
          "name": "backHallOld",
          "x": 1151,
          "y": 651,
          "width": 158,
          "height": 39,
          "visible": false,
          "right": 25,
          "bottom": 60,
          "skin": "res://5d6fb62f-3208-45ee-b16b-cb6c04e09d99",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "s5tjk4h4",
          "_$type": "Image",
          "name": "remainingBg",
          "x": 413.88927861274857,
          "y": 355,
          "width": 161,
          "height": 41,
          "centerY": 0,
          "skin": "res://712c4e72-f7e5-44c3-86b3-87ac4794eb9b",
          "useSourceSize": true,
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "v9dk5cqh",
              "_$type": "Image",
              "name": "Image",
              "x": 19,
              "y": 8,
              "width": 124,
              "height": 25,
              "centerX": 0,
              "centerY": 0,
              "skin": "res://15a00703-681e-4f06-a09c-b557b3a485f4",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "buknf47g",
              "_$type": "Label",
              "name": "remainingLabel",
              "x": 61,
              "y": 4,
              "width": 65,
              "height": 40,
              "text": "55",
              "font": "MicrosoftYaHei",
              "fontSize": 26,
              "color": "rgba(181, 254, 80, 1)",
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "l0z9wxl3",
          "_$type": "Image",
          "name": "remainingBg2",
          "x": 752.3013589139199,
          "y": 355,
          "width": 161,
          "height": 41,
          "centerY": 0,
          "skin": "res://712c4e72-f7e5-44c3-86b3-87ac4794eb9b",
          "useSourceSize": true,
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "bo6w0nz9",
              "_$type": "Image",
              "name": "Image",
              "x": 19,
              "y": 8,
              "width": 123,
              "height": 25,
              "centerX": 0,
              "centerY": 0,
              "skin": "res://714f6bbf-a658-4849-9cbf-dfbf979a02bc",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "a9chaln5",
              "_$type": "Label",
              "name": "Label",
              "x": 60.6986410860801,
              "y": 3,
              "width": 65,
              "height": 40,
              "text": "0",
              "font": "MicrosoftYaHei",
              "fontSize": 26,
              "color": "rgba(181, 254, 80, 1)",
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "u2y1yagb",
          "_$type": "Sprite",
          "name": "playedCards0",
          "x": 380,
          "y": 452,
          "width": 552,
          "height": 174
        },
        {
          "_$id": "9527mv4g",
          "_$type": "Sprite",
          "name": "playedCards1",
          "x": 910,
          "y": 187,
          "width": 227,
          "height": 362
        },
        {
          "_$id": "0gsuxczc",
          "_$type": "Sprite",
          "name": "playedCards2",
          "x": 380,
          "y": 135,
          "width": 504,
          "height": 156
        },
        {
          "_$id": "v6nayp4q",
          "_$type": "Sprite",
          "name": "playedCards3",
          "x": 140,
          "y": 200,
          "width": 236,
          "height": 324
        },
        {
          "_$id": "9b76limq",
          "_$type": "Image",
          "name": "activePlayedImg",
          "width": 18,
          "height": 41,
          "visible": false,
          "left": 0,
          "top": 0,
          "skin": "res://0df38f19-11ef-410a-a0d9-c612b16c806c",
          "useSourceSize": true,
          "color": "#ffffff",
          "_$comp": [
            {
              "_$type": "Animator2D",
              "controllerLayers": [
                {
                  "_$type": "AnimatorControllerLayer2D",
                  "name": "Base Layer",
                  "states": [
                    {
                      "_$type": "AnimatorState2D",
                      "name": "ActivePlayedImg",
                      "clipStart": 0,
                      "soloTransitions": []
                    }
                  ],
                  "defaultStateName": "ActivePlayedImg"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "_$id": "2uu16eqe",
      "_$type": "Dialog",
      "name": "settlement",
      "x": 128,
      "y": 81,
      "width": 1080,
      "height": 590,
      "visible": false,
      "_mouseState": 2,
      "centerX": 1,
      "centerY": 1,
      "isModal": true,
      "_$child": [
        {
          "_$id": "3ltelhzr",
          "_$type": "Image",
          "name": "bg",
          "width": 1080,
          "height": 590,
          "_mouseState": 2,
          "left": 0,
          "right": 0,
          "top": 0,
          "bottom": 0,
          "skin": "res://d19eb173-a63e-40b2-921e-62b9883bc025",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "5xqpbv1p",
              "_$type": "Image",
              "name": "status",
              "x": 410,
              "y": 10.505009112436014,
              "width": 260,
              "height": 144,
              "centerX": 0,
              "skin": "res://56e9715c-2e15-47de-8921-e649dfd8096f",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "uslg19rv",
              "_$type": "Sprite",
              "name": "playerCards0",
              "x": 100,
              "y": 159,
              "width": 880,
              "height": 70,
              "_$child": [
                {
                  "_$id": "cxm0irz8",
                  "_$type": "HBox",
                  "name": "HBox",
                  "width": 880,
                  "height": 70,
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "bottom": 0,
                  "bgColor": "rgba(248, 174, 75, 1)",
                  "space": 0,
                  "align": "middle"
                },
                {
                  "_$id": "idmxcy54",
                  "_$type": "Text",
                  "name": "score",
                  "x": 808,
                  "y": 21,
                  "width": 55,
                  "height": 30,
                  "fontSize": 20,
                  "color": "#FFFFFF",
                  "leading": 2
                }
              ]
            },
            {
              "_$id": "81huwths",
              "_$type": "Sprite",
              "name": "playerCards1",
              "x": 100,
              "y": 253,
              "width": 880,
              "height": 70,
              "_$child": [
                {
                  "_$id": "v4n5s9gz",
                  "_$type": "HBox",
                  "name": "HBox",
                  "width": 880,
                  "height": 70,
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "bottom": 0,
                  "bgColor": "rgba(248, 174, 75, 1)",
                  "space": 0,
                  "align": "middle"
                },
                {
                  "_$id": "xud3rww0",
                  "_$type": "Text",
                  "name": "score",
                  "x": 808.9999999999998,
                  "y": 24.999999999999886,
                  "width": 55,
                  "height": 30,
                  "fontSize": 20,
                  "color": "#FFFFFF",
                  "leading": 2
                }
              ]
            },
            {
              "_$id": "xdavdao4",
              "_$type": "Sprite",
              "name": "playerCards2",
              "x": 100,
              "y": 354,
              "width": 880,
              "height": 70,
              "_$child": [
                {
                  "_$id": "ad2vhfm0",
                  "_$type": "HBox",
                  "name": "HBox",
                  "width": 880,
                  "height": 70,
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "bottom": 0,
                  "bgColor": "rgba(248, 174, 75, 1)",
                  "space": 0,
                  "align": "middle"
                },
                {
                  "_$id": "g0fpgcqq",
                  "_$type": "Text",
                  "name": "score",
                  "x": 807.9999999999998,
                  "y": 25.999999999999886,
                  "width": 55,
                  "height": 30,
                  "fontSize": 20,
                  "color": "#FFFFFF",
                  "leading": 2
                }
              ]
            },
            {
              "_$id": "cug0t3t0",
              "_$type": "Sprite",
              "name": "playerCards3",
              "x": 100,
              "y": 454,
              "width": 880,
              "height": 70,
              "_$child": [
                {
                  "_$id": "1zx3ejso",
                  "_$type": "HBox",
                  "name": "HBox",
                  "width": 880,
                  "height": 70,
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "bottom": 0,
                  "bgColor": "rgba(248, 174, 75, 1)",
                  "space": 0,
                  "align": "middle"
                },
                {
                  "_$id": "8gasos0x",
                  "_$type": "Text",
                  "name": "score",
                  "x": 809.9999999999998,
                  "y": 20.999999999999943,
                  "width": 55,
                  "height": 30,
                  "fontSize": 20,
                  "color": "#FFFFFF",
                  "leading": 2
                }
              ]
            },
            {
              "_$id": "gkh6hk7c",
              "_$type": "Button",
              "name": "close",
              "x": 1019.1336576210967,
              "y": -7.207765485129698,
              "width": 60,
              "height": 60,
              "_mouseState": 2,
              "skin": "res://60a9086c-a9c2-4e01-a563-355c117b509e",
              "label": "",
              "labelSize": 20,
              "labelAlign": "center",
              "labelVAlign": "middle"
            }
          ]
        }
      ]
    },
    {
      "_$id": "ajigaid2",
      "_$type": "Sprite",
      "name": "optionsSpe",
      "x": 1121,
      "y": 529,
      "width": 189,
      "height": 186,
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
          "visible": false,
          "skin": "res://7d39e1c8-02c8-4a9f-ad8f-973a41e9abf2",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "iz5ly6ci",
          "_$type": "Image",
          "name": "peng",
          "x": 94.99999999999966,
          "y": 37.99999999999994,
          "width": 71,
          "height": 67,
          "visible": false,
          "skin": "res://90a36c7e-2df8-4984-9296-40a24007ebd3",
          "color": "#ffffff"
        },
        {
          "_$id": "fhij90hi",
          "_$type": "Image",
          "name": "gang",
          "x": 11,
          "y": 116,
          "width": 71,
          "height": 67,
          "visible": false,
          "skin": "res://6be844ce-d35b-4923-b51f-fbd9402eeaad",
          "color": "#ffffff"
        },
        {
          "_$id": "h8jepkrx",
          "_$type": "Image",
          "name": "hu",
          "x": 100,
          "y": 115,
          "width": 71,
          "height": 67,
          "visible": false,
          "skin": "res://1651d9db-8f9f-4675-9198-716b0bdc62e4",
          "color": "#ffffff"
        }
      ]
    },
    {
      "_$id": "74v4qx28",
      "_$type": "Image",
      "name": "roomIdBg",
      "x": 9,
      "y": 27,
      "width": 180,
      "height": 45,
      "left": 9,
      "top": 27,
      "skin": "res://51f0b25a-4764-484c-a569-06ba528ad09f",
      "useSourceSize": true,
      "color": "#ffffff",
      "_$child": [
        {
          "_$id": "ga000bxe",
          "_$type": "Label",
          "name": "Label",
          "x": -1,
          "y": -2,
          "width": 182,
          "height": 50,
          "visible": false,
          "centerX": 0,
          "centerY": 0,
          "text": "",
          "font": "KaiTi",
          "fontSize": 30,
          "color": "#FFFFFF",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0"
        }
      ]
    },
    {
      "_$id": "pjqq8j7a",
      "_$type": "Sprite",
      "name": "backHallOverlay",
      "x": 1151,
      "y": 651,
      "width": 158,
      "height": 39,
      "visible": false,
      "_mouseState": 2,
      "_$child": [
        {
          "_$id": "i6uwav6s",
          "_$type": "Image",
          "name": "backHall",
          "width": 158,
          "height": 39,
          "_mouseState": 2,
          "right": 0,
          "bottom": 0,
          "skin": "res://5d6fb62f-3208-45ee-b16b-cb6c04e09d99",
          "useSourceSize": true,
          "color": "#ffffff"
        }
      ]
    }
  ]
}