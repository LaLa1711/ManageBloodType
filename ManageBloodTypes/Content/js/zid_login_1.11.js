var errMsg = {
    require_err: 'Bạn cần nhập thông tin này',
    Account_empty: 'Bạn cần nhập thông tin này',
    Account_invalid: 'Tên tài khoản từ 6-24 ký tự',
    Account_existed: 'Tài khoản đã tồn tại',
    Account_format: 'Tài khoản cần bao gồm chữ, số. Không có khoảng trắng và kí tự đặc biêt.',
    Fullname_empty: 'Họ tên từ 2-100 kí tự',
    Fullname_same: 'Vui lòng nhập giá trị mới',
    Gender_invalid: 'Bạn cần nhập thông tin này',
    Date_invalid: 'Ngày tháng không hợp lệ.',
    Email_empty: 'Bạn cần nhập thông tin này',
    Email_zing: 'Hệ thống không hỗ trợ email Zing',
    ReEmail_empty: 'Bạn cần nhập thông tin này',
    ReEmail_notmatch: 'Xác nhận email không đúng',
    Email_invalid: 'Địa chỉ email không hợp lệ',
    Pwd_empty: 'Bạn cần nhập thông tin này',
    Pwd_invalid: 'Vui lòng nhập mật khẩu dài 6-32 ký tự, có ký tự chữ số, chữ hoa và chữ thường',
    Pwd_notsafe: 'Vui lòng nhập mật khẩu dài 6-32 ký tự, có ký tự chữ số, chữ hoa và chữ thường',
    RePwd_notmatch: 'Xác nhận mật khẩu không đúng',
    Captcha_invalid: 'Mã xác nhận không đúng',
    Email_mapped: 'Email đã được đăng ký',
    isValidRegAcc: 'false'
}

// LOGIN
zmXCall.register('loginRedirect', loginRedirect);
var loginError = function(data) {
    zm("#lblError").html("Tài khoản hoặc mật khẩu không đúng.").show();
}
zmXCall.register('loginError', loginError);


// EMAIL
var verifyEmail = {
    idxUrl: 'http://idx.me.zing.vn',
    baseUrl: zid.baseUrl + '/emailactive',
    provider: null,
    init: function() {
        zm('#oauth-verify').click(function(e) {
            var email = zm('#email').html();
            var index = email.indexOf("@yahoo");
            if (index > 0) {
                verifyEmail.provider = "yahoo";
            } else {
                index = email.indexOf("@gmail");
                if (index > 0) {
                    verifyEmail.provider = "google";
                }
            }
            if (verifyEmail.provider != null) {
                verifyEmail.openPopup(verifyEmail.provider);
            } else {
                zm.Boxy.alert("<div style=\"padding:20px 30px;\">Email không phải là Yahoo Mail hay Google Mail.</div>", "Error", 3000, {
                    okButton: 'Ok'
                });
            }
        });
    },
    openPopup: function(provider) {
        if (provider == "yahoo") {
            verifyEmail.openPopupForYahoo();
            return;
        }
        setTimeout(function() {
            var zmxcid = zmXCall.getXCallID();
            var callback = verifyEmail.baseUrl + "/oauthcb?apikey=" + zid.apikey + "&zmxcid=" + zmxcid;
            var url = verifyEmail.idxUrl + "/oauth/dialog?provider=" + provider + "&callback=" + encodeURIComponent(callback) + "&t=" + Math.floor(Math.random() * 10000);
            var newWindow = window.open(url, '_blank', 'height=500,width=500,left=400, top=180 ', 'resizable=yes', 'scrollbars=no', 'toolbar=no', 'status=no');
            return newWindow;
        }, 500);
    },
    doVerifyEmail: function(new_email, request_id) {
        window.location = zid.baseUrl + "/emailactive/chooseemail?apikey=" + zid.apikey + "&email=" + new_email + "&reqid=" + request_id;
    },
    resend: function(email) {
        zm.getJSON(zid.baseUrl + "/emailactive/resend?apikey=" + zid.apikey, function(data) {
            zm(".txt_editemail").html("Đã gửi lại link kích hoạt");
            //            alert(data.msg);
        });

    }
};

zmXCall.register('doVerifyEmail', function(obj) {
    verifyEmail.doVerifyEmail(obj.new_email, obj.request_id);
});
zmXCall.register('redirectSuccess', function(obj) {
    window.location = zid.baseUrl + "/emailactive/oauthsuccess?apikey=" + zid.apikey + "&email=" + obj.new_email;
});
zmXCall.register('oauthFillpwd', function(obj) {
    window.location = zid.baseUrl + "/register/fillpwd?apikey=" + zid.apikey;
});



