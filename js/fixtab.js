(function ($) {
    $.fn.tableFix = function (options) {
        var that = this;
        init_args_and_table(options,that)

        //左移事件
        $('table').on('click','.left',function(){
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
                var up_btn_flag = true;
                var down_btn_flag = true;
                for(var i=0;i<trs.length;i++){
                    var tds = trs.eq(i).children();
                    var hide_ele = tds.eq(view_index + options.column.showNum);
                    options.column.hideFunc(tds.eq(view_index));
                    //up and down btn deal
                    if(up_btn_flag && tds.eq(view_index).children().hasClass('up')){
                        destroyBtnAsClaz(tds.eq(view_index),'up')
                        createBtn(tds.eq(view_index+1),'up');
                        up_btn_flag=false;
                    }else if(down_btn_flag&&tds.eq(view_index).children().hasClass('down')){
                        destroyBtnAsClaz(tds.eq(view_index),'down')
                        createBtn(tds.eq(view_index+1),'down');
                        down_btn_flag=false;
                    }
                    //隐藏的话就销毁按钮
                    if(trs.eq(i).children().find('.left').length>0){
                        destroyBtnAsClaz(trs.eq(i).children().eq(view_index + options.column.showNum-1),'right')
                        createBtn(hide_ele,'right');
                        destroyBtnAsClaz(trs.eq(i).children().eq(view_index),'left')
                        if(view_index + options.column.showNum+1<ths.length - options.column.rightFix){
                            createBtn(trs.eq(i).children().eq(view_index+1),'left');
                        }
                        
                    }
                        
                    options.column.showFunc(hide_ele);
                }
            }
        });

        $('table').on('click','.right', function () {
            var trs = $(that).find("tr");
            //标记
            var view_index = 0;//移动的元素下标标记
            var ths = trs.eq(0).children();
            for (var j = ths.length - options.column.rightFix - 1; j >= options.column.leftFix; j--) {
                var s = ths.eq(j)
                if (s.css("display") != "none") {//找到从右边数第一个显示的元素
                    view_index = j;
                    break;
                }
            }
            
            if (view_index - options.column.showNum >= options.column.leftFix) {//如果还在范围内
                var up_btn_flag = true;
                var down_btn_flag = true;
                for(var i=0;i<trs.length;i++){
                    var tds = trs.eq(i).children();
                    var hide_ele = tds.eq(view_index - options.column.showNum);
                    //up and down btn deal
                    if(up_btn_flag && tds.eq(view_index - options.column.showNum+1).children().hasClass('up')){
                        destroyBtnAsClaz(tds.eq(view_index - options.column.showNum+1),'up')
                        createBtn(tds.eq(view_index - options.column.showNum),'up');
                        up_btn_flag=false;
                    }else if(down_btn_flag&&tds.eq(view_index - options.column.showNum+1).children().hasClass('down')){
                        destroyBtnAsClaz(tds.eq(view_index - options.column.showNum+1),'down')
                        createBtn(tds.eq(view_index - options.column.showNum),'down');
                        down_btn_flag=false;
                    }


                    if(trs.eq(i).children().find('.right').length>0){
                        destroyBtnAsClaz(tds.eq(view_index),'right')
                        createBtn(hide_ele,'left')
                        destroyBtnAsClaz(tds.eq(view_index - options.column.showNum+1),'left')
                        if(view_index - options.column.showNum>options.column.leftFix){
                            createBtn(tds.eq(view_index -1),'right');
                        }
                    }
                    //下面是动画效果
                    options.column.hideFunc(tds.eq(view_index));
                    
                    options.column.showFunc(hide_ele);
                    
                }
            }

            
        })

        $('table').on('click','.up', function () {
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
                destroyBtnAsClaz(trs.eq(view_index).children().eq(0),'up')
                createBtn(hide_ele.children().eq(0),'down')
                destroyBtnAsClaz(trs.eq(view_index + options.line.showNum-1).children().eq(0),'down')
                if(view_index + options.line.showNum+1<trs.length - options.line.bottomFix){
                    createBtn(trs.eq(view_index+1).children().eq(0),'up')
                }
                //处理 button
                if(trs.eq(view_index).find('.left').length>0){//left 和right 同行
                    var tds_ = trs.eq(view_index).children();
                    for(var i=0;i<tds_.length;i++){
                        if(tds_.eq(i).children().hasClass('left')){
                            destroyBtnAsClaz(tds_.eq(i),'left')
                            createBtn(trs.eq(view_index+1).children().eq(i),'left')
                        }else if(tds_.eq(i).children().hasClass('right')){
                            destroyBtnAsClaz(tds_.eq(i),'right')
                            createBtn(trs.eq(view_index+1).children().eq(i),'right')
                        }
                    }
                }
            }
        })

        $('table').on('click','.down', function () {
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

                destroyBtnAsClaz(trs.eq(view_index).children().eq(0),'down')
                destroyBtnAsClaz(trs.eq(view_index - options.line.showNum+1).children().eq(0),'up')
                createBtn(hide_ele.children().eq(0),'up');
                if(view_index - options.line.showNum>options.line.topFix){
                    createBtn(trs.eq(view_index-1).children().eq(0),'down')
                }
                
                
                //处理 button
                if(trs.eq(view_index - options.line.showNum+1).find('.left').length>0){//left 和right 同行
                    
                    var tds_ = trs.eq(view_index - options.line.showNum+1).children();
                    for(var i=0;i<tds_.length;i++){
                        if(tds_.eq(i).children().hasClass('left')){
                            destroyBtnAsClaz(tds_.eq(i),'left')
                            createBtn(trs.eq(view_index - options.line.showNum).children().eq(i),'left')
                        }else if(tds_.eq(i).children().hasClass('right')){
                            destroyBtnAsClaz(tds_.eq(i),'right')
                            createBtn(trs.eq(view_index - options.line.showNum).children().eq(i),'right')
                        }
                    }
                }
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
    

    if(upFlag){
        var td_p = trs.eq(options.line.topFix).children().eq(0);
        createBtn(td_p,'up');

    }
    if(leftFlag){
        var td_p = trs.eq(0).children().eq(options.column.leftFix);
        createBtn(td_p,'left');

    }


}
//创建按钮
function createBtn(parent,claz){
    if(claz=='left')
    console.log("=======")
    var btn = $('<button></button>').addClass('btn').addClass(claz);
    btn.css('float','left');
    parent.append(btn);
    return btn;
}


//销毁按钮
function destroyBtn(parent){
    parent.find('.btn').remove()
}
//销毁指定按钮
function destroyBtnAsClaz(parent,claz){
    parent.find('.'+claz).remove()
}