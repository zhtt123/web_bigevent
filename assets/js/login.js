$(function() {
    $('#link_reg').on('click', function() {
        $('.loginBox').hide().siblings('.regBox').show()
    })
    $('#link_login').on('click', function() {
        $('.regBox').hide().siblings('.loginBox').show()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
            ],
            repwd: function(value) {
                var pwd = $('.regBox [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }
        })
        // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            // 1. 阻止默认的提交行为
            e.preventDefault()
                // 2. 发起Ajax的POST请求
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                    // 模拟人的点击行为
                $('#link_login').click()
            })
        })
        // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})