//REGISTER 
var register = {
    idxUrl: 'http://idx.me.zing.vn',
    baseUrl: zid.baseUrl + '/register',
    provider: null,
    data: "",
    callback: "",
    openIdUrl: 'https://id.zing.vn/openid',
    openPopupForYahoo: function(cb) {
        setTimeout(function() {
            var zmxcid = zmXCall.getXCallID();
            //var url = register.openIdUrl + "&t=" + Math.floor(Math.random()*10000);
            var url = zmMapping.openIdUrl + "?callback=openidRegisterCallback&t=" + Math.floor(Math.random() * 10000);
            var newWindow = window.open(url, '_blank', 'height=500,width=500,left=400, top=180', 'resizable=yes', 'scrollbars=no', 'toolbar=no', 'status=no');
            return newWindow;
        }, 500);
    },
    openPopup: function(provider, cb) {
        if (provider == "yahoo") {
            register.openPopupForYahoo(cb);
            return;
        }
        setTimeout(function() {
            var zmxcid = zmXCall.getXCallID();
            var callback = register.baseUrl + "/oauthcb?apikey=" + zid.apikey + "&zmxcid=" + zmxcid + "&next=" + cb;
            var params = {
                provider: provider,
                callback: encodeURIComponent(callback),
                t: Math.floor(Math.random() * 10000)
            };
            params = zm.param(params);
            var url = register.idxUrl + "/oauth/dialog?" + params;
            var newWindow = window.open(url, '_blank', 'height=500,width=500,left=400, top=180', 'resizable=yes', 'scrollbars=no', 'toolbar=no', 'status=no');
            return newWindow;
        }, 500);
    },
    doVerifyEmail: function(new_email, request_id) {
        window.location = zid.baseUrl + "/emailactive/chooseemail?apikey=" + zid.apikey + "&email=" + new_email + "&reqid=" + request_id;
    },
    doOauthReg: function() {
        if (zm("#policyAgree").attr("checked") != true) {
            zm.Boxy.alert("<div style=\"padding:20px 30px;\">Vui lòng đồng ý với <strong>Điều khoản sử dụng</strong></div>", "Thông báo", false, {
                okButton: "Đồng ý"
            });
            return false;
        }
        else {
            window.location = zid.baseUrl + "/register/oauthreg?apikey=" + zid.apikey + "&data=" + register.data + "&next=" + register.callback;
        }
    },
    doOpenidReg: function() {
        if (zm("#policyAgree").attr("checked") != true) {
            zm.Boxy.alert("<div style=\"padding:20px 30px;\">Vui lòng đồng ý với <strong>Điều khoản sử dụng</strong></div>", "Thông báo", false, {
                okButton: "Đồng ý"
            });
            return false;
        }
        else {
            window.location = zid.baseUrl + "/register/openidreg?apikey=" + zid.apikey + "&data=" + register.data + "&next=" + register.callback;
        }
    }
};
function changeEmail() {
    window.location = zid.baseUrl + "/emailactive/dochange?apikey=" + zid.apikey + "&email=" + zm("#email_change").val();
}

zmXCall.register('regRedirect', function(obj) {
    window.location = zid.baseUrl + "/emailactive?apikey=" + zid.apikey + "&email=" + data.content;
});

zmXCall.register('regError', function(obj) {
    zm("#lblError_" + data.error).html(data.content).show();
});


zmXCall.register('emailExisted', function(obj) {
    window.location = zid.baseUrl + "/login?apikey=" + zid.apikey + "&email=" + data.content;
});

zmXCall.register('oauthRegMap', function(obj) {
    //open boxy then if ok => window.location
    register.data = obj.data;
    register.callback = obj.callback;
    zmMapping.boxy.changeSettings({
        onOk: register.doOauthReg,
        title: "Thông báo",
        footer: true,
        content: obj.content
    });
    zmMapping.boxy.show();
});

zmXCall.register('oauthReg', function(obj) {
    //open boxy then if ok => window.location
    register.data = obj.data;
    register.callback = obj.callback;
    zmMapping.boxy.changeSettings({
        onOk: register.doOauthReg,
        title: "Thông báo",
        footer: true,
        cancelButton: false,
        content: obj.content
    });
    zmMapping.boxy.show();

});


function showLoading() {
    zm('.Agree').hide();
    zm('.agreepolicy').hide();
    zm("#processing").show();
}
function disableInput() {
    zm("#zaccount").attr("disabled", true);
}

