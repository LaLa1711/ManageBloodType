var errMsg = {
    require_err: 'Bạn cần nhập thông tin này',
    select_err: 'Bạn cần chọn thông tin này',
    Account_invalid: 'Email tài khoản từ 16-100 ký tự',
    Account_existed: 'Tài khoản đã tồn tại',
    Account_format: 'Vui lòng nhập đúng định dạng',  //thông báo email
    Fullname_same: 'Vui lòng nhập giá trị mới',
    Fullname_invalid: 'Họ tên từ 2-40 ký tự',
    Gender_invalid: 'Bạn cần nhập thông tin này',
    Phone_invalid: 'Số điện thoại không hợp lệ.',
    Date_invalid: 'Ngày tháng không hợp lệ.',
    Email_zing: 'Hệ thống không hỗ trợ email Zing',
    ReEmail_notmatch: 'Xác nhận email không đúng',
    Email_invalid: 'Địa chỉ email không hợp lệ',
    Pwd_invalid: 'Vui lòng nhập mật khẩu dài 6-32 ký tự, có ký tự chữ số, chữ hoa và chữ thường',
    Pwd_notsafe: 'Vui lòng nhập mật khẩu dài 6-32 ký tự, có ký tự chữ số, chữ hoa và chữ thường',
    RePwd_notmatch: 'Xác nhận mật khẩu không đúng',
    Captcha_invalid: 'Mã xác nhận không đúng',
    Email_mapped: 'Email đã được đăng ký',
    Cmnd_Error: 'Bạn cần nhập số CMND từ 8-15 ký tự.',
    Cmnd_Invalid: 'Số CMND không không hợp lệ.',
    Cmnd_LessThanDob: 'Năm cấp CMND (hộ chiếu) phải lớn hơn năm sinh.',
    Dob_guardian_invalid: 'Người giám hộ phải lớn hơn 18 tuổi.',
    isValidRegAcc: 'false',
    Address_invalid: 'Địa chỉ từ 2-100 ký tự'
};

