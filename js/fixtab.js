(function ($) {
    $.fn.tableFix = function (options) {
        var that = this;
        init_args_and_table(options,that)

        //左移事件
        $('.left').on('click', function () {
            var trs = $(that).find("tr");

            //标记
            var view_index = 0;//移动的元素下标标记
            var ths = trs.eq(0).children();
            for(var i = options.column.leftFix;i<ths.length-options.column.rightFix;i++){
                var s = ths.eq(i)
                if (s.css("display") != "none") {//找到第一个显示的元素
                    view_index = i;
                    break;
                }
            }
            if (view_index + options.column.showNum < ths.length - options.column.rightFix){//如果还在范围内
                for(var i=0;i<trs.length;i++){
                    var tds = trs.eq(i).children();
                    var hide_ele = tds.eq(view_index + options.column.showNum);
                    options.column.hideFunc(tds.eq(view_index));
                    //隐藏的话就销毁按钮
                    // if(i==0){
                    //     createBtn(ths.eq(view_index + options.column.showNum),'right');
                    //     if(view_index + options.column.showNum+1<ths.length - options.column.rightFix){
                    //         createTdBtn(ths.eq(view_index+1),'left');
                    //         //ths.eq(view_index+1).append($(this));
                    //     }
                    //     //销毁隐藏的按钮
                    //     //ths.eq(view_index).find('.btn').remove()
                       
                    // }
                        
                    options.column.showFunc(hide_ele);
                }
            }
        });

        $('.right').on('click', function () {
            var trs = $(that).find("tr");
            for (var i in trs) {
                var tds = trs.eq(i).children();
                var view_index = 0;//移动的元素下标标记
                for (var j = tds.length - options.column.rightFix - 1; j >= options.column.leftFix; j--) {
                    var s = tds.eq(j)
                    if (s.css("display") != "none") {//找到从右边数第一个显示的元素
                        view_index = j;
                        break;
                    }
                }
                if (view_index - options.column.showNum >= options.column.leftFix) {//如果还在范围内
                    var hide_ele = tds.eq(view_index - options.column.showNum);
                    //下面是动画效果,这二者不兼容
                    options.column.hideFunc(tds.eq(view_index));
                    options.column.showFunc(hide_ele);
                    // tds.eq(view_index).fadeToggle();
                    // hide_ele.fadeToggle();
                    //下面的是不用动画效果
                    // hide_ele.css('display',tds.eq(view_index).css("display"));
                    // tds.eq(view_index).css("display",'none');
                }

            }
        })

        $('.up').on('click', function () {
            var trs = $(that).find("tr");
            var view_index = 0;//移动的元素下标标记
            for (var i = options.line.topFix; i < trs.length - options.line.bottomFix; i++) {
                var s = trs.eq(i);
                if (s.css("display") != "none") {//找到第一个显示的元素
                    view_index = i;
                    break;
                }
            }
            if (view_index + options.line.showNum < trs.length - options.line.bottomFix) {
                var hide_ele = trs.eq(view_index + options.line.showNum);
                //下面是动画效果
                options.line.hideFunc(trs.eq(view_index));
                options.line.showFunc(hide_ele);
                // trs.eq(view_index).fadeToggle()
                // hide_ele.fadeToggle();
                //下面的是不用动画效果
                // hide_ele.css('display',trs.eq(view_index).css('display'));
                // trs.eq(view_index).css('display','none');
            }
        })

        $('.down').on('click', function () {
            var trs = $(that).find("tr");
            var view_index = 0;//移动的元素下标标记
            for (var i = trs.length - options.line.bottomFix - 1; i >= options.line.topFix; i--) {
                var s = trs.eq(i);
                if (s.css("display") != "none") {//找到第一个显示的元素
                    view_index = i;
                    break;
                }
            }
            if (view_index - options.line.showNum >= options.line.topFix) {
                var hide_ele = trs.eq(view_index - options.line.showNum);
                //下面是动画效果
                options.line.hideFunc(trs.eq(view_index));
                options.line.showFunc(hide_ele);
                // trs.eq(view_index).fadeToggle()
                // hide_ele.fadeToggle()
                //下面的是不用动画效果
                // hide_ele.css('display',trs.eq(view_index).css('display'));
                // trs.eq(view_index).css('display','none');
            }
        })

    }

})(jQuery);