function showRegAcc() {
    zm(".Notice").hide();
    zm('[rel=Notice]').hide();
    zm("#reg_by_email").hide();
    zm("#frmRegAcc").reset();
    zm("#regacc_fullname").val("");
    zm("#regacc_email").val("");
    zm("#regacc_account").val("");
    zm("#regacc_veryfied_code").val("");
    refreshRegAccCaptcha();
    zm("#reg_by_acc").show();
    zm("#tab_reg_by_acc").attr("class", "selected");
    zm("#tab_reg_by_email").attr("class", "");
    zm("#regacc_fullname").focus();
}
function showRegMail() {
    zm(".Notice").hide();
    zm('[rel=Notice]').hide();
    zm("#reg_by_acc").hide();
    zm("#frmReg").reset();
    zm("#reg_account").val("");
    zm("#reg_email").val("");
    zm("#reg_re_email").val("");
    zm("#reg_veryfied_code").val("");
    refreshRegCaptcha();
    zm("#reg_by_email").show();
    zm("#tab_reg_by_email").attr("class", "selected");
    zm("#tab_reg_by_acc").attr("class", "");
    zm("#reg_account").focus();
}

function show_account_valid() {
    zm("#reg_username").attr("class", "finput reg_username validacc");
    //    zm('#account_valid').show(); 
    zm('#account_invalid').hide();
    zm('#account_valid').show();
    zm('#check_account_valid').hide();
}
function show_account_invalid() {
    zm("#reg_username").attr("class", "finput reg_username");
    zm('#account_valid').hide();
    zm('#check_account_valid').show();


}

/**
 * Request a new captcha.
 */
var captcha2_url = "https://captcha2.zing.vn/captcha2";
function refreshRegCaptcha() {
    zm.getJSON(captcha2_url + "/gettoken?publicKey=" + zid.apikey, function(data) {
        zm("#captcha").attr("src", captcha2_url + "/getcaptcha?publicKey=" + zid.apikey + "&token=" + data.token);
        zm("#token").val(data.token);
    });
}
function refreshRegAccCaptcha() {
    zm.getJSON(captcha2_url + "/gettoken?publicKey=" + zid.apikey, function(data) {
        zm("#captchaAcc").attr("src", captcha2_url + "/getcaptcha?publicKey=" + zid.apikey + "&token=" + data.token);
        zm("#tokenCaptchaAcc").val(data.token);
    });
}

// Valid Input


function checkAccount(account) {
    if (account == "" || account == zm("#login_account").attr("placeholder")) {
        //        zm("#login_account").focus();
        zm("#login_error").hide();
        zmIdContent.showTooltipError("login_account_error", errMsg.Account_empty);
        return false;
    }
    return true;
}
function checkRegAccount(account, issubmit) {
    if (account == "" || account == zm("#regacc_account").attr("placeholder")) {
        show_account_invalid();
        zmIdContent.showTooltipError("regacc_account_error", errMsg.Account_empty);
        return false;
    }
    if (account.length < 6 || account.length > 24) {
        show_account_invalid();
        zmIdContent.showTooltipError("regacc_account_error", errMsg.Account_invalid);
        return false;
    }
    var isPass = /^[a-zA-Z0-9\._]+$/.test(account);
    if (!isPass) {
        show_account_invalid();
        zmIdContent.showTooltipError("regacc_account_error", errMsg.Account_format);
        return false;
    }
    var isNumber = /^[0-9]+$/.test(account);
    if (isNumber) {
        show_account_invalid();
        zmIdContent.showTooltipError("regacc_account_error", errMsg.Account_format);
        return false;
    }
    if (issubmit == "true") {
        checkAccountExistnSubmit();
    }
    else {
        checkAccountExist();
    }
    return true;
}
function checkAccCallback(json) {
    if (json['flag'] == 1) {
        show_account_valid();
        return true;
    }
    if (json['flag'] == 3) {
        show_account_invalid();
        zmIdContent.showTooltipError("regacc_account_error", errMsg.Account_format);
        return false;
    }
    if (json['flag'] == 5) {
        show_account_invalid();
        //        zmIdContent.showError("regacc_account_error",errMsg.Account_existed);
        zm("#reg_username").attr("class", "finput reg_username invalidacc");
        zm('#account_valid').hide();
        zm('#account_invalid').show();
        return false;
    }
    return false;
}
function checkAccnSubmit(json) {
    setTimeout(function() {
        if (json['flag'] == 1) {
            show_account_valid();
            if (errMsg.isValidRegAcc == 'true') {
                zm("#frmRegAcc").submit();
            }
            return true;
        }
        if (json['flag'] == 3) {
            zm("#regacc_loading").hide();
            show_account_invalid();
            zmIdContent.showTooltipError("regacc_account_error", errMsg.Account_format);
            return false;
        }
        if (json['flag'] == 5) {
            zm("#regacc_loading").hide();
            show_account_invalid();
            zm("#reg_username").attr("class", "finput reg_username invalidacc");
            zm('#account_valid').hide();
            zm('#account_invalid').show();
            return false;
        }
    }, 500);
    return false;
}
function checkAccountExist() {
    var account = zm("#regacc_account").val();
    var a = "https://id.zing.vn/checkaccount?ACC=" + account + "&jsonp=checkAccCallback";
    zm.getJSON(a);
    return false;
}
function checkAccountExistnSubmit() {
    var account = zm("#regacc_account").val();
    var a = "https://id.zing.vn/checkaccount?ACC=" + account + "&jsonp=checkAccnSubmit";
    zm.getJSON(a);
    return false;
}
function checkSafePassword(id, pwd) {
    // Prepare data
    var params = {
        "p": pwd
    };
    var url = "https://id.zing.vn/ajax/checkpwd";

    // Ajax call to check safe password
    zm.post(url, params, {
        dataType: "json"
    }, function(data) {
        // Unsafe password
        if (data != null && data.code != "0") {
            zmIdContent.showTooltipError(id + "_error", errMsg.Pwd_notsafe);
        }

    });
}

