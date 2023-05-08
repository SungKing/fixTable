# fixTable
a tool base JQuery about fix table line or column

## option 属性介绍

```
var options2 = {
            showFunc:function(ele){//元素显示函数，会被下面的覆盖掉
                ele.fadeIn();
            },
            hideFunc:function(ele){//元素隐藏函数，会被下面的覆盖掉
                ele.fadeOut();
            },
            column: {//列属性
                leftFix: 2,//左侧固定的列数
                showNum: 3,//要显示的列数
                rightFix: 2,//右侧固定的列数
                showFunc: function (ele) {
                    ele.fadeIn();
                },
                hideFunc: function (ele) {
                    ele.hide();
                }
            },
            line: {//行属性
                topFix: 1,//顶部固定的行
                showNum: 5,//要显示的行
                bottomFix: 0,//底部固定的行
                showFunc: function (ele) {
                    ele.fadeIn();
                },
                hideFunc: function (ele) {
                    ele.hide();
                }
            }
        }

```

## 使用

```
$('#example').tableFix(options2);
```

## 注意

