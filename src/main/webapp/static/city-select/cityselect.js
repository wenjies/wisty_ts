/* *
 * 全局空间 Vcity
 * */
var Vcity = {};
/* *
 * 静态方法集
 * @name _m
 * */
Vcity._m = {
    /* 选择元素 */
    $:function (arg, context) {
        var tagAll, n, eles = [], i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Vcity._m.$('*', context);
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },

    /* 绑定事件 */
    on:function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },

    /* 获取事件 */
    getEvent:function(event){
        return event || window.event;
    },

    /* 获取事件目标 */
    getTarget:function(event){
        return event.target || event.srcElement;
    },

    /* 获取元素位置 */
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },

    /* 添加样式名 */
    addClass:function (c, node) {
        if(!node)return;
        node.className = Vcity._m.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

    /* 移除样式名 */
    removeClass:function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!Vcity._m.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

    /* 是否含有CLASS */
    hasClass:function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    },

    /* 阻止冒泡 */
    stopPropagation:function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
    /* 去除两端空格 */
    trim:function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    }
};

/* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */

Vcity.allCity = ["bjb|北京北|VAP|beijingbei|bjb|0","bjd|北京东|BOP|beijingdong|bjd|1","bji|北京|BJP|beijing|bj|2","bjn|北京南|VNP|beijingnan|bjn|3","bjx|北京西|BXP|beijingxi|bjx|4","gzn|广州南|IZQ|guangzhounan|gzn|5","cqb|重庆北|CUW|chongqingbei|cqb|6","cqi|重庆|CQW|chongqing|cq|7","cqn|重庆南|CRW|chongqingnan|cqn|8","cqx|重庆西|CXW|chongqingxi|cqx|9","gzd|广州东|GGQ|guangzhoudong|gzd|10","sha|上海|SHH|shanghai|sh|11","shn|上海南|SNH|shanghainan|shn|12","shq|上海虹桥|AOH|shanghaihongqiao|shhq|13","shx|上海西|SXH|shanghaixi|shx|14","tjb|天津北|TBP|tianjinbei|tjb|15","tji|天津|TJP|tianjin|tj|16","tjn|天津南|TIP|tianjinnan|tjn|17","tjx|天津西|TXP|tianjinxi|tjx|18","cch|长春|CCT|changchun|cc|19","ccn|长春南|CET|changchunnan|ccn|20","ccx|长春西|CRT|changchunxi|ccx|21","cdd|成都东|ICW|chengdudong|cdd|22","cdn|成都南|CNW|chengdunan|cdn|23","cdu|成都|CDW|chengdu|cd|24","csh|长沙|CSQ|changsha|cs|25","csn|长沙南|CWQ|changshanan|csn|26","fzh|福州|FZS|fuzhou|fz|27","fzn|福州南|FYS|fuzhounan|fzn|28","gya|贵阳|GIW|guiyang|gy|29","gzh|广州|GZQ|guangzhou|gz|30","gzx|广州西|GXQ|guangzhouxi|gzx|31","heb|哈尔滨|HBB|haerbin|heb|32","hed|哈尔滨东|VBB|haerbindong|hebd|33","hex|哈尔滨西|VAB|haerbinxi|hebx|34","hfe|合肥|HFH|hefei|hf|35","hfx|合肥西|HTH|hefeixi|hfx|36","hhd|呼和浩特东|NDC|huhehaotedong|hhhtd|37","hht|呼和浩特|HHC|huhehaote|hhht|38","hkd|海  口东|KEQ|haikoudong|hkd|39","hkd|海口东|HMQ|haikoudong|hkd|40","hko|海口|VUQ|haikou|hk|41","hzd|杭州东|HGH|hangzhoudong|hzd|42","hzh|杭州|HZH|hangzhou|hz|43","hzn|杭州南|XHH|hangzhounan|hzn|44","jna|济南|JNK|jinan|jn|45","jnd|济南东|JAK|jinandong|jnd|46","jnx|济南西|JGK|jinanxi|jnx|47","kmi|昆明|KMM|kunming|km|48","kmx|昆明西|KXM|kunmingxi|kmx|49","lsa|拉萨|LSO|lasa|ls|50","lzd|兰州东|LVJ|lanzhoudong|lzd|51","lzh|兰州|LZJ|lanzhou|lz|52","lzx|兰州西|LAJ|lanzhouxi|lzx|53","nch|南昌|NCG|nanchang|nc|54","nji|南京|NJH|nanjing|nj|55","njn|南京南|NKH|nanjingnan|njn|56","nni|南宁|NNZ|nanning|nn|57","sjb|石家庄北|VVP|shijiazhuangbei|sjzb|58","sjz|石家庄|SJP|shijiazhuang|sjz|59","sya|沈阳|SYT|shenyang|sy|60","syb|沈阳北|SBT|shenyangbei|syb|61","syd|沈阳东|SDT|shenyangdong|syd|62","syn|沈阳南|SOT|shenyangnan|syn|63","tyb|太原北|TBV|taiyuanbei|tyb|64","tyd|太原东|TDV|taiyuandong|tyd|65","tyu|太原|TYV|taiyuan|ty|66","wha|武汉|WHN|wuhan|wh|67","wjx|王家营西|KNM|wangjiayingxi|wjyx|68","wln|乌鲁木齐南|WMR|wulumuqinan|wlmqn|69","xab|西安北|EAY|xianbei|xab|70","xan|西安|XAY|xian|xa|71","xan|西安南|CAY|xiannan|xan|72","xni|西宁|XNO|xining|xn|73","ych|银川|YIJ|yinchuan|yc|74","zzh|郑州|ZZF|zhengzhou|zz|75","aes|阿尔山|ART|aershan|aes|76","aka|安康|AKY|ankang|ak|77","aks|阿克苏|ASR|akesu|aks|78","alh|阿里河|AHX|alihe|alh|79","alk|阿拉山口|AKR|alashankou|alsk|80","api|安平|APT|anping|ap|81","aqi|安庆|AQH|anqing|aq|82","ash|安顺|ASW|anshun|as|83","ash|鞍山|AST|anshan|as|84","aya|安阳|AYF|anyang|ay|85","ban|北安|BAB|beian|ba|86","bbu|蚌埠|BBH|bengbu|bb|87","bch|白城|BCT|baicheng|bc|88","bha|北海|BHZ|beihai|bh|89","bhe|白河|BEL|baihe|bh|90","bji|白涧|BAP|baijian|bj|91","bji|宝鸡|BJY|baoji|bj|92","bji|滨江|BJB|binjiang|bj|93","bkt|博克图|BKX|boketu|bkt|94","bse|百色|BIZ|baise|bs|95","bss|白山市|HJL|baishanshi|bss|96","bta|北台|BTT|beitai|bt|97","btd|包头东|BDC|baotoudong|btd|98","bto|包头|BTC|baotou|bt|99","bts|北屯市|BXR|beitunshi|bts|100","bxi|本溪|BXT|benxi|bx|101","byb|白云鄂博|BEC|baiyunebo|byeb|102","byx|白银西|BXJ|baiyinxi|byx|103","bzh|亳州|BZH|bozhou|bz|104","cbi|赤壁|CBN|chibi|cb|105","cde|常德|VGQ|changde|cd|106","cde|承德|CDP|chengde|cd|107","cdi|长甸|CDT|changdian|cd|108","cfe|赤峰|CFD|chifeng|cf|109","cli|茶陵|CDG|chaling|cl|110","cna|苍南|CEH|cangnan|cn|111","cpi|昌平|CPP|changping|cp|112","cre|崇仁|CRG|chongren|cr|113","ctu|昌图|CTT|changtu|ct|114","ctz|长汀镇|CDB|changtingzhen|ctz|115","cxi|曹县|CXK|caoxian|cx|116","cxn|楚雄南|COM|chuxiongnan|cxn|117","cxt|陈相屯|CXT|chenxiangtun|cxt|118","czb|长治北|CBF|changzhibei|czb|119","czh|池州|IYH|chizhou|cz|120","czh|长征|CZJ|changzheng|cz|121","czh|常州|CZH|changzhou|cz|122","czh|郴州|CZQ|chenzhou|cz|123","czh|长治|CZF|changzhi|cz|124","czh|沧州|COP|cangzhou|cz|125","czu|崇左|CZZ|chongzuo|cz|126","dab|大安北|RNT|daanbei|dab|127","dch|大成|DCT|dacheng|dc|128","ddo|丹东|DUT|dandong|dd|129","dfh|东方红|DFB|dongfanghong|dfh|130","dgd|东莞东|DMQ|dongguandong|dgd|131","dhs|大虎山|DHD|dahushan|dhs|132","dhu|敦煌|DHJ|dunhuang|dh|133","dhu|敦化|DHL|dunhua|dh|134","dhu|德惠|DHT|dehui|dh|135","djc|东京城|DJB|dongjingcheng|djc|136","dji|大涧|DFP|dajian|dj|137","djy|都江堰|DDW|dujiangyan|djy|138","dlb|大连北|DFT|dalianbei|dlb|139","dli|大理|DKM|dali|dl|140","dli|大连|DLT|dalian|dl|141","dna|定南|DNG|dingnan|dn|142","dqi|大庆|DZX|daqing|dq|143","dsh|东胜|DOC|dongsheng|ds|144","dsq|大石桥|DQT|dashiqiao|dsq|145","dto|大同|DTV|datong|dt|146","dyi|东营|DPK|dongying|dy|147","dys|大杨树|DUX|dayangshu|dys|148","dyu|都匀|RYW|duyun|dy|149","dzh|邓州|DOF|dengzhou|dz|150","dzh|达州|RXW|dazhou|dz|151","dzh|德州|DZP|dezhou|dz|152","ejn|额济纳|EJC|ejina|ejn|153","eli|二连|RLC|erlian|el|154","esh|恩施|ESN|enshi|es|155","fdi|福鼎|FES|fuding|fd|156","fhc|凤凰机场|FJQ|fenghuangjichang|fhjc|157","fld|风陵渡|FLV|fenglingdu|fld|158","fli|涪陵|FLW|fuling|fl|159","flj|富拉尔基|FRX|fulaerji|flej|160","fsb|抚顺北|FET|fushunbei|fsb|161","fsh|佛山|FSQ|foshan|fs|162","fxn|阜新南|FXD|fuxinnan|fxn|163","fya|阜阳|FYH|fuyang|fy|164","gem|格尔木|GRO|geermu|gem|165","gha|广汉|GHW|guanghan|gh|166","gji|古交|GJV|gujiao|gj|167","glb|桂林北|GBZ|guilinbei|glb|168","gli|古莲|GRX|gulian|gl|169","gli|桂林|GLZ|guilin|gl|170","gsh|固始|GXN|gushi|gs|171","gsh|广水|GSN|guangshui|gs|172","gta|干塘|GNJ|gantang|gt|173","gyu|广元|GYW|guangyuan|gy|174","gzb|广州北|GBQ|guangzhoubei|gzb|175","gzh|赣州|GZG|ganzhou|gz|176","gzl|公主岭|GLT|gongzhuling|gzl|177","gzn|公主岭南|GBT|gongzhulingnan|gzln|178","han|淮安|AUH|huaian|ha|179","hbe|淮北|HRH|huaibei|hb|180","hbe|鹤北|HMB|hebei|hb|181","hbi|淮滨|HVN|huaibin|hb|182","hbi|河边|HBV|hebian|hb|183","hch|潢川|KCN|huangchuan|hc|184","hch|韩城|HCY|hancheng|hc|185","hda|邯郸|HDP|handan|hd|186","hdz|横道河子|HDB|hengdaohezi|hdhz|187","hga|鹤岗|HGB|hegang|hg|188","hgt|皇姑屯|HTT|huanggutun|hgt|189","hgu|红果|HEM|hongguo|hg|190","hhe|黑河|HJB|heihe|hh|191","hhu|怀化|HHQ|huaihua|hh|192","hko|汉口|HKN|hankou|hk|193","hld|葫芦岛|HLD|huludao|hld|194","hle|海拉尔|HRX|hailaer|hle|195","hll|霍林郭勒|HWD|huolinguole|hlgl|196","hlu|海伦|HLB|hailun|hl|197","hma|侯马|HMV|houma|hm|198","hmi|哈密|HMR|hami|hm|199","hna|淮南|HAH|huainan|hn|200","hna|桦南|HNB|huanan|hn|201","hnx|海宁西|EUH|hainingxi|hnx|202","hqi|鹤庆|HQM|heqing|hq|203","hrb|怀柔北|HBP|huairoubei|hrb|204","hro|怀柔|HRP|huairou|hr|205","hsd|黄石东|OSN|huangshidong|hsd|206","hsh|华山|HSY|huashan|hs|207","hsh|黄山|HKH|huangshan|hs|208","hsh|黄石|HSN|huangshi|hs|209","hsh|衡水|HSP|hengshui|hs|210","hya|衡阳|HYQ|hengyang|hy|211","hze|菏泽|HIK|heze|hz|212","hzh|贺州|HXZ|hezhou|hz|213","hzh|汉中|HOY|hanzhong|hz|214","hzh|惠州|HCQ|huizhou|hz|215","jan|吉安|VAG|jian|ja|216","jan|集安|JAL|jian|ja|217","jbc|江边村|JBG|jiangbiancun|jbc|218","jch|晋城|JCF|jincheng|jc|219","jcj|金城江|JJZ|jinchengjiang|jcj|220","jdz|景德镇|JCG|jingdezhen|jdz|221","jfe|嘉峰|JFF|jiafeng|jf|222","jgq|加格达奇|JGX|jiagedaqi|jgdq|223","jgs|井冈山|JGG|jinggangshan|jgs|224","jhe|蛟河|JHL|jiaohe|jh|225","jhn|金华南|RNH|jinhuanan|jhn|226","jhu|金华|JBH|jinhua|jh|227","jji|九江|JJG|jiujiang|jj|228","jli|吉林|JLL|jilin|jl|229","jme|荆门|JMN|jingmen|jm|230","jms|佳木斯|JMB|jiamusi|jms|231","jni|济宁|JIK|jining|jn|232","jnn|集宁南|JAC|jiningnan|jnn|233","jqu|酒泉|JQJ|jiuquan|jq|234","jsh|江山|JUH|jiangshan|js|235","jsh|吉首|JIQ|jishou|js|236","jta|九台|JTL|jiutai|jt|237","jts|镜铁山|JVJ|jingtieshan|jts|238","jxi|鸡西|JXB|jixi|jx|239","jxx|绩溪县|JRH|jixixian|jxx|240","jyg|嘉峪关|JGJ|jiayuguan|jyg|241","jyo|江油|JFW|jiangyou|jy|242","jzh|锦州|JZD|jinzhou|jz|243","jzh|金州|JZT|jinzhou|jz|244","jzh|蓟州|JKP|jizhou|jz|245","kel|库尔勒|KLR|kuerle|kel|246","kfe|开封|KFF|kaifeng|kf|247","kla|岢岚|KLV|kelan|kl|248","kli|凯里|KLW|kaili|kl|249","ksh|喀什|KSR|kashi|ks|250","ksn|昆山南|KNH|kunshannan|ksn|251","ktu|奎屯|KTR|kuitun|kt|252","kyu|开原|KYT|kaiyuan|ky|253","lan|六安|UAH|luan|la|254","lba|灵宝|LBF|lingbao|lb|255","lcg|芦潮港|UCH|luchaogang|lcg|256","lch|隆昌|LCW|longchang|lc|257","lch|陆川|LKZ|luchuan|lc|258","lch|利川|LCN|lichuan|lc|259","lch|临川|LCG|linchuan|lc|260","lch|潞城|UTP|lucheng|lc|261","lda|鹿道|LDL|ludao|ld|262","ldi|娄底|LDQ|loudi|ld|263","lfe|临汾|LFV|linfen|lf|264","lgz|良各庄|LGP|lianggezhuang|lgz|265","lhe|临河|LHC|linhe|lh|266","lhe|漯河|LON|luohe|lh|267","lhu|绿化|LWJ|lvhua|lh|268","lhu|隆化|UHP|longhua|lh|269","lji|丽江|LHM|lijiang|lj|270","lji|临江|LQL|linjiang|lj|271","lji|龙井|LJL|longjing|lj|272","lli|吕梁|LHV|lvliang|ll|273","lli|醴陵|LLG|liling|ll|274","lln|柳林南|LKV|liulinnan|lln|275","lpi|滦平|UPP|luanping|lp|276","lps|六盘水|UMW|liupanshui|lps|277","lqi|灵丘|LVV|lingqiu|lq|278","lsh|旅顺|LST|lvshun|ls|279","lxi|兰溪|LWH|lanxi|lx|280","lxi|陇西|LXJ|longxi|lx|281","lxi|澧县|LEQ|lixian|lx|282","lxi|临西|UEP|linxi|lx|283","lya|龙岩|LYS|longyan|ly|284","lya|耒阳|LYQ|leiyang|ly|285","lya|洛阳|LYF|luoyang|ly|286","lyd|连云港东|UKH|lianyungangdong|lygd|287","lyd|洛阳东|LDF|luoyangdong|lyd|288","lyi|临沂|LVK|linyi|ly|289","lym|洛阳龙门|LLF|luoyanglongmen|lylm|290","lyu|柳园|DHR|liuyuan|ly|291","lyu|凌源|LYD|lingyuan|ly|292","lyu|辽源|LYL|liaoyuan|ly|293","lzh|立志|LZX|lizhi|lz|294","lzh|柳州|LZZ|liuzhou|lz|295","lzh|辽中|LZD|liaozhong|lz|296","mch|麻城|MCN|macheng|mc|297","mdh|免渡河|MDX|mianduhe|mdh|298","mdj|牡丹江|MDB|mudanjiang|mdj|299","meg|莫尔道嘎|MRX|moerdaoga|medg|300","mgu|明光|MGH|mingguang|mg|301","mgu|满归|MHX|mangui|mg|302","mhe|漠河|MVX|mohe|mh|303","mmi|茂名|MDQ|maoming|mm|304","mmx|茂名西|MMZ|maomingxi|mmx|305","msh|密山|MSB|mishan|ms|306","msj|马三家|MJT|masanjia|msj|307","mwe|麻尾|VAW|mawei|mw|308","mya|绵阳|MYW|mianyang|my|309","mzh|梅州|MOQ|meizhou|mz|310","mzl|满洲里|MLX|manzhouli|mzl|311","nbd|宁波东|NVH|ningbodong|nbd|312","nbo|宁波|NGH|ningbo|nb|313","nch|南岔|NCB|nancha|nc|314","nch|南充|NCW|nanchong|nc|315","nda|南丹|NDZ|nandan|nd|316","ndm|南大庙|NMP|nandamiao|ndm|317","nfe|南芬|NFT|nanfen|nf|318","nhe|讷河|NHX|nehe|nh|319","nji|嫩江|NGX|nenjiang|nj|320","nji|内江|NJW|neijiang|nj|321","npi|南平|NPS|nanping|np|322","nto|南通|NUH|nantong|nt|323","nya|南阳|NFF|nanyang|ny|324","nzs|碾子山|NZX|nianzishan|nzs|325","pds|平顶山|PEN|pingdingshan|pds|326","pji|盘锦|PVD|panjin|pj|327","pli|平凉|PIJ|pingliang|pl|328","pln|平凉南|POJ|pingliangnan|pln|329","pqu|平泉|PQP|pingquan|pq|330","psh|坪石|PSQ|pingshi|ps|331","pxi|萍乡|PXG|pingxiang|px|332","pxi|凭祥|PXZ|pingxiang|px|333","pxx|郫县西|PCW|pixianxi|pxx|334","pzh|攀枝花|PRW|panzhihua|pzh|335","qch|蕲春|QRN|qichun|qc|336","qcs|青城山|QSW|qingchengshan|qcs|337","qda|青岛|QDK|qingdao|qd|338","qhc|清河城|QYP|qinghecheng|qhc|339","qji|曲靖|QJM|qujing|qj|340","qji|黔江|QNW|qianjiang|qj|341","qjz|前进镇|QEB|qianjinzhen|qjz|342","qqe|齐齐哈尔|QHX|qiqihaer|qqhe|343","qth|七台河|QTB|qitaihe|qth|344","qxi|沁县|QVV|qinxian|qx|345","qzd|泉州东|QRS|quanzhoudong|qzd|346","qzh|泉州|QYS|quanzhou|qz|347","qzh|衢州|QEH|quzhou|qz|348","ran|融安|RAZ|rongan|ra|349","rjg|汝箕沟|RQJ|rujigou|rjg|350","rji|瑞金|RJG|ruijin|rj|351","rzh|日照|RZK|rizhao|rz|352","scp|双城堡|SCB|shuangchengpu|scp|353","sfh|绥芬河|SFB|suifenhe|sfh|354","sgd|韶关东|SGQ|shaoguandong|sgd|355","shg|山海关|SHD|shanhaiguan|shg|356","shu|绥化|SHB|suihua|sh|357","sjf|三间房|SFX|sanjianfang|sjf|358","sjt|苏家屯|SXT|sujiatun|sjt|359","sla|舒兰|SLL|shulan|sl|360","smi|三明|SMS|sanming|sm|361","smu|神木|OMY|shenmu|sm|362","smx|三门峡|SMF|sanmenxia|smx|363","sna|商南|ONY|shangnan|sn|364","sni|遂宁|NIW|suining|sn|365","spi|四平|SPT|siping|sp|366","sqi|商丘|SQF|shangqiu|sq|367","sra|上饶|SRG|shangrao|sr|368","ssh|韶山|SSQ|shaoshan|ss|369","sso|宿松|OAH|susong|ss|370","sto|汕头|OTQ|shantou|st|371","swu|邵武|SWS|shaowu|sw|372","sxi|涉县|OEP|shexian|sx|373","sya|三亚|SEQ|sanya|sy|374","sya|三  亚|JUQ|sanya|sya|375","sya|邵阳|SYQ|shaoyang|sy|376","sya|十堰|SNN|shiyan|sy|377","sys|双鸭山|SSB|shuangyashan|sys|378","syu|松原|VYT|songyuan|sy|379","szh|苏州|SZH|suzhou|sz|380","szh|深圳|SZQ|shenzhen|sz|381","szh|宿州|OXH|suzhou|sz|382","szh|随州|SZN|suizhou|sz|383","szh|朔州|SUV|shuozhou|sz|384","szx|深圳西|OSQ|shenzhenxi|szx|385","tba|塘豹|TBQ|tangbao|tb|386","teq|塔尔气|TVX|taerqi|teq|387","tgu|潼关|TGY|tongguan|tg|388","tgu|塘沽|TGP|tanggu|tg|389","the|塔河|TXX|tahe|th|390","thu|通化|THL|tonghua|th|391","tla|泰来|TLX|tailai|tl|392","tlf|吐鲁番|TFR|tulufan|tlf|393","tli|通辽|TLD|tongliao|tl|394","tli|铁岭|TLT|tieling|tl|395","tlz|陶赖昭|TPT|taolaizhao|tlz|396","tme|图们|TML|tumen|tm|397","tre|铜仁|RDQ|tongren|tr|398","tsb|唐山北|FUP|tangshanbei|tsb|399","tsf|田师府|TFT|tianshifu|tsf|400","tsh|泰山|TAK|taishan|ts|401","tsh|唐山|TSP|tangshan|ts|402","tsh|天水|TSJ|tianshui|ts|403","typ|通远堡|TYT|tongyuanpu|typ|404","tys|太阳升|TQT|taiyangsheng|tys|405","tzh|泰州|UTH|taizhou|tz|406","tzi|桐梓|TZW|tongzi|tz|407","tzx|通州西|TAP|tongzhouxi|tzx|408","wch|五常|WCB|wuchang|wc|409","wch|武昌|WCN|wuchang|wc|410","wfd|瓦房店|WDT|wafangdian|wfd|411","wha|威海|WKK|weihai|wh|412","whu|芜湖|WHH|wuhu|wh|413","whx|乌海西|WXC|wuhaixi|whx|414","wjt|吴家屯|WJT|wujiatun|wjt|415","wlo|武隆|WLW|wulong|wl|416","wlt|乌兰浩特|WWT|wulanhaote|wlht|417","wna|渭南|WNY|weinan|wn|418","wsh|威舍|WSM|weishe|ws|419","wts|歪头山|WIT|waitoushan|wts|420","wwe|武威|WUJ|wuwei|ww|421","wwn|武威南|WWJ|wuweinan|wwn|422","wxi|无锡|WXH|wuxi|wx|423","wxi|乌西|WXR|wuxi|wx|424","wyl|乌伊岭|WPB|wuyiling|wyl|425","wys|武夷山|WAS|wuyishan|wys|426","wyu|万源|WYY|wanyuan|wy|427","wzh|万州|WYW|wanzhou|wz|428","wzh|梧州|WZZ|wuzhou|wz|429","wzh|温州|RZH|wenzhou|wz|430","wzn|温州南|VRH|wenzhounan|wzn|431","xch|西昌|ECW|xichang|xc|432","xch|许昌|XCF|xuchang|xc|433","xcn|西昌南|ENW|xichangnan|xcn|434","xfa|香坊|XFB|xiangfang|xf|435","xga|轩岗|XGV|xuangang|xg|436","xgu|兴国|EUG|xingguo|xg|437","xha|宣汉|XHY|xuanhan|xh|438","xhu|新会|EFQ|xinhui|xh|439","xhu|新晃|XLQ|xinhuang|xh|440","xlt|锡林浩特|XTC|xilinhaote|xlht|441","xlx|兴隆县|EXP|xinglongxian|xlx|442","xmb|厦门北|XKS|xiamenbei|xmb|443","xme|厦门|XMS|xiamen|xm|444","xmq|厦门高崎|XBS|xiamengaoqi|xmgq|445","xsh|小市|XST|xiaoshi|xs|446","xsh|秀山|ETW|xiushan|xs|447","xta|向塘|XTG|xiangtang|xt|448","xwe|宣威|XWM|xuanwei|xw|449","xxi|新乡|XXF|xinxiang|xx|450","xya|信阳|XUN|xinyang|xy|451","xya|咸阳|XYY|xianyang|xy|452","xya|襄阳|XFN|xiangyang|xy|453","xyc|熊岳城|XYT|xiongyuecheng|xyc|454","xyi|新沂|VIH|xinyi|xy|455","xyi|兴义|XRZ|xingyi|xy|456","xyu|新余|XUG|xinyu|xy|457","xzh|徐州|XCH|xuzhou|xz|458","yan|延安|YWY|yanan|ya|459","ybi|宜宾|YBW|yibin|yb|460","ybn|亚布力南|YWB|yabulinan|ybln|461","ybs|叶柏寿|YBD|yebaishou|ybs|462","ycd|宜昌东|HAN|yichangdong|ycd|463","ych|永川|YCW|yongchuan|yc|464","ych|盐城|AFH|yancheng|yc|465","ych|宜昌|YCN|yichang|yc|466","ych|运城|YNV|yuncheng|yc|467","ych|伊春|YCB|yichun|yc|468","yci|榆次|YCV|yuci|yc|469","ycu|杨村|YBP|yangcun|yc|470","ycx|宜春西|YCG|yichunxi|ycx|471","yes|伊尔施|YET|yiershi|yes|472","yga|燕岗|YGW|yangang|yg|473","yji|永济|YIV|yongji|yj|474","yji|延吉|YJL|yanji|yj|475","yko|营口|YKT|yingkou|yk|476","yks|牙克石|YKX|yakeshi|yks|477","yli|阎良|YNY|yanliang|yl|478","yli|玉林|YLZ|yulin|yl|479","yli|榆林|ALY|yulin|yl|480","ylw|亚龙湾|TWQ|yalongwan|ylw|481","ymp|一面坡|YPB|yimianpo|ymp|482","yni|伊宁|YMR|yining|yn|483","ypg|阳平关|YAY|yangpingguan|ypg|484","ypi|玉屏|YZW|yuping|yp|485","ypi|原平|YPV|yuanping|yp|486","yqi|延庆|YNP|yanqing|yq|487","yqq|阳泉曲|YYV|yangquanqu|yqq|488","yqu|玉泉|YQB|yuquan|yq|489","yqu|阳泉|AQP|yangquan|yq|490","ysh|营山|NUW|yingshan|ys|491","ysh|玉山|YNG|yushan|ys|492","ysh|燕山|AOP|yanshan|ys|493","ysh|榆树|YRT|yushu|ys|494","yta|鹰潭|YTG|yingtan|yt|495","yta|烟台|YAK|yantai|yt|496","yth|伊图里河|YEX|yitulihe|ytlh|497","ytx|玉田县|ATP|yutianxian|ytx|498","ywu|义乌|YWH|yiwu|yw|499","yxi|阳新|YON|yangxin|yx|500","yxi|义县|YXD|yixian|yx|501","yya|益阳|AEQ|yiyang|yy|502","yya|岳阳|YYQ|yueyang|yy|503","yzh|崖州|YUQ|yazhou|yz|504","yzh|永州|AOQ|yongzhou|yz|505","yzh|扬州|YLH|yangzhou|yz|506","zbo|淄博|ZBK|zibo|zb|507","zcd|镇城底|ZDV|zhenchengdi|zcd|508","zgo|自贡|ZGW|zigong|zg|509","zha|珠海|ZHQ|zhuhai|zh|510","zhb|珠海北|ZIQ|zhuhaibei|zhb|511","zji|湛江|ZJZ|zhanjiang|zj|512","zji|镇江|ZJH|zhenjiang|zj|513","zjj|张家界|DIQ|zhangjiajie|zjj|514","zjk|张家口|ZKP|zhangjiakou|zjk|515","zjn|张家口南|ZMP|zhangjiakounan|zjkn|516","zko|周口|ZKN|zhoukou|zk|517","zlm|哲里木|ZLC|zhelimu|zlm|518","zlt|扎兰屯|ZTX|zhalantun|zlt|519","zmd|驻马店|ZDN|zhumadian|zmd|520","zqi|肇庆|ZVQ|zhaoqing|zq|521","zsz|周水子|ZIT|zhoushuizi|zsz|522","zto|昭通|ZDW|zhaotong|zt|523","zwe|中卫|ZWJ|zhongwei|zw|524","zya|资阳|ZYW|ziyang|zy|525","zyx|遵义西|ZIW|zunyixi|zyx|526","zzh|枣庄|ZEK|zaozhuang|zz|527","zzh|资中|ZZW|zizhong|zz|528","zzh|株洲|ZZQ|zhuzhou|zz|529","zzx|枣庄西|ZFK|zaozhuangxi|zzx|530","aax|昂昂溪|AAX|angangxi|aax|531","ach|阿城|ACB|acheng|ac|532","ada|安达|ADX|anda|ad|533","ade|安德|ARW|ande|ad|534","adi|安定|ADP|anding|ad|535","adu|安多|ADO|anduo|ad|536","agu|安广|AGT|anguang|ag|537","aha|敖汉|YED|aohan|ah|538","ahe|艾河|AHP|aihe|ah|539","ahu|安化|PKQ|anhua|ah|540","ajc|艾家村|AJJ|aijiacun|ajc|541","aji|鳌江|ARH|aojiang|aj|542","aji|安家|AJB|anjia|aj|543","aji|阿金|AJD|ajin|aj|544","aji|安靖|PYW|anjing|aj|545","akt|阿克陶|AER|aketao|akt|546","aky|安口窑|AYY|ankouyao|aky|547","alg|敖力布告|ALD|aolibugao|albg|548","alo|安龙|AUZ|anlong|al|549","als|阿龙山|ASX|alongshan|als|550","alu|安陆|ALN|anlu|al|551","ame|阿木尔|JTX|amuer|ame|552","anz|阿南庄|AZM|ananzhuang|anz|553","aqx|安庆西|APH|anqingxi|aqx|554","asx|鞍山西|AXT|anshanxi|asx|555","ata|安塘|ATV|antang|at|556","atb|安亭北|ASH|antingbei|atb|557","ats|阿图什|ATR|atushi|ats|558","atu|安图|ATL|antu|at|559","axi|安溪|AXS|anxi|ax|560","bao|博鳌|BWQ|boao|ba|561","bbe|北碚|BPW|beibei|bb|562","bbg|白壁关|BGV|baibiguan|bbg|563","bbn|蚌埠南|BMH|bengbunan|bbn|564","bch|巴楚|BCR|bachu|bc|565","bch|板城|BUP|bancheng|bc|566","bdh|北戴河|BEP|beidaihe|bdh|567","bdi|保定|BDP|baoding|bd|568","bdi|宝坻|BPP|baodi|bd|569","bdl|八达岭|ILP|badaling|bdl|570","bdo|巴东|BNN|badong|bd|571","bgu|柏果|BGM|baiguo|bg|572","bha|布海|BUT|buhai|bh|573","bhd|白河东|BIY|baihedong|bhd|574","bho|贲红|BVC|benhong|bh|575","bhs|宝华山|BWH|baohuashan|bhs|576","bhx|白河县|BEY|baihexian|bhx|577","bjg|白芨沟|BJJ|baijigou|bjg|578","bjg|碧鸡关|BJM|bijiguan|bjg|579","bji|北滘|IBQ|beijiao|bj|580","bji|碧江|BLQ|bijiang|bj|581","bjp|白鸡坡|BBM|baijipo|bjp|582","bjs|笔架山|BSB|bijiashan|bjs|583","bjt|八角台|BTD|bajiaotai|bjt|584","bka|保康|BKD|baokang|bk|585","bkp|白奎堡|BKB|baikuipu|bkp|586","bla|白狼|BAT|bailang|bl|587","bla|百浪|BRZ|bailang|bl|588","ble|博乐|BOR|bole|bl|589","blg|宝拉格|BQC|baolage|blg|590","bli|巴林|BLX|balin|bl|591","bli|宝林|BNB|baolin|bl|592","bli|北流|BOZ|beiliu|bl|593","bli|勃利|BLB|boli|bl|594","blk|布列开|BLR|buliekai|blk|595","bls|宝龙山|BND|baolongshan|bls|596","blx|百里峡|AAP|bailixia|blx|597","bmc|八面城|BMD|bamiancheng|bmc|598","bmq|班猫箐|BNM|banmaoqing|bmq|599","bmt|八面通|BMB|bamiantong|bmt|600","bmz|北马圈子|BRP|beimaquanzi|bmqz|601","bpn|北票南|RPD|beipiaonan|bpn|602","bqi|白旗|BQP|baiqi|bq|603","bql|宝泉岭|BQB|baoquanling|bql|604","bqu|白泉|BQL|baiquan|bq|605","bsh|巴山|BAY|bashan|bs|606","bsj|白水江|BSY|baishuijiang|bsj|607","bsp|白沙坡|BPM|baishapo|bsp|608","bss|白石山|BAL|baishishan|bss|609","bsz|白水镇|BUM|baishuizhen|bsz|610","btd|包头 东|FDC|baotoudong|btd|611","bti|坂田|BTQ|bantian|bt|612","bto|泊头|BZP|botou|bt|613","btu|北屯|BYP|beitun|bt|614","bxh|本溪湖|BHT|benxihu|bxh|615","bxi|博兴|BXK|boxing|bx|616","bxt|八仙筒|VXD|baxiantong|bxt|617","byg|白音察干|BYC|baiyinchagan|bycg|618","byh|背荫河|BYB|beiyinhe|byh|619","byi|北营|BIV|beiying|by|620","byl|巴彦高勒|BAC|bayangaole|bygl|621","byl|白音他拉|BID|baiyintala|bytl|622","byq|鲅鱼圈|BYT|bayuquan|byq|623","bys|白银市|BNJ|baiyinshi|bys|624","bys|白音胡硕|BCD|baiyinhushuo|byhs|625","bzh|巴中|IEW|bazhong|bz|626","bzh|霸州|RMP|bazhou|bz|627","bzh|北宅|BVP|beizhai|bz|628","cbb|赤壁北|CIN|chibibei|cbb|629","cbg|查布嘎|CBC|chabuga|cbg|630","cch|长城|CEJ|changcheng|cc|631","cch|长冲|CCM|changchong|cc|632","cdd|承德东|CCP|chengdedong|cdd|633","cfx|赤峰西|CID|chifengxi|cfx|634","cga|嵯岗|CAX|cuogang|cg|635","cga|柴岗|CGT|chaigang|cg|636","cge|长葛|CEF|changge|cg|637","cgp|柴沟堡|CGV|chaigoupu|cgp|638","cgu|城固|CGY|chenggu|cg|639","cgy|陈官营|CAJ|chenguanying|cgy|640","cgz|成高子|CZB|chenggaozi|cgz|641","cha|草海|WBW|caohai|ch|642","che|柴河|CHB|chaihe|ch|643","che|册亨|CHZ|ceheng|ch|644","chk|草河口|CKT|caohekou|chk|645","chk|崔黄口|CHP|cuihuangkou|chk|646","chu|巢湖|CIH|chaohu|ch|647","cjg|蔡家沟|CJT|caijiagou|cjg|648","cjh|成吉思汗|CJX|chengjisihan|cjsh|649","cji|岔江|CAM|chajiang|cj|650","cjp|蔡家坡|CJY|caijiapo|cjp|651","cle|昌乐|CLK|changle|cl|652","clg|超梁沟|CYP|chaolianggou|clg|653","cli|慈利|CUQ|cili|cl|654","cli|昌黎|CLP|changli|cl|655","clz|长岭子|CLT|changlingzi|clz|656","cmi|晨明|CMB|chenming|cm|657","cno|长农|CNJ|changnong|cn|658","cpb|昌平北|VBP|changpingbei|cpb|659","cpi|常平|DAQ|changping|cp|660","cpl|长坡岭|CPM|changpoling|cpl|661","cqi|辰清|CQB|chenqing|cq|662","csh|蔡山|CON|caishan|cs|663","csh|楚山|CSB|chushan|cs|664","csh|长寿|EFW|changshou|cs|665","csh|磁山|CSP|cishan|cs|666","csh|苍石|CST|cangshi|cs|667","csh|草市|CSL|caoshi|cs|668","csq|察素齐|CSC|chasuqi|csq|669","cst|长山屯|CVT|changshantun|cst|670","cti|长汀|CES|changting|ct|671","ctx|昌图西|CPT|changtuxi|ctx|672","cwa|春湾|CQQ|chunwan|cw|673","cxi|磁县|CIP|cixian|cx|674","cxi|岑溪|CNZ|cenxi|cx|675","cxi|辰溪|CXQ|chenxi|cx|676","cxi|磁西|CRP|cixi|cx|677","cxn|长兴南|CFH|changxingnan|cxn|678","cya|磁窑|CYK|ciyao|cy|679","cya|春阳|CAL|chunyang|cy|680","cya|城阳|CEK|chengyang|cy|681","cyc|创业村|CEX|chuangyecun|cyc|682","cyc|朝阳川|CYL|chaoyangchuan|cyc|683","cyd|朝阳地|CDD|chaoyangdi|cyd|684","cyn|朝阳南|CYD|chaoyangnan|cyn|685","cyu|长垣|CYF|changyuan|cy|686","cyz|朝阳镇|CZL|chaoyangzhen|cyz|687","czb|滁州北|CUH|chuzhoubei|czb|688","czb|常州北|ESH|changzhoubei|czb|689","czh|滁州|CXH|chuzhou|cz|690","czh|潮州|CKQ|chaozhou|cz|691","czh|常庄|CVK|changzhuang|cz|692","czl|曹子里|CFP|caozili|czl|693","czw|车转湾|CWM|chezhuanwan|czw|694","czx|郴州西|ICQ|chenzhouxi|czx|695","czx|沧州西|CBP|cangzhouxi|czx|696","dan|德安|DAG|dean|da|697","dan|大安|RAT|daan|da|698","dba|大坝|DBJ|daba|db|699","dba|大板|DBC|daban|db|700","dba|大巴|DBD|daba|db|701","dba|到保|RBT|daobao|db|702","dbi|定边|DYJ|dingbian|db|703","dbj|东边井|DBB|dongbianjing|dbj|704","dbs|德伯斯|RDT|debosi|dbs|705","dcg|打柴沟|DGJ|dachaigou|dcg|706","dch|德昌|DVW|dechang|dc|707","dda|滴道|DDB|didao|dd|708","ddg|大磴沟|DKJ|dadenggou|ddg|709","ded|刀尔登|DRD|daoerdeng|ded|710","dee|得耳布尔|DRX|deerbuer|debe|711","dfa|东方|UFQ|dongfang|df|712","dfe|丹凤|DGY|danfeng|df|713","dfe|东丰|DIL|dongfeng|df|714","dge|都格|DMM|duge|dg|715","dgt|大官屯|DTT|daguantun|dgt|716","dgu|大关|RGW|daguan|dg|717","dgu|东光|DGP|dongguang|dg|718","dha|东海|DHB|donghai|dh|719","dhc|大灰厂|DHP|dahuichang|dhc|720","dhq|大红旗|DQD|dahongqi|dhq|721","dht|大禾塘|SOQ|shaodong|dh|722","dhx|东海县|DQH|donghaixian|dhx|723","dhx|德惠西|DXT|dehuixi|dhx|724","djg|达家沟|DJT|dajiagou|djg|725","dji|东津|DKB|dongjin|dj|726","dji|杜家|DJL|dujia|dj|727","dkt|大口屯|DKP|dakoutun|dkt|728","dla|东来|RVD|donglai|dl|729","dlh|德令哈|DHO|delingha|dlh|730","dlh|大陆号|DLC|daluhao|dlh|731","dli|带岭|DLB|dailing|dl|732","dli|大林|DLD|dalin|dl|733","dlq|达拉特旗|DIC|dalateqi|dltq|734","dlt|独立屯|DTX|dulitun|dlt|735","dlu|豆罗|DLV|douluo|dl|736","dlx|达拉特西|DNC|dalatexi|dltx|737","dlx|大连西|GZT|dalianxi|dlx|738","dmc|东明村|DMD|dongmingcun|dmc|739","dmh|洞庙河|DEP|dongmiaohe|dmh|740","dmx|东明县|DNF|dongmingxian|dmx|741","dni|大拟|DNZ|dani|dn|742","dpf|大平房|DPD|dapingfang|dpf|743","dps|大盘石|RPP|dapanshi|dps|744","dpu|大埔|DPI|dapu|dp|745","dpu|大堡|DVT|dapu|dp|746","dqd|大庆东|LFX|daqingdong|dqd|747","dqh|大其拉哈|DQX|daqilaha|dqlh|748","dqi|道清|DML|daoqing|dq|749","dqs|对青山|DQB|duiqingshan|dqs|750","dqx|德清西|MOH|deqingxi|dqx|751","dqx|大庆西|RHX|daqingxi|dqx|752","dsh|东升|DRQ|dongsheng|ds|753","dsh|砀山|DKH|dangshan|ds|754","dsh|独山|RWW|dushan|ds|755","dsh|登沙河|DWT|dengshahe|dsh|756","dsp|读书铺|DPM|dushupu|dsp|757","dst|大石头|DSL|dashitou|dst|758","dsx|东胜西|DYC|dongshengxi|dsx|759","dsz|大石寨|RZT|dashizhai|dsz|760","dta|东台|DBH|dongtai|dt|761","dta|定陶|DQK|dingtao|dt|762","dta|灯塔|DGT|dengta|dt|763","dtb|大田边|DBM|datianbian|dtb|764","dth|东通化|DTL|dongtonghua|dth|765","dtu|丹徒|RUH|dantu|dt|766","dtu|大屯|DNT|datun|dt|767","dwa|东湾|DRJ|dongwan|dw|768","dwk|大武口|DFJ|dawukou|dwk|769","dwp|低窝铺|DWJ|diwopu|dwp|770","dwt|大王滩|DZZ|dawangtan|dwt|771","dwz|大湾子|DFM|dawanzi|dwz|772","dxg|大兴沟|DXL|daxinggou|dxg|773","dxi|大兴|DXX|daxing|dx|774","dxi|定西|DSJ|dingxi|dx|775","dxi|甸心|DXM|dianxin|dx|776","dxi|东乡|DXG|dongxiang|dx|777","dxi|代县|DKV|daixian|dx|778","dxi|定襄|DXV|dingxiang|dx|779","dxu|东戌|RXP|dongxu|dx|780","dxz|东辛庄|DXD|dongxinzhuang|dxz|781","dya|丹阳|DYH|danyang|dy|782","dya|德阳|DYW|deyang|dy|783","dya|大雁|DYX|dayan|dy|784","dya|当阳|DYN|dangyang|dy|785","dyb|丹阳北|EXH|danyangbei|dyb|786","dyd|大英东|IAW|dayingdong|dyd|787","dyd|东淤地|DBV|dongyudi|dyd|788","dyi|大营|DYV|daying|dy|789","dyu|定远|EWH|dingyuan|dy|790","dyu|岱岳|RYV|daiyue|dy|791","dyu|大元|DYZ|dayuan|dy|792","dyz|大营镇|DJP|dayingzhen|dyz|793","dyz|大营子|DZD|dayingzi|dyz|794","dzc|大战场|DTJ|dazhanchang|dzc|795","dzd|德州东|DIP|dezhoudong|dzd|796","dzh|东至|DCH|dongzhi|dz|797","dzh|低庄|DVQ|dizhuang|dz|798","dzh|东镇|DNV|dongzhen|dz|799","dzh|道州|DFZ|daozhou|dz|800","dzh|东庄|DZV|dongzhuang|dz|801","dzh|兑镇|DWV|duizhen|dz|802","dzh|豆庄|ROP|douzhuang|dz|803","dzh|定州|DXP|dingzhou|dz|804","dzy|大竹园|DZY|dazhuyuan|dzy|805","dzz|大杖子|DAP|dazhangzi|dzz|806","dzz|豆张庄|RZP|douzhangzhuang|dzz|807","ebi|峨边|EBW|ebian|eb|808","edm|二道沟门|RDP|erdaogoumen|edgm|809","edw|二道湾|RDX|erdaowan|edw|810","ees|鄂尔多斯|EEC|eerduosi|eeds|811","elo|二龙|RLD|erlong|el|812","elt|二龙山屯|ELA|erlongshantun|elst|813","eme|峨眉|EMW|emei|em|814","emh|二密河|RML|ermihe|emh|815","eyi|二营|RYJ|erying|ey|816","ezh|鄂州|ECN|ezhou|ez|817","fan|福安|FAS|fuan|fa|818","fch|丰城|FCG|fengcheng|fc|819","fcn|丰城南|FNG|fengchengnan|fcn|820","fdo|肥东|FIH|feidong|fd|821","fer|发耳|FEM|faer|fe|822","fha|富海|FHX|fuhai|fh|823","fha|福海|FHR|fuhai|fh|824","fhc|凤凰城|FHT|fenghuangcheng|fhc|825","fhe|汾河|FEV|fenhe|fh|826","fhu|奉化|FHH|fenghua|fh|827","fji|富锦|FIB|fujin|fj|828","fjt|范家屯|FTT|fanjiatun|fjt|829","flq|福利区|FLJ|fuliqu|flq|830","flt|福利屯|FTB|fulitun|flt|831","flz|丰乐镇|FZB|fenglezhen|flz|832","fna|阜南|FNH|funan|fn|833","fni|阜宁|AKH|funing|fn|834","fni|抚宁|FNP|funing|fn|835","fqi|福清|FQS|fuqing|fq|836","fqu|福泉|VMW|fuquan|fq|837","fsc|丰水村|FSJ|fengshuicun|fsc|838","fsh|丰顺|FUQ|fengshun|fs|839","fsh|繁峙|FSV|fanshi|fs|840","fsh|抚顺|FST|fushun|fs|841","fsk|福山口|FKP|fushankou|fsk|842","fsu|扶绥|FSZ|fusui|fs|843","ftu|冯屯|FTX|fengtun|ft|844","fty|浮图峪|FYP|futuyu|fty|845","fxd|富县东|FDY|fuxiandong|fxd|846","fxi|凤县|FXY|fengxian|fx|847","fxi|富县|FEY|fuxian|fx|848","fxi|费县|FXK|feixian|fx|849","fya|凤阳|FUH|fengyang|fy|850","fya|汾阳|FAV|fenyang|fy|851","fyb|扶余北|FBT|fuyubei|fyb|852","fyi|分宜|FYG|fenyi|fy|853","fyu|富源|FYM|fuyuan|fy|854","fyu|扶余|FYT|fuyu|fy|855","fyu|富裕|FYX|fuyu|fy|856","fzb|抚州北|FBG|fuzhoubei|fzb|857","fzh|凤州|FZY|fengzhou|fz|858","fzh|丰镇|FZC|fengzhen|fz|859","fzh|范镇|VZK|fanzhen|fz|860","gan|固安|GFP|guan|ga|861","gan|广安|VJW|guangan|ga|862","gbd|高碑店|GBP|gaobeidian|gbd|863","gbz|沟帮子|GBD|goubangzi|gbz|864","gcd|甘草店|GDJ|gancaodian|gcd|865","gch|谷城|GCN|gucheng|gc|866","gch|藁城|GEP|gaocheng|gc|867","gcu|高村|GCV|gaocun|gc|868","gcz|古城镇|GZB|guchengzhen|gcz|869","gde|广德|GRH|guangde|gd|870","gdi|贵定|GTW|guiding|gd|871","gdn|贵定南|IDW|guidingnan|gdn|872","gdo|古东|GDV|gudong|gd|873","gga|贵港|GGZ|guigang|gg|874","gga|官高|GVP|guangao|gg|875","ggm|葛根庙|GGT|gegenmiao|ggm|876","ggo|干沟|GGL|gangou|gg|877","ggu|甘谷|GGJ|gangu|gg|878","ggz|高各庄|GGP|gaogezhuang|ggz|879","ghe|甘河|GAX|ganhe|gh|880","ghe|根河|GEX|genhe|gh|881","gjd|郭家店|GDT|guojiadian|gjd|882","gjz|孤家子|GKT|gujiazi|gjz|883","gla|古浪|GLJ|gulang|gl|884","gla|皋兰|GEJ|gaolan|gl|885","glf|高楼房|GFM|gaoloufang|glf|886","glh|归流河|GHT|guiliuhe|glh|887","gli|关林|GLF|guanlin|gl|888","glu|甘洛|VOW|ganluo|gl|889","glz|郭磊庄|GLP|guoleizhuang|glz|890","gmi|高密|GMK|gaomi|gm|891","gmz|公庙子|GMC|gongmiaozi|gmz|892","gnh|工农湖|GRT|gongnonghu|gnh|893","gnn|广宁寺南|GNT|guangningsinan|gnn|894","gnw|广南卫|GNM|guangnanwei|gnw|895","gpi|高平|GPF|gaoping|gp|896","gqb|甘泉北|GEY|ganquanbei|gqb|897","gqc|共青城|GAG|gongqingcheng|gqc|898","gqk|甘旗卡|GQD|ganqika|gqk|899","gqu|甘泉|GQY|ganquan|gq|900","gqz|高桥镇|GZD|gaoqiaozhen|gqz|901","gsh|灌水|GST|guanshui|gs|902","gsh|赶水|GSW|ganshui|gs|903","gsk|孤山口|GSP|gushankou|gsk|904","gso|果松|GSL|guosong|gs|905","gsz|高山子|GSD|gaoshanzi|gsz|906","gsz|嘎什甸子|GXD|gashidianzi|gsdz|907","gta|高台|GTJ|gaotai|gt|908","gta|高滩|GAY|gaotan|gt|909","gti|古田|GTS|gutian|gt|910","gti|官厅|GTP|guanting|gt|911","gtx|官厅西|KEP|guantingxi|gtx|912","gxi|贵溪|GXG|guixi|gx|913","gya|涡阳|GYH|guoyang|gy|914","gyi|巩义|GXF|gongyi|gy|915","gyi|高邑|GIP|gaoyi|gy|916","gyn|巩义南|GYF|gongyinan|gyn|917","gyn|广元南|GAW|guangyuannan|gyn|918","gyu|固原|GUJ|guyuan|gy|919","gyu|菇园|GYL|guyuan|gy|920","gyz|公营子|GYD|gongyingzi|gyz|921","gze|光泽|GZS|guangze|gz|922","gzh|古镇|GNQ|guzhen|gz|923","gzh|固镇|GEH|guzhen|gz|924","gzh|虢镇|GZY|guozhen|gz|925","gzh|瓜州|GZJ|guazhou|gz|926","gzh|高州|GSQ|gaozhou|gz|927","gzh|盖州|GXT|gaizhou|gz|928","gzj|官字井|GOT|guanzijing|gzj|929","gzs|冠豸山|GSS|guanzhaishan|gzs|930","gzx|盖州西|GAT|gaizhouxi|gzx|931","han|淮安南|AMH|huaiannan|han|932","han|红安|HWN|hongan|ha|933","hax|海安县|HIH|haianxian|hax|934","hax|红安西|VXN|honganxi|hax|935","hba|黄柏|HBL|huangbai|hb|936","hbe|海北|HEB|haibei|hb|937","hbi|鹤壁|HAF|hebi|hb|938","hcb|会昌北|XEG|huichangbei|hcb|939","hch|华城|VCQ|huacheng|hc|940","hch|河唇|HCZ|hechun|hc|941","hch|汉川|HCN|hanchuan|hc|942","hch|海城|HCT|haicheng|hc|943","hch|合川|WKW|hechuan|hc|944","hct|黑冲滩|HCJ|heichongtan|hct|945","hcu|黄村|HCP|huangcun|hc|946","hcx|海城西|HXT|haichengxi|hcx|947","hde|化德|HGC|huade|hd|948","hdo|洪洞|HDV|hongtong|hd|949","hes|霍尔果斯|HFR|huoerguosi|hegs|950","hfe|横峰|HFG|hengfeng|hf|951","hfw|韩府湾|HXJ|hanfuwan|hfw|952","hgu|汉沽|HGP|hangu|hg|953","hgy|黄瓜园|HYM|huangguayuan|hgy|954","hgz|红光镇|IGW|hongguangzhen|hgz|955","hhe|浑河|HHT|hunhe|hh|956","hhg|红花沟|VHD|honghuagou|hhg|957","hht|黄花筒|HUD|huanghuatong|hht|958","hjd|贺家店|HJJ|hejiadian|hjd|959","hji|和静|HJR|hejing|hj|960","hji|红江|HFM|hongjiang|hj|961","hji|黑井|HIM|heijing|hj|962","hji|获嘉|HJF|huojia|hj|963","hji|河津|HJV|hejin|hj|964","hji|涵江|HJS|hanjiang|hj|965","hji|华家|HJT|huajia|hj|966","hjq|杭锦后旗|HDC|hangjinhouqi|hjhq|967","hjx|河间西|HXP|hejianxi|hjx|968","hjz|花家庄|HJM|huajiazhuang|hjz|969","hkn|河口南|HKJ|hekounan|hkn|970","hko|黄口|KOH|huangkou|hk|971","hko|湖口|HKG|hukou|hk|972","hla|呼兰|HUB|hulan|hl|973","hlb|葫芦岛北|HPD|huludaobei|hldb|974","hlh|浩良河|HHB|haolianghe|hlh|975","hlh|哈拉海|HIT|halahai|hlh|976","hli|鹤立|HOB|heli|hl|977","hli|桦林|HIB|hualin|hl|978","hli|黄陵|ULY|huangling|hl|979","hli|海林|HRB|hailin|hl|980","hli|虎林|VLB|hulin|hl|981","hli|寒岭|HAT|hanling|hl|982","hlo|和龙|HLL|helong|hl|983","hlo|海龙|HIL|hailong|hl|984","hls|哈拉苏|HAX|halasu|hls|985","hlt|呼鲁斯太|VTJ|hulusitai|hlst|986","hlz|火连寨|HLT|huolianzhai|hlz|987","hme|黄梅|VEH|huangmei|hm|988","hmy|韩麻营|HYP|hanmaying|hmy|989","hnh|黄泥河|HHL|huangnihe|hnh|990","hni|海宁|HNH|haining|hn|991","hno|惠农|HMJ|huinong|hn|992","hpi|和平|VAQ|heping|hp|993","hpz|花棚子|HZM|huapengzi|hpz|994","hqi|花桥|VQH|huaqiao|hq|995","hqi|宏庆|HEY|hongqing|hq|996","hre|怀仁|HRV|huairen|hr|997","hro|华容|HRN|huarong|hr|998","hsb|华山北|HDY|huashanbei|hsb|999","hsd|黄松甸|HDL|huangsongdian|hsd|1000","hsg|和什托洛盖|VSR|heshituoluogai|hstlg|1001","hsh|红山|VSB|hongshan|hs|1002","hsh|汉寿|VSQ|hanshou|hs|1003","hsh|衡山|HSQ|hengshan|hs|1004","hsh|黑水|HOT|heishui|hs|1005","hsh|惠山|VCH|huishan|hs|1006","hsh|虎什哈|HHP|hushiha|hsh|1007","hsp|红寺堡|HSJ|hongsipu|hsp|1008","hst|虎石台|HUT|hushitai|hst|1009","hsw|海石湾|HSO|haishiwan|hsw|1010","hsx|衡山西|HEQ|hengshanxi|hsx|1011","hsx|红砂岘|VSJ|hongshaxian|hsx|1012","hta|黑台|HQB|heitai|ht|1013","hta|桓台|VTK|huantai|ht|1014","hti|和田|VTR|hetian|ht|1015","hto|会同|VTQ|huitong|ht|1016","htz|海坨子|HZT|haituozi|htz|1017","hwa|黑旺|HWK|heiwang|hw|1018","hwa|海湾|RWH|haiwan|hw|1019","hxi|红星|VXB|hongxing|hx|1020","hxi|徽县|HYY|huixian|hx|1021","hxl|红兴隆|VHB|hongxinglong|hxl|1022","hxt|换新天|VTB|huanxintian|hxt|1023","hxt|红岘台|HTJ|hongxiantai|hxt|1024","hya|红彦|VIX|hongyan|hy|1025","hya|合阳|HAY|heyang|hy|1026","hya|海阳|HYK|haiyang|hy|1027","hyd|衡阳东|HVQ|hengyangdong|hyd|1028","hyi|华蓥|HUW|huaying|hy|1029","hyi|汉阴|HQY|hanyin|hy|1030","hyt|黄羊滩|HGJ|huangyangtan|hyt|1031","hyu|汉源|WHW|hanyuan|hy|1032","hyu|河源|VIQ|heyuan|hy|1033","hyu|花园|HUN|huayuan|hy|1034","hyu|湟源|HNO|huangyuan|hy|1035","hyz|黄羊镇|HYJ|huangyangzhen|hyz|1036","hzh|湖州|VZH|huzhou|hz|1037","hzh|化州|HZZ|huazhou|hz|1038","hzh|黄州|VON|huangzhou|hz|1039","hzh|霍州|HZV|huozhou|hz|1040","hzx|惠州西|VXQ|huizhouxi|hzx|1041","jba|巨宝|JRT|jubao|jb|1042","jbi|靖边|JIY|jingbian|jb|1043","jbt|金宝屯|JBD|jinbaotun|jbt|1044","jcb|晋城北|JEF|jinchengbei|jcb|1045","jch|金昌|JCJ|jinchang|jc|1046","jch|鄄城|JCK|juancheng|jc|1047","jch|交城|JNV|jiaocheng|jc|1048","jch|建昌|JFD|jianchang|jc|1049","jde|峻德|JDB|junde|jd|1050","jdi|井店|JFP|jingdian|jd|1051","jdo|鸡东|JOB|jidong|jd|1052","jdu|江都|UDH|jiangdu|jd|1053","jgs|鸡冠山|JST|jiguanshan|jgs|1054","jgt|金沟屯|VGP|jingoutun|jgt|1055","jha|静海|JHP|jinghai|jh|1056","jhe|金河|JHX|jinhe|jh|1057","jhe|锦河|JHB|jinhe|jh|1058","jhe|精河|JHR|jinghe|jh|1059","jhn|精河南|JIR|jinghenan|jhn|1060","jhu|江华|JHZ|jianghua|jh|1061","jhu|建湖|AJH|jianhu|jh|1062","jjg|纪家沟|VJD|jijiagou|jjg|1063","jji|晋江|JJS|jinjiang|jj|1064","jji|锦界|JEY|jinjie|jj|1065","jji|姜家|JJB|jiangjia|jj|1066","jji|江津|JJW|jiangjin|jj|1067","jke|金坑|JKT|jinkeng|jk|1068","jli|芨岭|JLJ|jiling|jl|1069","jmc|金马村|JMM|jinmacun|jmc|1070","jmd|江门东|JWQ|jiangmendong|jmd|1071","jme|角美|JES|jiaomei|jm|1072","jna|莒南|JOK|junan|jn|1073","jna|井南|JNP|jingnan|jn|1074","jou|建瓯|JVS|jianou|jo|1075","jpe|经棚|JPC|jingpeng|jp|1076","jqi|江桥|JQX|jiangqiao|jq|1077","jsa|九三|SSX|jiusan|js|1078","jsb|金山北|EGH|jinshanbei|jsb|1079","jsh|嘉善|JSH|jiashan|js|1080","jsh|京山|JCN|jingshan|js|1081","jsh|建始|JRN|jianshi|js|1082","jsh|稷山|JVV|jishan|js|1083","jsh|吉舒|JSL|jishu|js|1084","jsh|建设|JET|jianshe|js|1085","jsh|甲山|JOP|jiashan|js|1086","jsj|建三江|JIB|jiansanjiang|jsj|1087","jsn|嘉善南|EAH|jiashannan|jsn|1088","jst|金山屯|JTB|jinshantun|jst|1089","jst|江所田|JOM|jiangsuotian|jst|1090","jta|景泰|JTJ|jingtai|jt|1091","jtn|九台南|JNL|jiutainan|jtn|1092","jwe|吉文|JWX|jiwen|jw|1093","jxi|进贤|JUG|jinxian|jx|1094","jxi|莒县|JKK|juxian|jx|1095","jxi|嘉祥|JUK|jiaxiang|jx|1096","jxi|介休|JXV|jiexiu|jx|1097","jxi|嘉兴|JXH|jiaxing|jx|1098","jxi|井陉|JJP|jingxing|jx|1099","jxn|嘉兴南|EPH|jiaxingnan|jxn|1100","jxz|夹心子|JXT|jiaxinzi|jxz|1101","jya|姜堰|UEH|jiangyan|jy|1102","jya|揭阳|JRQ|jieyang|jy|1103","jya|建阳|JYS|jianyang|jy|1104","jya|简阳|JYW|jianyang|jy|1105","jye|巨野|JYK|juye|jy|1106","jyo|江永|JYZ|jiangyong|jy|1107","jyu|缙云|JYH|jinyun|jy|1108","jyu|靖远|JYJ|jingyuan|jy|1109","jyu|江源|SZL|jiangyuan|jy|1110","jyu|济源|JYF|jiyuan|jy|1111","jyx|靖远西|JXJ|jingyuanxi|jyx|1112","jzb|胶州北|JZK|jiaozhoubei|jzb|1113","jzd|焦作东|WEF|jiaozuodong|jzd|1114","jzh|金寨|JZH|jinzhai|jz|1115","jzh|靖州|JEQ|jingzhou|jz|1116","jzh|荆州|JBN|jingzhou|jz|1117","jzh|胶州|JXK|jiaozhou|jz|1118","jzh|晋州|JXP|jinzhou|jz|1119","jzn|锦州南|JOD|jinzhounan|jzn|1120","jzu|焦作|JOF|jiaozuo|jz|1121","jzw|旧庄窝|JVP|jiuzhuangwo|jzw|1122","jzz|金杖子|JYD|jinzhangzi|jzz|1123","kan|开安|KAT|kaian|ka|1124","kch|库车|KCR|kuche|kc|1125","kch|康城|KCP|kangcheng|kc|1126","kde|库都尔|KDX|kuduer|kde|1127","kdi|宽甸|KDT|kuandian|kd|1128","kdo|克东|KOB|kedong|kd|1129","kdz|昆都仑召|KDC|kundulunzhao|kdlz|1130","kji|开江|KAW|kaijiang|kj|1131","kjj|康金井|KJB|kangjinjing|kjj|1132","klq|喀喇其|KQX|kalaqi|klq|1133","klu|开鲁|KLC|kailu|kl|1134","kly|克拉玛依|KHR|kelamayi|klmy|1135","kqi|口前|KQL|kouqian|kq|1136","ksh|昆山|KSH|kunshan|ks|1137","ksh|奎山|KAB|kuishan|ks|1138","ksh|克山|KSB|keshan|ks|1139","kto|开通|KTT|kaitong|kt|1140","kxl|康熙岭|KXZ|kangxiling|kxl|1141","kya|昆阳|KAM|kunyang|ky|1142","kyh|克一河|KHX|keyihe|kyh|1143","kyx|开原西|KXT|kaiyuanxi|kyx|1144","kzh|康庄|KZP|kangzhuang|kz|1145","lbi|来宾|UBZ|laibin|lb|1146","lbi|老边|LLT|laobian|lb|1147","lbx|灵宝西|LPF|lingbaoxi|lbx|1148","lch|龙川|LUQ|longchuan|lc|1149","lch|乐昌|LCQ|lechang|lc|1150","lch|黎城|UCP|licheng|lc|1151","lch|聊城|UCK|liaocheng|lc|1152","lcu|蓝村|LCK|lancun|lc|1153","lda|两当|LDY|liangdang|ld|1154","ldo|林东|LRC|lindong|ld|1155","ldu|乐都|LDO|ledu|ld|1156","ldx|梁底下|LDP|liangdixia|ldx|1157","ldz|六道河子|LVP|liudaohezi|ldhz|1158","lfa|鲁番|LVM|lufan|lf|1159","lfa|廊坊|LJP|langfang|lf|1160","lfa|落垡|LOP|luofa|lf|1161","lfb|廊坊北|LFP|langfangbei|lfb|1162","lfu|老府|UFD|laofu|lf|1163","lga|兰岗|LNB|langang|lg|1164","lgd|龙骨甸|LGM|longgudian|lgd|1165","lgo|芦沟|LOM|lugou|lg|1166","lgo|龙沟|LGJ|longgou|lg|1167","lgu|拉古|LGB|lagu|lg|1168","lha|临海|UFH|linhai|lh|1169","lha|林海|LXX|linhai|lh|1170","lha|拉哈|LHX|laha|lh|1171","lha|凌海|JID|linghai|lh|1172","lhe|柳河|LNL|liuhe|lh|1173","lhe|六合|KLH|liuhe|lh|1174","lhu|龙华|LHP|longhua|lh|1175","lhy|滦河沿|UNP|luanheyan|lhy|1176","lhz|六合镇|LEX|liuhezhen|lhz|1177","ljd|亮甲店|LRT|liangjiadian|ljd|1178","ljd|刘家店|UDT|liujiadian|ljd|1179","ljh|刘家河|LVT|liujiahe|ljh|1180","lji|连江|LKS|lianjiang|lj|1181","lji|庐江|UJH|lujiang|lj|1182","lji|李家|LJB|lijia|lj|1183","lji|罗江|LJW|luojiang|lj|1184","lji|廉江|LJZ|lianjiang|lj|1185","lji|两家|UJT|liangjia|lj|1186","lji|龙江|LJX|longjiang|lj|1187","lji|龙嘉|UJL|longjia|lj|1188","ljk|莲江口|LHB|lianjiangkou|ljk|1189","ljl|蔺家楼|ULK|linjialou|ljl|1190","ljp|李家坪|LIJ|lijiaping|ljp|1191","lka|兰考|LKF|lankao|lk|1192","lko|林口|LKB|linkou|lk|1193","lkp|路口铺|LKQ|lukoupu|lkp|1194","lla|老莱|LAX|laolai|ll|1195","lli|拉林|LAB|lalin|ll|1196","lli|陆良|LRM|luliang|ll|1197","lli|龙里|LLW|longli|ll|1198","lli|临澧|LWQ|linli|ll|1199","lli|兰棱|LLB|lanling|ll|1200","lli|零陵|UWZ|lingling|ll|1201","llo|卢龙|UAP|lulong|ll|1202","lmd|喇嘛甸|LMX|lamadian|lmd|1203","lmd|里木店|LMB|limudian|lmd|1204","lme|洛门|LMJ|luomen|lm|1205","lna|龙南|UNG|longnan|ln|1206","lpi|梁平|UQW|liangping|lp|1207","lpi|罗平|LPM|luoping|lp|1208","lpl|落坡岭|LPP|luopoling|lpl|1209","lps|六盘山|UPJ|liupanshan|lps|1210","lps|乐平市|LPG|lepingshi|lps|1211","lqi|临清|UQK|linqing|lq|1212","lqs|龙泉寺|UQJ|longquansi|lqs|1213","lsb|乐山北|UTW|leshanbei|ls|1214","lsc|乐善村|LUM|leshancun|lsc|1215","lsd|冷水江东|UDQ|lengshuijiangdong|lsjd|1216","lsg|连山关|LGT|lianshanguan|lsg|1217","lsg|流水沟|USP|liushuigou|lsg|1218","lsh|陵水|LIQ|lingshui|ls|1219","lsh|丽水|USH|lishui|ls|1220","lsh|罗山|LRN|luoshan|ls|1221","lsh|鲁山|LAF|lushan|ls|1222","lsh|梁山|LMK|liangshan|ls|1223","lsh|灵石|LSV|lingshi|ls|1224","lsh|露水河|LUL|lushuihe|lsh|1225","lsh|庐山|LSG|lushan|ls|1226","lsp|林盛堡|LBT|linshengpu|lsp|1227","lst|柳树屯|LSD|liushutun|lst|1228","lsz|龙山镇|LAS|longshanzhen|lsz|1229","lsz|梨树镇|LSB|lishuzhen|lsz|1230","lsz|李石寨|LET|lishizhai|lsz|1231","lta|黎塘|LTZ|litang|lt|1232","lta|轮台|LAR|luntai|lt|1233","lta|芦台|LTP|lutai|lt|1234","ltb|龙塘坝|LBM|longtangba|ltb|1235","ltu|濑湍|LVZ|laituan|lt|1236","ltx|骆驼巷|LTJ|luotuoxiang|ltx|1237","lwa|李旺|VLJ|liwang|lw|1238","lwd|莱芜东|LWK|laiwudong|lwd|1239","lws|狼尾山|LRJ|langweishan|lws|1240","lwu|灵武|LNJ|lingwu|lw|1241","lwx|莱芜西|UXK|laiwuxi|lwx|1242","lxi|朗乡|LXB|langxiang|lx|1243","lxi|陇县|LXY|longxian|lx|1244","lxi|临湘|LXQ|linxiang|lx|1245","lxi|芦溪|LUG|luxi|lx|1246","lxi|莱西|LXK|laixi|lx|1247","lxi|林西|LXC|linxi|lx|1248","lxi|滦县|UXP|luanxian|lx|1249","lya|略阳|LYY|lueyang|ly|1250","lya|莱阳|LYK|laiyang|ly|1251","lya|辽阳|LYT|liaoyang|ly|1252","lyb|临沂北|UYK|linyibei|lyb|1253","lyd|凌源东|LDD|lingyuandong|lyd|1254","lyg|连云港|UIH|lianyungang|lyg|1255","lyi|临颍|LNF|linying|ly|1256","lyi|老营|LXL|laoying|ly|1257","lyo|龙游|LMH|longyou|ly|1258","lyu|罗源|LVS|luoyuan|ly|1259","lyu|林源|LYX|linyuan|ly|1260","lyu|涟源|LAQ|lianyuan|ly|1261","lyu|涞源|LYP|laiyuan|ly|1262","lyx|耒阳西|LPQ|leiyangxi|lyx|1263","lze|临泽|LEJ|linze|lz|1264","lzg|龙爪沟|LZT|longzhuagou|lzg|1265","lzh|雷州|UAQ|leizhou|lz|1266","lzh|六枝|LIW|liuzhi|lz|1267","lzh|鹿寨|LIZ|luzhai|lz|1268","lzh|来舟|LZS|laizhou|lz|1269","lzh|龙镇|LZA|longzhen|lz|1270","lzh|拉鲊|LEM|lazha|lz|1271","lzq|兰州新区|LQJ|lanzhouxinqu|lzxq|1272","mas|马鞍山|MAH|maanshan|mas|1273","mba|毛坝|MBY|maoba|mb|1274","mbg|毛坝关|MGY|maobaguan|mbg|1275","mcb|麻城北|MBN|machengbei|mcb|1276","mch|渑池|MCF|mianchi|mc|1277","mch|明城|MCL|mingcheng|mc|1278","mch|庙城|MAP|miaocheng|mc|1279","mcn|渑池南|MNF|mianchinan|mcn|1280","mcp|茅草坪|KPM|maocaoping|mcp|1281","mdh|猛洞河|MUQ|mengdonghe|mdh|1282","mds|磨刀石|MOB|modaoshi|mds|1283","mdu|弥渡|MDF|midu|md|1284","mes|帽儿山|MRB|maoershan|mes|1285","mga|明港|MGN|minggang|mg|1286","mhk|梅河口|MHL|meihekou|mhk|1287","mhu|马皇|MHZ|mahuang|mh|1288","mjg|孟家岗|MGB|mengjiagang|mjg|1289","mla|美兰|MHQ|meilan|ml|1290","mld|汨罗东|MQQ|miluodong|mld|1291","mlh|马莲河|MHB|malianhe|mlh|1292","mli|茅岭|MLZ|maoling|ml|1293","mli|庙岭|MLL|miaoling|ml|1294","mli|茂林|MLD|maolin|ml|1295","mli|穆棱|MLB|muling|ml|1296","mli|马林|MID|malin|ml|1297","mlo|马龙|MGM|malong|ml|1298","mlt|木里图|MUD|mulitu|mlt|1299","mlu|汨罗|MLQ|miluo|ml|1300","mnh|玛纳斯湖|MNR|manasihu|mnsh|1301","mni|冕宁|UGW|mianning|mn|1302","mpa|沐滂|MPQ|mupang|mp|1303","mqh|马桥河|MQB|maqiaohe|mqh|1304","mqi|闽清|MQS|minqing|mq|1305","mqu|民权|MQF|minquan|mq|1306","msh|明水河|MUT|mingshuihe|msh|1307","msh|麻山|MAB|mashan|ms|1308","msh|眉山|MSW|meishan|ms|1309","msw|漫水湾|MKW|manshuiwan|msw|1310","msz|茂舍祖|MOM|maoshezu|msz|1311","msz|米沙子|MST|mishazi|msz|1312","mxi|美溪|MEB|meixi|mx|1313","mxi|勉县|MVY|mianxian|mx|1314","mya|麻阳|MVQ|mayang|my|1315","myb|密云北|MUP|miyunbei|myb|1316","myi|米易|MMW|miyi|my|1317","myu|麦园|MYS|maiyuan|my|1318","myu|墨玉|MUR|moyu|my|1319","mzh|庙庄|MZJ|miaozhuang|mz|1320","mzh|米脂|MEY|mizhi|mz|1321","mzh|明珠|MFQ|mingzhu|mz|1322","nan|宁安|NAB|ningan|na|1323","nan|农安|NAT|nongan|na|1324","nbs|南博山|NBK|nanboshan|nbs|1325","nch|南仇|NCK|nanqiu|nc|1326","ncs|南城司|NSP|nanchengsi|ncs|1327","ncu|宁村|NCZ|ningcun|nc|1328","nde|宁德|NES|ningde|nd|1329","ngc|南观村|NGP|nanguancun|ngc|1330","ngd|南宫东|NFP|nangongdong|ngd|1331","ngl|南关岭|NLT|nanguanling|ngl|1332","ngu|宁国|NNH|ningguo|ng|1333","nha|宁海|NHH|ninghai|nh|1334","nhb|南华北|NHS|nanhuabei|nhb|1335","nhc|南河川|NHJ|nanhechuan|nhc|1336","nhz|泥河子|NHD|nihezi|nhz|1337","nji|宁家|NVT|ningjia|nj|1338","nji|南靖|NJS|nanjing|nj|1339","nji|牛家|NJB|niujia|nj|1340","nji|能家|NJD|nengjia|nj|1341","nko|南口|NKP|nankou|nk|1342","nkq|南口前|NKT|nankouqian|nkq|1343","nla|南朗|NNQ|nanlang|nl|1344","nli|乃林|NLD|nailin|nl|1345","nlk|尼勒克|NIR|nileke|nlk|1346","nlu|那罗|ULZ|naluo|nl|1347","nlx|宁陵县|NLF|ninglingxian|nlx|1348","nma|奈曼|NMD|naiman|nm|1349","nmi|宁明|NMZ|ningming|nm|1350","nmu|南木|NMX|nanmu|nm|1351","npn|南平南|NNS|nanpingnan|npn|1352","npu|那铺|NPZ|napu|np|1353","nqi|南桥|NQD|nanqiao|nq|1354","nqu|那曲|NQO|naqu|nq|1355","nqu|暖泉|NQJ|nuanquan|nq|1356","nta|南台|NTT|nantai|nt|1357","nto|南头|NOQ|nantou|nt|1358","nwu|宁武|NWV|ningwu|nw|1359","nwz|南湾子|NWP|nanwanzi|nwz|1360","nxb|南翔北|NEH|nanxiangbei|nxb|1361","nxi|宁乡|NXQ|ningxiang|nx|1362","nxi|内乡|NXF|neixiang|nx|1363","nxt|牛心台|NXT|niuxintai|nxt|1364","nyu|南峪|NUP|nanyu|ny|1365","nzg|娘子关|NIP|niangziguan|nzg|1366","nzh|南召|NAF|nanzhao|nz|1367","nzm|南杂木|NZT|nanzamu|nzm|1368","pan|蓬安|PAW|pengan|pa|1369","pan|平安|PAL|pingan|pa|1370","pay|平安驿|PNO|pinganyi|pay|1371","paz|磐安镇|PAJ|pananzhen|paz|1372","paz|平安镇|PZT|pinganzhen|paz|1373","pcd|蒲城东|PEY|puchengdong|pcd|1374","pch|蒲城|PCY|pucheng|pc|1375","pde|裴德|PDB|peide|pd|1376","pdi|偏店|PRP|piandian|pd|1377","pdx|平顶山西|BFF|pingdingshanxi|pdsx|1378","pdx|坡底下|PXJ|podixia|pdx|1379","pet|瓢儿屯|PRT|piaoertun|pet|1380","pfa|平房|PFB|pingfang|pf|1381","pga|平岗|PGL|pinggang|pg|1382","pgu|平关|PGM|pingguan|pg|1383","pgu|盘关|PAM|panguan|pg|1384","pgu|平果|PGZ|pingguo|pg|1385","phb|徘徊北|PHP|paihuaibei|phb|1386","phk|平河口|PHM|pinghekou|phk|1387","phu|平湖|PHQ|pinghu|ph|1388","pjb|盘锦北|PBD|panjinbei|pjb|1389","pjd|潘家店|PDP|panjiadian|pjd|1390","pkn|皮口南|PKT|pikounan|pk|1391","pld|普兰店|PLT|pulandian|pld|1392","pli|偏岭|PNT|pianling|pl|1393","psh|平山|PSB|pingshan|ps|1394","psh|彭山|PSW|pengshan|ps|1395","psh|皮山|PSR|pishan|ps|1396","psh|磐石|PSL|panshi|ps|1397","psh|平社|PSV|pingshe|ps|1398","psh|彭水|PHW|pengshui|ps|1399","pta|平台|PVT|pingtai|pt|1400","pti|平田|PTM|pingtian|pt|1401","pti|莆田|PTS|putian|pt|1402","ptq|葡萄菁|PTW|putaojing|ptq|1403","pwa|普湾|PWT|puwan|pw|1404","pwa|平旺|PWV|pingwang|pw|1405","pxg|平型关|PGV|pingxingguan|pxg|1406","pxi|普雄|POW|puxiong|px|1407","pxi|郫县|PWW|pixian|px|1408","pya|平洋|PYX|pingyang|py|1409","pya|彭阳|PYJ|pengyang|py|1410","pya|平遥|PYV|pingyao|py|1411","pyi|平邑|PIK|pingyi|py|1412","pyp|平原堡|PPJ|pingyuanpu|pyp|1413","pyu|平原|PYK|pingyuan|py|1414","pyu|平峪|PYP|pingyu|py|1415","pze|彭泽|PZG|pengze|pz|1416","pzh|邳州|PJH|pizhou|pz|1417","pzh|平庄|PZD|pingzhuang|pz|1418","pzi|泡子|POD|paozi|pz|1419","pzn|平庄南|PND|pingzhuangnan|pzn|1420","qan|乾安|QOT|qianan|qa|1421","qan|庆安|QAB|qingan|qa|1422","qan|迁安|QQP|qianan|qa|1423","qdb|祁东北|QRQ|qidongbei|qd|1424","qdi|七甸|QDM|qidian|qd|1425","qfd|曲阜东|QAK|qufudong|qfd|1426","qfe|庆丰|QFT|qingfeng|qf|1427","qft|奇峰塔|QVP|qifengta|qft|1428","qfu|曲阜|QFK|qufu|qf|1429","qha|琼海|QYQ|qionghai|qh|1430","qhd|秦皇岛|QTP|qinhuangdao|qhd|1431","qhe|千河|QUY|qianhe|qh|1432","qhe|清河|QIP|qinghe|qh|1433","qhm|清河门|QHD|qinghemen|qhm|1434","qhy|清华园|QHP|qinghuayuan|qhy|1435","qji|全椒|INH|quanjiao|qj|1436","qji|渠旧|QJZ|qujiu|qj|1437","qji|潜江|QJN|qianjiang|qj|1438","qji|秦家|QJB|qinjia|qj|1439","qji|綦江|QJW|qijiang|qj|1440","qjp|祁家堡|QBT|qijiapu|qjp|1441","qjx|清涧县|QNY|qingjianxian|qjx|1442","qjz|秦家庄|QZV|qinjiazhuang|qjz|1443","qlh|七里河|QLD|qilihe|qlh|1444","qli|秦岭|QLY|qinling|ql|1445","qli|渠黎|QLZ|quli|ql|1446","qlo|青龙|QIB|qinglong|ql|1447","qls|青龙山|QGH|qinglongshan|qls|1448","qme|祁门|QIH|qimen|qm|1449","qmt|前磨头|QMP|qianmotou|qmt|1450","qsh|青山|QSB|qingshan|qs|1451","qsh|确山|QSN|queshan|qs|1452","qsh|前山|QXQ|qianshan|qs|1453","qsh|清水|QUJ|qingshui|qs|1454","qsy|戚墅堰|QYH|qishuyan|qsy|1455","qti|青田|QVH|qingtian|qt|1456","qto|桥头|QAT|qiaotou|qt|1457","qtx|青铜峡|QTJ|qingtongxia|qtx|1458","qwe|前卫|QWD|qianwei|qw|1459","qwt|前苇塘|QWP|qianweitang|qwt|1460","qxi|渠县|QRW|quxian|qx|1461","qxi|祁县|QXV|qixian|qx|1462","qxi|青县|QXP|qingxian|qx|1463","qxi|桥西|QXJ|qiaoxi|qx|1464","qxu|清徐|QUV|qingxu|qx|1465","qxy|旗下营|QXC|qixiaying|qxy|1466","qya|千阳|QOY|qianyang|qy|1467","qya|沁阳|QYF|qinyang|qy|1468","qya|泉阳|QYL|quanyang|qy|1469","qyb|祁阳北|QVQ|qiyangbei|qy|1470","qyi|七营|QYJ|qiying|qy|1471","qys|庆阳山|QSJ|qingyangshan|qys|1472","qyu|清远|QBQ|qingyuan|qy|1473","qyu|清原|QYT|qingyuan|qy|1474","qzd|钦州东|QDZ|qinzhoudong|qzd|1475","qzh|钦州|QRZ|qinzhou|qz|1476","qzs|青州市|QZK|qingzhoushi|qzs|1477","ran|瑞安|RAH|ruian|ra|1478","rch|荣昌|RCW|rongchang|rc|1479","rch|瑞昌|RCG|ruichang|rc|1480","rga|如皋|RBH|rugao|rg|1481","rgu|容桂|RUQ|ronggui|rg|1482","rqi|任丘|RQP|renqiu|rq|1483","rsh|乳山|ROK|rushan|rs|1484","rsh|融水|RSZ|rongshui|rs|1485","rsh|热水|RSD|reshui|rs|1486","rxi|容县|RXZ|rongxian|rx|1487","rya|饶阳|RVP|raoyang|ry|1488","rya|汝阳|RYF|ruyang|ry|1489","ryh|绕阳河|RHD|raoyanghe|ryh|1490","rzh|汝州|ROF|ruzhou|rz|1491","sba|石坝|OBJ|shiba|sb|1492","sbc|上板城|SBP|shangbancheng|sbc|1493","sbi|施秉|AQW|shibing|sb|1494","sbn|上板城南|OBP|shangbanchengnan|sbcn|1495","sby|世博园|ZWT|shiboyuan|sby|1496","scb|双城北|SBB|shuangchengbei|scb|1497","sch|舒城|OCH|shucheng|sc|1498","sch|商城|SWN|shangcheng|sc|1499","sch|莎车|SCR|shache|sc|1500","sch|顺昌|SCS|shunchang|sc|1501","sch|神池|SMV|shenchi|sc|1502","sch|沙城|SCP|shacheng|sc|1503","sch|石城|SCT|shicheng|sc|1504","scz|山城镇|SCL|shanchengzhen|scz|1505","sda|山丹|SDJ|shandan|sd|1506","sde|顺德|ORQ|shunde|sd|1507","sde|绥德|ODY|suide|sd|1508","sdo|水洞|SIL|shuidong|sd|1509","sdu|商都|SXC|shangdu|sd|1510","sdu|十渡|SEP|shidu|sd|1511","sdw|四道湾|OUD|sidaowan|sdw|1512","sdy|顺德学院|OJQ|shundexueyuan|sdxy|1513","sfa|绅坊|OLH|shenfang|sf|1514","sfe|双丰|OFB|shuangfeng|sf|1515","sft|四方台|STB|sifangtai|sft|1516","sfu|水富|OTW|shuifu|sf|1517","sgk|三关口|OKJ|sanguankou|sgk|1518","sgl|桑根达来|OGC|sanggendalai|sgdl|1519","sgu|韶关|SNQ|shaoguan|sg|1520","sgz|上高镇|SVK|shanggaozhen|sgz|1521","sha|上杭|JBS|shanghang|sh|1522","sha|沙海|SED|shahai|sh|1523","she|松河|SBM|songhe|sh|1524","she|沙河|SHP|shahe|sh|1525","shk|沙河口|SKT|shahekou|shk|1526","shl|赛汗塔拉|SHC|saihantala|shtl|1527","shs|沙河市|VOP|shaheshi|shs|1528","shs|沙后所|SSD|shahousuo|shs|1529","sht|山河屯|SHL|shanhetun|sht|1530","shx|三河县|OXP|sanhexian|shx|1531","shy|四合永|OHD|siheyong|shy|1532","shz|三汇镇|OZW|sanhuizhen|shz|1533","shz|双河镇|SEL|shuanghezhen|shz|1534","shz|石河子|SZR|shihezi|shz|1535","shz|三合庄|SVP|sanhezhuang|shz|1536","sjd|三家店|ODP|sanjiadian|sjd|1537","sjh|水家湖|SQH|shuijiahu|sjh|1538","sjh|沈家河|OJJ|shenjiahe|sjh|1539","sjh|松江河|SJL|songjianghe|sjh|1540","sji|尚家|SJB|shangjia|sj|1541","sji|孙家|SUB|sunjia|sj|1542","sji|沈家|OJB|shenjia|sj|1543","sji|双吉|SML|shuangji|sj|1544","sji|松江|SAH|songjiang|sj|1545","sjk|三江口|SKD|sanjiangkou|sjk|1546","sjl|司家岭|OLK|sijialing|sjl|1547","sjn|松江南|IMH|songjiangnan|sjn|1548","sjn|石景山南|SRP|shijingshannan|sjsn|1549","sjt|邵家堂|SJJ|shaojiatang|sjt|1550","sjx|三江县|SOZ|sanjiangxian|sjx|1551","sjz|三家寨|SMM|sanjiazhai|sjz|1552","sjz|十家子|SJD|shijiazi|sjz|1553","sjz|松江镇|OZL|songjiangzhen|sjz|1554","sjz|施家嘴|SHM|shijiazui|sjz|1555","sjz|深井子|SWT|shenjingzi|sjz|1556","sld|什里店|OMP|shilidian|sld|1557","sle|疏勒|SUR|shule|sl|1558","slh|疏勒河|SHJ|shulehe|slh|1559","slh|舍力虎|VLD|shelihu|slh|1560","sli|石磷|SPB|shilin|sl|1561","sli|石林|SLM|shilin|sl|1562","sli|双辽|ZJD|shuangliao|sl|1563","sli|绥棱|SIB|suiling|sl|1564","sli|石岭|SOL|shiling|sl|1565","sln|石林南|LNM|shilinnan|sln|1566","slo|石龙|SLQ|shilong|sl|1567","slq|萨拉齐|SLC|salaqi|slq|1568","slu|索伦|SNT|suolun|sl|1569","slu|商洛|OLY|shangluo|sl|1570","slz|沙岭子|SLP|shalingzi|slz|1571","smb|石门县北|VFQ|shimenxianbei|smxb|1572","smn|三门峡南|SCF|sanmenxianan|smxn|1573","smx|三门县|OQH|sanmenxian|smx|1574","smx|石门县|OMQ|shimenxian|smx|1575","smx|三门峡西|SXF|sanmenxiaxi|smxx|1576","sni|肃宁|SYP|suning|sn|1577","son|宋|SOB|song|son|1578","spa|双牌|SBZ|shuangpai|sp|1579","spb|沙坪坝|CYW|shapingba|spb|1580","spd|四平东|PPT|sipingdong|spd|1581","spi|遂平|SON|suiping|sp|1582","spt|沙坡头|SFJ|shapotou|spt|1583","sqi|沙桥|SQM|shaqiao|sq|1584","sqn|商丘南|SPF|shangqiunan|sqn|1585","squ|水泉|SID|shuiquan|sq|1586","sqx|石泉县|SXY|shiquanxian|sqx|1587","sqz|石桥子|SQT|shiqiaozi|sqz|1588","src|石人城|SRB|shirencheng|src|1589","sre|石人|SRL|shiren|sr|1590","ssh|山市|SQB|shanshi|ss|1591","ssh|神树|SWB|shenshu|ss|1592","ssh|鄯善|SSR|shanshan|ss|1593","ssh|三水|SJQ|sanshui|ss|1594","ssh|泗水|OSK|sishui|ss|1595","ssh|石山|SAD|shishan|ss|1596","ssh|松树|SFT|songshu|ss|1597","ssh|首山|SAT|shoushan|ss|1598","ssj|三十家|SRD|sanshijia|ssj|1599","ssp|三十里堡|SST|sanshilipu|sslp|1600","ssz|松树镇|SSL|songshuzhen|ssz|1601","sta|松桃|MZQ|songtao|st|1602","sth|索图罕|SHX|suotuhan|sth|1603","stj|三堂集|SDH|santangji|stj|1604","sto|石头|OTB|shitou|st|1605","sto|神头|SEV|shentou|st|1606","stu|沙沱|SFM|shatuo|st|1607","swa|上万|SWP|shangwan|sw|1608","swu|孙吴|SKB|sunwu|sw|1609","swx|沙湾县|SXR|shawanxian|swx|1610","sxi|歙县|OVH|shexian|sx|1611","sxi|遂溪|SXZ|suixi|sx|1612","sxi|沙县|SAS|shaxian|sx|1613","sxi|绍兴|SOH|shaoxing|sx|1614","sxi|石岘|SXL|shixian|sx|1615","sxp|上西铺|SXM|shangxipu|sxp|1616","sxz|石峡子|SXJ|shixiazi|sxz|1617","sya|沭阳|FMH|shuyang|sy|1618","sya|绥阳|SYB|suiyang|sy|1619","sya|寿阳|SYV|shouyang|sy|1620","sya|水洋|OYP|shuiyang|sy|1621","syc|三阳川|SYJ|sanyangchuan|syc|1622","syd|上腰墩|SPJ|shangyaodun|syd|1623","syi|三营|OEJ|sanying|sy|1624","syi|顺义|SOP|shunyi|sy|1625","syj|三义井|OYD|sanyijing|syj|1626","syp|三源浦|SYL|sanyuanpu|syp|1627","syu|上虞|BDH|shangyu|sy|1628","syu|三原|SAY|sanyuan|sy|1629","syu|上园|SUD|shangyuan|sy|1630","syu|水源|OYJ|shuiyuan|sy|1631","syz|桑园子|SAJ|sangyuanzi|syz|1632","szb|绥中北|SND|suizhongbei|szb|1633","szb|苏州北|OHH|suzhoubei|szb|1634","szd|宿州东|SRH|suzhoudong|szd|1635","szd|深圳东|BJQ|shenzhendong|szd|1636","szh|深州|OZP|shenzhou|sz|1637","szh|孙镇|OZY|sunzhen|sz|1638","szh|绥中|SZD|suizhong|sz|1639","szh|尚志|SZB|shangzhi|sz|1640","szh|师庄|SNM|shizhuang|sz|1641","szi|松滋|SIN|songzi|sz|1642","szo|师宗|SEM|shizong|sz|1643","szq|苏州园区|KAH|suzhouyuanqu|szyq|1644","szq|苏州新区|ITH|suzhouxinqu|szxq|1645","tan|泰安|TMK|taian|ta|1646","tan|台安|TID|taian|ta|1647","tay|通安驿|TAJ|tonganyi|tay|1648","tba|桐柏|TBF|tongbai|tb|1649","tbe|通北|TBB|tongbei|tb|1650","tch|桐城|TTH|tongcheng|tc|1651","tch|汤池|TCX|tangchi|tc|1652","tch|郯城|TZK|tancheng|tc|1653","tch|铁厂|TCL|tiechang|tc|1654","tcu|桃村|TCK|taocun|tc|1655","tda|通道|TRQ|tongdao|td|1656","tdo|田东|TDZ|tiandong|td|1657","tga|天岗|TGL|tiangang|tg|1658","tgl|土贵乌拉|TGC|tuguiwula|tgwl|1659","tgo|通沟|TOL|tonggou|tg|1660","tgu|太谷|TGV|taigu|tg|1661","tha|塔哈|THX|taha|th|1662","tha|棠海|THM|tanghai|th|1663","the|唐河|THF|tanghe|th|1664","the|泰和|THG|taihe|th|1665","thu|太湖|TKH|taihu|th|1666","tji|团结|TIX|tuanjie|tj|1667","tjj|谭家井|TNJ|tanjiajing|tjj|1668","tjt|陶家屯|TOT|taojiatun|tjt|1669","tjw|唐家湾|PDQ|tangjiawan|tjw|1670","tjz|统军庄|TZP|tongjunzhuang|tjz|1671","tka|泰康|TKX|taikang|tk|1672","tld|吐列毛杜|TMD|tuliemaodu|tlmd|1673","tlh|图里河|TEX|tulihe|tlh|1674","tli|铜陵|TJH|tongling|tl|1675","tli|田林|TFZ|tianlin|tl|1676","tli|亭亮|TIZ|tingliang|tl|1677","tli|铁力|TLB|tieli|tl|1678","tlx|铁岭西|PXT|tielingxi|tlx|1679","tmb|图们北|QSL|tumenbei|tmb|1680","tme|天门|TMN|tianmen|tm|1681","tmn|天门南|TNN|tianmennan|tmn|1682","tms|太姥山|TLS|taimushan|tms|1683","tmt|土牧尔台|TRC|tumuertai|tmet|1684","tmz|土门子|TCJ|tumenzi|tmz|1685","tna|洮南|TVT|taonan|tn|1686","tna|潼南|TVW|tongnan|tn|1687","tpc|太平川|TIT|taipingchuan|tpc|1688","tpz|太平镇|TEB|taipingzhen|tpz|1689","tqi|图强|TQX|tuqiang|tq|1690","tqi|台前|TTK|taiqian|tq|1691","tql|天桥岭|TQL|tianqiaoling|tql|1692","tqz|土桥子|TQJ|tuqiaozi|tqz|1693","tsc|汤山城|TCT|tangshancheng|tsc|1694","tsh|桃山|TAB|taoshan|ts|1695","tsz|塔石嘴|TIM|tashizui|tsz|1696","ttu|通途|TUT|tongtu|tt|1697","twh|汤旺河|THB|tangwanghe|twh|1698","txi|同心|TXJ|tongxin|tx|1699","txi|土溪|TSW|tuxi|tx|1700","txi|桐乡|TCH|tongxiang|tx|1701","tya|田阳|TRZ|tianyang|ty|1702","tyi|天义|TND|tianyi|ty|1703","tyi|汤阴|TYF|tangyin|ty|1704","tyl|驼腰岭|TIL|tuoyaoling|tyl|1705","tys|太阳山|TYJ|taiyangshan|tys|1706","tyu|汤原|TYB|tangyuan|ty|1707","tyy|塔崖驿|TYP|tayayi|tyy|1708","tzd|滕州东|TEK|tengzhoudong|tzd|1709","tzh|台州|TZH|taizhou|tz|1710","tzh|天祝|TZJ|tianzhu|tz|1711","tzh|滕州|TXK|tengzhou|tz|1712","tzh|天镇|TZV|tianzhen|tz|1713","tzl|桐子林|TEW|tongzilin|tzl|1714","tzs|天柱山|QWH|tianzhushan|tzs|1715","wan|文安|WBP|wenan|wa|1716","wan|武安|WAP|wuan|wa|1717","waz|王安镇|WVP|wanganzhen|waz|1718","wbu|吴堡|WUY|wubu|wb|1719","wca|旺苍|WEW|wangcang|wc|1720","wcg|五叉沟|WCT|wuchagou|wcg|1721","wch|文昌|WEQ|wenchang|wc|1722","wch|温春|WDB|wenchun|wc|1723","wdc|五大连池|WRB|wudalianchi|wdlc|1724","wde|文登|WBK|wendeng|wd|1725","wdg|五道沟|WDL|wudaogou|wdg|1726","wdh|五道河|WHP|wudaohe|wdh|1727","wdi|文地|WNZ|wendi|wd|1728","wdo|卫东|WVT|weidong|wd|1729","wds|武当山|WRN|wudangshan|wds|1730","wdu|望都|WDP|wangdu|wd|1731","weh|乌尔旗汗|WHX|wuerqihan|weqh|1732","wfa|潍坊|WFK|weifang|wf|1733","wft|万发屯|WFB|wanfatun|wft|1734","wfu|王府|WUT|wangfu|wf|1735","wfx|瓦房店西|WXT|wafangdianxi|wfdx|1736","wga|王岗|WGB|wanggang|wg|1737","wgo|武功|WGY|wugong|wg|1738","wgo|湾沟|WGL|wangou|wg|1739","wgt|吴官田|WGM|wuguantian|wgt|1740","wha|乌海|WVC|wuhai|wh|1741","whe|苇河|WHB|weihe|wh|1742","whu|卫辉|WHF|weihui|wh|1743","wjc|吴家川|WCJ|wujiachuan|wjc|1744","wji|五家|WUB|wujia|wj|1745","wji|威箐|WAM|weiqing|wj|1746","wji|午汲|WJP|wuji|wj|1747","wji|渭津|WJL|weijin|wj|1748","wjw|王家湾|WJJ|wangjiawan|wjw|1749","wke|倭肯|WQB|woken|wk|1750","wks|五棵树|WKT|wukeshu|wks|1751","wlb|五龙背|WBT|wulongbei|wlb|1752","wld|乌兰哈达|WLC|wulanhada|wlhd|1753","wle|万乐|WEB|wanle|wl|1754","wlg|瓦拉干|WVX|walagan|wlg|1755","wli|温岭|VHH|wenling|wl|1756","wli|五莲|WLK|wulian|wl|1757","wlq|乌拉特前旗|WQC|wulateqianqi|wltqq|1758","wls|乌拉山|WSC|wulashan|wls|1759","wlt|卧里屯|WLX|wolitun|wlt|1760","wnb|渭南北|WBY|weinanbei|wnb|1761","wne|乌奴耳|WRX|wunuer|wne|1762","wni|万宁|WNQ|wanning|wn|1763","wni|万年|WWG|wannian|wn|1764","wnn|渭南南|WVY|weinannan|wnn|1765","wnz|渭南镇|WNJ|weinanzhen|wnz|1766","wpi|沃皮|WPT|wopi|wp|1767","wqi|吴桥|WUP|wuqiao|wq|1768","wqi|汪清|WQL|wangqing|wq|1769","wqi|武清|WWP|wuqing|wq|1770","wsh|武山|WSJ|wushan|ws|1771","wsh|文水|WEV|wenshui|ws|1772","wsz|魏善庄|WSP|weishanzhuang|wsz|1773","wto|王瞳|WTP|wangtong|wt|1774","wts|五台山|WSV|wutaishan|wts|1775","wtz|王团庄|WZJ|wangtuanzhuang|wtz|1776","wwu|五五|WVR|wuwu|ww|1777","wxd|无锡东|WGH|wuxidong|wxd|1778","wxi|卫星|WVB|weixing|wx|1779","wxi|闻喜|WXV|wenxi|wx|1780","wxi|武乡|WVV|wuxiang|wx|1781","wxq|无锡新区|IFH|wuxixinqu|wxxq|1782","wxu|武穴|WXN|wuxue|wx|1783","wxu|吴圩|WYZ|wuxu|wx|1784","wya|王杨|WYB|wangyang|wy|1785","wyi|武义|RYH|wuyi|wy|1786","wyi|五营|WWB|wuying|wy|1787","wyt|瓦窑田|WIM|wayaotian|wyt|1788","wyu|五原|WYC|wuyuan|wy|1789","wzg|苇子沟|WZL|weizigou|wzg|1790","wzh|韦庄|WZY|weizhuang|wz|1791","wzh|五寨|WZV|wuzhai|wz|1792","wzt|王兆屯|WZB|wangzhaotun|wzt|1793","wzz|微子镇|WQP|weizizhen|wzz|1794","wzz|魏杖子|WKD|weizhangzi|wzz|1795","xan|新安|EAM|xinan|xa|1796","xan|兴安|XAZ|xingan|xa|1797","xax|新安县|XAF|xinanxian|xax|1798","xba|新保安|XAP|xinbaoan|xba|1799","xbc|下板城|EBP|xiabancheng|xbc|1800","xbl|西八里|XLP|xibali|xbl|1801","xch|宣城|ECH|xuancheng|xc|1802","xch|兴城|XCD|xingcheng|xc|1803","xcu|小村|XEM|xiaocun|xc|1804","xcy|新绰源|XRX|xinchuoyuan|xcy|1805","xcz|下城子|XCB|xiachengzi|xcz|1806","xcz|新城子|XCT|xinchengzi|xcz|1807","xde|喜德|EDW|xide|xd|1808","xdj|小得江|EJM|xiaodejiang|xdj|1809","xdm|西大庙|XMP|xidamiao|xdm|1810","xdo|小董|XEZ|xiaodong|xd|1811","xdo|小东|XOD|xiaodong|xd|1812","xfe|信丰|EFG|xinfeng|xf|1813","xfe|襄汾|XFV|xiangfen|xf|1814","xfe|息烽|XFW|xifeng|xf|1815","xga|新干|EGG|xingan|xg|1816","xga|孝感|XGN|xiaogan|xg|1817","xgc|西固城|XUJ|xigucheng|xgc|1818","xgu|西固|XIJ|xigu|xg|1819","xgy|夏官营|XGJ|xiaguanying|xgy|1820","xgz|西岗子|NBB|xigangzi|xgz|1821","xhe|襄河|XXB|xianghe|xh|1822","xhe|新和|XIR|xinhe|xh|1823","xhe|宣和|XWJ|xuanhe|xh|1824","xhj|斜河涧|EEP|xiehejian|xhj|1825","xht|新华屯|XAX|xinhuatun|xht|1826","xhu|新华|XHB|xinhua|xh|1827","xhu|新化|EHQ|xinhua|xh|1828","xhu|宣化|XHP|xuanhua|xh|1829","xhx|兴和西|XEC|xinghexi|xhx|1830","xhy|小河沿|XYD|xiaoheyan|xhy|1831","xhy|下花园|XYP|xiahuayuan|xhy|1832","xhz|小河镇|EKY|xiaohezhen|xhz|1833","xji|徐家|XJB|xujia|xj|1834","xji|峡江|EJG|xiajiang|xj|1835","xji|新绛|XJV|xinjiang|xj|1836","xji|辛集|ENP|xinji|xj|1837","xji|新江|XJM|xinjiang|xj|1838","xjk|西街口|EKM|xijiekou|xjk|1839","xjt|许家屯|XJT|xujiatun|xjt|1840","xjt|许家台|XTJ|xujiatai|xjt|1841","xjz|谢家镇|XMT|xiejiazhen|xjz|1842","xka|兴凯|EKB|xingkai|xk|1843","xla|小榄|EAQ|xiaolan|xl|1844","xla|香兰|XNB|xianglan|xl|1845","xld|兴隆店|XDD|xinglongdian|xld|1846","xle|新乐|ELP|xinle|xl|1847","xli|新林|XPX|xinlin|xl|1848","xli|小岭|XLB|xiaoling|xl|1849","xli|新李|XLJ|xinli|xl|1850","xli|西林|XYB|xilin|xl|1851","xli|西柳|GCT|xiliu|xl|1852","xli|仙林|XPH|xianlin|xl|1853","xlt|新立屯|XLD|xinlitun|xlt|1854","xlz|兴隆镇|XZB|xinglongzhen|xlz|1855","xlz|新立镇|XGT|xinlizhen|xlz|1856","xmi|新民|XMD|xinmin|xm|1857","xms|西麻山|XMB|ximashan|xms|1858","xmt|下马塘|XAT|xiamatang|xmt|1859","xna|孝南|XNV|xiaonan|xn|1860","xnb|咸宁北|XRN|xianningbei|xnb|1861","xni|兴宁|ENQ|xingning|xn|1862","xni|咸宁|XNN|xianning|xn|1863","xpd|犀浦东|XAW|xipudong|xpd|1864","xpi|西平|XPN|xiping|xp|1865","xpi|兴平|XPY|xingping|xp|1866","xpt|新坪田|XPM|xinpingtian|xpt|1867","xpu|霞浦|XOS|xiapu|xp|1868","xpu|溆浦|EPQ|xupu|xp|1869","xpu|犀浦|XIW|xipu|xp|1870","xqi|新青|XQB|xinqing|xq|1871","xqi|新邱|XQD|xinqiu|xq|1872","xqp|兴泉堡|XQJ|xingquanbu|xqp|1873","xrq|仙人桥|XRL|xianrenqiao|xrq|1874","xsg|小寺沟|ESP|xiaosigou|xsg|1875","xsh|杏树|XSB|xingshu|xs|1876","xsh|浠水|XZN|xishui|xs|1877","xsh|下社|XSV|xiashe|xs|1878","xsh|徐水|XSP|xushui|xs|1879","xsh|夏石|XIZ|xiashi|xs|1880","xsh|小哨|XAM|xiaoshao|xs|1881","xsp|新松浦|XOB|xinsongpu|xsp|1882","xst|杏树屯|XDT|xingshutun|xst|1883","xsw|许三湾|XSJ|xusanwan|xsw|1884","xta|湘潭|XTQ|xiangtan|xt|1885","xta|邢台|XTP|xingtai|xt|1886","xtx|仙桃西|XAN|xiantaoxi|xtx|1887","xtz|下台子|EIP|xiataizi|xtz|1888","xwe|徐闻|XJQ|xuwen|xw|1889","xwp|新窝铺|EPD|xinwopu|xwp|1890","xwu|修武|XWF|xiuwu|xw|1891","xxi|新县|XSN|xinxian|xx|1892","xxi|息县|ENN|xixian|xx|1893","xxi|西乡|XQY|xixiang|xx|1894","xxi|湘乡|XXQ|xiangxiang|xx|1895","xxi|西峡|XIF|xixia|xx|1896","xxi|孝西|XOV|xiaoxi|xx|1897","xxj|小新街|XXM|xiaoxinjie|xxj|1898","xxx|新兴县|XGQ|xinxingxian|xxx|1899","xxz|西小召|XZC|xixiaozhao|xxz|1900","xxz|小西庄|XXP|xiaoxizhuang|xxz|1901","xya|向阳|XDB|xiangyang|xy|1902","xya|旬阳|XUY|xunyang|xy|1903","xyb|旬阳北|XBY|xunyangbei|xyb|1904","xyd|襄阳东|XWN|xiangyangdong|xyd|1905","xye|兴业|SNZ|xingye|xy|1906","xyg|小雨谷|XHM|xiaoyugu|xyg|1907","xyi|信宜|EEQ|xinyi|xy|1908","xyj|小月旧|XFM|xiaoyuejiu|xyj|1909","xyq|小扬气|XYX|xiaoyangqi|xyq|1910","xyu|祥云|EXM|xiangyun|xy|1911","xyu|襄垣|EIF|xiangyuan|xy|1912","xyx|夏邑县|EJH|xiayixian|xyx|1913","xyy|新友谊|EYB|xinyouyi|xyy|1914","xyz|新阳镇|XZJ|xinyangzhen|xyz|1915","xzd|徐州东|UUH|xuzhoudong|xzd|1916","xzf|新帐房|XZX|xinzhangfang|xzf|1917","xzh|悬钟|XRP|xuanzhong|xz|1918","xzh|新肇|XZT|xinzhao|xz|1919","xzh|忻州|XXV|xinzhou|xz|1920","xzi|汐子|XZD|xizi|xz|1921","xzm|西哲里木|XRD|xizhelimu|xzlm|1922","xzz|新杖子|ERP|xinzhangzi|xzz|1923","yan|姚安|YAC|yaoan|ya|1924","yan|依安|YAX|yian|ya|1925","yan|永安|YAS|yongan|ya|1926","yax|永安乡|YNB|yonganxiang|yax|1927","ybl|亚布力|YBB|yabuli|ybl|1928","ybs|元宝山|YUD|yuanbaoshan|ybs|1929","yca|羊草|YAB|yangcao|yc|1930","ycd|秧草地|YKM|yangcaodi|ycd|1931","ych|阳澄湖|AIH|yangchenghu|ych|1932","ych|迎春|YYB|yingchun|yc|1933","ych|叶城|YER|yecheng|yc|1934","ych|盐池|YKJ|yanchi|yc|1935","ych|砚川|YYY|yanchuan|yc|1936","ych|阳春|YQQ|yangchun|yc|1937","ych|宜城|YIN|yicheng|yc|1938","ych|应城|YHN|yingcheng|yc|1939","ych|禹城|YCK|yucheng|yc|1940","ych|晏城|YEK|yancheng|yc|1941","ych|阳城|YNF|yangcheng|yc|1942","ych|阳岔|YAL|yangcha|yc|1943","ych|郓城|YPK|yuncheng|yc|1944","ych|雁翅|YAP|yanchi|yc|1945","ycl|云彩岭|ACP|yuncailing|ycl|1946","ycx|虞城县|IXH|yuchengxian|ycx|1947","ycz|营城子|YCT|yingchengzi|ycz|1948","yde|英德|YDQ|yingde|yd|1949","yde|永登|YDJ|yongdeng|yd|1950","ydi|尹地|YDM|yindi|yd|1951","ydi|永定|YGS|yongding|yd|1952","yds|雁荡山|YGH|yandangshan|yds|1953","ydu|于都|YDG|yudu|yd|1954","ydu|园墩|YAJ|yuandun|yd|1955","ydx|英德西|IIQ|yingdexi|ydx|1956","yfy|永丰营|YYM|yongfengying|yfy|1957","yga|杨岗|YRB|yanggang|yg|1958","yga|阳高|YOV|yanggao|yg|1959","ygu|阳谷|YIK|yanggu|yg|1960","yha|友好|YOB|youhao|yh|1961","yha|余杭|EVH|yuhang|yh|1962","yhc|沿河城|YHP|yanhecheng|yhc|1963","yhu|岩会|AEP|yanhui|yh|1964","yjh|羊臼河|YHM|yangjiuhe|yjh|1965","yji|永嘉|URH|yongjia|yj|1966","yji|营街|YAM|yingjie|yj|1967","yji|盐津|AEW|yanjin|yj|1968","yji|余江|YHG|yujiang|yj|1969","yji|燕郊|AJP|yanjiao|yj|1970","yji|姚家|YAT|yaojia|yj|1971","yjj|岳家井|YGJ|yuejiajing|yjj|1972","yjp|一间堡|YJT|yijianpu|yjp|1973","yjs|英吉沙|YIR|yingjisha|yjs|1974","yjs|云居寺|AFP|yunjusi|yjs|1975","yjz|燕家庄|AZK|yanjiazhuang|yjz|1976","yka|永康|RFH|yongkang|yk|1977","ykd|营口东|YGT|yingkoudong|ykd|1978","yla|银浪|YJX|yinlang|yl|1979","yla|永郎|YLW|yonglang|yl|1980","ylb|宜良北|YSM|yiliangbei|ylb|1981","yld|永乐店|YDY|yongledian|yld|1982","ylh|伊拉哈|YLX|yilaha|ylh|1983","yli|伊林|YLB|yilin|yl|1984","yli|杨陵|YSY|yangling|yl|1985","yli|彝良|ALW|yiliang|yl|1986","yli|杨林|YLM|yanglin|yl|1987","ylp|余粮堡|YLD|yuliangpu|ylp|1988","ylq|杨柳青|YQP|yangliuqing|ylq|1989","ylt|月亮田|YUM|yueliangtian|ylt|1990","yma|义马|YMF|yima|ym|1991","ymb|阳明堡|YVV|yangmingbu|ymb|1992","yme|玉门|YXJ|yumen|ym|1993","yme|云梦|YMN|yunmeng|ym|1994","ymo|元谋|YMM|yuanmou|ym|1995","yms|一面山|YST|yimianshan|yms|1996","yna|沂南|YNK|yinan|yn|1997","yna|宜耐|YVM|yinai|yn|1998","ynd|伊宁东|YNR|yiningdong|ynd|1999","yps|营盘水|YZJ|yingpanshui|yps|2000","ypu|羊堡|ABM|yangpu|yp|2001","yqb|阳泉北|YPP|yangquanbei|yqb|2002","yqi|乐清|UPH|yueqing|yq|2003","yqi|焉耆|YSR|yanqi|yq|2004","yqi|源迁|AQK|yuanqian|yq|2005","yqt|姚千户屯|YQT|yaoqianhutun|yqht|2006","yqu|阳曲|YQV|yangqu|yq|2007","ysg|榆树沟|YGP|yushugou|ysg|2008","ysh|月山|YBF|yueshan|ys|2009","ysh|玉石|YSJ|yushi|ys|2010","ysh|玉舍|AUM|yushe|ys|2011","ysh|偃师|YSF|yanshi|ys|2012","ysh|沂水|YUK|yishui|ys|2013","ysh|榆社|YSV|yushe|ys|2014","ysh|颍上|YVH|yingshang|ys|2015","ysh|窑上|ASP|yaoshang|ys|2016","ysh|元氏|YSP|yuanshi|ys|2017","ysl|杨树岭|YAD|yangshuling|ysl|2018","ysp|野三坡|AIP|yesanpo|ysp|2019","yst|榆树屯|YSX|yushutun|yst|2020","yst|榆树台|YUT|yushutai|yst|2021","ysz|鹰手营子|YIP|yingshouyingzi|ysyz|2022","yta|源潭|YTQ|yuantan|yt|2023","ytp|牙屯堡|YTZ|yatunpu|ytp|2024","yts|烟筒山|YSL|yantongshan|yts|2025","ytt|烟筒屯|YUX|yantongtun|ytt|2026","yws|羊尾哨|YWM|yangweishao|yws|2027","yxi|越西|YHW|yuexi|yx|2028","yxi|攸县|YOG|youxian|yx|2029","yxi|永修|ACG|yongxiu|yx|2030","yxx|玉溪西|YXM|yuxixi|yxx|2031","yya|弋阳|YIG|yiyang|yy|2032","yya|余姚|YYH|yuyao|yy|2033","yya|酉阳|AFW|youyang|yy|2034","yyd|岳阳东|YIQ|yueyangdong|yyd|2035","yyi|阳邑|ARP|yangyi|yy|2036","yyu|鸭园|YYL|yayuan|yy|2037","yyz|鸳鸯镇|YYJ|yuanyangzhen|yyz|2038","yzb|燕子砭|YZY|yanzibian|yzb|2039","yzh|仪征|UZH|yizheng|yz|2040","yzh|宜州|YSZ|yizhou|yz|2041","yzh|兖州|YZK|yanzhou|yz|2042","yzi|迤资|YQM|yizi|yz|2043","yzw|羊者窝|AEM|yangzhewo|yzw|2044","yzz|杨杖子|YZD|yangzhangzi|yzz|2045","zan|镇安|ZEY|zhenan|za|2046","zan|治安|ZAD|zhian|za|2047","zba|招柏|ZBP|zhaobai|zb|2048","zbw|张百湾|ZUP|zhangbaiwan|zbw|2049","zcc|中川机场|ZJJ|zhongchuanjichang|zcjc|2050","zch|枝城|ZCN|zhicheng|zc|2051","zch|子长|ZHY|zichang|zc|2052","zch|诸城|ZQK|zhucheng|zc|2053","zch|邹城|ZIK|zoucheng|zc|2054","zch|赵城|ZCV|zhaocheng|zc|2055","zda|章党|ZHT|zhangdang|zd|2056","zdi|正定|ZDP|zhengding|zd|2057","zdo|肇东|ZDB|zhaodong|zd|2058","zfp|照福铺|ZFM|zhaofupu|zfp|2059","zgt|章古台|ZGD|zhanggutai|zgt|2060","zgu|赵光|ZGB|zhaoguang|zg|2061","zhe|中和|ZHX|zhonghe|zh|2062","zhm|中华门|VNH|zhonghuamen|zhm|2063","zjb|枝江北|ZIN|zhijiangbei|zjb|2064","zjc|钟家村|ZJY|zhongjiacun|zjc|2065","zjg|朱家沟|ZUB|zhujiagou|zjg|2066","zjg|紫荆关|ZYP|zijingguan|zjg|2067","zji|周家|ZOB|zhoujia|zj|2068","zji|诸暨|ZDH|zhuji|zj|2069","zjn|镇江南|ZEH|zhenjiangnan|zjn|2070","zjt|周家屯|ZOD|zhoujiatun|zjt|2071","zjw|褚家湾|CWJ|zhujiawan|zjw|2072","zjx|湛江西|ZWQ|zhanjiangxi|zjx|2073","zjy|朱家窑|ZUJ|zhujiayao|zjy|2074","zjz|曾家坪子|ZBW|zengjiapingzi|zjpz|2075","zla|张兰|ZLV|zhanglan|zl|2076","zla|镇赉|ZLT|zhenlai|zl|2077","zli|枣林|ZIV|zaolin|zl|2078","zlt|扎鲁特|ZLD|zhalute|zlt|2079","zlx|扎赉诺尔西|ZXX|zhalainuoerxi|zlrex|2080","zmt|樟木头|ZOQ|zhangmutou|zmt|2081","zmu|中牟|ZGF|zhongmu|zm|2082","znd|中宁东|ZDJ|zhongningdong|znd|2083","zni|中宁|VNJ|zhongning|zn|2084","znn|中宁南|ZNJ|zhongningnan|znn|2085","zpi|镇平|ZPF|zhenping|zp|2086","zpi|漳平|ZPS|zhangping|zp|2087","zpu|泽普|ZPR|zepu|zp|2088","zqi|枣强|ZVP|zaoqiang|zq|2089","zqi|张桥|ZQY|zhangqiao|zq|2090","zqi|章丘|ZTK|zhangqiu|zq|2091","zrh|朱日和|ZRC|zhurihe|zrh|2092","zrl|泽润里|ZLM|zerunli|zrl|2093","zsb|中山北|ZGQ|zhongshanbei|zsb|2094","zsd|樟树东|ZOG|zhangshudong|zsd|2095","zsh|珠斯花|ZHD|zhusihua|zsh|2096","zsh|中山|ZSQ|zhongshan|zs|2097","zsh|柞水|ZSY|zhashui|zs|2098","zsh|钟山|ZSZ|zhongshan|zs|2099","zsh|樟树|ZSG|zhangshu|zs|2100","zwo|珠窝|ZOP|zhuwo|zw|2101","zwt|张维屯|ZWB|zhangweitun|zwt|2102","zwu|彰武|ZWD|zhangwu|zw|2103","zxi|棕溪|ZOY|zongxi|zx|2104","zxi|钟祥|ZTN|zhongxiang|zx|2105","zxi|资溪|ZXS|zixi|zx|2106","zxi|镇西|ZVT|zhenxi|zx|2107","zxi|张辛|ZIP|zhangxin|zx|2108","zxq|正镶白旗|ZXC|zhengxiangbaiqi|zxbq|2109","zya|紫阳|ZVY|ziyang|zy|2110","zya|枣阳|ZYN|zaoyang|zy|2111","zyb|竹园坝|ZAW|zhuyuanba|zyb|2112","zye|张掖|ZYJ|zhangye|zy|2113","zyu|镇远|ZUW|zhenyuan|zy|2114","zzd|漳州东|GOS|zhangzhoudong|zzd|2115","zzh|漳州|ZUS|zhangzhou|zz|2116","zzh|壮志|ZUX|zhuangzhi|zz|2117","zzh|子洲|ZZY|zizhou|zz|2118","zzh|中寨|ZZM|zhongzhai|zz|2119","zzh|涿州|ZXP|zhuozhou|zz|2120","zzi|咋子|ZAL|zhazi|zz|2121","zzs|卓资山|ZZC|zhuozishan|zzs|2122","zzx|株洲西|ZAQ|zhuzhouxi|zzx|2123","zzx|郑州西|XPF|zhengzhouxi|zzx|2124","abq|阿巴嘎旗|AQC|abagaqi|abgq|2125","aeb|阿尔山北|ARX|aershanbei|aesb|2126","alt|阿勒泰|AUR|aletai|alt|2127","are|安仁|ARG|anren|ar|2128","asx|安顺西|ASE|anshunxi|asx|2129","atx|安图西|AXL|antuxi|atx|2130","ayd|安阳东|ADF|anyangdong|ayd|2131","bba|博白|BBZ|bobai|bb|2132","bbu|八步|BBE|babu|bb|2133","bch|栟茶|FWH|bencha|bc|2134","bdd|保定东|BMP|baodingdong|bdd|2135","bfs|八方山|FGQ|bafangshan|bfs|2136","bgo|白沟|FEP|baigou|bg|2137","bha|滨海|FHP|binhai|bh|2138","bhb|滨海北|FCP|binhaibei|bhb|2139","bjn|宝鸡南|BBY|baojinan|bjn|2140","bjz|北井子|BRT|beijingzi|bjz|2141","bmj|白马井|BFQ|baimajing|bmj|2142","bqi|宝清|BUB|baoqing|bq|2143","bsh|璧山|FZW|bishan|bs|2144","bsp|白沙铺|BSN|baishapu|bsp|2145","bsx|白水县|BGY|baishuixian|bsx|2146","bta|板塘|NGQ|bantang|bt|2147","bxc|本溪新城|BVT|benxixincheng|bxxc|2148","bxi|彬县|BXY|binxian|bx|2149","bya|宾阳|UKZ|binyang|by|2150","byd|白洋淀|FWP|baiyangdian|byd|2151","byi|百宜|FHW|baiyi|by|2152","byn|白音华南|FNC|baiyinhuanan|byhn|2153","bzd|巴中东|BDE|bazhongdong|bzd|2154","bzh|滨州|BIK|binzhou|bz|2155","bzx|霸州西|FOP|bazhouxi|bzx|2156","cch|澄城|CUY|chengcheng|cc|2157","cgb|城固北|CBY|chenggubei|cgb|2158","cgh|查干湖|VAT|chaganhu|cgh|2159","chd|巢湖东|GUH|chaohudong|chd|2160","cji|从江|KNW|congjiang|cj|2161","cka|茶卡|CVO|chaka|ck|2162","clh|长临河|FVH|changlinhe|clh|2163","cln|茶陵南|CNG|chalingnan|cln|2164","cpd|常平东|FQQ|changpingdong|cpd|2165","cpn|常平南|FPQ|changpingnan|cpn|2166","cqq|长庆桥|CQJ|changqingqiao|cqq|2167","csb|长寿北|COW|changshoubei|csb|2168","csh|长寿湖|CSE|changshouhu|csh|2169","csh|潮汕|CBQ|chaoshan|cs|2170","csh|常山|CSU|changshan|cs|2171","csx|长沙西|RXQ|changshaxi|csx|2172","cti|朝天|CTE|chaotian|ct|2173","ctn|长汀南|CNS|changtingnan|ctn|2174","cwu|长武|CWY|changwu|cw|2175","cxi|长兴|CBH|changxing|cx|2176","cxi|苍溪|CXE|cangxi|cx|2177","cya|长阳|CYN|changyang|cy|2178","cya|潮阳|CNQ|chaoyang|cy|2179","czt|城子坦|CWT|chengzitan|czt|2180","dad|东安东|DCZ|dongandong|dad|2181","dba|德保|RBZ|debao|db|2182","dch|都昌|DCG|duchang|dc|2183","dch|东岔|DCJ|dongcha|dc|2184","dcn|东城南|IYQ|dongchengnan|dcn|2185","ddh|东戴河|RDD|dongdaihe|ddh|2186","ddx|丹东西|RWT|dandongxi|ddx|2187","deh|东二道河|DRB|dongerdaohe|dedh|2188","dfe|大丰|KRQ|dafeng|df|2189","dfn|大方南|DNE|dafangnan|dfn|2190","dgb|东港北|RGT|donggangbei|dgb|2191","dgs|大孤山|RMT|dagushan|dgs|2192","dgu|东莞|RTQ|dongguan|dg|2193","dhd|鼎湖东|UWQ|dinghudong|dhd|2194","dhs|鼎湖山|NVQ|dinghushan|dhs|2195","dji|道滘|RRQ|daojiao|dj|2196","dji|洞井|FWQ|dongjing|dj|2197","dji|垫江|DJE|dianjiang|dj|2198","dju|大苴|DIM|daju|dj|2199","dli|大荔|DNY|dali|dl|2200","dlz|大朗镇|KOQ|dalangzhen|dlz|2201","dqg|大青沟|DSD|daqinggou|dqg|2202","dqi|德清|DRH|deqing|dq|2203","dsn|砀山南|PRH|dangshannan|dsn|2204","dsn|大石头南|DAL|dashitounan|dstn|2205","dtd|当涂东|OWH|dangtudong|dtd|2206","dtx|大通西|DTO|datongxi|dtx|2207","dwa|大旺|WWQ|dawang|dw|2208","dxb|定西北|DNJ|dingxibei|dxb|2209","dxd|德兴东|DDG|dexingdong|dxd|2210","dxi|德兴|DWG|dexing|dx|2211","dxs|丹霞山|IRQ|danxiashan|dxs|2212","dyb|大冶北|DBN|dayebei|dyb|2213","dyd|都匀东|KJW|duyundong|dyd|2214","dyn|东营南|DOK|dongyingnan|dyn|2215","dyu|大余|DYG|dayu|dy|2216","dzd|定州东|DOP|dingzhoudong|dzd|2217","dzh|端州|WZQ|duanzhou|dz|2218","dzn|大足南|FQW|dazunan|dzn|2219","ems|峨眉山|IXW|emeishan|ems|2220","epg|阿房宫|EGY|epanggong|epg|2221","ezd|鄂州东|EFN|ezhoudong|ezd|2222","fcb|防城港北|FBZ|fangchenggangbei|fcgb|2223","fcd|凤城东|FDT|fengchengdong|fcd|2224","fch|富川|FDZ|fuchuan|fc|2225","fcx|繁昌西|PUH|fanchangxi|fcx|2226","fdu|丰都|FUW|fengdu|fd|2227","flb|涪陵北|FEW|fulingbei|flb|2228","fli|枫林|FLN|fenglin|fl|2229","fni|富宁|FNM|funing|fn|2230","fpi|佛坪|FUY|foping|fp|2231","fqi|法启|FQE|faqi|fq|2232","frn|芙蓉南|KCQ|furongnan|frn|2233","fsh|复盛|FAW|fusheng|fs|2234","fso|抚松|FSL|fusong|fs|2235","fsx|佛山西|FOQ|foshanxi|fsx|2236","fsz|福山镇|FZQ|fushanzhen|fsz|2237","fti|福田|NZQ|futian|ft|2238","fyb|富源北|FBM|fuyuanbei|fyb|2239","fyu|抚远|FYB|fuyuan|fy|2240","fzd|抚州东|FDG|fuzhoudong|fzd|2241","fzh|抚州|FZG|fuzhou|fz|2242","gan|高安|GCG|gaoan|ga|2243","gan|广安南|VUW|guangannan|gan|2244","gan|贵安|GAE|guian|ga|2245","gbd|高碑店东|GMP|gaobeidiandong|gbdd|2246","gch|恭城|GCZ|gongcheng|gc|2247","gcn|藁城南|GUP|gaochengnan|gcn|2248","gdb|贵定北|FMW|guidingbei|gdb|2249","gdn|葛店南|GNN|gediannan|gdn|2250","gdx|贵定县|KIW|guidingxian|gdx|2251","ghb|广汉北|GVW|guanghanbei|ghb|2252","ghu|高花|HGD|gaohua|gh|2253","gju|革居|GEM|geju|gj|2254","gli|关岭|GLE|guanling|gl|2255","glx|桂林西|GEZ|guilinxi|glx|2256","gmc|光明城|IMQ|guangmingcheng|gmc|2257","gni|广宁|FBQ|guangning|gn|2258","gns|广宁寺|GQT|guangningsi|gns|2259","gnx|广南县|GXM|guangnanxian|gnx|2260","gpi|桂平|GAZ|guiping|gp|2261","gpz|弓棚子|GPT|gongpengzi|gpz|2262","gsd|赶水东|GDE|ganshuidong|gsd|2263","gsh|光山|GUN|guangshan|gs|2264","gsh|谷山|FFQ|gushan|gs|2265","gsl|观沙岭|FKQ|guanshaling|gsl|2266","gtb|古田北|GBS|gutianbei|gtb|2267","gtb|广通北|GPM|guangtongbei|gtb|2268","gtn|高台南|GAJ|gaotainan|gtn|2269","gtz|古田会址|STS|gutianhuizhi|gthz|2270","gyb|贵阳北|KQW|guiyangbei|gyb|2271","gyd|贵阳东|KEW|guiyangdong|gyd|2272","gyx|高邑西|GNP|gaoyixi|gyx|2273","han|惠安|HNS|huian|ha|2274","hbb|淮北北|PLH|huaibeibei|hbb|2275","hbd|鹤壁东|HFF|hebidong|hbd|2276","hcg|寒葱沟|HKB|hanconggou|hcg|2277","hch|霍城|SER|huocheng|hc|2278","hch|珲春|HUL|hunchun|hc|2279","hdd|邯郸东|HPP|handandong|hdd|2280","hdo|惠东|KDQ|huidong|hd|2281","hdp|哈达铺|HDJ|hadapu|hdp|2282","hdx|海东西|HDO|haidongxi|hdx|2283","hdx|洪洞西|HTV|hongtongxi|hdx|2284","heb|哈尔滨北|HTB|haerbinbei|hebb|2285","hfc|合肥北城|COH|hefeibeicheng|hfbc|2286","hfn|合肥南|ENH|hefeinan|hfn|2287","hga|黄冈|KGN|huanggang|hg|2288","hgd|黄冈东|KAN|huanggangdong|hgd|2289","hgd|横沟桥东|HNN|henggouqiaodong|hgqd|2290","hgx|黄冈西|KXN|huanggangxi|hgx|2291","hhe|洪河|HPB|honghe|hh|2292","hhn|怀化南|KAQ|huaihuanan|hhn|2293","hhq|黄河景区|HCF|huanghejingqu|hhjq|2294","hhu|花湖|KHN|huahu|hh|2295","hhu|惠环|KHQ|huihuan|hh|2296","hhu|后湖|IHN|houhu|hh|2297","hji|怀集|FAQ|huaiji|hj|2298","hkb|河口北|HBM|hekoubei|hkb|2299","hli|黄流|KLQ|huangliu|hl|2300","hln|黄陵南|VLY|huanglingnan|hln|2301","hme|鲘门|KMQ|houmen|hm|2302","hme|虎门|IUQ|humen|hm|2303","hmx|侯马西|HPV|houmaxi|hmx|2304","hna|衡南|HNG|hengnan|hn|2305","hnd|淮南东|HOH|huainandong|hnd|2306","hpu|合浦|HVZ|hepu|hp|2307","hqi|霍邱|FBH|huoqiu|hq|2308","hrd|怀仁东|HFV|huairendong|hrd|2309","hrd|华容东|HPN|huarongdong|hrd|2310","hrn|华容南|KRN|huarongnan|hrn|2311","hsb|黄石北|KSN|huangshibei|hsb|2312","hsb|黄山北|NYH|huangshanbei|hsb|2313","hsb|衡水北|IHP|hengshuibei|hsb|2314","hsd|贺胜桥东|HLN|heshengqiaodong|hsqd|2315","hsh|和硕|VUR|heshuo|hs|2316","hsn|花山南|KNN|huashannan|hsn|2317","hta|荷塘|KXQ|hetang|ht|2318","htd|黄土店|HKP|huangtudian|htd|2319","hyb|合阳北|HTY|heyangbei|hyb|2320","hyb|海阳北|HEK|haiyangbei|hyb|2321","hyi|槐荫|IYN|huaiyin|hy|2322","hyi|鄠邑|KXY|huyi|hyi|2323","hyk|花园口|HYT|huayuankou|hyk|2324","hzd|霍州东|HWV|huozhoudong|hzd|2325","hzn|惠州南|KNQ|huizhounan|hzn|2326","jan|建安|JUL|jianan|ja|2327","jch|泾川|JAJ|jingchuan|jc|2328","jdb|景德镇北|JDG|jingdezhenbei|jdzb|2329","jde|旌德|NSH|jingde|jd|2330","jfe|尖峰|PFQ|jianfeng|jf|2331","jha|近海|JHD|jinhai|jh|2332","jhx|蛟河西|JOL|jiaohexi|jhx|2333","jlb|军粮城北|JMP|junliangchengbei|jlcb|2334","jle|将乐|JLS|jiangle|jl|2335","jlh|贾鲁河|JLF|jialuhe|jlh|2336","jls|九郎山|KJQ|jiulangshan|jls|2337","jmb|即墨北|JVK|jimobei|jmb|2338","jmg|剑门关|JME|jianmenguan|jmg|2339","jnb|建宁县北|JCS|jianningxianbei|jnxb|2340","jni|江宁|JJH|jiangning|jn|2341","jnx|江宁西|OKH|jiangningxi|jnx|2342","jox|建瓯西|JUS|jianouxi|jox|2343","jqn|酒泉南|JNJ|jiuquannan|jqn|2344","jrx|句容西|JWH|jurongxi|jrx|2345","jsh|建水|JSM|jianshui|js|2346","jsh|尖山|JPQ|jianshan|js|2347","jss|界首市|JUN|jieshoushi|jss|2348","jxb|绩溪北|NRH|jixibei|jxb|2349","jxd|介休东|JDV|jiexiudong|jxd|2350","jxi|泾县|LOH|jingxian|jx|2351","jxi|靖西|JMZ|jingxi|jx|2352","jxn|进贤南|JXG|jinxiannan|jxn|2353","jyb|江油北|JBE|jiangyoubei|jyb|2354","jyn|嘉峪关南|JBJ|jiayuguannan|jygn|2355","jyn|简阳南|JOW|jianyangnan|jyn|2356","jyt|金银潭|JTN|jinyintan|jyt|2357","jyu|靖宇|JYL|jingyu|jy|2358","jyw|金月湾|PYQ|jinyuewan|jyw|2359","jyx|缙云西|PYH|jinyunxi|jyx|2360","jzh|晋中|JZV|jinzhong|jz|2361","jzh|景州|JEP|jingzhou|jz|2362","kfb|开封北|KBF|kaifengbei|kfb|2363","kfs|开福寺|FLQ|kaifusi|kfs|2364","khu|开化|KHU|kaihua|kh|2365","kln|凯里南|QKW|kailinan|kln|2366","klu|库伦|KLD|kulun|kl|2367","kmn|昆明南|KOM|kunmingnan|kmn|2368","kta|葵潭|KTQ|kuitan|kt|2369","kya|开阳|KVW|kaiyang|ky|2370","lad|隆安东|IDZ|longandong|lad|2371","lbb|来宾北|UCZ|laibinbei|lbb|2372","lbi|灵璧|GMH|lingbi|lb|2373","lbu|寮步|LTQ|liaobu|lb|2374","lby|绿博园|LCF|lvboyuan|lby|2375","lcb|隆昌北|NWW|longchangbei|lcb|2376","lcd|乐昌东|ILQ|lechangdong|lcd|2377","lch|临城|UUP|lincheng|lc|2378","lch|罗城|VCZ|luocheng|lc|2379","lch|陵城|LGK|lingcheng|lc|2380","lcz|老城镇|ACQ|laochengzhen|lcz|2381","ldb|龙洞堡|FVW|longdongbao|ldb|2382","ldn|乐都南|LVO|ledunan|ldn|2383","ldn|娄底南|UOQ|loudinan|ldn|2384","ldo|乐东|UQQ|ledong|ld|2385","ldy|离堆公园|INW|liduigongyuan|ldgy|2386","lfe|陆丰|LLQ|lufeng|lf|2387","lfe|龙丰|KFQ|longfeng|lf|2388","lfn|禄丰南|LQM|lufengnan|lfn|2389","lfx|临汾西|LXV|linfenxi|lfx|2390","lgn|临高南|KGQ|lingaonan|lgn|2391","lgu|麓谷|BNQ|lugu|lg|2392","lhe|滦河|UDP|luanhe|lh|2393","lhn|珞璜南|LNE|luohuangnan|lhn|2394","lhx|漯河西|LBN|luohexi|lhx|2395","ljd|罗江东|IKW|luojiangdong|ljd|2396","lji|柳江|UQZ|liujiang|lj|2397","ljn|利津南|LNK|lijinnan|ljn|2398","lkn|兰考南|LUF|lankaonan|lkn|2399","lks|龙口市|UKK|longkoushi|lks|2400","llb|兰陵北|COK|lanlingbei|llb|2401","llb|龙里北|KFW|longlibei|llb|2402","llb|沥林北|KBQ|lilinbei|llb|2403","lld|醴陵东|UKQ|lilingdong|lld|2404","lna|陇南|INJ|longnan|ln|2405","lpn|梁平南|LPE|liangpingnan|lpn|2406","lqu|礼泉|LGY|liquan|lq|2407","lsd|灵石东|UDV|lingshidong|lsd|2408","lsh|乐山|IVW|leshan|ls|2409","lsh|龙市|LAG|longshi|ls|2410","lsh|溧水|LDH|lishui|ls|2411","lsn|娄山关南|LSE|loushanguannan|lsgn|2412","lwj|洛湾三江|KRW|luowansanjiang|lwsj|2413","lxb|莱西北|LBK|laixibei|lxb|2414","lya|溧阳|LEH|liyang|ly|2415","lyi|临邑|LUK|linyi|ly|2416","lyn|柳园南|LNR|liuyuannan|lyn|2417","lzb|鹿寨北|LSZ|luzhaibei|lzb|2418","lzh|阆中|LZE|langzhong|lz|2419","lzn|临泽南|LDJ|linzenan|lzn|2420","mad|马鞍山东|OMH|maanshandong|masd|2421","mch|毛陈|MHN|maochen|mc|2422","mgd|明港东|MDN|minggangdong|mgd|2423","mhn|民和南|MNO|minhenan|mhn|2424","mji|闵集|MJN|minji|mj|2425","mla|马兰|MLR|malan|ml|2426","mle|民乐|MBJ|minle|ml|2427","mle|弥勒|MLM|mile|ml|2428","mns|玛纳斯|MSR|manasi|mns|2429","mpi|牟平|MBK|muping|mp|2430","mqb|闽清北|MBS|minqingbei|mqb|2431","mqb|民权北|MIF|minquanbei|mqb|2432","msd|眉山东|IUW|meishandong|msd|2433","msh|庙山|MSN|miaoshan|ms|2434","mxi|岷县|MXJ|minxian|mx|2435","myu|门源|MYO|menyuan|my|2436","myu|暮云|KIQ|muyun|my|2437","mzb|蒙自北|MBM|mengzibei|mzb|2438","mzh|孟庄|MZF|mengzhuang|mz|2439","mzi|蒙自|MZM|mengzi|mz|2440","nbu|南部|NBE|nanbu|nb|2441","nca|南曹|NEF|nancao|nc|2442","ncb|南充北|NCE|nanchongbei|ncb|2443","nch|南城|NDG|nancheng|nc|2444","ncx|南昌西|NXG|nanchangxi|ncx|2445","ndn|宁东南|NDJ|ningdongnan|ndn|2446","ndo|宁东|NOJ|ningdong|nd|2447","nfb|南芬北|NUT|nanfenbei|nfb|2448","nfe|南丰|NFG|nanfeng|nf|2449","nhd|南湖东|NDN|nanhudong|nhd|2450","njb|内江北|NKW|neijiangbei|njb|2451","nji|南江|FIW|nanjiang|nj|2452","njk|南江口|NDQ|nanjiangkou|njk|2453","nli|南陵|LLH|nanling|nl|2454","nmu|尼木|NMO|nimu|nm|2455","nnd|南宁东|NFZ|nanningdong|nnd|2456","nnx|南宁西|NXZ|nanningxi|nnx|2457","npb|南平北|NBS|nanpingbei|npb|2458","nqn|宁强南|NOY|ningqiangnan|nqn|2459","nxi|南雄|NCQ|nanxiong|nx|2460","nyo|纳雍|NYE|nayong|ny|2461","nyz|南阳寨|NYF|nanyangzhai|nyz|2462","pan|普安|PAN|puan|pa|2463","pax|普安县|PUE|puanxian|pax|2464","pbi|屏边|PBM|pingbian|pb|2465","pbn|平坝南|PBE|pingbanan|pbn|2466","pch|平昌|PCE|pingchang|pc|2467","pdi|普定|PGW|puding|pd|2468","pdu|平度|PAK|pingdu|pd|2469","pko|皮口|PUT|pikou|pk|2470","plc|盘龙城|PNN|panlongcheng|plc|2471","pls|蓬莱市|POK|penglaishi|pls|2472","pni|普宁|PEQ|puning|pn|2473","pnn|平南南|PAZ|pingnannan|pnn|2474","psb|彭山北|PPW|pengshanbei|psb|2475","psh|盘山|PUD|panshan|ps|2476","psh|坪上|PSK|pingshang|ps|2477","pxb|萍乡北|PBG|pingxiangbei|pxb|2478","pya|濮阳|PYF|puyang|py|2479","pya|鄱阳|PYG|poyang|py|2480","pyc|平遥古城|PDV|pingyaogucheng|pygc|2481","pyd|平原东|PUK|pingyuandong|pyd|2482","pzh|普者黑|PZM|puzhehei|pzh|2483","pzh|盘州|PAE|panzhou|pz|2484","pzh|彭州|PMW|pengzhou|pz|2485","qan|秦安|QGJ|qinan|qa|2486","qbd|青白江东|QFW|qingbaijiangdong|qbjd|2487","qch|青川|QCE|qingchuan|qc|2488","qdb|青岛北|QHK|qingdaobei|qdb|2489","qdo|祁东|QMQ|qidong|qd|2490","qdu|青堆|QET|qingdui|qd|2491","qfe|前锋|QFB|qianfeng|qf|2492","qjb|曲靖北|QBM|qujingbei|qjb|2493","qjd|綦江东|QDE|qijiangdong|qjd|2494","qji|曲江|QIM|qujiang|qj|2495","qli|青莲|QEW|qinglian|ql|2496","qqn|齐齐哈尔南|QNB|qiqihaernan|qqhen|2497","qsb|清水北|QEJ|qingshuibei|qsb|2498","qsh|青神|QVW|qingshen|qs|2499","qsh|岐山|QAY|qishan|qs|2500","qsh|庆盛|QSQ|qingsheng|qs|2501","qsx|清水县|QIJ|qingshuixian|qsx|2502","qsx|曲水县|QSO|qushuixian|qsx|2503","qxd|祁县东|QGV|qixiandong|qxd|2504","qxi|乾县|QBY|qianxian|qx|2505","qxn|旗下营南|QNC|qixiayingnan|qxyn|2506","qya|祁阳|QWQ|qiyang|qy|2507","qzn|全州南|QNZ|quanzhounan|qzn|2508","qzw|棋子湾|QZQ|qiziwan|qzw|2509","rbu|仁布|RUO|renbu|rb|2510","rcb|荣昌北|RQW|rongchangbei|rcb|2511","rch|荣成|RCK|rongcheng|rc|2512","rcx|瑞昌西|RXG|ruichangxi|rcx|2513","rdo|如东|RIH|rudong|rd|2514","rji|榕江|RVW|rongjiang|rj|2515","rkz|日喀则|RKO|rikaze|rkz|2516","rpi|饶平|RVQ|raoping|rp|2517","scl|宋城路|SFF|songchenglu|scl|2518","sdh|三道湖|SDL|sandaohu|sdh|2519","sdo|邵东|FIQ|shaodong|sd|2520","sdx|三都县|KKW|sanduxian|sdx|2521","sfa|胜芳|SUP|shengfang|sf|2522","sfb|双峰北|NFQ|shuangfengbei|sfb|2523","she|商河|SOK|shanghe|sh|2524","sho|泗洪|GQH|sihong|sh|2525","shu|四会|AHQ|sihui|sh|2526","sjd|石家庄东|SXP|shijiazhuangdong|sjzd|2527","sjn|三江南|SWZ|sanjiangnan|sjn|2528","sjz|三井子|OJT|sanjingzi|sjz|2529","slc|双流机场|IPW|shuangliujichang|sljc|2530","slx|石林西|SYM|shilinxi|slx|2531","slx|沙岭子西|IXP|shalingzixi|slzx|2532","slx|双流西|IQW|shuangliuxi|slx|2533","smb|三明北|SHS|sanmingbei|smb|2534","smi|嵩明|SVM|songming|sm|2535","sml|树木岭|FMQ|shumuling|sml|2536","snq|苏尼特左旗|ONC|sunitezuoqi|sntzq|2537","spd|山坡东|SBN|shanpodong|spd|2538","sqi|石桥|SQE|shiqiao|sq|2539","sqi|沈丘|SQN|shenqiu|sq|2540","ssb|鄯善北|SMR|shanshanbei|ssb|2541","ssb|狮山北|NSQ|shishanbei|ssb|2542","ssb|三水北|ARQ|sanshuibei|ssb|2543","ssb|松山湖北|KUQ|songshanhubei|sshb|2544","ssh|狮山|KSQ|shishan|ss|2545","ssn|三水南|RNQ|sanshuinan|ssn|2546","ssn|韶山南|INQ|shaoshannan|ssn|2547","ssu|三穗|QHW|sansui|ss|2548","sti|石梯|STE|shiti|st|2549","swe|汕尾|OGQ|shanwei|sw|2550","sxb|歙县北|NPH|shexianbei|sxb|2551","sxb|绍兴北|SLH|shaoxingbei|sxb|2552","sxd|绍兴东|SSH|shaoxingdong|sxd|2553","sxi|泗县|GPH|sixian|sx|2554","sxi|始兴|IPQ|shixing|sx|2555","sya|泗阳|MPH|siyang|sy|2556","sya|双阳|OYT|shuangyang|sy|2557","syb|邵阳北|OVQ|shaoyangbei|syb|2558","syb|松原北|OCT|songyuanbei|syb|2559","syi|山阴|SNV|shanyin|sy|2560","szb|深圳北|IOQ|shenzhenbei|szb|2561","szh|神州|SRQ|shenzhou|sz|2562","szs|深圳坪山|IFQ|shenzhenpingshan|szps|2563","szs|石嘴山|QQJ|shizuishan|szs|2564","szx|石柱县|OSW|shizhuxian|szx|2565","tan|台安南|TAD|taiannan|tan|2566","tcb|桃村北|TOK|taocunbei|tcb|2567","tdb|田东北|TBZ|tiandongbei|tdb|2568","tdd|土地堂东|TTN|tuditangdong|tdtd|2569","tgx|太谷西|TIV|taiguxi|tgx|2570","tha|吐哈|THR|tuha|th|2571","tha|通海|TAM|tonghai|th|2572","thb|太和北|JYN|taihebei|thb|2573","thc|天河机场|TJN|tianhejichang|thjc|2574","thj|天河街|TEN|tianhejie|thj|2575","thx|通化县|TXL|tonghuaxian|thx|2576","tji|同江|TJB|tongjiang|tj|2577","tlb|铜陵北|KXH|tonglingbei|tlb|2578","tlb|吐鲁番北|TAR|tulufanbei|tlfb|2579","tni|泰宁|TNS|taining|tn|2580","trn|铜仁南|TNW|tongrennan|trn|2581","tsn|天水南|TIJ|tianshuinan|tsn|2582","twe|通渭|TWJ|tongwei|tw|2583","txd|田心东|KQQ|tianxindong|txd|2584","txh|汤逊湖|THN|tangxunhu|txh|2585","txi|藤县|TAZ|tengxian|tx|2586","tyn|太原南|TNV|taiyuannan|tyn|2587","tyx|通远堡西|TST|tongyuanpuxi|typx|2588","tzb|桐梓北|TBE|tongzibei|tzb|2589","tzd|桐梓东|TDE|tongzidong|tzd|2590","tzh|通州|TOP|tongzhou|tz|2591","wdd|文登东|WGK|wendengdong|wdd|2592","wfs|五府山|WFG|wufushan|wfs|2593","whb|威虎岭北|WBL|weihulingbei|whlb|2594","whb|威海北|WHK|weihaibei|whb|2595","wlb|乌兰察布|WPC|wulanchabu|wlcb|2596","wld|五龙背东|WMT|wulongbeidong|wlbd|2597","wln|乌龙泉南|WFN|wulongquannan|wlqn|2598","wlq|乌鲁木齐|WAR|wulumuqi|wlmq|2599","wns|五女山|WET|wunvshan|wns|2600","wsh|武胜|WSE|wusheng|ws|2601","wwe|无为|IIH|wuwei|ww|2602","wws|瓦屋山|WAH|wawushan|wws|2603","wxx|闻喜西|WOV|wenxixi|wxx|2604","wyb|武义北|WDH|wuyibei|wyb|2605","wyb|武夷山北|WBS|wuyishanbei|wysb|2606","wyd|武夷山东|WCS|wuyishandong|wysd|2607","wyu|婺源|WYG|wuyuan|wy|2608","wyu|渭源|WEJ|weiyuan|wy|2609","wzb|万州北|WZE|wanzhoubei|wzb|2610","wzh|武陟|WIF|wuzhi|wz|2611","wzn|梧州南|WBZ|wuzhounan|wzn|2612","xab|兴安北|XDZ|xinganbei|xab|2613","xcd|许昌东|XVF|xuchangdong|xcd|2614","xch|项城|ERN|xiangcheng|xc|2615","xdd|新都东|EWW|xindudong|xdd|2616","xfe|西丰|XFT|xifeng|xf|2617","xfe|先锋|NQQ|xianfeng|xf|2618","xfl|湘府路|FVQ|xiangfulu|xfl|2619","xfx|襄汾西|XTV|xiangfenxi|xfx|2620","xgb|孝感北|XJN|xiaoganbei|xgb|2621","xgd|孝感东|GDN|xiaogandong|xgd|2622","xhd|西湖东|WDQ|xihudong|xhd|2623","xhn|新化南|EJQ|xinhuanan|xhn|2624","xhx|新晃西|EWQ|xinhuangxi|xhx|2625","xji|新津|IRW|xinjin|xj|2626","xjk|小金口|NKQ|xiaojinkou|xjk|2627","xjn|辛集南|IJP|xinjinan|xjn|2628","xjn|新津南|ITW|xinjinnan|xjn|2629","xnd|咸宁东|XKN|xianningdong|xnd|2630","xnn|咸宁南|UNN|xianningnan|xnn|2631","xpn|溆浦南|EMQ|xupunan|xpn|2632","xpx|西平西|EGQ|xipingxi|xpx|2633","xtb|湘潭北|EDQ|xiangtanbei|xtb|2634","xtd|邢台东|EDP|xingtaidong|xtd|2635","xwq|西乌旗|XWC|xiwuqi|xwq|2636","xwx|修武西|EXF|xiuwuxi|xwx|2637","xwx|修文县|XWE|xiuwenxian|xwx|2638","xxb|萧县北|QSH|xiaoxianbei|xxb|2639","xxd|新乡东|EGF|xinxiangdong|xxd|2640","xyb|新余北|XBG|xinyubei|xyb|2641","xyc|西阳村|XQF|xiyangcun|xyc|2642","xyd|信阳东|OYN|xinyangdong|xyd|2643","xyd|咸阳秦都|XOY|xianyangqindu|xyqd|2644","xyo|仙游|XWS|xianyou|xy|2645","xzc|新郑机场|EZF|xinzhengjichang|xzjc|2646","xzl|香樟路|FNQ|xiangzhanglu|xzl|2647","ybl|迎宾路|YFW|yingbinlu|ybl|2648","ycb|永城北|RGH|yongchengbei|ycb|2649","ycb|运城北|ABV|yunchengbei|ycb|2650","ycd|永川东|WMW|yongchuandong|ycd|2651","ycd|禹城东|YSK|yuchengdong|ycd|2652","ych|宜春|YEG|yichun|yc|2653","ych|岳池|AWW|yuechi|yc|2654","ydh|云东海|NAQ|yundonghai|ydh|2655","ydu|姚渡|AOJ|yaodu|yd|2656","yfd|云浮东|IXQ|yunfudong|yfd|2657","yfn|永福南|YBZ|yongfunan|yfn|2658","yge|雨格|VTM|yuge|yg|2659","yhe|洋河|GTH|yanghe|yh|2660","yjb|永济北|AJV|yongjibei|yjb|2661","yji|弋江|RVH|yijiang|yj|2662","yjp|于家堡|YKP|yujiapu|yjp|2663","yjx|延吉西|YXL|yanjixi|yjx|2664","ykn|永康南|QUH|yongkangnan|ykn|2665","ylh|运粮河|YEF|yunlianghe|ylh|2666","yli|炎陵|YAG|yanling|yl|2667","yln|杨陵南|YEY|yanglingnan|yln|2668","ymi|伊敏|YMX|yimin|ym|2669","yna|郁南|YKQ|yunan|yn|2670","ypi|银瓶|KPQ|yinping|yp|2671","ysh|永寿|ASY|yongshou|ys|2672","ysh|阳朔|YCZ|yangshuo|ys|2673","ysh|云山|KZQ|yunshan|ys|2674","ysn|玉山南|YGG|yushannan|ysn|2675","yta|银滩|CTQ|yintan|yt|2676","yta|永泰|YTS|yongtai|yt|2677","ytb|鹰潭北|YKG|yingtanbei|ytb|2678","ytn|烟台南|YLK|yantainan|ytn|2679","yto|伊通|YTL|yitong|yt|2680","ytx|烟台西|YTK|yantaixi|ytx|2681","yxi|尤溪|YXS|youxi|yx|2682","yxi|云霄|YBS|yunxiao|yx|2683","yxi|宜兴|YUH|yixing|yx|2684","yxi|玉溪|AXM|yuxi|yx|2685","yxi|阳信|YVK|yangxin|yx|2686","yxi|应县|YZV|yingxian|yx|2687","yxn|攸县南|YXG|youxiannan|yxn|2688","yxx|洋县西|YXY|yangxianxi|yxx|2689","yyb|余姚北|CTH|yuyaobei|yyb|2690","yzh|榆中|IZJ|yuzhong|yz|2691","zan|诏安|ZDS|zhaoan|za|2692","zdc|正定机场|ZHP|zhengdingjichang|zdjc|2693","zfd|纸坊东|ZMN|zhifangdong|zfd|2694","zge|准格尔|ZEC|zhungeer|zge|2695","zhb|庄河北|ZUT|zhuanghebei|zhb|2696","zhu|昭化|ZHW|zhaohua|zh|2697","zjb|织金北|ZJE|zhijinbei|zjb|2698","zjc|张家川|ZIJ|zhangjiachuan|zjc|2699","zji|芷江|ZPQ|zhijiang|zj|2700","zji|织金|IZW|zhijin|zj|2701","zka|仲恺|KKQ|zhongkai|zk|2702","zko|曾口|ZKE|zengkou|zk|2703","zli|左岭|ZSN|zuoling|zl|2704","zmd|樟木头东|ZRQ|zhangmutoudong|zmtd|2705","zmx|驻马店西|ZLN|zhumadianxi|zmdx|2706","zpu|漳浦|ZCS|zhangpu|zp|2707","zqd|肇庆东|FCQ|zhaoqingdong|zqd|2708","zqi|庄桥|ZQH|zhuangqiao|zq|2709","zsh|昭山|KWQ|zhaoshan|zs|2710","zsx|钟山西|ZAZ|zhongshanxi|zsx|2711","zxi|漳县|ZXJ|zhangxian|zx|2712","zyb|资阳北|FYW|ziyangbei|zyb|2713","zyi|遵义|ZYE|zunyi|zy|2714","zyn|遵义南|ZNE|zunyinan|zyn|2715","zyx|张掖西|ZEJ|zhangyexi|zyx|2716","zzb|资中北|WZW|zizhongbei|zzb|2717","zzd|涿州东|ZAP|zhuozhoudong|zzd|2718","zzd|枣庄东|ZNK|zaozhuangdong|zzd|2719","zzd|卓资东|ZDC|zhuozidong|zzd|2720","zzd|郑州东|ZAF|zhengzhoudong|zzd|2721","zzn|株洲南|KVQ|zhuzhounan|zzn|2722"];
Vcity.hotCity = ["bji|北京|BJP|0","sha|上海|SHH|1","tji|天津|TJP|2","cqi|重庆|CQW|3","csh|长沙|CSQ|4","cch|长春|CCT|5","cdu|成都|CDW|6","fzh|福州|FZS|7","gzh|广州|GZQ|8","gya|贵阳|GIW|9","hht|呼和浩特|HHC|10","heb|哈尔滨|HBB|11","hfe|合肥|HFH|12","hzh|杭州|HZH|13","hko|海口|VUQ|14","jna|济南|JNK|15","kmi|昆明|KMM|16","lsa|拉萨|LSO|17","lzh|兰州|LZJ|18","nni|南宁|NNZ|19","nji|南京|NJH|20","nch|南昌|NCG|21","sya|沈阳|SYT|22","sjz|石家庄|SJP|23","tyu|太原|TYV|24","wlq|乌鲁木齐南|WMR|25","wha|武汉|WHN|26","xni|西宁|XNO|27","xan|西安|XAY|28","ych|银川|YIJ|29","zzh|郑州|ZZF|30","szh|深圳|SZQ|shenzhen|sz|31","xme|厦门|XMS|xiamen|xm|32"];