/**
 * Check an email is mapped or not.
 * @param {type} id
 * @param {String} email
 */
function checkMappedEmail(id, email) {
    // Prepare data
    var params = {
        "email": email
    };
    var url = "https://id.zing.vn/ajax/checkemailreg";

    // Ajax call to check mapped email
    zm.post(url, params, {
        dataType: "json"
    }, function(data) {
        // 0: you can use the email
        // 1: the email exists
        // 2: invalid email
        if (data != null && data.code == "1") {
            zmIdContent.showTooltipError(id + "_error", errMsg.Email_mapped);
        }
    });
}

function validEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return (filter.test(email));
}
function checkEmail(id, email) {
    if (email == "" || email == zm("#" + id).attr("placeholder")) {
        zmIdContent.showTooltipError(id + "_error", errMsg.Email_empty);
        return false;
    }
    if (!validEmail(email)) {
        zmIdContent.showTooltipError(id + "_error", errMsg.Email_invalid);
        return false;
    }
    var lastIndex = email.lastIndexOf("@zing.vn");
    if (lastIndex > 0) {
        zmIdContent.showTooltipError(id + "_error", errMsg.Email_zing);
        return false;
    }
    return true;
}
function checkEmailAcc(id, email) {
    if (email == "" || email == zm("#" + id).attr("placeholder")) {
        zmIdContent.showTooltipError(id + "_error", errMsg.Email_empty);
        return false;
    }
    if (!validEmail(email)) {
        zmIdContent.showTooltipError(id + "_error", errMsg.Email_invalid);
        return false;
    }
    //    var lastIndex = email.lastIndexOf("@zing.vn");
    //    if (lastIndex >0 ){
    //        zmIdContent.showTooltipError(id+"_error",errMsg.Email_zing);
    //        return false;
    //    }
    return true;
}
function checkReEmail(email, re_email) {
    if (re_email == "" || re_email == zm("#reg_re_email").attr("placeholder")) {
        zmIdContent.showTooltipError("reg_re_email_error", errMsg.ReEmail_empty);
        return false;
    } else if (!validEmail(re_email)) {
        zmIdContent.showTooltipError("reg_re_email_error", errMsg.Email_invalid);
        return false;
    } else if (re_email != email) {
        zmIdContent.showTooltipError("reg_re_email_error", errMsg.ReEmail_notmatch);
        return false;
    }

    return true;
}
function checkPwd(id, pwd) {
    if (pwd == "") {
        zm("#fake_" + id).hide();
        zm("#" + id).show();
        zmIdContent.showTooltipError(id + "_error", errMsg.Pwd_empty);
        return false;
    }
    if (pwd.length > 32 || pwd.length < 6) {
        zm("#fake_" + id).hide();
        zm("#" + id).show();
        zmIdContent.showTooltipError(id + "_error", errMsg.Pwd_invalid);
        return false;
    }
    return true;
}
function checkRePwd(id, pwd, repwd) {
    if (pwd == "") {
        zm("#fake_" + id).hide();
        zm("#" + id).show();
        zmIdContent.showTooltipError(id + "_error", errMsg.Pwd_empty);
        return false;
    } else if (pwd != repwd) {
        zmIdContent.showTooltipError(id + "_error", errMsg.RePwd_notmatch);
        return false;
    }
    return true;
}
function checkGender(gender) {
    if (gender != 1 && gender != 0) {
        zmIdContent.showTooltipError("regacc_gender_error", errMsg.Gender_invalid);
        return false;
    }
    return true;
}
function checkFullName(fullname) {
    if (fullname == "" || fullname == zm("#reg_account").attr("placeholder")) {
        zmIdContent.showTooltipError("reg_account_error", errMsg.require_err);
        return false;
    }
    return true;
}