function init_args_and_table(options,that){
    options = initArgs(options,that)
    initTable(options,that)
}
//初始化参数
function initArgs(options, that) {
    //对 options 属性进行解析
    if (!options)
        options = {}
    if (!options.showFunc) {
        options.showFunc = function (ele) {
            ele.fadeIn();
        }
    }
    if (!options.hideFunc) {
        options.hideFunc = function (ele) {
            ele.fadeOut();
        }
    }
    if (!options.column) {
        options.column = {}
    }
    if (!options.column.leftFix) {
        options.column.leftFix = 0
    }
    if (!options.column.rightFix) {
        options.column.rightFix = 0
    }
    if (!options.column.showNum) {
        var td_len = $(that).find('tr').eq(0).children().length;
        if (td_len > options.column.rightFix + options.column.leftFix) {
            options.column.showNum =
                td_len
                - options.column.rightFix
                - options.column.leftFix
                ;
        }

    }
    if (!options.column.showFunc) {
        options.column.showFunc = options.showFunc;
    }
    if (!options.column.hideFunc) {
        options.column.hideFunc = options.hideFunc;
    }


    if (!options.line) {
        options.line = {}
    }

    if (!options.line.topFix) {
        options.line.topFix = 0;
    }
    if (!options.line.bottomFix) {
        options.line.bottomFix = 0;
    }
    if (!options.line.showNum) {
        var trs_len = $(that).find('tr').length;
        if (trs_len > options.line.topFix + options.line.bottomFix)
            options.line.showNum =
                trs_len -
                options.line.topFix -
                options.line.bottomFix;
        else
            options.line.showNum = 0;
    }
    if (!options.line.showFunc) {
        options.line.showFunc = options.showFunc;
    }
    if (!options.line.hideFunc) {
        options.line.hideFunc = options.hideFunc;
    }
    return options;
}
//初始化表
function initTable(options,that){
    var trs = $(that).find('tr');
    var upFlag = false;
    var leftFlag = false;//是否显示左移按钮
    for (var i = 0; i < trs.length; i++) {
        var tds = trs.eq(i).children();
        for (var j = 0; j < tds.length; j++) {
            if (j >= options.column.leftFix + options.column.showNum
                && j < tds.length - options.column.rightFix) {
                tds.eq(j).css("display", "none");
                leftFlag = true;
            }
        }
        if (i >= options.line.topFix + options.line.showNum
            && i < trs.length - options.line.bottomFix) {
            trs.eq(i).css("display", "none");
            upFlag = true;
        }
    }
    //这里是因为新创建的元素没有绑定click事件。所以先把这些隐藏起来
    var left_btn = createBtn($(that),'left');
    left_btn.css("display",'none');
    var right_btn = createBtn($(that),'right');
    right_btn.css("display",'none');
    var up_btn = createBtn($(that),'up');
    up_btn.css("display",'none');
    var down_btn = createBtn($(that),'down');
    down_btn.css("display",'none');

    if(upFlag){
        var td_p = trs.eq(options.line.topFix).children().eq(0);
        createTdBtn(td_p,'up');

    }
    if(leftFlag){
        var td_p = trs.eq(0).children().eq(options.column.leftFix);
        createTdBtn(td_p,'left');

    }


}
//创建table的隐形按钮
function createBtn(parent,claz){
    var btn = $('<button></button>').addClass('btn').addClass(claz);
    btn.css('float','left');
    parent.append(btn);
    return btn;
}
//创建td里面的btn
function createTdBtn(td,claz){
    console.log(td.text())
    var btn = td.parent('table').children('.'+claz);
    
    td.append(btn);
    //现在要让其显示出来
    td.find('.btn').css('display','block');
}

//销毁按钮
function destroyBtn(parent){
    parent.find('.btn').remove()
}