/* 正则表达式 筛选中文城市名、拼音、首字母 */

Vcity.regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;

/* *
 * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */
(function () {
    var citys = Vcity.allCity,letter,
            reg2 = /^[a-b]$/i, reg3 = /^[c-d]$/i, reg4 = /^[e-g]$/i,reg5 = /^[h]$/i,reg6 = /^[j]$/i,reg7 = /^[k-l]$/i,reg8 =  /^[m-p]$/i,reg9 =  /^[q-r]$/i,reg10 =  /^[s]$/i,reg11 =  /^[t]$/i,reg12 =  /^[w]$/i,reg13 =  /^[x]$/i,reg14 =  /^[y]$/i,reg15 =  /^[z]$/i;
    if (!Vcity.oCity) {
        Vcity.oCity = {hot:{},AB:{},CD:{},EFG:{},H:{},J:{},KL:{},MNP:{},QR:{},S:{},T:{},W:{},X:{},Y:{},Z:{}};
        for (var i = 0, n = citys.length; i < n; i++) {
        	var cityArr=citys[i].split("|");
            letter = cityArr[0].toUpperCase().substring(0,1);
            if (reg2.test(letter)) {
                if (!Vcity.oCity.AB[letter]) Vcity.oCity.AB[letter] = [];
                Vcity.oCity.AB[letter].push(cityArr[1]);
            } else if (reg3.test(letter)) {
                if (!Vcity.oCity.CD[letter]) Vcity.oCity.CD[letter] = [];
                Vcity.oCity.CD[letter].push(cityArr[1]);
            } else if (reg4.test(letter)) {
                if (!Vcity.oCity.EFG[letter]) Vcity.oCity.EFG[letter] = [];
                Vcity.oCity.EFG[letter].push(cityArr[1]);
            }else if (reg5.test(letter)) {
                if (!Vcity.oCity.H[letter]) Vcity.oCity.H[letter] = [];
                Vcity.oCity.H[letter].push(cityArr[1]);
            }else if (reg6.test(letter)) {
                if (!Vcity.oCity.J[letter]) Vcity.oCity.J[letter] = [];
                Vcity.oCity.J[letter].push(cityArr[1]);
            }else if (reg7.test(letter)) {
                if (!Vcity.oCity.KL[letter]) Vcity.oCity.KL[letter] = [];
                Vcity.oCity.KL[letter].push(cityArr[1]);
            }else if (reg8.test(letter)) {
                if (!Vcity.oCity.MNP[letter]) Vcity.oCity.MNP[letter] = [];
                Vcity.oCity.MNP[letter].push(cityArr[1]);
            }else if (reg9.test(letter)) {
                if (!Vcity.oCity.QR[letter]) Vcity.oCity.QR[letter] = [];
                Vcity.oCity.QR[letter].push(cityArr[1]);
            }else if (reg10.test(letter)) {
                if (!Vcity.oCity.S[letter]) Vcity.oCity.S[letter] = [];
                Vcity.oCity.S[letter].push(cityArr[1]);
            }else if (reg11.test(letter)) {
                if (!Vcity.oCity.T[letter]) Vcity.oCity.T[letter] = [];
                Vcity.oCity.T[letter].push(cityArr[1]);
            }else if (reg12.test(letter)) {
                if (!Vcity.oCity.W[letter]) Vcity.oCity.W[letter] = [];
                Vcity.oCity.W[letter].push(cityArr[1]);
            }else if (reg13.test(letter)) {
                if (!Vcity.oCity.X[letter]) Vcity.oCity.X[letter] = [];
                Vcity.oCity.X[letter].push(cityArr[1]);
            }else if (reg14.test(letter)) {
                if (!Vcity.oCity.Y[letter]) Vcity.oCity.Y[letter] = [];
                Vcity.oCity.Y[letter].push(cityArr[1]);
            }else if (reg15.test(letter)) {
                if (!Vcity.oCity.Z[letter]) Vcity.oCity.Z[letter] = [];
                Vcity.oCity.Z[letter].push(cityArr[1]);
            }

        }
        
        /* 热门城市*/
        for (var i = 0, n = Vcity.hotCity.length; i < n; i++) {
        	if(!Vcity.oCity.hot['hot']) Vcity.oCity.hot['hot'] = [];
            Vcity.oCity.hot['hot'].push(Vcity.hotCity[i].split("|")[1]);
        }
    }
})();