function checkLoginInput() {
    zm(".Notice").hide();
    zm('[rel=Notice]').hide();
    var account = zm("#login_account").val();
    var pwd = zm("#login_pwd").val();

    var chkAcc = checkAccount(account);
    var chkPwd = checkPwd("login_pwd", pwd);

    if (!chkAcc || !chkPwd)
    {
        return false;
    }
    else {
        return true;
    }
}
function checkRegInput() {
    if ((zm("#reg_pwd_error")).css("display") != "none") {
        return false;
    }
    zm(".Notice").hide();
    zm('[rel=Notice]').hide();
    var fullname = zm("#reg_account").val();
    var email = zm("#reg_email").val();
    var re_email = zm("#reg_re_email").val();
    var pwd = zm("#reg_pwd").val();
    var captcha = zm("#reg_veryfied_code").val();

    var chkFullName = checkFullName(fullname);
    var chkEmail = checkEmail("reg_email", email);
    var chkReEmail = checkReEmail(email, re_email);
    var chkPwd = checkPwd("reg_pwd", pwd);


    var chkCaptcha = true;
    if (captcha == "") {
        if (captcha.length < 6) {
            zmIdContent.showTooltipError("veryfied_code_error", errMsg.Captcha_invalid);
            chkCaptcha = false;
        }
    }

    if (!chkFullName || !chkEmail || !chkReEmail || !chkPwd || !chkCaptcha)
    {
        return false;
    }
    else {
        return true;
    }
}
function checkRegAccInput() {
    errMsg.isValidRegAcc = 'false';
    if ((zm("#regacc_pwd_error")).css("display") != "none") {
        return false;
    }
    zm(".Notice").hide();
    zm('[rel=Notice]').hide();
    //  Fullname   
    var fullname = zm("#regacc_fullname").val();
    if (fullname == zm("#regacc_fullname").attr("placeholder"))
        fullname = "";

    //Account 
    var account = zm("#regacc_account").val();
    var chkAccount = checkRegAccount(account, "true");


    // Pwd
    var pwd = zm("#regacc_pwd").val();
    var chkPwd = checkPwd("regacc_pwd", pwd);
    // Re Pwd
    var repwd = zm("#regacc_re_pwd").val();
    var chkRePwd = checkRePwd("regacc_re_pwd", pwd, repwd);

    // Dob
    var chkDob = true;
    var dob = zm('[name=dob]').val();
    var mob = zm('[name=mob]').val();
    var yob = zm('[name=yob]').val();
    var currentTime = new Date();
    var currentYear = currentTime.getFullYear();
    if (dob > 0 || mob > 0 || yob > 0) {
        if (dob < 1 || dob > 31 || mob < 1 || mob > 12 || yob < 1900 || yob > currentYear) {
            zmIdContent.showTooltipError("regacc_dob_error", errMsg.Date_invalid);
            chkDob = false;
        }
    }
    //Captcha
    var captcha = zm("#regacc_veryfied_code").val();
    var chkCaptcha = true;
    if (captcha != undefined) {
        if (captcha.length < 6) {
            zmIdContent.showTooltipError("veryfied_code_error", errMsg.Captcha_invalid);
            chkCaptcha = false;
        }
    }
    if (!chkAccount || !chkPwd || !chkRePwd || !chkDob || !chkCaptcha)
    {
        return false;
    }
    else {
        errMsg.isValidRegAcc = 'true';
        return true;
    }
}
function checkOauthRegInput() {
    var pwd = zm("#oauth_reg_pwd").val();
    return (checkPwd("oauth_reg_pwd", pwd));

}

function submitRegister() {
    zm("#reg_loading").show();
    if (checkRegInput()) {

        // Prepare data
        var email = zm("#reg_email").val();
        var params = {
            "email": email
        };
        var url = "https://id.zing.vn/ajax/checkemailreg";

        // Ajax call to check mapped email
        zm.post(url, params, {
            dataType: "json"
        }, function(data) {
            // 0: you can use the email
            // 1: the email exists
            // 2: invalid email
            if (data != null && data.code == "1") {
                zmIdContent.showTooltipError("reg_email_error", errMsg.Email_mapped);
                zm("#reg_loading").hide();
            } else {
                setTimeout(function() {
                    zm("#frmReg").submit();
                }, 500);
            }
        });
    } else {
        zm("#reg_loading").hide();
    }
}

