// 查询数据 
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (res) {
        var html = template('postsTpl', res)
        $('#tbody').html(html);
    }
})
// 时间格式化
function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}