var isEnter = false;
var age = 15;
var captcha2_url = "https://captcha2.zing.vn/captcha2";

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
//Request a new captcha.
function refreshRegAccCaptcha() {
    //zm("#captchaAcc").attr("src", zm("#captchaAcc").attr("src"));
    zm.getJSON(captcha2_url + "/gettoken?publicKey=" + zid.apikey, function(data) {
        zm("#captchaAcc").attr("src", captcha2_url + "/getcaptcha?publicKey=" + zid.apikey + "&token=" + data.token);
        zm("#token").val(data.token);
    });
}
function changeCaptcha() {
    zm.getJSON(captchat2_url + "/gettoken?publicKey=" + zid.apikey, function(data) {
        zm("#captchaAcc").attr("src", captchat2_url + "/getcaptcha?publicKey=" + zid.apikey + "&token=" + data.token);
        zm("#tokenCaptchaAcc").value = data.token;
    });
}
// Valid Input
function checkAccount(account) {
    if (account == "" || account == zm("#login_account").attr("placeholder")) {
        //        zm("#login_account").focus();
        zm("#login_error").hide();
        zmIdContent.showTooltipError("login_account_error", errMsg.require_err);
        return false;
    }
    return true;
}
function checkRegAccount(account, gotostep2) {
    if (account == "" || account == zm("#regacc_account").attr("placeholder")) {
        show_account_invalid();
        zmIdContent.showTooltipError("regacc_account_error", errMsg.require_err);  // email
        return false;
    }
    if (account.length < 16 || account.length > 100) {
        show_account_invalid();
        zmIdContent.showTooltipError("regacc_account_error", errMsg.Account_invalid);
        return false;
    }
    //var isPass = /^[a-zA-Z0-9\._]+$/.test(account);
    //if (!isPass) {
    //    show_account_invalid();
    //    zmIdContent.showTooltipError("regacc_account_error", errMsg.Account_format);
    //    return false;
    //}

    var isPass = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/.test(account);

    if (!isPass) {
        show_account_invalid();
        zmIdContent.showTooltipError("regacc_account_error", errMsg.Account_format);
        return false;
    }

    //var isNumber = /^[0-9]+$/.test(account);
    //if (isNumber) {
    //    show_account_invalid();
    //    zmIdContent.showTooltipError("regacc_account_error", errMsg.Account_format);
    //    return false;
    //}
    if (gotostep2 == "true") {
        checkAccountExistnStep2();
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
        zmIdContent.showTooltipError("regacc_account_error1", errMsg.Account_format);
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
function checkAccnGotoStep2(json) {
    setTimeout(function() {
        if (json['flag'] == 1) {
            show_account_valid();
            if (isAccountValid == 'true') {
//                zm("#frmRegAcc").submit();
                goToStep2();
            }
            return true;
        }
        if (json['flag'] == 3) {
            zm("#regacc_loading").hide();
            show_account_invalid();
            zmIdContent.showTooltipError("regacc_account_error1", errMsg.Account_format);
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
function checkAccountExistnStep2() {
    var account = zm("#regacc_account").val();
    var a = "https://id.zing.vn/checkaccount?ACC=" + account + "&jsonp=checkAccnGotoStep2";
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
function checkRegFullname(id) {
    var fullname = zm("#" + id).val();

    if (fullname == "" || fullname == zm("#" + id).attr("placeholder")) {
        zmIdContent.showTooltipError(id + "_error", errMsg.require_err);
        return false;
    }
    if (fullname.length < 2 || fullname.length > 40) {
        zmIdContent.showTooltipError(id + "_error", errMsg.Fullname_invalid);
        return false;
    }
    return true;
}
function checkRegAddress(id) {
    var address = zm("#" + id).val();

    if (address == "" || address == zm("#" + id).attr("placeholder")) {
        zmIdContent.showTooltipError(id + "_error", errMsg.require_err);
        return false;
    }
    if (address.length < 2 || address.length > 100) {
        zmIdContent.showTooltipError(id + "_error", errMsg.Address_invalid);
        return false;
    }
    return true;
}
//Check an email is mapped or not.
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
function checkEmail(id) {
    if (!isInputNotBlank(id)) {
        return false;
    }
    var element = zm("#" + id);
    var email = element.val();

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
        zmIdContent.showTooltipError(id + "_error", errMsg.require_err);
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
        zmIdContent.showTooltipError("reg_re_email_error", errMsg.require_err);
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
        zmIdContent.showTooltipError(id + "_error", errMsg.require_err);
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
        zmIdContent.showTooltipError(id + "_error", errMsg.require_err);
        return false;
    } else if (pwd != repwd) {
        zmIdContent.showTooltipError(id + "_error", errMsg.RePwd_notmatch);
        return false;
    }
    return true;
}
function checkGender(gender) {
    if (gender != 1 && gender != 0) {
        zmIdContent.showTooltipError("regacc_gender_error", errMsg.require_err);
        return false;
    }
    return true;
}
function checkFullName(id) {
    var fullname = zm("#" + id).val();
    if (fullname.length < 2 || fullname.length > 40) {
        zmIdContent.showTooltipError(id + "_error", errMsg.Fullname_invalid);
        return false;
    }
    if (fullname == "" || fullname == zm("#" + id).attr("placeholder")) {
        zmIdContent.showTooltipError(id + "_error", errMsg.require_err);
        return false;
    }
    return true;
}
function isValidDate(year, month, day) {
    var d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return d.getFullYear() === parseInt(year) && (d.getMonth() + 1) === parseInt(month) && d.getDate() === parseInt(day);
}
function checkDate(dob, mob, yob, idShowError) {


    var currentTime = new Date();
    var currentYear = currentTime.getFullYear();
    if (dob < 1 || dob > 31 || mob < 1 || mob > 12 || yob < 1900 || yob > currentYear || !isValidDate(yob, mob, dob)) {
        zmIdContent.showTooltipError(idShowError, errMsg.Date_invalid);
        return false;
    }
    zm("#" + idShowError).hide();
    return true;


}
function isInputNotBlank(id) {
    var element = zm("#" + id);
    var value = element.val();
    if (value == "" || value == element.attr("placeholder")) {
        zmIdContent.showTooltipError(id + "_error", errMsg.require_err);
        return false;
    }
    return true;
}
function isInputNotSelect(id) {
    var element = zm("#" + id);
    var value = element.val();
    if (value == "" || value == element.attr("placeholder")) {
        zmIdContent.showTooltipError(id + "_error", errMsg.select_err);
        return false;
    }
    return true;
}
var isAccountValid;
function checkRegAccInput() {
    isAccountValid = 'false';
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
    var dob = zm('[name=dob]').val();
    var mob = zm('[name=mob]').val();
    var yob = zm('[name=yob]').val();
    var chkDob = checkDate(dob, mob, yob, "regacc_dob_error");

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
        isAccountValid = 'true';
        return true;
    }
}
function checkRegInputStep1() {
    isAccountValid = 'false';
    if ((zm("#regacc_pwd_error")).css("display") != "none") {
        return false;
    }
    zm(".Notice").hide();
    zm('[rel=Notice]').hide();

    //  Fullname   
    var checkfullname = checkRegFullname("regacc_fullname");


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
    var dob = zm('[name=dob]').val();
    var mob = zm('[name=mob]').val();
    var yob = zm('[name=yob]').val();
    var chkDob = checkDate(dob, mob, yob, "regacc_dob_error");


    if (!chkAccount || !chkPwd || !chkRePwd || !chkDob || !checkfullname)
    {
        return false;
    }
    else {
        isAccountValid = 'true';
        return true;
    }
}
function isAccountValid() {
    zm("#regacc_loading").show();
    if (checkRegAccInput()) {

    }
    else {
        zm("#regacc_loading").hide();
    }
    return false;
}
function getAge(dob, mob, yob) {
    var dateString = mob + "/" + dob + "/" + yob;
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
function goToStep2() {
    var dob = zm('[name=dob]').val();
    var mob = zm('[name=mob]').val();
    var yob = zm('[name=yob]').val();
    age = getAge(dob, mob, yob);
    zm("#regfrm_step1").hide();
    zm("#regfrm_step2").show();
    var ua = navigator.userAgent.toLowerCase(),
            m = ua.match(/(^|\s)(firefox|safari|opera|msie|chrome)[\/:\s]([\d\.]+)/) || ['', '', '0.0'];
    //IE browser
    if (m[2] == 'msie') {
        placeholderIE("#regacc_phone");
        placeholderIE("#regacc_email");
        placeholderIE("#regacc_cmnd");
        placeholderIE("#regacc_address");

        placeholderIE("#regacc_fullname_guardian");
        placeholderIE("#regacc_email_guardian");
        placeholderIE("#regacc_phone_guardian");
        placeholderIE("#regacc_cmnd_guardian");
        placeholderIE("#regacc_veryfied_code");
        refreshRegAccCaptcha();
    }
    if (age >= 16)
    {
        zm("#regfrm_step2_non_guardian").show();
        zm("#regfrm_step2_guardian").hide();
        zm('#regacc_phone').focus();
        zm("#checkbox_non_guardian").show();
        zm("#checkbox_guardian_7").hide();
        zm("#checkbox_guardian_16").hide();


    }
    else  if (age >= 7){
        zm("#regfrm_step2_non_guardian").hide();
        zm("#regfrm_step2_guardian").show();
        zm('#regacc_fullname_guardian').focus();
        zm("#checkbox_non_guardian").hide();
        zm("#checkbox_guardian_7").hide();
        zm("#checkbox_guardian_16").show();

    }

    else {
        zm("#regfrm_step2_non_guardian").hide();
        zm("#regfrm_step2_guardian").show();
        zm('#regacc_fullname_guardian').focus();
         zm("#checkbox_non_guardian").hide();
        zm("#checkbox_guardian_7").show();
        zm("#checkbox_guardian_16").hide();
    }


}
function backToStep1() {
    zm("#regfrm_step1").show();
    zm("#regfrm_step2").hide();
}
function checkPlace(id) {
    if (zm("#" + id).val() == -1)
    {
        zmIdContent.showTooltipError(id + "_error", errMsg.select_err);
        return false;
    }
    zm("#" + id + "_error").hide();
    return true;
}
function checkPhone(id) {
    var regexPhone = /(0|84)+(9[0-9]|12[0-9]|16[0-9]|99[0-9]|19[0-9]|8[0-9]|3[0-9]|7[0-9]|5[0-9])\d{7}$/;

    if (isInputNotBlank(id))
    {
        var element = zm("#" + id);
        var value = element.val();
        if (!regexPhone.test(value)) {
            zmIdContent.showTooltipError(id + "_error", errMsg.Phone_invalid);
            return false;
        }
        zm("#" + id + "_error").hide();
        return true;
    }
    return false;



}

//check cmnd
function checkCMND(id) {

    if (!isInputNotBlank(id))
    {
        return false;
    }
    var element = zm("#" + id);
    var value = element.val();
    if (value.length < 8 || value.length > 15) {
        zmIdContent.showTooltipError(id + "_error", errMsg.Cmnd_Error);

        return false;
    }
    if (!checkInputCharsCMND(value)) {
        zmIdContent.showTooltipError(id + "_error", errMsg.Cmnd_Invalid);

        return false;
    }
    zm("#" + id + "_error").hide();
    return true;
}
function checkInputCharsCMND(cmnd) {
    var pattern = /^[a-zA-Z0-9]*$/;
    if (cmnd.match(pattern) != null)
        return true;
    return false;
}
function checkCMNDDate(idCMNDYear, idYob, idError) {
    var cmndYear = zm('#' + idCMNDYear).val();
    var yob = zm('#' + idYob).val();
    if (cmndYear < yob)
    {
        zmIdContent.showTooltipError(idError, errMsg.Cmnd_LessThanDob);
        return false;
    }
    zm("#" + idError).hide();
    return true;

}
//check input step2
function checkRegInputStep2Guardian() {

    zm(".Notice").hide();
    zm('[rel=Notice]').hide();

    //  Fullname   
    var checkfullname = checkRegFullname("regacc_fullname_guardian");
    
    // Address
    var checkAddress = checkRegAddress("regacc_address_guardian");

    // dob of guardian

    var date_cmnd = zm('#dob_guardian').val();
    var month_cmnd = zm('#mob_guardian').val();
    var year_cmnd = zm('#yob_guardian').val();
    var chkdob = checkDate(date_cmnd, month_cmnd, year_cmnd, "regacc_dob_guardian_error");

    // Phone
    var chkphone = checkPhone("regacc_phone_guardian");

    // Email
    var chkemail = checkEmail("regacc_email_guardian");

    // So CMND
    var chkcmnd = checkCMND("regacc_cmnd_guardian");

//    // Ngay cap cmnd
    var date_cmnd = zm('#regacc_cmnd_date_guardian').val();
    var month_cmnd = zm('#regacc_cmnd_month_guardian').val();
    var year_cmnd = zm('#regacc_cmnd_year_guardian').val();
    var chkdatecmnd = checkDate(date_cmnd, month_cmnd, year_cmnd, "regacc_cmnd_date_guardian_error");

    var chkCmndDateLessThanYob = checkCMNDDate('regacc_cmnd_year_guardian', 'yob_guardian', "regacc_cmnd_date_guardian_error");
//    // Noi cap cmnd
//
    var chkplacecmnd = checkPlace("regacc_cmnd_place_guardian");

    var dob_guardian = zm('[name=dob_guardian]').val();
    var mob_guardian = zm('[name=mob_guardian]').val();
    var yob_guardian = zm('[name=yob_guardian]').val();
    var age_guardian = getAge(dob_guardian, mob_guardian, yob_guardian);
    var chkDobGuardian = true;
    if (age_guardian < 18)
    {
        zmIdContent.showTooltipError("regacc_dob_guardian_error", errMsg.Dob_guardian_invalid);
        chkDobGuardian = false;
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
    if (!chkdob || !chkphone || !chkemail || !chkcmnd || !chkdatecmnd || !checkAddress ||
            !chkplacecmnd || !chkCaptcha || !chkDobGuardian || !checkfullname || !chkCmndDateLessThanYob)
    {
        return false;
    }
    else
    {
        return true;
    }
//    else {
//        errMsg.Account_invalid = 'true';
//        return true;
//    }
}
function checkRegInputStep2NonGuardian() {

    zm(".Notice").hide();
    zm('[rel=Notice]').hide();


    // Phone
    var chkphone = checkPhone("regacc_phone");
    
    // Address
    var chkAddress = checkRegAddress("regacc_address");

    // Email
    var chkemail = checkEmail("regacc_email");

    // So CMND
    var chkcmnd = checkCMND("regacc_cmnd");

//    // Ngay cap cmnd
    var date_cmnd = zm('#regacc_cmnd_date').val();
    var month_cmnd = zm('#regacc_cmnd_month').val();
    var year_cmnd = zm('#regacc_cmnd_year').val();
    var chkdatecmnd = checkDate(date_cmnd, month_cmnd, year_cmnd, "regacc_cmnd_date_error");

    var chkCmndDateLessThanYob = checkCMNDDate('regacc_cmnd_year', 'yob', "regacc_cmnd_date_error");

//    // Noi cap cmnd
//
    var chkplacecmnd = checkPlace("regacc_cmnd_place");
//Captcha
    var captcha = zm("#regacc_veryfied_code").val();
    var chkCaptcha = true;
    if (captcha != undefined) {
        if (captcha.length < 6) {
            zmIdContent.showTooltipError("veryfied_code_error", errMsg.Captcha_invalid);
            chkCaptcha = false;
        }
    }
    if (!chkphone || !chkemail || !chkcmnd || !chkdatecmnd || !chkplacecmnd || !chkCaptcha || !chkCmndDateLessThanYob || !chkAddress)
    {
        return false;
    }
    else
    {
        return true;
    }
}
function submit() {

    var check = false;
    zm('#age').val(age);
    var dob = zm('[name=dob]').val();
    var mob = zm('[name=mob]').val();
    var yob = zm('[name=yob]').val();
    age = getAge(dob, mob, yob);
    if (age >= 16) {
        check = checkRegInputStep2NonGuardian();
    }
    else
    {
        check = checkRegInputStep2Guardian();

    }
    if (check)
    {
        showLoading();
        if (!$('#checkPolicy').is(':checked'))
        {
            zmIdContent.showTooltipError("checkPolicy_error", "Bạn cần đồng ý điều khoản sử dụng");
            return;
        }
        else
        {
            zm('#checkPolicy_error').hide();
            var account = zm("#regacc_account").val();
            var a = "https://id.zing.vn/checkaccount?ACC=" + account + "&jsonp=checkAccCallbacknSubmit";
            zm.getJSON(a);
        }


    }
}
function checkAccCallbacknSubmit(json) {
    setTimeout(function() {
        if (json['flag'] == 1) {
            zm("#frmReg").submit();
            return true;
        }
        if (json['flag'] == 3) {
            zm("#regacc_loading").hide();
            show_account_invalid();
            zmIdContent.showTooltipError("regacc_account_error", errMsg.Account_format);
            backToStep1();
            return false;
        }
        if (json['flag'] == 5) {
            zm("#regacc_loading").hide();
            show_account_invalid();
            zm("#reg_username").attr("class", "finput reg_username invalidacc");
            zm('#account_valid').hide();
            zm('#account_invalid').show();
            backToStep1();
            return false;
        }
    }, 500);
    return false;
}

function placeholderIE(id) {
    zm(id).keypress(function() {
        var input = zm(this);
        if (input.val() == input.attr("placeholder"))
            input.val("");
    });
    zm(id).focus(function() {
        var input = zm(this);
        if (input.val() == input.attr("placeholder"))
            input.val("");
        zm(id + "_tooltip").show();

    });
    zm(id).blur(function() {
        var input = zm(this);
        if (input.val() == "" || input.val() == input.attr("placeholder"))
            input.val(input.attr("placeholder"));
        zm(id + "_tooltip").hide();
        zm(id + "_error").hide();
    });



    zm(id).focus();
    zm(id).blur();
//    zm(id).focus();
//    zm(id).blur();
//    zm(id).focus();
//    zm(id).blur();

    zm(id + "_error").hide();
}
setTimeout(function() {

// SUBMIT FORM BY ENTER

    // Register by Acc
    zm("#regacc_re_pwd").keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            if ($("#regfrm_step1").css('display') == "block")
            {
                checkRegInputStep1();
            }
            isEnter = true;
        }
    });
    zm("#regacc_veryfied_code").keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            submit();
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

    // TRIGGER  REGISTER ACC FORM STEP1
    zm("#regacc_fullname").blur(function() {
        zm("#regacc_fullname_tooltip").hide();
        checkRegFullname("regacc_fullname");
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

    // TRIGGER  REGISTER ACC FORM STEP2 GUARDIAN

    zm("#regacc_fullname_guardian").blur(function() {
        zm("#regacc_fullname_guardian_tooltip").hide();
        isInputNotBlank("regacc_fullname_guardian");
    })
    zm("#regacc_fullname_guardian").focus(function() {
        zm("#regacc_fullname_guardian_tooltip").show();
    })
    zm("#regacc_fullname_guardian").keypress(function() {
        if (!isEnter) {
            zm("#regacc_fullname_guardian_error").hide();
        }
        isEnter = false;
    })

    zm("#regacc_phone_guardian").blur(function() {
        zm("#regacc_phone_guardian_tooltip").hide();
        checkPhone("regacc_phone_guardian");
    })
    zm("#regacc_phone_guardian").focus(function() {
        zm("#regacc_phone_guardian_tooltip").show();
    })
    zm("#regacc_phone_guardian").keypress(function() {
        if (!isEnter) {
            zm("#regacc_phone_guardian_error").hide();
        }
        isEnter = false;
    })

    zm("#regacc_email_guardian").blur(function() {
        zm("#regacc_email_guardian_tooltip").hide();
        checkEmail("regacc_email_guardian");
    })
    zm("#regacc_email_guardian").focus(function() {
        zm("#regacc_email_guardian_tooltip").show();
    })
    zm("#regacc_email_guardian").keypress(function() {
        if (!isEnter) {
            zm("#regacc_email_guardian_error").hide();
        }
        isEnter = false;
    })


    zm("#regacc_cmnd_guardian").blur(function() {
        zm("#regacc_cmnd_guardian_tooltip").hide();
        checkCMND("regacc_cmnd_guardian");
    })
    zm("#regacc_cmnd_guardian").focus(function() {
        zm("#regacc_cmnd_guardian_tooltip").show();
    })
    zm("#regacc_cmnd_guardian").keypress(function() {
        if (!isEnter) {
            zm("#regacc_cmnd_guardian_error").hide();
        }
        isEnter = false;
    })
    
    zm("#regacc_address_guardian").blur(function() {
        zm("#regacc_address_tooltip_guardian").hide();
        isInputNotBlank("regacc_address_guardian");
    })
    zm("#regacc_address_guardian").focus(function() {
        zm("#regacc_address_tooltip_guardian").show();
    })
    zm("#regacc_address_guardian").keypress(function() {
        if (!isEnter) {
            zm("#regacc_address_guardian_error").hide();
        }
        isEnter = false;
    })

    // TRIGGER  REGISTER ACC FORM STEP2 NON GUARDIAN
    zm("#regacc_phone").blur(function() {
        zm("#regacc_phone_tooltip").hide();
        checkPhone("regacc_phone");
    })
    zm("#regacc_phone").focus(function() {
        zm("#regacc_phone_tooltip").show();
    })
    zm("#regacc_phone").keypress(function() {
        if (!isEnter) {
            zm("#regacc_phone_error").hide();
        }
        isEnter = false;
    })

    zm("#regacc_email").blur(function() {
        zm("#regacc_email_tooltip").hide();
        checkEmail("regacc_email");
    })
    zm("#regacc_email").focus(function() {
        zm("#regacc_email_tooltip").show();
    })
    zm("#regacc_email").keypress(function() {
        if (!isEnter) {
            zm("#regacc_email_error").hide();
        }
        isEnter = false;
    })


    zm("#regacc_cmnd").blur(function() {
        zm("#regacc_cmnd_tooltip").hide();
        checkCMND("regacc_cmnd");
    })
    zm("#regacc_cmnd").focus(function() {
        zm("#regacc_cmnd_tooltip").show();
    })
    zm("#regacc_cmnd").keypress(function() {
        if (!isEnter) {
            zm("#regacc_cmnd_error").hide();
        }
        isEnter = false;
    })
    
    zm("#regacc_address").blur(function() {
        zm("#regacc_address_tooltip").hide();
        checkRegAddress("regacc_address");
    })
    zm("#regacc_address").focus(function() {
        zm("#regacc_address_tooltip").show();
    })
    zm("#regacc_address").keypress(function() {
        if (!isEnter) {
            zm("#regacc_address_error").hide();
        }
        isEnter = false;
    })

    zm("#regacc_veryfied_code").keypress(function() {
        if (!isEnter) {
            zm("#veryfied_code_error").hide();
        }
        isEnter = false;
    })

    $('#regacc_cmnd_year').onchange = function() {
        checkCMNDDate('regacc_cmnd_year', 'yob', "regacc_cmnd_date_error");
    };
    $('#regacc_cmnd_year_guardian').onchange = function() {
        checkCMNDDate('regacc_cmnd_year_guardian', 'yob_guardian', "regacc_cmnd_date_guardian_error");
    };
    var ua = navigator.userAgent.toLowerCase(),
            m = ua.match(/(^|\s)(firefox|safari|opera|msie|chrome)[\/:\s]([\d\.]+)/) || ['', '', '0.0'];
    //IE browser
    if (m[2] == 'msie') {


        //  REG ACC PASSWORD
        zm('#regacc_pwd').hide();
        zm('#fake_regacc_pwd').show();
        zm('#fake_regacc_pwd').focus(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
            zm("#regacc_pwd_tooltip").show();
        });
        zm('#fake_regacc_pwd').keypress(function() {
            zm(this).hide(); //  hide the fake password input text
            zm('#regacc_pwd').show().focus(); // and show the real password input password
        });
        zm('#fake_regacc_pwd').blur(function() {
            zm("#regacc_pwd_tooltip").hide();


        });
        zm('#regacc_pwd').blur(function() {
            zm("#regacc_pwd_tooltip").hide();
            if (zm(this).val() == "") { // if the value is empty, 
                zm(this).hide(); // hide the real password field
                zm('#fake_regacc_pwd').show(); // show the fake password
            }

        });

        zm('#regacc_re_pwd').hide();
        zm('#fake_regacc_re_pwd').show();
        zm('#fake_regacc_re_pwd').focus(function() {
            var input = zm(this);
            if (input.val() == input.attr("placeholder"))
                input.val("");
        });
        zm('#fake_regacc_re_pwd').keypress(function() {
            zm(this).hide(); //  hide the fake password input text
            zm('#regacc_re_pwd').show().focus(); // and show the real password input password
        });
        zm('#regacc_re_pwd').blur(function() {
            if (zm(this).val() == "") { // if the value is empty, 
                zm(this).hide(); // hide the real password field
                zm('#fake_regacc_re_pwd').show(); // show the fake password
            }
        });

        //  REG ACC INPUT

        placeholderIE("#regacc_fullname");
        placeholderIE("#regacc_account");

//        placeholderIE("#regacc_pwd");
//        placeholderIE("#regacc_re_pwd");
        placeholderIE("#regacc_phone");
        placeholderIE("#regacc_email");
        placeholderIE("#regacc_cmnd");
        placeholderIE("#regacc_address");

        placeholderIE("#regacc_fullname_guardian");
        placeholderIE("#regacc_email_guardian");
        placeholderIE("#regacc_phone_guardian");
        placeholderIE("#regacc_cmnd_guardian");
        placeholderIE("#regacc_veryfied_code");
    } else {
        try {
            zm("#login_account").focus();
            zm("#reg_account").focus();
        }
        catch (err) {
        }
    }
    //End IE browser
}, 500)
zm.ready(function() {
    verifyEmail.init();
//    refreshRegCaptcha();
    refreshRegAccCaptcha();
    zm('#regacc_fullname').focus();
});
