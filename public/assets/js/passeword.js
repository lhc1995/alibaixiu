$('#modifyForm').on('submit', function () {
    // 接收修改页面表单中的值
    var formData = $(this).serialize();
    // 向服务器端发送请求
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function () {
            // 修改信息成功 跳转至登录页面
            location.href = '/admin/login.html';
        }
    })
    // 阻止表单默认提交行为
    return false;
})