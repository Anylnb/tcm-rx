// TCM Prescription Tool - Data
// Herbs: { pinyin, cn, en, price ($/g, default placeholder) }
const HERBS = [
  {pinyin:"Bai Shao",cn:"白芍",en:"White Peony Root",price:0.15},
  {pinyin:"Bai Zhi",cn:"白芷",en:"Angelica Dahurica Root",price:0.12},
  {pinyin:"Bai Zhu",cn:"白朮",en:"Atractylodes Rhizome",price:0.15},
  {pinyin:"Ban Xia",cn:"半夏",en:"Pinellia Rhizome",price:0.18},
  {pinyin:"Bei Mu (Zhe)",cn:"浙貝母",en:"Zhejiang Fritillaria Bulb",price:0.35},
  {pinyin:"Bei Mu (Chuan)",cn:"川貝母",en:"Sichuan Fritillaria Bulb",price:0.80},
  {pinyin:"Bo He",cn:"薄荷",en:"Mint",price:0.10},
  {pinyin:"Cang Zhu",cn:"蒼朮",en:"Atractylodes Lancea Rhizome",price:0.14},
  {pinyin:"Chai Hu",cn:"柴胡",en:"Bupleurum Root",price:0.18},
  {pinyin:"Che Qian Zi",cn:"車前子",en:"Plantago Seed",price:0.10},
  {pinyin:"Chen Pi",cn:"陳皮",en:"Tangerine Peel",price:0.10},
  {pinyin:"Chuan Xiong",cn:"川芎",en:"Ligusticum Rhizome",price:0.15},
  {pinyin:"Chuan Wu",cn:"川烏",en:"Sichuan Aconite Root",price:0.20},
  {pinyin:"Da Huang",cn:"大黃",en:"Rhubarb Root",price:0.12},
  {pinyin:"Da Zao",cn:"大棗",en:"Jujube Fruit",price:0.10},
  {pinyin:"Dang Gui",cn:"當歸",en:"Angelica Sinensis",price:0.18},
  {pinyin:"Di Huang (Sheng)",cn:"生地黃",en:"Rehmannia Root",price:0.15},
  {pinyin:"Du Huo",cn:"獨活",en:"Angelica Pubescens Root",price:0.12},
  {pinyin:"E Jiao",cn:"阿膠",en:"Donkey-hide Gelatin",price:0.60},
  {pinyin:"Fang Feng",cn:"防風",en:"Saposhnikovia Root",price:0.15},
  {pinyin:"Fu Ling",cn:"茯苓",en:"Poria",price:0.12},
  {pinyin:"Fu Zi (Pao)",cn:"炮附子",en:"Prepared Aconite Root",price:0.25},
  {pinyin:"Gan Cao (Sheng)",cn:"生甘草",en:"Licorice Root",price:0.08},
  {pinyin:"Gan Cao (Zhi)",cn:"炙甘草",en:"Honey-fried Licorice Root",price:0.10},
  {pinyin:"Gan Jiang",cn:"乾薑",en:"Dried Ginger",price:0.10},
  {pinyin:"Ge Gen",cn:"葛根",en:"Kudzu Root",price:0.12},
  {pinyin:"Gou Qi Zi",cn:"枸杞子",en:"Goji Berry",price:0.15},
  {pinyin:"Gui Zhi",cn:"桂枝",en:"Cinnamon Twig",price:0.12},
  {pinyin:"Hong Hua",cn:"紅花",en:"Safflower",price:0.20},
  {pinyin:"Hou Po",cn:"厚朴",en:"Magnolia Bark",price:0.15},
  {pinyin:"Huang Bai",cn:"黃柏",en:"Phellodendron Bark",price:0.14},
  {pinyin:"Huang Lian",cn:"黃連",en:"Coptis Rhizome",price:0.30},
  {pinyin:"Huang Qi",cn:"黃耆",en:"Astragalus Root",price:0.15},
  {pinyin:"Huang Qin",cn:"黃芩",en:"Scutellaria Root",price:0.14},
  {pinyin:"Jie Geng",cn:"桔梗",en:"Platycodon Root",price:0.12},
  {pinyin:"Jin Yin Hua",cn:"金銀花",en:"Honeysuckle Flower",price:0.20},
  {pinyin:"Jing Jie",cn:"荊芥",en:"Schizonepeta",price:0.10},
  {pinyin:"Ju Hua",cn:"菊花",en:"Chrysanthemum Flower",price:0.12},
  {pinyin:"Ku Shen",cn:"苦參",en:"Sophora Root",price:0.12},
  {pinyin:"Lian Qiao",cn:"連翹",en:"Forsythia Fruit",price:0.15},
  {pinyin:"Ma Huang",cn:"麻黃",en:"Ephedra",price:0.12},
  {pinyin:"Mai Men Dong",cn:"麥冬",en:"Ophiopogon Root",price:0.18},
  {pinyin:"Mu Dan Pi",cn:"牡丹皮",en:"Moutan Bark",price:0.15},
  {pinyin:"Mu Li",cn:"牡蠣",en:"Oyster Shell",price:0.08},
  {pinyin:"Mu Xiang",cn:"木香",en:"Costus Root",price:0.15},
  {pinyin:"Niu Bang Zi",cn:"牛蒡子",en:"Burdock Seed",price:0.12},
  {pinyin:"Niu Xi (Chuan)",cn:"川牛膝",en:"Cyathula Root",price:0.12},
  {pinyin:"Niu Xi (Huai)",cn:"懷牛膝",en:"Achyranthes Root",price:0.12},
  {pinyin:"Pao Jiang",cn:"炮薑",en:"Blast-fried Ginger",price:0.12},
  {pinyin:"Pu Gong Ying",cn:"蒲公英",en:"Dandelion",price:0.10},
  {pinyin:"Qiang Huo",cn:"羌活",en:"Notopterygium Root",price:0.18},
  {pinyin:"Qin Pi",cn:"秦皮",en:"Ash Bark",price:0.12},
  {pinyin:"Ren Shen",cn:"人參",en:"Ginseng",price:0.80},
  {pinyin:"Rou Gui",cn:"肉桂",en:"Cinnamon Bark",price:0.15},
  {pinyin:"Sha Ren",cn:"砂仁",en:"Amomum Fruit",price:0.25},
  {pinyin:"Sha Shen (Bei)",cn:"北沙參",en:"Glehnia Root",price:0.15},
  {pinyin:"Shan Yao",cn:"山藥",en:"Chinese Yam",price:0.12},
  {pinyin:"Shan Zhu Yu",cn:"山茱萸",en:"Cornus Fruit",price:0.18},
  {pinyin:"She Gan",cn:"射干",en:"Belamcanda Rhizome",price:0.15},
  {pinyin:"Sheng Jiang",cn:"生薑",en:"Fresh Ginger",price:0.08},
  {pinyin:"Shi Gao",cn:"生石膏",en:"Gypsum",price:0.06},
  {pinyin:"Shu Di Huang",cn:"熟地黃",en:"Prepared Rehmannia",price:0.18},
  {pinyin:"Suan Zao Ren",cn:"酸棗仁",en:"Ziziphus Seed",price:0.25},
  {pinyin:"Tao Ren",cn:"桃仁",en:"Peach Kernel",price:0.18},
  {pinyin:"Tian Hua Fen",cn:"天花粉",en:"Trichosanthes Root",price:0.12},
  {pinyin:"Tian Ma",cn:"天麻",en:"Gastrodia Rhizome",price:0.35},
  {pinyin:"Tian Men Dong",cn:"天門冬",en:"Asparagus Root",price:0.18},
  {pinyin:"Wu Wei Zi",cn:"五味子",en:"Schisandra Fruit",price:0.18},
  {pinyin:"Wu Zhu Yu",cn:"吳茱萸",en:"Evodia Fruit",price:0.15},
  {pinyin:"Xi Xin",cn:"細辛",en:"Asarum",price:0.20},
  {pinyin:"Xiang Fu",cn:"香附",en:"Cyperus Rhizome",price:0.10},
  {pinyin:"Xing Ren",cn:"杏仁",en:"Apricot Kernel",price:0.12},
  {pinyin:"Xu Duan",cn:"續斷",en:"Dipsacus Root",price:0.12},
  {pinyin:"Xuan Shen",cn:"玄參",en:"Scrophularia Root",price:0.12},
  {pinyin:"Yan Hu Suo",cn:"延胡索",en:"Corydalis Rhizome",price:0.18},
  {pinyin:"Yi Yi Ren",cn:"薏苡仁",en:"Coix Seed",price:0.10},
  {pinyin:"Yin Chen",cn:"茵陳",en:"Artemisia Capillaris",price:0.10},
  {pinyin:"Yu Zhu",cn:"玉竹",en:"Solomon's Seal Rhizome",price:0.15},
  {pinyin:"Ze Xie",cn:"澤瀉",en:"Alisma Rhizome",price:0.12},
  {pinyin:"Zhi Ke",cn:"枳殼",en:"Bitter Orange",price:0.10},
  {pinyin:"Zhi Mu",cn:"知母",en:"Anemarrhena Rhizome",price:0.14},
  {pinyin:"Zhi Shi",cn:"枳實",en:"Immature Bitter Orange",price:0.12},
  {pinyin:"Zhi Zi",cn:"梔子",en:"Gardenia Fruit",price:0.10},
  {pinyin:"Zi Cao",cn:"紫草",en:"Lithospermum Root",price:0.15},
  {pinyin:"Zi Su Ye",cn:"紫蘇葉",en:"Perilla Leaf",price:0.10},
  {pinyin:"Dan Shen",cn:"丹參",en:"Salvia Root",price:0.18},
  {pinyin:"Dang Shen",cn:"黨參",en:"Codonopsis Root",price:0.18},
  {pinyin:"Du Zhong",cn:"杜仲",en:"Eucommia Bark",price:0.15},
  {pinyin:"Gou Teng",cn:"鉤藤",en:"Uncaria Vine",price:0.12},
  {pinyin:"Long Gu",cn:"龍骨",en:"Dragon Bone",price:0.10},
  {pinyin:"San Qi",cn:"三七",en:"Notoginseng Root",price:0.50},
  {pinyin:"Sang Ye",cn:"桑葉",en:"Mulberry Leaf",price:0.10},
  {pinyin:"Sang Bai Pi",cn:"桑白皮",en:"Mulberry Root Bark",price:0.12},
  {pinyin:"Sheng Ma",cn:"升麻",en:"Cimicifuga Rhizome",price:0.12},
  {pinyin:"Shi Hu",cn:"石斛",en:"Dendrobium",price:0.35},
  {pinyin:"Yi Mu Cao",cn:"益母草",en:"Motherwort",price:0.10},
  {pinyin:"Yuan Zhi",cn:"遠志",en:"Polygala Root",price:0.18},
  {pinyin:"Zhu Ling",cn:"豬苓",en:"Polyporus",price:0.15},
  {pinyin:"Zhu Ru",cn:"竹茹",en:"Bamboo Shavings",price:0.10},
  {pinyin:"Bai He",cn:"百合",en:"Lily Bulb",price:0.15},
  {pinyin:"Long Dan Cao",cn:"龍膽草",en:"Gentiana Root",price:0.18},
  {pinyin:"Huo Xiang",cn:"藿香",en:"Patchouli",price:0.10},
  {pinyin:"Pi Pa Ye",cn:"枇杷葉",en:"Loquat Leaf",price:0.10},
  {pinyin:"Ai Ye",cn:"艾葉",en:"Mugwort Leaf",price:0.08},
  {pinyin:"Chi Shao",cn:"赤芍",en:"Red Peony Root",price:0.15},
  {pinyin:"Di Long",cn:"地龍",en:"Earthworm",price:0.20},
  {pinyin:"Fang Ji",cn:"防己",en:"Stephania Root",price:0.15},
  {pinyin:"Shan Zha",cn:"山楂",en:"Hawthorn Fruit",price:0.10},
  {pinyin:"Tu Si Zi",cn:"菟絲子",en:"Cuscuta Seed",price:0.12},
  {pinyin:"Xia Ku Cao",cn:"夏枯草",en:"Prunella Spike",price:0.10},
];

