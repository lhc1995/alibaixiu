// ajax数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        var html = template('usersTpl', {
            data: res
        });
        document.querySelector('#tbody').innerHTML = html;

    }
})
// 用户列表的提交
$('#userForm').on('submit', function () {
    // serialize方法是jq为我们提供的，用来自动的收集表单数据
    var formData = $(this).serialize();
    // 向服务器发送请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (res) {
            // 刷新页面
            location.reload();
        }
    })
    console.log(formData);
    // 阻止默认提交行为
    return false;
})

//上传用户头像 这里使用到事件委托 可以有效解决到上传图像以及图像的修改功能
$('#modifyBox').on('change', '#avatar', function () {
    console.log(this);
    // 创建formdata对象
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        // 告诉ajax不要转换参数
        processData: false,
        contentType: false,
        success: function (res) {
            // 实现头像预览功能
            $('#preview').attr('src', res[0].avatar);
            // 作用在于保证提交头像的地址也能作为一个参数传给服务器
            $('#hiddenAvatar').val(res[0].avatar);
            console.log(res);
        }
    })

})

// 表单的编辑功能 获取到要编辑的内容
// tbody使用时间委托 防止事件冒泡
// 表单的修改功能 要获取到表单的id
$('#tbody').on('click', '.edit', function () {
    // 获取到当前的按钮的id值
    var id = $(this).attr('data-id');
    // 向服务端发送请求
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (res) {
            // 点击编辑按钮 可以获取到当前行的对象序列
            // 拼接模板和数据 将修改表单的中的数据呈现出来
            var html = template('modfiyTpl', res);
            $('#modifyBox').html(html);
        }
    })
})

// 表单事件的提交
$('#modifyBox').on('submit', '#modfiyForm', function () {
    // 接收表单的值
    var formData = $(this).serialize();
    // 获取到提交表单的id值
    var id = $(this).attr('data-id');
    console.log(formData);
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (res) {
            // 刷新页面
            location.reload();
        }
    })
    // 阻止表单默认提交行为
    return false;
})

// 删除事件 事件委托
$('#tbody').on('click', '.delete', function () {
    if (confirm('您确定要删除吗？')) {
        // 获取当前id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (res) {
                location.reload();
            }
        })
    }
});

// 批量删除操作
// 总复选框选中状态
$('#selectAll').on('click', function () {
    // 获取到总的复选框状态
    var status = $(this).prop('checked');
    var deleteMany = $('#deleteMany');
    // 批量按钮出现在 总的复选框被选中
    if (status) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
    // 让子复选框的状态跟随总复选框的状态
    $('#tbody').find('input').prop('checked', status);
})
// 子复选框状态（事件委托）
$('#tbody').on('change', 'input', function () {
    // 思路是 判读总的子复选框的个数是否等于被选中复选框的个数
    var All = $('#tbody').find('input').length;
    var part = $('#tbody').find('input:checked').length;
    // var part = $('#tbody').find('input').filter(':checked').length;
    if (All == part) {
        $('#selectAll').prop('checked', true);
    } else {
        $('#selectAll').prop('checked', false);
    };
    // 当小的复选框的个数大于1个时候 要显示批量删除按钮
    if (part > 0) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
})
// 实现批量删除操作
$('#deleteMany').on('click', function () {
    // 要获取到复选框id值 将id值存放在一个数组中
    var newArr = [];
    // 获取复选框
    var part = $('#tbody').find('input').filter(':checked');
    // 对复选框进行遍历 让每个复选框拥有自己的id值
    part.each(function (index, element) {
        // 括号里 一个值 是获取元素值 两个值 是设置元素的值
        newArr.push($(element).attr('data-id'));
    });
    console.log(newArr);
    if (confirm('您确定真的要删除吗？')) {
        // 发送请求
        $.ajax({
            type: 'delete',
            url: '/users/' + newArr.join('-'),
            success: function (res) {
                location.reload();
            }
        })
    }
})