/* 城市HTML模板 */
Vcity._template = [
    '<p class="tip">直接输入可搜索城市(支持汉字/拼音)</p>',
    '<ul>',
    '<li class="on">热门城市</li>',
    '<li>AB</li>',
    '<li>CD</li>',
    '<li>EFG</li>',
    '<li>H</li>',
    '<li>J</li>',
    '<li>KL</li>',
    '<li>MNP</li>',
    '<li>QR</li>',
    '<li>S</li>',
    '<li>T</li>',
    '<li>W</li>',
    '<li>X</li>',
    '<li>Y</li>',
    '<li>Z</li>',
    '</ul>'
];

/* *
 * 城市控件构造函数
 * @CitySelector
 * */

Vcity.CitySelector = function () {
    this.initialize.apply(this, arguments);
};

Vcity.CitySelector.prototype = {

    constructor:Vcity.CitySelector,

    /* 初始化 */

    initialize :function (options) {
        var input = options.input;
        this.input = Vcity._m.$('#'+ input);
        this.inputEvent();
    },

    /* *
        

    /* *
     * @createWarp
     * 创建城市BOX HTML 框架
     * */

    createWarp:function(){
        var inputPos = Vcity._m.getPos(this.input);
        var div = this.rootDiv = document.createElement('div');
        var that = this;

        // 设置DIV阻止冒泡
        Vcity._m.on(this.rootDiv,'click',function(event){
            Vcity._m.stopPropagation(event);
        });

        // 设置点击文档隐藏弹出的城市选择框
        Vcity._m.on(document, 'click', function (event) {
            event = Vcity._m.getEvent(event);
            var target = Vcity._m.getTarget(event);
            if(target == that.input) return false;
            if (that.cityBox)Vcity._m.addClass('hide', that.cityBox);
            if (that.ul)Vcity._m.addClass('hide', that.ul);
            if(that.myIframe)Vcity._m.addClass('hide',that.myIframe);
        });
        div.className = 'citySelector';
        div.style.position = 'absolute';
        div.style.left = inputPos.left + 'px';
        div.style.top = inputPos.bottom + 5 + 'px';
        div.style.zIndex = 999999;

        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }

        var childdiv = this.cityBox = document.createElement('div');
        childdiv.className = 'cityBox';
        childdiv.id = 'cityBox';
        childdiv.innerHTML = Vcity._template.join('');
        var hotCity = this.hotCity =  document.createElement('div');
        hotCity.className = 'hotCity';
        childdiv.appendChild(hotCity);
        div.appendChild(childdiv);
        this.createHotCity();
    },

    /* *
     * @createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/

    createHotCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Vcity.regEx,
                oCity = Vcity.oCity;
        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            // 先设置全部隐藏hide
            odiv.className = key + ' ' + 'cityTab hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'hot'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                    str = '<a href="#">' + oCity[key][sortKey[j]][i] + '</a>';
                    odda.push(str);
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            // 移除热门城市的隐藏CSS
            Vcity._m.removeClass('hide',this.hot);
            this.hotCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        /* IE6 */
        this.changeIframe();

        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var lis = Vcity._m.$('li',this.cityBox);
        var divs = Vcity._m.$('div',this.hotCity);
        var that = this;
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    Vcity._m.removeClass('on',lis[j]);
                    Vcity._m.addClass('hide',divs[j]);
                }
                Vcity._m.addClass('on',this);
                Vcity._m.removeClass('hide',divs[this.index]);
                /* IE6 改变TAB的时候 改变Iframe 大小*/
                that.changeIframe();
            };
        }
    },

    /* *
     * 城市LINK事件
     *  @linkEvent
     * */

    linkEvent:function(){
        var links = Vcity._m.$('a',this.hotCity);
        var that = this;
        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
                that.input.value = this.innerHTML;
                Vcity._m.addClass('hide',that.cityBox);
                /* 点击城市名的时候隐藏myIframe */
                Vcity._m.addClass('hide',that.myIframe);
            }
        }
    },

    /* *
     * INPUT城市输入框事件
     * @inputEvent
     * */

    inputEvent:function(){
        var that = this;
        Vcity._m.on(this.input,'click',function(event){
            event = event || window.event;
            if(!that.cityBox){
                that.createWarp();
            }else if(!!that.cityBox && Vcity._m.hasClass('hide',that.cityBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                if(!that.ul || (that.ul && Vcity._m.hasClass('hide',that.ul))){
                    Vcity._m.removeClass('hide',that.cityBox);

                    /* IE6 移除iframe 的hide 样式 */
                    Vcity._m.removeClass('hide',that.myIframe);
                    that.changeIframe();
                }
            }
        });
        Vcity._m.on(this.input,'blur',function(){
            var value = Vcity._m.trim(that.input.value);
            if(value != ''){
                var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
                var flag=0;
                for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                    if (reg.test(Vcity.allCity[i])) {
                        flag++;
                    }
                }
                if(flag==0){
                    that.input.value= '';
                }else{
                    var lis = Vcity._m.$('li',that.ul);
                    if(typeof lis == 'object' && lis['length'] > 0){
                        var li = lis[0];
                        var bs = li.children;
                        if(bs && bs['length'] > 1){
                            that.input.value = bs[0].innerHTML;
                        }
                    }else{
                        that.input.value = '';
                    }
                }
            }

        });
        Vcity._m.on(this.input,'keyup',function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            Vcity._m.addClass('hide',that.cityBox);
            that.createUl();

            /* 移除iframe 的hide 样式 */
            Vcity._m.removeClass('hide',that.myIframe);

            // 下拉菜单显示的时候捕捉按键事件
            if(that.ul && !Vcity._m.hasClass('hide',that.ul) && !that.isEmpty){
                that.KeyboardEvent(event,keycode);
            }
        });
    },

    /* *
     * 生成下拉选择列表
     * @ createUl
     * */

    createUl:function () {
        var str;
        var value = Vcity._m.trim(this.input.value);
        // 当value不等于空的时候执行
        if (value !== '') {
            var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
            // 此处需设置中文输入法也可用onpropertychange
            var searchResult = [];
            for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                if (reg.test(Vcity.allCity[i])) {
                    var cityArr = Vcity.allCity[i].split("|");
                    if (searchResult.length !== 0) {
                        str = '<li><b class="cityname">' + cityArr[1] + '</b><b class="cityspell">' + cityArr[3] + '</b></li>';
                    } else {
                        str = '<li class="on"><b class="cityname">' + cityArr[1] + '</b><b class="cityspell">' + cityArr[3] + '</b></li>';
                    }
                    searchResult.push(str);
                }
            }
            this.isEmpty = false;
            // 如果搜索数据为空
            if (searchResult.length == 0) {
                this.isEmpty = true;
                str = '<li class="empty">对不起，没有找到 "<em>' + value + '</em>"</li>';
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if (!this.ul) {
                var ul = this.ul = document.createElement('ul');
                ul.className = 'cityslide mCustomScrollbar';
                this.rootDiv && this.rootDiv.appendChild(ul);
                // 记录按键次数，方向键
                this.count = 0;
            } else if (this.ul && Vcity._m.hasClass('hide', this.ul)) {
                this.count = 0;
                Vcity._m.removeClass('hide', this.ul);
            }
            this.ul.innerHTML = searchResult.join('');

            /* IE6 */
            this.changeIframe();

            // 绑定Li事件
            this.liEvent();
        }else{
            Vcity._m.addClass('hide',this.ul);
            Vcity._m.removeClass('hide',this.cityBox);

            Vcity._m.removeClass('hide',this.myIframe);

            this.changeIframe();
        }
    },

    /* IE6的改变遮罩SELECT 的 IFRAME尺寸大小 */
    changeIframe:function(){
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    },

    /* *
     * 特定键盘事件，上、下、Enter键
     * @ KeyboardEvent
     * */

    KeyboardEvent:function(event,keycode){
        var lis = Vcity._m.$('li',this.ul);
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count > len-1) this.count = 0;
                for(var i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = len-1;
                for(i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 13: // enter键
                this.input.value = Vcity.regExChiese.exec(lis[this.count].innerHTML)[0];
                Vcity._m.addClass('hide',this.ul);
                Vcity._m.addClass('hide',this.ul);
                /* IE6 */
                Vcity._m.addClass('hide',this.myIframe);
                break;
            default:
                break;
        }
    },

    /* *
     * 下拉列表的li事件
     * @ liEvent
     * */

    liEvent:function(){
        var that = this;
        var lis = Vcity._m.$('li',this.ul);
        for(var i = 0,n = lis.length;i < n;i++){
            Vcity._m.on(lis[i],'click',function(event){ 
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                that.input.value = Vcity.regExChiese.exec(target.innerHTML)[0];
                Vcity._m.addClass('hide',that.ul);
                /* IE6 下拉菜单点击事件 */
                Vcity._m.addClass('hide',that.myIframe);
            });
            Vcity._m.on(lis[i],'mouseover',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.addClass('on',target);
            });
            Vcity._m.on(lis[i],'mouseout',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.removeClass('on',target);
            })
        }
    }
};