// Formulas: { pinyin, cn, en, herbs: [{name(pinyin), cn, defaultG(per dose)}] }
const FORMULAS = [
  {pinyin:"Gui Zhi Tang",cn:"桂枝湯",en:"Cinnamon Twig Decoction",herbs:[
    {name:"Gui Zhi",cn:"桂枝",g:1},{name:"Bai Shao",cn:"白芍",g:1},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5},{name:"Sheng Jiang",cn:"生薑",g:0.5},{name:"Da Zao",cn:"大棗",g:0.5}]},
  {pinyin:"Ma Huang Tang",cn:"麻黃湯",en:"Ephedra Decoction",herbs:[
    {name:"Ma Huang",cn:"麻黃",g:1},{name:"Gui Zhi",cn:"桂枝",g:0.7},{name:"Xing Ren",cn:"杏仁",g:0.7},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.3}]},
  {pinyin:"Xiao Chai Hu Tang",cn:"小柴胡湯",en:"Minor Bupleurum Decoction",herbs:[
    {name:"Chai Hu",cn:"柴胡",g:1.5},{name:"Huang Qin",cn:"黃芩",g:1},{name:"Ren Shen",cn:"人參",g:0.5},{name:"Ban Xia",cn:"半夏",g:1},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5},{name:"Sheng Jiang",cn:"生薑",g:0.5},{name:"Da Zao",cn:"大棗",g:0.5}]},
  {pinyin:"Da Chai Hu Tang",cn:"大柴胡湯",en:"Major Bupleurum Decoction",herbs:[
    {name:"Chai Hu",cn:"柴胡",g:1.5},{name:"Huang Qin",cn:"黃芩",g:1},{name:"Bai Shao",cn:"白芍",g:1},{name:"Ban Xia",cn:"半夏",g:1},{name:"Zhi Shi",cn:"枳實",g:0.7},{name:"Da Huang",cn:"大黃",g:0.5},{name:"Sheng Jiang",cn:"生薑",g:0.5},{name:"Da Zao",cn:"大棗",g:0.5}]},
  {pinyin:"Si Jun Zi Tang",cn:"四君子湯",en:"Four-Gentleman Decoction",herbs:[
    {name:"Ren Shen",cn:"人參",g:1},{name:"Bai Zhu",cn:"白朮",g:1},{name:"Fu Ling",cn:"茯苓",g:1},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5}]},
  {pinyin:"Si Wu Tang",cn:"四物湯",en:"Four-Substance Decoction",herbs:[
    {name:"Shu Di Huang",cn:"熟地黃",g:1.5},{name:"Dang Gui",cn:"當歸",g:1},{name:"Bai Shao",cn:"白芍",g:1},{name:"Chuan Xiong",cn:"川芎",g:0.7}]},
  {pinyin:"Liu Wei Di Huang Wan",cn:"六味地黃丸",en:"Six-Ingredient Pill with Rehmannia",herbs:[
    {name:"Shu Di Huang",cn:"熟地黃",g:2},{name:"Shan Zhu Yu",cn:"山茱萸",g:1},{name:"Shan Yao",cn:"山藥",g:1},{name:"Ze Xie",cn:"澤瀉",g:0.7},{name:"Mu Dan Pi",cn:"牡丹皮",g:0.7},{name:"Fu Ling",cn:"茯苓",g:0.7}]},
  {pinyin:"Xiao Yao San",cn:"逍遙散",en:"Rambling Powder",herbs:[
    {name:"Chai Hu",cn:"柴胡",g:1},{name:"Dang Gui",cn:"當歸",g:1},{name:"Bai Shao",cn:"白芍",g:1},{name:"Bai Zhu",cn:"白朮",g:1},{name:"Fu Ling",cn:"茯苓",g:1},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5},{name:"Bo He",cn:"薄荷",g:0.3},{name:"Sheng Jiang",cn:"生薑",g:0.3}]},
  {pinyin:"Jia Wei Xiao Yao San",cn:"加味逍遙散",en:"Augmented Rambling Powder",herbs:[
    {name:"Chai Hu",cn:"柴胡",g:1},{name:"Dang Gui",cn:"當歸",g:1},{name:"Bai Shao",cn:"白芍",g:1},{name:"Bai Zhu",cn:"白朮",g:1},{name:"Fu Ling",cn:"茯苓",g:1},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5},{name:"Mu Dan Pi",cn:"牡丹皮",g:0.7},{name:"Zhi Zi",cn:"梔子",g:0.7},{name:"Bo He",cn:"薄荷",g:0.3},{name:"Sheng Jiang",cn:"生薑",g:0.3}]},
  {pinyin:"Bu Zhong Yi Qi Tang",cn:"補中益氣湯",en:"Tonify the Middle and Augment the Qi Decoction",herbs:[
    {name:"Huang Qi",cn:"黃耆",g:1.5},{name:"Ren Shen",cn:"人參",g:0.7},{name:"Bai Zhu",cn:"白朮",g:1},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5},{name:"Dang Gui",cn:"當歸",g:0.7},{name:"Chen Pi",cn:"陳皮",g:0.5},{name:"Sheng Ma",cn:"升麻",g:0.3},{name:"Chai Hu",cn:"柴胡",g:0.3}]},
  {pinyin:"Gui Pi Tang",cn:"歸脾湯",en:"Restore the Spleen Decoction",herbs:[
    {name:"Ren Shen",cn:"人參",g:0.7},{name:"Huang Qi",cn:"黃耆",g:1},{name:"Bai Zhu",cn:"白朮",g:1},{name:"Fu Ling",cn:"茯苓",g:1},{name:"Suan Zao Ren",cn:"酸棗仁",g:1},{name:"Dang Gui",cn:"當歸",g:0.7},{name:"Yuan Zhi",cn:"遠志",g:0.5},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.3}]},
  {pinyin:"Yin Qiao San",cn:"銀翹散",en:"Honeysuckle and Forsythia Powder",herbs:[
    {name:"Jin Yin Hua",cn:"金銀花",g:1.5},{name:"Lian Qiao",cn:"連翹",g:1.5},{name:"Jie Geng",cn:"桔梗",g:0.7},{name:"Niu Bang Zi",cn:"牛蒡子",g:0.7},{name:"Bo He",cn:"薄荷",g:0.5},{name:"Gan Cao (Sheng)",cn:"生甘草",g:0.5},{name:"Zhu Ru",cn:"竹茹",g:0.5}]},
  {pinyin:"Sang Ju Yin",cn:"桑菊飲",en:"Mulberry Leaf and Chrysanthemum Decoction",herbs:[
    {name:"Sang Ye",cn:"桑葉",g:1},{name:"Ju Hua",cn:"菊花",g:1},{name:"Lian Qiao",cn:"連翹",g:0.7},{name:"Bo He",cn:"薄荷",g:0.5},{name:"Xing Ren",cn:"杏仁",g:0.7},{name:"Jie Geng",cn:"桔梗",g:0.5},{name:"Gan Cao (Sheng)",cn:"生甘草",g:0.3}]},
  {pinyin:"Ban Xia Xie Xin Tang",cn:"半夏瀉心湯",en:"Pinellia Decoction to Drain the Epigastrium",herbs:[
    {name:"Ban Xia",cn:"半夏",g:1.5},{name:"Huang Qin",cn:"黃芩",g:1},{name:"Huang Lian",cn:"黃連",g:0.5},{name:"Gan Jiang",cn:"乾薑",g:0.5},{name:"Ren Shen",cn:"人參",g:0.5},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5},{name:"Da Zao",cn:"大棗",g:0.5}]},
  {pinyin:"Wu Ling San",cn:"五苓散",en:"Five-Ingredient Powder with Poria",herbs:[
    {name:"Ze Xie",cn:"澤瀉",g:1.5},{name:"Fu Ling",cn:"茯苓",g:1},{name:"Zhu Ling",cn:"豬苓",g:1},{name:"Bai Zhu",cn:"白朮",g:1},{name:"Gui Zhi",cn:"桂枝",g:0.5}]},
  {pinyin:"Huang Lian Jie Du Tang",cn:"黃連解毒湯",en:"Coptis Decoction to Relieve Toxicity",herbs:[
    {name:"Huang Lian",cn:"黃連",g:1},{name:"Huang Qin",cn:"黃芩",g:1},{name:"Huang Bai",cn:"黃柏",g:1},{name:"Zhi Zi",cn:"梔子",g:1}]},
  {pinyin:"Si Ni Tang",cn:"四逆湯",en:"Frigid Extremities Decoction",herbs:[
    {name:"Fu Zi (Pao)",cn:"炮附子",g:1},{name:"Gan Jiang",cn:"乾薑",g:0.7},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:1}]},
  {pinyin:"Si Ni San",cn:"四逆散",en:"Frigid Extremities Powder",herbs:[
    {name:"Chai Hu",cn:"柴胡",g:1},{name:"Bai Shao",cn:"白芍",g:1},{name:"Zhi Shi",cn:"枳實",g:1},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5}]},
  {pinyin:"Bai Hu Tang",cn:"白虎湯",en:"White Tiger Decoction",herbs:[
    {name:"Shi Gao",cn:"生石膏",g:3},{name:"Zhi Mu",cn:"知母",g:1.5},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5},{name:"Shan Yao",cn:"山藥",g:1}]},
  {pinyin:"Suan Zao Ren Tang",cn:"酸棗仁湯",en:"Ziziphus Decoction",herbs:[
    {name:"Suan Zao Ren",cn:"酸棗仁",g:2},{name:"Fu Ling",cn:"茯苓",g:0.7},{name:"Chuan Xiong",cn:"川芎",g:0.5},{name:"Zhi Mu",cn:"知母",g:0.7},{name:"Gan Cao (Sheng)",cn:"生甘草",g:0.3}]},
  {pinyin:"Wen Dan Tang",cn:"溫膽湯",en:"Warm the Gallbladder Decoction",herbs:[
    {name:"Ban Xia",cn:"半夏",g:1},{name:"Zhu Ru",cn:"竹茹",g:1},{name:"Zhi Shi",cn:"枳實",g:0.7},{name:"Chen Pi",cn:"陳皮",g:0.7},{name:"Fu Ling",cn:"茯苓",g:0.7},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.3},{name:"Sheng Jiang",cn:"生薑",g:0.3}]},
  {pinyin:"Yu Ping Feng San",cn:"玉屏風散",en:"Jade Windscreen Powder",herbs:[
    {name:"Huang Qi",cn:"黃耆",g:2},{name:"Bai Zhu",cn:"白朮",g:1},{name:"Fang Feng",cn:"防風",g:1}]},
  {pinyin:"Xue Fu Zhu Yu Tang",cn:"血府逐瘀湯",en:"Drive Out Stasis in the Mansion of Blood Decoction",herbs:[
    {name:"Tao Ren",cn:"桃仁",g:1},{name:"Hong Hua",cn:"紅花",g:0.7},{name:"Dang Gui",cn:"當歸",g:1},{name:"Chuan Xiong",cn:"川芎",g:0.7},{name:"Chi Shao",cn:"赤芍",g:0.7},{name:"Niu Xi (Huai)",cn:"懷牛膝",g:0.7},{name:"Chai Hu",cn:"柴胡",g:0.5},{name:"Jie Geng",cn:"桔梗",g:0.5},{name:"Zhi Ke",cn:"枳殼",g:0.5},{name:"Gan Cao (Sheng)",cn:"生甘草",g:0.3},{name:"Di Huang (Sheng)",cn:"生地黃",g:1}]},
  {pinyin:"Long Dan Xie Gan Tang",cn:"龍膽瀉肝湯",en:"Gentiana Decoction to Drain the Liver",herbs:[
    {name:"Long Dan Cao",cn:"龍膽草",g:1},{name:"Huang Qin",cn:"黃芩",g:1},{name:"Zhi Zi",cn:"梔子",g:1},{name:"Ze Xie",cn:"澤瀉",g:1},{name:"Che Qian Zi",cn:"車前子",g:0.7},{name:"Dang Gui",cn:"當歸",g:0.7},{name:"Di Huang (Sheng)",cn:"生地黃",g:1},{name:"Chai Hu",cn:"柴胡",g:0.5},{name:"Gan Cao (Sheng)",cn:"生甘草",g:0.3}]},
  {pinyin:"Er Chen Tang",cn:"二陳湯",en:"Two-Cured Decoction",herbs:[
    {name:"Ban Xia",cn:"半夏",g:1.5},{name:"Chen Pi",cn:"陳皮",g:1},{name:"Fu Ling",cn:"茯苓",g:1},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5}]},
  {pinyin:"Ping Wei San",cn:"平胃散",en:"Calm the Stomach Powder",herbs:[
    {name:"Cang Zhu",cn:"蒼朮",g:1.5},{name:"Hou Po",cn:"厚朴",g:1},{name:"Chen Pi",cn:"陳皮",g:1},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5}]},
  {pinyin:"Ge Gen Tang",cn:"葛根湯",en:"Kudzu Decoction",herbs:[
    {name:"Ge Gen",cn:"葛根",g:1.5},{name:"Ma Huang",cn:"麻黃",g:1},{name:"Gui Zhi",cn:"桂枝",g:0.7},{name:"Bai Shao",cn:"白芍",g:0.7},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5},{name:"Sheng Jiang",cn:"生薑",g:0.5},{name:"Da Zao",cn:"大棗",g:0.5}]},
  {pinyin:"Xiao Qing Long Tang",cn:"小青龍湯",en:"Minor Blue-Green Dragon Decoction",herbs:[
    {name:"Ma Huang",cn:"麻黃",g:1},{name:"Gui Zhi",cn:"桂枝",g:0.7},{name:"Bai Shao",cn:"白芍",g:0.7},{name:"Gan Jiang",cn:"乾薑",g:0.7},{name:"Xi Xin",cn:"細辛",g:0.3},{name:"Ban Xia",cn:"半夏",g:1},{name:"Wu Wei Zi",cn:"五味子",g:0.5},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.5}]},
  {pinyin:"Shao Yao Gan Cao Tang",cn:"芍藥甘草湯",en:"Peony and Licorice Decoction",herbs:[
    {name:"Bai Shao",cn:"白芍",g:2},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:2}]},
  {pinyin:"Gan Mai Da Zao Tang",cn:"甘麥大棗湯",en:"Licorice Wheat and Jujube Decoction",herbs:[
    {name:"Gan Cao (Sheng)",cn:"生甘草",g:1},{name:"Da Zao",cn:"大棗",g:1.5}]},
  {pinyin:"Zhen Wu Tang",cn:"真武湯",en:"True Warrior Decoction",herbs:[
    {name:"Fu Zi (Pao)",cn:"炮附子",g:1},{name:"Bai Zhu",cn:"白朮",g:1},{name:"Fu Ling",cn:"茯苓",g:1},{name:"Bai Shao",cn:"白芍",g:1},{name:"Sheng Jiang",cn:"生薑",g:0.5}]},
  {pinyin:"Jin Gui Shen Qi Wan",cn:"金匱腎氣丸",en:"Kidney Qi Pill from the Golden Cabinet",herbs:[
    {name:"Shu Di Huang",cn:"熟地黃",g:2},{name:"Shan Zhu Yu",cn:"山茱萸",g:1},{name:"Shan Yao",cn:"山藥",g:1},{name:"Ze Xie",cn:"澤瀉",g:0.7},{name:"Mu Dan Pi",cn:"牡丹皮",g:0.7},{name:"Fu Ling",cn:"茯苓",g:0.7},{name:"Gui Zhi",cn:"桂枝",g:0.3},{name:"Fu Zi (Pao)",cn:"炮附子",g:0.3}]},
  {pinyin:"Chai Hu Shu Gan San",cn:"柴胡疏肝散",en:"Bupleurum Powder to Spread the Liver",herbs:[
    {name:"Chai Hu",cn:"柴胡",g:1},{name:"Bai Shao",cn:"白芍",g:1},{name:"Chuan Xiong",cn:"川芎",g:0.7},{name:"Xiang Fu",cn:"香附",g:0.7},{name:"Chen Pi",cn:"陳皮",g:0.7},{name:"Zhi Ke",cn:"枳殼",g:0.7},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.3}]},
  {pinyin:"Shi Quan Da Bu Tang",cn:"十全大補湯",en:"All-Inclusive Great Tonifying Decoction",herbs:[
    {name:"Ren Shen",cn:"人參",g:0.7},{name:"Huang Qi",cn:"黃耆",g:1},{name:"Bai Zhu",cn:"白朮",g:1},{name:"Fu Ling",cn:"茯苓",g:1},{name:"Gan Cao (Zhi)",cn:"炙甘草",g:0.3},{name:"Shu Di Huang",cn:"熟地黃",g:1},{name:"Dang Gui",cn:"當歸",g:0.7},{name:"Bai Shao",cn:"白芍",g:0.7},{name:"Chuan Xiong",cn:"川芎",g:0.5},{name:"Rou Gui",cn:"肉桂",g:0.3}]},
  {pinyin:"Da Cheng Qi Tang",cn:"大承氣湯",en:"Major Order the Qi Decoction",herbs:[
    {name:"Da Huang",cn:"大黃",g:1.5},{name:"Hou Po",cn:"厚朴",g:1},{name:"Zhi Shi",cn:"枳實",g:1}]},
  {pinyin:"Ma Zi Ren Wan",cn:"麻子仁丸",en:"Hemp Seed Pill",herbs:[
    {name:"Da Huang",cn:"大黃",g:1},{name:"Hou Po",cn:"厚朴",g:0.7},{name:"Zhi Shi",cn:"枳實",g:0.7},{name:"Bai Shao",cn:"白芍",g:0.5},{name:"Xing Ren",cn:"杏仁",g:0.5}]},
  {pinyin:"Dang Gui Shao Yao San",cn:"當歸芍藥散",en:"Angelica and Peony Powder",herbs:[
    {name:"Dang Gui",cn:"當歸",g:1},{name:"Bai Shao",cn:"白芍",g:1.5},{name:"Chuan Xiong",cn:"川芎",g:0.7},{name:"Fu Ling",cn:"茯苓",g:1},{name:"Bai Zhu",cn:"白朮",g:1},{name:"Ze Xie",cn:"澤瀉",g:1}]},
  {pinyin:"Gui Zhi Fu Ling Wan",cn:"桂枝茯苓丸",en:"Cinnamon Twig and Poria Pill",herbs:[
    {name:"Gui Zhi",cn:"桂枝",g:1},{name:"Fu Ling",cn:"茯苓",g:1},{name:"Mu Dan Pi",cn:"牡丹皮",g:1},{name:"Tao Ren",cn:"桃仁",g:1},{name:"Bai Shao",cn:"白芍",g:1}]},
  {pinyin:"Ban Xia Hou Po Tang",cn:"半夏厚朴湯",en:"Pinellia and Magnolia Bark Decoction",herbs:[
    {name:"Ban Xia",cn:"半夏",g:1.5},{name:"Hou Po",cn:"厚朴",g:1},{name:"Fu Ling",cn:"茯苓",g:1},{name:"Sheng Jiang",cn:"生薑",g:0.7},{name:"Zi Su Ye",cn:"紫蘇葉",g:0.5}]},
];
