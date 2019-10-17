// 展示分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        var html = template('categoryTpl', {
            data: res
        });
        $('#tbody').html(html);
    }
})
//添加分类
$('#addCategory').on('submit', function () {
    // 接收用户输入的内容
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function (res) {
            location.reload();
        }
    })
    // 阻止表单默认提交行为
    return false;
})
// 编辑按钮 点击事件 事件委托
$('#tbody').on('click', '.edit', function () {
    // 获取id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (res) {
            //    拼接模板
            var html = template('modfiyTpl', res);
            $('#modfiyBox').html(html);

        }
    })
});
// 表单修改操作 事件委托
$('#modfiyBox').on('submit', '#modfiyCategory', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload();
        }
    });
    // 阻止表单默认提交行为
    return false;
});
// 删除按钮操作
$('#tbody').on('click', '.delete', function () {
    // 获取id
    if (confirm('您真的想要删除吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload();
            }
        })
    }

})