function submitRegisterAcc() {
    zm("#regacc_loading").show();
    if (checkRegAccInput()) {

    }
    else {
        zm("#regacc_loading").hide();
    }
    return false;
}
function submitLogin() {
    zm("#login-loading").show();
    if (checkLoginInput()) {
        setTimeout(function() {
            zm("#frmLogin").submit();
        }, 500);
    }
    else {
        zm("#login-loading").hide();
    }
    return false;
}

zm.ready(function() {
    verifyEmail.init();
//    refreshRegCaptcha();
    if (zm("#captchaAcc").size() > 0) {
        refreshRegAccCaptcha();
    }
    if (zm("#captcha").size() > 0) {
        refreshRegCaptcha();
    }
});

var isEnter = false;

setTimeout(function() {

    // Tooltip
    zm("#quesmark_reg_fullname").hover(function() {
        zm("#reg_fullname_tooltip").show();
    });
    zm("#quesmark_reg_fullname").mouseleave(function() {
        zm("#reg_fullname_tooltip").hide();
    });
    zm("#quesmark_regacc_fullname").hover(function() {
        zm("#regacc_fullname_tooltip").show();
    });
    zm("#quesmark_regacc_fullname").mouseleave(function() {
        zm("#regacc_fullname_tooltip").hide();
    });



    var ua = navigator.userAgent.toLowerCase(),
            m = ua.match(/(^|\s)(firefox|safari|opera|msie|chrome)[\/:\s]([\d\.]+)/) || ['', '', '0.0'];
    //IE browser
    if (m[2] == 'msie') {

        //  LOGIN PASSWORD

        zm('#fake_login_pwd').focus(function() {
            zm(this).hide(); //  hide the fake password input text
            zm('#login_pwd').show().focus(); // and show the real password input password
            zm('#login_pwd').blur(function() {
                if (zm(this).val() == "") { // if the value is empty, 
                    zm(this).hide(); // hide the real password field
                    zm('#fake_login_pwd').show(); // show the fake password
                }
            });
        });
        zm('#fake_login_pwd').keypress(function() {
            zm(this).hide(); //  hide the fake password input text
            zm('#login_pwd').show().focus(); // and show the real password input password
            zm('#login_pwd').blur(function() {
                if (zm(this).val() == "") { // if the value is empty, 
                    zm(this).hide(); // hide the real password field
                    zm('#fake_login_pwd').show(); // show the fake password
                }
            });
        });
        zm('#login_pwd').blur(function() {
            if (zm(this).val() == "") { // if the value is empty, 
                zm(this).hide(); // hide the real password field
                zm('#fake_login_pwd').show(); // show the fake password
            }
        });
        zm('#login_pwd').hide();
        zm('#fake_login_pwd').show();

        //  LOGIN ACCOUNT
        zm("#login_account").focus(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm("#login_account").keypress(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm("#login_account").blur(function() {
            var input = zm(this);
            if (input.val() == "" || input.val() == input.attr("placeholder"))
                input.val(input.attr("placeholder"));

        });


        //  REG PASSWORD
        zm('#reg_pwd').hide();
        zm('#fake_reg_pwd').show();
        zm('#fake_reg_pwd').keypress(function() {
            zm(this).hide(); //  hide the fake password input text
            zm('#reg_pwd').show().focus(); // and show the real password input password
        });
        zm('#reg_pwd').blur(function() {
            if (zm(this).val() == "") { // if the value is empty, 
                zm(this).hide(); // hide the real password field
                zm('#fake_reg_pwd').show(); // show the fake password
            }
        });


        //  REG INPUT
        zm("#reg_account").keypress(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm("#reg_account").blur(function() {
            var input = zm(this);
            if (input.val() == "" || input.val() == input.attr("placeholder"))
                input.val(input.attr("placeholder"));

        });
        zm("#reg_email").keypress(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm("#reg_email").blur(function() {
            var input = zm(this);
            if (input.val() == "" || input.val() == input.attr("placeholder"))
                input.val(input.attr("placeholder"));

        });
        zm("#reg_re_email").keypress(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm("#reg_re_email").blur(function() {
            var input = zm(this);
            if (input.val() == "" || input.val() == input.attr("placeholder"))
                input.val(input.attr("placeholder"));

        });
        zm("#reg_account").focus();
        zm("#reg_account").blur();
        zm("#reg_email").focus();
        zm("#reg_email").blur();
        zm("#reg_re_email").focus();
        zm("#reg_re_email").blur();

        //  REG ACC PASSWORD

        zm('#fake_regacc_pwd').focus(function() {
            zm(this).hide(); //  hide the fake password input text
            zm('#regacc_pwd').show().focus(); // and show the real password input password
            zm('#regacc_pwd').blur(function() {
                if (zm(this).val() == "") { // if the value is empty, 
                    zm(this).hide(); // hide the real password field
                    zm('#fake_regacc_pwd').show(); // show the fake password
                }
            });
        });
        zm('#fake_regacc_pwd').keypress(function() {
            zm(this).hide(); //  hide the fake password input text
            zm('#regacc_pwd').show().focus(); // and show the real password input password
            zm('#regacc_pwd').blur(function() {
                if (zm(this).val() == "") { // if the value is empty, 
                    zm(this).hide(); // hide the real password field
                    zm('#fake_regacc_pwd').show(); // show the fake password
                }
            });
        });
        zm('#regacc_pwd').blur(function() {
            if (zm(this).val() == "") { // if the value is empty, 
                zm(this).hide(); // hide the real password field
                zm('#fake_regacc_pwd').show(); // show the fake password
            }
        });
        zm('#regacc_pwd').hide();
        zm('#fake_regacc_pwd').show();

        zm('#fake_regacc_re_pwd').focus(function() {
            zm(this).hide(); //  hide the fake password input text
            zm('#regacc_re_pwd').show().focus(); // and show the real password input password
            zm('#regacc_re_pwd').blur(function() {
                if (zm(this).val() == "") { // if the value is empty, 
                    zm(this).hide(); // hide the real password field
                    zm('#fake_regacc_re_pwd').show(); // show the fake password
                }
            });
        });
        zm('#fake_regacc_re_pwd').keypress(function() {
            zm(this).hide(); //  hide the fake password input text
            zm('#regacc_re_pwd').show().focus(); // and show the real password input password
            zm('#regacc_re_pwd').blur(function() {
                if (zm(this).val() == "") { // if the value is empty, 
                    zm(this).hide(); // hide the real password field
                    zm('#fake_regacc_re_pwd').show(); // show the fake password
                }
            });
        });
        zm('#regacc_re_pwd').blur(function() {
            if (zm(this).val() == "") { // if the value is empty, 
                zm(this).hide(); // hide the real password field
                zm('#fake_regacc_re_pwd').show(); // show the fake password
            }
        });
        zm('#regacc_re_pwd').hide();
        zm('#fake_regacc_re_pwd').show();
        //  REG ACC INPUT

        zm("#regacc_fullname").focus(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm("#regacc_fullname").keypress(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm("#regacc_fullname").blur(function() {
            var input = zm(this);
            if (input.val() == "" || input.val() == input.attr("placeholder"))
                input.val(input.attr("placeholder"));

        });
        zm("#regacc_account").focus(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm("#regacc_account").keypress(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm("#regacc_account").blur(function() {
            var input = zm(this);
            if (input.val() == "" || input.val() == input.attr("placeholder"))
                input.val(input.attr("placeholder"));

        });
        zm("#regacc_veryfied_code").focus(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm("#regacc_veryfied_code").keypress(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm("#regacc_veryfied_code").blur(function() {
            var input = zm(this);
            if (input.val() == "" || input.val() == input.attr("placeholder"))
                input.val(input.attr("placeholder"));

        });

        zm("#regacc_fullname").val(zm("#regacc_fullname").attr("placeholder"));
        zm("#regacc_account").val(zm("#regacc_account").attr("placeholder"));
        zm("#regacc_veryfied_code").val(zm("#regacc_veryfied_code").attr("placeholder"));
        setTimeout(function() {
            zm("#regacc_fullname").focus();
            zm("#login_account").focus();
        }, 500)
    } else {
        try {
            zm("#login_account").focus();
            zm("#reg_account").focus();
        }
        catch (err) {
        }
    }
    //End IE browser

    // TRIGGER LOGIN FORM
    //    zm("#login_account").blur(function(){
    //        var account = zm("#login_account").val();
    //        checkAccount(account);
    //    })

    zm("#login_account").click(function() {
        zm("#login_account_error").hide();
        zm("#login_error").hide();
    })
    zm("#login_account").keypress(function() {
        if (!isEnter) {
            zm("#login_account_error").hide();
            zm("#login_error").hide();
        }
        isEnter = false;
    })

    //    zm("#login_pwd").blur(function(){
    //        var pwd = zm("#login_pwd").val();
    //        checkPwd("login_pwd",pwd);
    //    })
    zm("#login_pwd").click(function() {
        zm("#login_pwd_error").hide();
        zm("#login_error").hide();
    })
    zm("#login_pwd").keypress(function(event) {
        if (event.keyCode == 13) {// Enter
            event.preventDefault();
            submitLogin();
        } else {
            zm("#login_pwd_error").hide();
            zm("#login_error").hide();
        }
    })

    // TRIGGER  REGISTER FORM
    zm("#reg_account").blur(function() {
        zm("#reg_fullname_tooltip").hide();
        //var fullname = zm("#reg_account").val();
        //checkFullName(fullname);
    })
    zm("#reg_account").focus(function() {
        zm("#reg_fullname_tooltip").show();
    })
    zm("#reg_account").keypress(function() {
        if (!isEnter) {
            zm("#reg_account_error").hide();
        }

        isEnter = false;
    })
    zm("#reg_email").blur(function() {
        var email = zm("#reg_email").val();
        var isValidEmail = checkEmail("reg_email", email);
        if (isValidEmail) {
            checkMappedEmail("reg_email", email);
        }
    })
    zm("#reg_email").keypress(function() {
        if (!isEnter) {
            zm("#reg_email_error").hide();
        }
        isEnter = false;
    })
    zm("#reg_re_email").blur(function() {
        var email = zm("#reg_email").val();
        var re_email = zm("#reg_re_email").val();
        checkReEmail(email, re_email);
    })
    zm("#reg_re_email").keypress(function() {
        if (!isEnter) {
            zm("#reg_re_email_error").hide();
        }
        isEnter = false;
    })
    zm("#reg_pwd").blur(function() {
        var pwd = zm("#reg_pwd").val();
        zm("#reg_pwd_tooltip").hide();
        if (checkPwd("reg_pwd", pwd)) {
            checkSafePassword("reg_pwd", pwd);
        }
    })
    zm("#reg_pwd").focus(function() {
        zm("#reg_pwd_tooltip").show();
    })
    zm("#reg_pwd").keypress(function() {
        if (!isEnter) {
            zm("#reg_pwd_error").hide();
        }
        isEnter = false;
    })

    zm("#reg_veryfied_code").keypress(function() {
        if (!isEnter) {
            zm("#veryfied_code_error").hide();
        }
        isEnter = false;
    })

    // TRIGGER  REGISTER ACC FORM  
    zm("#regacc_fullname").blur(function() {
        zm("#regacc_fullname_tooltip").hide();
    })
    zm("#regacc_fullname").focus(function() {
        zm("#regacc_fullname_tooltip").show();
    })
    zm("#regacc_fullname").keypress(function() {
        if (!isEnter) {
            zm("#regacc_fullname_error").hide();
        }
        isEnter = false;
    })

    zm("#regacc_account").blur(function() {
        var account = zm("#regacc_account").val();
        zm("#regacc_account_tooltip").hide();
        checkRegAccount(account, "");
    })
    zm("#regacc_account").focus(function() {
        zm("#regacc_account_tooltip").show();
    })
    zm("#regacc_account").keypress(function() {
        if (!isEnter) {
            zm("#regacc_account_tooltip").show();
            zm("#regacc_account_error").hide();
            zm('#account_invalid').hide();
        }
        isEnter = false;
    })
    zm("#regacc_email").keypress(function() {
        if (!isEnter) {
            zm("#regacc_email_error").hide();
        }
        isEnter = false;
    })
    zm("#regacc_pwd").blur(function() {
        var pwd = zm("#regacc_pwd").val();
        zm("#regacc_pwd_tooltip").hide();
        if (checkPwd("regacc_pwd", pwd)) {
            checkSafePassword("regacc_pwd", pwd);
        }
    })
    zm("#regacc_pwd").focus(function() {
        zm("#regacc_pwd_tooltip").show();
    })
    zm("#regacc_pwd").keypress(function() {
        if (!isEnter) {
            zm("#regacc_pwd_error").hide();
        }
        isEnter = false;
    })

    zm("#regacc_re_pwd").blur(function() {
        var pwd = zm("#regacc_re_pwd").val();
        checkPwd("regacc_re_pwd", pwd);
    })
    zm("#regacc_re_pwd").keypress(function() {
        if (!isEnter) {
            zm("#regacc_re_pwd_error").hide();
        }
        isEnter = false;
    })

    zm("#regacc_veryfied_code").keypress(function() {
        if (!isEnter) {
            zm("#veryfied_code_error").hide();
        }
        isEnter = false;
    })

    // SUBMIT FORM BY ENTER

    // Register by Email
    zm("#reg_pwd").keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            submitRegister();
            isEnter = true;
        }
    });
    zm("#reg_veryfied_code").keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            submitRegister();
            isEnter = true;
        }
    });
    // Register by Acc
    zm("#regacc_re_pwd").keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            submitRegisterAcc();
            isEnter = true;
        }
    });
    zm("#regacc_veryfied_code").keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            submitRegisterAcc();
            isEnter = true;
        }
    });
    //HIDE  ERROR MESSAGE
    zm("#frmLogin input").keypress(function() {
        if (!isEnter) {
            zm("#lblError").hide();
        }
        isEnter = false;
    });
}, 500)
