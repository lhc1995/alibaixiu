$('#logout').on('click', function() {
    // 确认用户是否要删除
    var isConfirm = confirm('您真的想要退出吗？');
    if (isConfirm) {
        //   发送ajax
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(res) {
                location.href = 'login.html'
            },
            error: function() {
                alert('退出失败');
            }

        })
    }
})