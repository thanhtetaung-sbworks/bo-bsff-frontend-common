/* eslint-disable */
const getRegion = region => {
    switch (region) {
        case 'region-1':
            return {
                "areaLrgClasses": [
                    {
                        "areaMidClasses": [
                            {
                                "areaMidClassNm": "北海道",
                                "areaMidClassCd": "hokkaido"
                            }
                        ],
                        "areaLrgClassNm": "北海道",
                        "areaLrgClassCd": "region-1"
                    }
                ]
            };
            break;


            case 'region-2':
            return {
                "areaLrgClasses": [
                    {
                        "areaMidClasses": [
                            {
                                "areaMidClassCd": "aomori",
                                "areaMidClassNm": "青森県"
                            },
                            {
                                "areaMidClassCd": "iwate",
                                "areaMidClassNm": "岩手県"
                            },
                            {
                                "areaMidClassCd": "miyagi",
                                "areaMidClassNm": "宮城県"
                            },
                            {
                                "areaMidClassCd": "akita",
                                "areaMidClassNm": "秋田県"
                            },
                            {
                                "areaMidClassCd": "yamagata",
                                "areaMidClassNm": "山形県"
                            },
                            {
                                "areaMidClassCd": "hukushima",
                                "areaMidClassNm": "福島県"
                            }
                        ],
                        "areaLrgClassNm": "東北",
                        "areaLrgClassCd": "region-2"
                    }
                ]
            };
            break;


            case 'region-3':
            return {
                "areaLrgClasses": [
                    {
                        "areaLrgClassCd": "region-3",
                        "areaLrgClassNm": "北関東",
                        "areaMidClasses": [
                            {
                                "areaMidClassNm": "茨城県",
                                "areaMidClassCd": "ibaragi"
                            },
                            {
                                "areaMidClassNm": "栃木県",
                                "areaMidClassCd": "tochigi"
                            },
                            {
                                "areaMidClassCd": "gunma",
                                "areaMidClassNm": "群馬県"
                            }
                        ]
                    }
                ]
            };
            break;


            case 'region-4':
            return {
                "areaLrgClasses": [
                    {
                        "areaLrgClassCd": "region-4",
                        "areaMidClasses": [
                            {
                                "areaMidClassCd": "saitama",
                                "areaMidClassNm": "埼玉県"
                            },
                            {
                                "areaMidClassCd": "tiba",
                                "areaMidClassNm": "千葉県"
                            },
                            {
                                "areaMidClassNm": "東京都",
                                "areaMidClassCd": "tokyo"
                            },
                            {
                                "areaMidClassCd": "kanagawa",
                                "areaMidClassNm": "神奈川県"
                            }
                        ],
                        "areaLrgClassNm": "首都圏"
                    }
                ]
            };
            break;


            case 'region-6':
            return {
                "areaLrgClasses": [
                    {
                        "areaMidClasses": [
                            {
                                "areaMidClassCd": "niigata",
                                "areaMidClassNm": "新潟県"
                            },
                            {
                                "areaMidClassNm": "山梨県",
                                "areaMidClassCd": "yamanasi"
                            },
                            {
                                "areaMidClassCd": "nagano",
                                "areaMidClassNm": "長野県"
                            }
                        ],
                        "areaLrgClassNm": "甲信越",
                        "areaLrgClassCd": "region-6"
                    }
                ]
            };
            break;

            case 'region-7':
            return {
                "areaLrgClasses": [
                    {
                        "areaMidClasses": [
                            {
                                "areaMidClassCd": "toyama",
                                "areaMidClassNm": "富山県"
                            },
                            {
                                "areaMidClassNm": "石川県",
                                "areaMidClassCd": "ishikawa"
                            },
                            {
                                "areaMidClassNm": "福井県",
                                "areaMidClassCd": "hukui"
                            }
                        ],
                        "areaLrgClassCd": "region-7",
                        "areaLrgClassNm": "北陸"
                    }
                ]
            };
            break;

            case 'region-8':
            return {
                "areaLrgClasses": [
                    {
                        "areaMidClasses": [
                            {
                                "areaMidClassCd": "gihu",
                                "areaMidClassNm": "岐阜県"
                            },
                            {
                                "areaMidClassCd": "shizuoka",
                                "areaMidClassNm": "静岡県"
                            },
                            {
                                "areaMidClassCd": "aichi",
                                "areaMidClassNm": "愛知県"
                            },
                            {
                                "areaMidClassCd": "mie",
                                "areaMidClassNm": "三重県"
                            }
                        ],
                        "areaLrgClassCd": "region-8",
                        "areaLrgClassNm": "東海"
                    }
                ]
            };
            break;

            case 'region-9':
            return {
                "areaLrgClasses": [
                    {
                        "areaMidClasses": [
                            {
                                "areaMidClassCd": "shiga",
                                "areaMidClassNm": "滋賀県"
                            },
                            {
                                "areaMidClassCd": "kyoto",
                                "areaMidClassNm": "京都府"
                            },
                            {
                                "areaMidClassNm": "大阪府",
                                "areaMidClassCd": "osaka"
                            },
                            {
                                "areaMidClassNm": "兵庫県",
                                "areaMidClassCd": "hyogo"
                            },
                            {
                                "areaMidClassNm": "奈良県",
                                "areaMidClassCd": "nara"
                            },
                            {
                                "areaMidClassNm": "和歌山県",
                                "areaMidClassCd": "wakayama"
                            }
                        ],
                        "areaLrgClassNm": "近畿",
                        "areaLrgClassCd": "region-9"
                    }
                ]
            };
            break;

            case 'region-10':
            return {
                "areaLrgClasses": [
                    {
                        "areaMidClasses": [
                            {
                                "areaMidClassCd": "tottori",
                                "areaMidClassNm": "鳥取県"
                            },
                            {
                                "areaMidClassCd": "simane",
                                "areaMidClassNm": "島根県"
                            },
                            {
                                "areaMidClassNm": "岡山県",
                                "areaMidClassCd": "okayama"
                            },
                            {
                                "areaMidClassNm": "広島県",
                                "areaMidClassCd": "hiroshima"
                            },
                            {
                                "areaMidClassCd": "yamaguchi",
                                "areaMidClassNm": "山口県"
                            }
                        ],
                        "areaLrgClassCd": "region-10",
                        "areaLrgClassNm": "山陽・山陰"
                    }
                ]
            };
            break;

            case 'region-11':
            return {
                "areaLrgClasses": [
                    {
                        "areaLrgClassNm": "四国",
                        "areaLrgClassCd": "region-11",
                        "areaMidClasses": [
                            {
                                "areaMidClassNm": "徳島県",
                                "areaMidClassCd": "tokushima"
                            },
                            {
                                "areaMidClassNm": "香川県",
                                "areaMidClassCd": "kagawa"
                            },
                            {
                                "areaMidClassNm": "愛媛県",
                                "areaMidClassCd": "ehime"
                            },
                            {
                                "areaMidClassNm": "高知県",
                                "areaMidClassCd": "kouchi"
                            }
                        ]
                    }
                ]
            };
            break;


            case 'region-12':
            return {
                "areaLrgClasses": [
                    {
                        "areaLrgClassNm": "九州",
                        "areaMidClasses": [
                            {
                                "areaMidClassCd": "hukuoka",
                                "areaMidClassNm": "福岡県"
                            },
                            {
                                "areaMidClassNm": "佐賀県",
                                "areaMidClassCd": "saga"
                            },
                            {
                                "areaMidClassCd": "nagasaki",
                                "areaMidClassNm": "長崎県"
                            },
                            {
                                "areaMidClassNm": "熊本県",
                                "areaMidClassCd": "kumamoto"
                            },
                            {
                                "areaMidClassNm": "大分県",
                                "areaMidClassCd": "ooita"
                            },
                            {
                                "areaMidClassCd": "miyazaki",
                                "areaMidClassNm": "宮崎県"
                            },
                            {
                                "areaMidClassCd": "kagoshima",
                                "areaMidClassNm": "鹿児島県"
                            }
                        ],
                        "areaLrgClassCd": "region-12"
                    }
                ]
            };
            break;

            case 'region-13':
            return {
                "areaLrgClasses": [
                    {
                        "areaLrgClassNm": "沖縄",
                        "areaMidClasses": [
                            {
                                "areaMidClassNm": "沖縄県",
                                "areaMidClassCd": "okinawa"
                            }
                        ],
                        "areaLrgClassCd": "region-13"
                    }
                ]
            };
            break;
    
        default:
            return {}
            break;
    }
}
export default getRegion;