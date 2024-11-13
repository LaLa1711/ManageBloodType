var resendMailUrl = "https://id.zing.vn/ajax/resendemail";
var forgotpwdUrl = zid.baseUrl + '/forgotinfo?apikey=' + zid.apikey + '&pid=' + zid.pid;
var requireUrl = zid.baseUrl + '/inforequire';
var errMsg = {
    require_err: 'Bạn cần nhập thông tin này.',
    OTP_invalid: 'Bạn cần nhập mã OTP',
    Account_empty: 'Bạn chưa nhập tài khoản',
    Account_invalid: 'Cần nhập tài khoản từ 6-32 ký tự.',
    Account_existed: 'Tài khoản đã tồn tại.',
    Account_format: 'Tài khoản cần bao gồm cả chữ vàsố.',
    Fullname_empty: 'Cần nhập họ tên từ 2-40 ký tự.',
    Fullname_same: 'Vui lòng nhập giá trị mới.',
    Gender_invalid: 'Bạn cần nhập thông tin này.',
    Date_invalid: 'Ngày tháng không hợp lệ.',
    Add_invalid: "Bạn phải nhập địa chỉ từ 2-100 ký tự.",
    City_invalid: "Bạn chưa chọn tỉnh thành.",
    Occupation_invalid: "Bạn chưa chọn nghề nghiệp.",
    marital_invalid: "Bạn chưa chọn tình trạng hôn nhân.",
    Cmnd_Error: 'Bạn cần nhập số CMND từ 8-15 ký tự.',
    Cmnd_Invalid: 'Số CMND không không hợp lệ.',
    Email_empty: 'Bạn cần nhập thông tin này.',
    ReEmail_empty: 'Bạn cần nhập thông tin này.',
    ReEmail_notmatch: 'Xác nhận email phải giống email.',
    Email_invalid: 'Địa chỉ email không hợp lệ.',
    Qna_err: 'Câu hỏi hoặc câu trả lời không đúng.',
    Qna_Empty_a: 'Bạn cần nhập câu trả lời (< 100 ký tự).',
    Qna_Empty_q: 'Bạn chưa chọn câu hỏi.',
    Qna_Error_confirm: 'Xác nhận trả lời phải giống trả lời.',
    Pwd_empty: 'Bạn cần nhập thông tin này.',
    Pwd_invalid: 'Cần có ít nhất 8 ký tự.',
    RePwd_notmatch: 'Xác nhận mật khẩu phải giống mật khẩu.',
    Phone_invalid: 'Số điện thoại không hợp lệ.',
    Phone_thesame: 'Số điện thoại không được trùng nhau.',
    Phone_require: 'Bạn cần nhập Số điện thoại',
    ListProduct_require: 'Vui lòng chọn game muốn nhận SMS',
    smscode_require: 'Bạn cần nhập mã xác nhận',
    Captcha_invalid: 'Mã xác nhận không đúng.'
}
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
            if (data.msg == "") {
                zm("#link_resend").html("Đã gửi lại link kích hoạt");
            }
            else {
                zm("#link_resend").css("color", "red");
                zm("#link_resend").html(data.msg);
            }
        });

    }
};
// LOGIN
var loginRedirect = function(data) {
    window.location = zid.loginUrl;
}
//CONTENT
var zmIdContent = {
    showError: function(id, content) {
        zm("#" + id).html(content);
        zm("#" + id).show();
        return false;
    },
    showProError: function(id, content) {
        alert(content);
        return false;
    },
    showTooltipError: function(id, content) {
        zm("#" + id + " .tipcontent").html(content);
        zm("#" + id).show();
        return false;
    }
}
function email_pwdkeypress(event) {
    zm("#email_edit #email_error").html("&nbsp;");
    if (event.keyCode == 13) {// Enter
        event.preventDefault();
        updateEmail();
    }
}
;
function reLoad() {
    window.location.reload();
}
function hideAllEdit() {
    zm('[rel=edit]').hide();
    zm('[rel=display]').show();
}
function appendPersonalToken() {
    zm.getJSON("/ajax/gentoken", function(data) {
        if (data.code == "0") {
            //append token here
            zm("#personal_tokenExpire").val(data.msg);
        }
        else {
            location.reload();
        }
    });
}
function showLoading() {
    zm('.Agree').hide();
    zm('.agreepolicy').hide();
    zm("#processing").show();
}
function disableInput() {
    zm("#zaccount").attr("disabled", true);
}

// Valid Input
function validEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return (filter.test(email));
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
        zmIdContent.showTooltipError("reg_account_error", errMsg.Fullname_empty);
        return false;
    }
    return true;
}
function checkPersonalId(personalId) {
    if (personalId.length < 8 || personalId.length > 15) {
        return false;
    }
    if (!checkInputCharsCMND(personalId)) {
        return false;
    }
    return true;
}
function checkInputCharsCMND(cmnd) {
    var pattern = /^[a-zA-Z0-9]*$/;
    if (cmnd.match(pattern) != null)
        return true;
    return false;
}

// EDIT INFO

//Fullname
function showFullnameEdit() {
    hideAllEdit();
    //display & hide
    zm("#fullname_display").hide();
    zm("#fullname_edit").show();

    //bind data
    var oldVal = zm("#fullname_txt").html();
    zm("#fullname_input").val(oldVal);
    zm("#fullname_input").focus();

    //add trigger
    zm("#fullname_input").keypress(function() {
        zm("#fullname_error").hide();
    });
}
function hideFullnameEdit() {
    zm("#fullname_edit").hide();
    zm("#fullname_error").hide();
    zm("#fullname_display").show();
}
function updateFullname() {
    var newVal = zm("#fullname_input").val();
    var oldVal = zm("#fullname_txt").html();
    if (newVal == "") {
        zmIdContent.showError("fullname_error", errMsg.Fullname_empty);
        return false;
    }
    else if (oldVal === newVal) {
        zmIdContent.showError("fullname_error", errMsg.Fullname_sullnameame);
        return false;
    }

    zm("#fullname_error").hide();
    zm.getJSON(zid.baseUrl + "/infosetting/update?action=name.update&val=" + encodeURIComponent(newVal), function(data) {
        if (data.error == 0)
        {
            hideFullnameEdit();
            zm("#fullname_txt").html(data.msg);
        }
        else {
            zmIdContent.showError("fullname_error", data.msg);
        }
    });
    return false;
}

// Email protect
function showEmailproEdit() {
    hideAllEdit();
    //display & hide
    zm("#emailpro_display").hide();
    zm("#emailpro_edit").show();

    //bind data
    zm("#emailpro_input").val("");

    //add trigger
    zm("#emailpro_input").keypress(function() {
        zm("#emailpro_error").hide();
    });
    try{
        resizeIframe();
    }catch (err) {
        return
    }
}
function hideEmailproEdit() {
    zm("#emailpro_edit").hide();
    zm("#emailpro_error").hide();
    zm("#emailpro_display").show();
    try{
        resizeIframe();
    }catch (err) {
        return
    }    
}
function updateEmailpro() {
    var emailpro = zm("#emailpro_input").val();
    if (emailpro == "") {
        zmIdContent.showError("emailpro_error", errMsg.Email_empty);
        return false;
    }
    if (emailpro != "" && emailpro != undefined && !validEmail(emailpro)) {
        zmIdContent.showError("emailpro_error", errMsg.Email_invalid);
        return false;
    }
    zm("#emailpro_error").hide();
    var params = {
        action: "emailpro.update",
        emailpro: emailpro
    };
    params = zm.param(params);
    zm.getJSON(zid.baseUrl + "/infosetting/security/update?" + params, function(data) {
        if (data.error == 0)
        {
            //            hideEmailproEdit();
            location.href = data.msg;
        }
        else {
            zmIdContent.showError("emailpro_error", data.msg);
        }
    });
    return false;
}
function confirmEmail() {
    zm("#resend_loading_id").show();
    zm("#confirm").hide();
    setTimeout(function() {

        zm.getJSON(resendMailUrl, function(data) {
            if (data.code == 1)
            {
                zm("#resend_loading_id").hide();
                zm("#confirm").show();
                zm.Boxy.alert("<div style=\"padding:20px 30px;\"></div> ", "Thông báo", 2000, {
                    okButton: "Đồng ý"
                });
            }
            else {
                zm("#confirm").hide();
                zm("#resend_loading_id").hide();
                zm("#confirmed").show();
                var content = '<div class="updatemsg"><span class="checkdoneicn"></span>Đã gửi lại Email xác nhận.</div>';
                zm.Boxy.alert(content, "", 1500, {
                    footer: false,
                    contentClass: 'title-alert'
                });
            }
        });
    }, 500);
}

// CMND
function showCmndEdit() {
    hideAllEdit();
    var id = "cmnd";
    zm("#cmnd_edit_form #loading").hide();
    zm("#" + id).hide();
    zm("#" + id + " .warning").html("&nbsp;");
    zm("#cmnd_edit").html(zm("#cmnd_edit_fake").html());
    zm("#" + id + "_edit_form").show();
    try{
        resizeIframe();
    }catch (err) {
        return
    } 
}
function hideCmndEdit() {
    var id = "cmnd";

    zm("#" + id + "_edit_form").hide();
    zm("#" + id + "_error").html("&nbsp;");
    zm("#" + id).show();
    try{
        resizeIframe();
    }catch (err) {
        return
    } 
}
function updateCmnd() {
    var id = "#cmnd_edit";

    zm(id + " .warning").html("&nbsp;");

    var cmnd_number = zm(id + ' [name=cmnd]').val();

    var docmnd = zm(id + ' [name=docmnd]').val();
    var mocmnd = zm(id + ' [name=mocmnd]').val();
    var yocmnd = zm(id + ' [name=yocmnd]').val();

    var city = zm(id + ' [name=city]').val();

    if (cmnd_number == "" || cmnd_number == undefined) {
        zmIdContent.showError("cmnd_edit #cmndnumber_error", errMsg.Cmnd_Error);
        return false;
    }
    if (!checkPersonalId(cmnd_number)) {
        zmIdContent.showError("cmnd_edit #cmndnumber_error", errMsg.Cmnd_Error);
        return false;
    }
    var currentTime = new Date();
    var currentYear = currentTime.getFullYear();
    if (docmnd < 1 || docmnd > 31 || mocmnd < 1 || mocmnd > 12 || yocmnd < 1900 || yocmnd > currentYear) {
        zmIdContent.showError("cmnd_edit #date_error", errMsg.Date_invalid);
        return false;
    }
    if (city < 1) {
        zmIdContent.showError("cmnd_edit #city_error", errMsg.City_invalid);
        return false;
    }
    zm("#cmnd_edit_form #loading").show();
    var params = {
        action: "cmnd.update",
        cmnd_number: cmnd_number,
        docmnd: docmnd,
        mocmnd: mocmnd,
        yocmnd: yocmnd,
        city: city
    };
    params = zm.param(params);
    zm.getJSON(zid.baseUrl + "/infosetting/security/update?" + params, function(ret) {
        if (ret.error == "0") {
            var content = '<div class="updatemsg"><span class="checkdoneicn"></span>Cập nhật thành công.</div>';
            setTimeout(function() {
                zm("#cmnd_edit_form #loading").hide();
                zm.Boxy.alert(content, "", 1500, {
                    footer: false,
                    contentClass: 'title-alert'
                });
            }, 1000);
            setTimeout(function() {
                location.reload();
            }, 2500);
        }
        else {
            zmIdContent.showError("cmnd_error", ret.msg);
            zm("#cmnd_edit_form #loading").hide();
        }
    });
    return false;
}

/**
 * Process update CID (miss SID and/or SIP).
 */
function updateMissCmnd() {

    // Get miss CID info
    var isMissIsd = zm("#isMissIsd").val();
    var isMissIsp = zm("#isMissIsp").val();
    if (isMissIsd != "true" && isMissIsd != "false") {
        isMissIsd = "false";
    }
    if (isMissIsp != "true" && isMissIsp != "false") {
        isMissIsp = "false";
    }

    // Had CID
    if (isMissIsd == "false" && isMissIsp == "false") {
        var content = '<div class="updatemsg"><span class="checkdoneicn"></span>Cập nhật thành công.</div>';
        setTimeout(function() {
            zm.Boxy.alert(content, "", 1500, {
                footer: false,
                contentClass: 'title-alert'
            });
        }, 1000);
        setTimeout(function() {
            location.reload();
        }, 2500);
        return;
    }

    // Check miss info
    var id = "#cmnd_edit";
    zm(id + " .warning").html("&nbsp;");
    var currentTime = new Date();
    var currentYear = currentTime.getFullYear();
    var docmnd, mocmnd, yocmnd, city;
    if (isMissIsd == "true") {
        docmnd = zm(id + ' [name=docmnd]').val();
        mocmnd = zm(id + ' [name=mocmnd]').val();
        yocmnd = zm(id + ' [name=yocmnd]').val();
        if (docmnd < 1 || docmnd > 31 || mocmnd < 1 || mocmnd > 12 || yocmnd < 1900 || yocmnd > currentYear) {
            zmIdContent.showError("cmnd_edit #date_error", errMsg.Date_invalid);
            return;
        }
    }
    if (isMissIsp == "true") {
        city = zm(id + ' [name=city]').val();
        if (city < 1) {
            zmIdContent.showError("cmnd_edit #city_error", errMsg.City_invalid);
            return false;
        }
    }

    // Call fix miss info request
    zm("#cmnd_edit_form #loading").show();
    var params = {
        action: "cmnd.updatemiss",
        ismissisd: isMissIsd,
        ismissisp: isMissIsp,
        docmnd: docmnd,
        mocmnd: mocmnd,
        yocmnd: yocmnd,
        city: city
    };
    params = zm.param(params);
    zm.getJSON(zid.baseUrl + "/infosetting/security/update?" + params, function(ret) {

        // Update success
        if (ret.error == "0") {
            var content = '<div class="updatemsg"><span class="checkdoneicn"></span>Cập nhật thành công.</div>';
            setTimeout(function() {
                zm("#cmnd_edit_form #loading").hide();
                zm.Boxy.alert(content, "", 1500, {
                    footer: false,
                    contentClass: 'title-alert'
                });
            }, 1000);
            setTimeout(function() {
                location.reload();
            }, 2500);
        } else {    // Fails
            zmIdContent.showError("cmnd_error", ret.msg);
            zm("#cmnd_edit_form #loading").hide();
        }
    });
    return;
}

//EMAIL LOGIN
function showEmailEdit() {
    hideAllEdit();
    var id = "email";
    zm("#emaillogin_loading").hide();
    zm("#" + id).hide();
    zm("#" + id + "_error").html("&nbsp;");
    zm("#email_edit").html(zm("#email_edit_fake").html());
    zm("#" + id + "_edit").show();
    try{
        resizeIframe();
    }catch (err) {
        return
    } 
}
function hideEmailEdit() {
    var id = "email";
    zm("#emaillogin_loading").hide();
    zm("#" + id + "_edit").hide();
    zm("#" + id + "_error").html("&nbsp;");
    zm("#" + id).show();
    try{
        resizeIframe();
    }catch (err) {
        return
    } 
}
function updateEmail() {
    //        var mailList = zm(".mailtxt");
    //      if (mailList.lenght <=0){
    //          zmIdContent.showError(id+"_error","Bạn không thể xóa Email chính.");
    //            return false;
    //        }
    //        var addEmail = zm("#"+id+"_add").html(); 
    var primaryEmail = zm('#email_edit [name=primary_email]:checked').val();
    if (primaryEmail == undefined) {
        zmIdContent.showError("email_edit #email_error", "Vui lòng Chọn Email chính.");
        return false;
    }

    //    var addEmail = zm("#email_edit #email_add").val();  
    //    if(addEmail!="" && addEmail!=undefined && !validEmail(addEmail)){
    //        zmIdContent.showError("email_edit #email_error",errMsg.Email_invalid);
    //        return false;
    //    }

    var pwd = zm("#email_edit #email_pwd").val();
    if (pwd == "" || pwd == undefined) {
        zmIdContent.showError("email_edit #email_error", errMsg.Pwd_empty);
        zm("#email_pwd").focus();
        return false;
    }
    if (pwd.length > 32 || pwd.length < 4) {
        zmIdContent.showError("email_edit #email_error", errMsg.Pwd_invalid);
        zm("#email_pwd").focus();
        return false;
    }
    zm("email_edit #email_error").html("&nbsp;");


    //Primary Email
    //List Emails
    //Add Email
    //Pwd
    var params = {
        primaryEmail: primaryEmail,
        pwd: pwd,
        action: "email.update"
    };
    var lEmail = new Array();
    var obj = zm('#email_edit [name=primary_email]');
    obj.each(function() {
    {
        lEmail.push(zm(this).val());
    }
    });
    if (lEmail.length > 0) {
        var listEmail = lEmail.join(',');
        params.listEmail = listEmail;
    }
    zm("#emaillogin_loading").show();
    params = zm.param(params);
    zm.getJSON(zid.baseUrl + "/infosetting/update?" + params, function(ret) {
        if (ret.error == 0)
        {
            setTimeout(function() {
                zm("#emaillogin_loading").hide();
                var content = '<div class="updatemsg"><span class="checkdoneicn"></span>Cập nhật thành công.</div>';
                zm.Boxy.alert(content, "", 1500, {
                    footer: false,
                    contentClass: 'title-alert'
                });
            }, 1000);
            setTimeout(function() {
                location.reload();
            }, 2500);
        }
        else {
            zmIdContent.showError("email_edit #email_error", ret.msg);
            zm("#email_pwd").focus();
            zm("#emaillogin_loading").hide();
        }
    });
    return false;
}

//PHONE LOGIN
function showPhoneEdit() {
    hideAllEdit();
    var id = "phone";
    zm("#phonelogin_loading").hide();
    zm("#" + id).hide();
    zm("#" + id + "_error").html("&nbsp;");
    zm("#phone_edit").html(zm("#phone_edit_fake").html());
    zm("#" + id + "_edit").show();
    try{
        resizeIframe();
    }catch (err) {
        return
    } 

}
function hidePhoneEdit() {
    var id = "phone";
    zm("#phonelogin_loading").hide();
    zm("#" + id + "_edit").hide();
    zm("#" + id + "_error").html("&nbsp;");
    zm("#" + id).show();
    try{
        resizeIframe();
    }catch (err) {
        return
    } 
}
function updatePhone() {
    var primaryPhone = zm('#phone_edit [name=primary_phone]:checked').val();
    if (primaryPhone == undefined) {
        zmIdContent.showError("phone_edit #phone_error", "Vui lòng Chọn SĐT chính.");
        return false;
    }

    var pwd = zm("#phone_edit #phonelogin_pwd").val();
    if (pwd == "" || pwd == undefined) {
        zmIdContent.showError("phone_edit #phone_error", errMsg.Pwd_empty);
        zm("#phonelogin_pwd").focus();
        return false;
    }
    if (pwd.length > 32 || pwd.length < 4) {
        zmIdContent.showError("phone_edit #phone_error", errMsg.Pwd_invalid);
        zm("#phonelogin_pwd").focus();
        return false;
    }
    zm("phone_edit #phone_error").html("&nbsp;");

    //Primary phone
    //List phones
    //Add phone
    //Pwd
    zm("#phonelogin_loading").show();
    var params = {
        primaryPhone: primaryPhone,
        pwd: pwd,
        action: "phone.update"
    };
    var lPhone = new Array();
    var obj = zm('#phone_edit [name=primary_phone]');
    obj.each(function() {
    {
        lPhone.push(zm(this).val());
    }
    });
    if (lPhone.length > 0) {
        var listPhone = lPhone.join(',');
        params.listPhone = listPhone;
    }
    params = zm.param(params);
    zm.getJSON(zid.baseUrl + "/infosetting/update?" + params, function(ret) {
        if (ret.error == 0)
        {
            setTimeout(function() {
                zm("#phonelogin_loading").hide();
                var content = '<div class="updatemsg"><span class="checkdoneicn"></span>Cập nhật thành công.</div>';
                zm.Boxy.alert(content, "", 1500, {
                    footer: false,
                    contentClass: 'title-alert'
                });
            }, 1000);
            setTimeout(function() {
                location.reload();
            }, 2500);
        }
        else {
            zm("#phonelogin_loading").hide();
            zm("#phonelogin_pwd").focus();
            zmIdContent.showError("phone_edit #phone_error", ret.msg);
        }
    });
    return false;
}

// PERSONAL INFO
function showPersonalEdit() {
    var id = "personal";

    zm("#" + id + " .warning").html("&nbsp;");
    zm("#" + id).hide();
    zm("#" + id + "_edit").html(zm("#" + id + "_edit_fake").html());
    // append token
    appendPersonalToken();
    zm("#" + id + "_edit").show();
    zm("#personal_edit_form #loading").hide();
    zm("#" + id + "_edit_form").show();
    zm('[name=fullname]').focus();
    try{
        resizeIframe();
    }catch (err) {
        return
    }
}
function hidePersonalEdit() {
    var id = "personal";

    zm("#" + id + "_edit").hide();
    zm("#" + id + "_edit_form").hide();
    zm("#personal_edit_form #loading").hide();
    zm("#" + id).show();
    try{
        resizeIframe();
    }catch (err) {
        return
    }
}
function validPersonal(id) {
    var isValid = true;
    var fullname = zm(id + ' [name=fullname]').val();
    if (fullname == "" || fullname.length > 40 || fullname.length < 2) {
        zmIdContent.showError("personal_edit #fullname_error", errMsg.Fullname_empty);
        isValid = false;
    }
    var gender = zm(id + ' [name=gender]:checked').val();
    if (gender != 1 && gender != 0) {
        zmIdContent.showError("personal_edit #gender_error", errMsg.Gender_invalid);
        isValid = false;
    }

    var dob = zm(id + ' [name=dob]').val();
    var mob = zm(id + ' [name=mob]').val();
    var yob = zm(id + ' [name=yob]').val();
    var currentTime = new Date();
    var currentYear = currentTime.getFullYear();
    if (dob < 1 || dob > 31 || mob < 1 || mob > 12 || yob < 1900 || yob > currentYear) {
        zmIdContent.showError("personal_edit #dob_error", errMsg.Date_invalid);
        isValid = false;
    }
    var add = zm(id + ' [name=add]').val();
    if (add == "" || add.length > 100 || add.length < 2) {
        zmIdContent.showError("personal_edit #add_error", errMsg.Add_invalid);
        isValid = false;
    }
    var city = zm(id + ' [name=city]').val();
    if (city < 0) {
        zmIdContent.showError("personal_edit #city_error", errMsg.City_invalid);
        isValid = false;
    }
    var occupation = zm(id + ' [name=occupation]').val();
    if (occupation < 0) {
        zmIdContent.showError("personal_edit #occupation_error", errMsg.Occupation_invalid);
        isValid = false;
    }
    var marital_status = zm(id + ' [name=marital_status]:checked').val();
    if (marital_status != 1 && marital_status != 0) {
        zmIdContent.showError("personal_edit #marital_status_error", errMsg.marital_invalid);
        isValid = false;
    }
    return isValid;
}
function updatePersonal() {
    var id = "#personal_edit";
    zm(".warning").html("&nbsp;");
    if (validPersonal(id)) {
        var fullname = zm(id + ' [name=fullname]').val();
        var gender = zm(id + ' [name=gender]:checked').val();
        var add = zm(id + ' [name=add]').val();

        var dob = zm(id + ' [name=dob]').val();
        var mob = zm(id + ' [name=mob]').val();
        var yob = zm(id + ' [name=yob]').val();
        var city = zm(id + ' [name=city]').val();
        var occupation = zm(id + ' [name=occupation]').val();
        var marital_status = zm(id + ' [name=marital_status]:checked').val();

        zm("#personal_edit_form #loading").show();
        // display loading box, disable input
        // submit form
        //    zm("#frmPersonal").submit();    
        var params = {
            action: "personal.update",
            fullname: fullname,
            gender: gender,
            add: add,
            dob: dob,
            mob: mob,
            yob: yob,
            city: city,
            occupation: occupation,
            maritalstatus: marital_status,
            tokenCaptcha: zm("#personal_tokenCaptcha").val(),
            tokenExpire: zm("#personal_tokenExpire").val()
        };
        params = zm.param(params);
        zm.getJSON(zid.baseUrl + "/infosetting/personal/update?" + params, function(data) {
            if (data.error == "0") {
                var content = '<div class="updatemsg"><span class="checkdoneicn"></span>Cập nhật thành công.</div>';
                setTimeout(function() {
                    zm("#personal_edit_form #loading").hide();
                    zm.Boxy.alert(content, "", 1500, {
                        footer: false,
                        contentClass: 'title-alert'
                    });
                }, 1000);
                setTimeout(function() {
                    location.reload();
                }, 2500);

            } else if (data.error == "-1") {
                zm("#personal_edit_form #loading").hide();
                zm.Boxy.alert("<div style=\"padding:20px 30px;\">" + data.msg + "</div>", "Thông báo", false, {
                    okButton: "Đóng",
                    onOk: reLoad
                });
                setTimeout(function() {
                    location.reload();
                }, 5000);
            }
            else {
                appendPersonalToken();
                zmIdContent.showError("personal_edit #personal_error", data.msg);
                zm("#personal_edit_form #loading").hide();
            }
        });
    }
    return false;

}

//SMS PRODUCT
var zmIdInfo = {
    checkAll: function(id, content) {
        zm("#" + id).html(content);
        zm("#" + id).show();
        return false;
    },
    uncheckAll: function(email) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return (filter.test(email));
    }
}
function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}
function unCheckPromotion() {
    var checkboxes = document.getElementsByName("list_productid");
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        checkboxes[i].checked = false;
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

// Call as


// PROMOTION INFO
function validPromotion(id) {
    var isValid = true;
    var mobilephone = zm(id + ' [name=mobilephone]').val();
    //Check empty
    //Valid Mobilephone
    if (mobilephone == ""  || mobilephone == undefined ) {
        zmIdContent.showProError("mobilephone_error", errMsg.Phone_require);
        isValid = false;
        return isValid;
    } else if (mobilephone != "" && mobilephone!=undefined && !regexPhone.test(mobilephone)) {
        zmIdContent.showProError("mobilephone_error", errMsg.Phone_invalid);
        isValid = false;
        return isValid;
    }
    
    //Valid Zalophone
    var zalophone = zm(id + ' [name=zalophone]').val();    
    if (zalophone != "" && zalophone!=undefined && !regexPhone.test(zalophone)) {
        zmIdContent.showProError("zalophone_error", errMsg.Phone_invalid);
        isValid = false;
        return isValid;
    }
    //Valid Email
    var email = zm(id + ' [name=email]').val();
    if (email != "" && email!=undefined && !validEmail(email)) {
        zmIdContent.showProError("email_error", errMsg.Email_invalid);
        isValid = false;
        return isValid;
    }
    var fbaccount = zm(id + ' [name=fbaccount]').val();
    
    
    // Valid List product id 
    var checkedBoxes = getCheckedBoxes("list_productid");
    if (checkedBoxes==null){
        zmIdContent.showProError("list_productid_error", errMsg.ListProduct_require);
        isValid = false;
        return isValid;
    }
    return isValid;
}
function resetPromotion(){
    var id = "#promotion_edit_form";
    zm(id + ' [name=mobilephone]').val("");
    zm(id + ' [name=zalophone]').val("");
    zm(id + ' [name=email]').val("");
    zm(id + ' [name=fbaccount]').val("");
    unCheckPromotion();
}
function updatePromotion() {
    var id = "#promotion_edit_form";
    zm(".warning").html("&nbsp;");
    if (validPromotion(id)) {
        var mobilephone = zm(id + ' [name=mobilephone]').val();
        var zalophone = zm(id + ' [name=zalophone]').val();
        var email = zm(id + ' [name=email]').val();
        var fbaccount = zm(id + ' [name=fbaccount]').val();
        zm("#promotion_edit_form #loading").show();
        var checkedBoxes = getCheckedBoxes("list_productid");
        // display loading box, disable input
        // submit form
        // zm("#frmPersonal").submit();    
        var params = {
            mobilephone: mobilephone,
            zalophone: zalophone,
            email: email,
            fbaccount: fbaccount,
            list_productid: checkedBoxes.toString()
        };
        params = zm.param(params);
        zm.getJSON(zid.baseUrl + "/promotion/update?" + params, function(data) {
            if (data.error == "0") {
                setTimeout(function() {
                    //location.href = data.msg;
                    location.reload();
                }, 1500);
            } else if (data.error == "-1") {
                zm("#promotion_edit_form #loading").hide();
                zm.Boxy.alert("<div style=\"padding:20px 30px;\">" + data.msg + "</div>", "Thông báo", false, {
                    okButton: "Đóng",
                    onOk: reLoad
                });
                setTimeout(function() {
                    location.reload();
                }, 5000);
            }
            else {
                setTimeout(function() {
                    zmIdContent.showProError("promotion_error", data.msg);
                    zm("#promotion_edit_form #loading").hide();
                }, 2000);
            }
        });
    }
    return false;
}

function confirmPromotionPhone() {
    var sSmsCode = zm("#sSmsCode").val();
    if (sSmsCode == "") {
        zmIdContent.showProError("sSmsCode", errMsg.smscode_require);
        return false;
    } else if (sSmsCode.length != 6) {
        zmIdContent.showProError("sVerifyCode", errMsg.Captcha_invalid);
        return false;
    }
    var pacn = zm('#promotion_confirm_form [name=acn]').val();
    var pphone = zm('#promotion_confirm_form [name=phone]').val();
    var ptoken = zm('#promotion_confirm_form [name=token]').val();

    //Primary phone
    //List phones
    //Add phone
    //Pwd
    zm("#promotion_confirm_loading").show();
    var params = {
        smscode: sSmsCode,
        acn: pacn,
        phone: pphone ,
        token: ptoken
    };
    params = zm.param(params);
    zm.getJSON(zid.baseUrl + "/promotion/confirm?" + params, function(ret) {
        setTimeout(function() {
            if (ret.error == 0)
            {                
                //buirl URL to Tracking
                var trackingUrl = zid.product_callback;
                trackingUrl = trackingUrl.replace("ACCOUNTNAME", pacn);
                var t = new Image;
                t.onload = function() {
                    return
                };
                t.height = "0px";
                t.width = "0px";
                t.src = trackingUrl;
                setTimeout(function() {
                    zm("#promotion_confirm_loading").hide();
                    var content = '<div class="updatemsg"><span class="checkdoneicn"></span>Cập nhật thành công.</div>';
                    zm.Boxy.alert(content, "", 1500, {
                        footer: false,
                        contentClass: 'title-alert'
                    });
                }, 1000);
                location.reload();
            }
            else {
                zm("#promotion_confirm_loading").hide();
                zmIdContent.showProError("promotion_confirm_form #sSmsCode_err", ret.msg);
            }
        }, 1500);
    });
    return false;
}

function showSmsProductEdit() {
    hideAllEdit();
    var id = "smsproduct";

    zm("#" + id).hide();

    //    zm("#"+id+"_edit").html(zm("#"+id+"_edit_fake").html());
    //reset input

    zm("#" + id + "_edit").show();
    zm("#" + id + "_edit #loading").hide();
    zm("#" + id + "_edit_form").show();
    zm("#success_removeall").hide();
    zm(".warning").html("&nbsp;");
    try{
        resizeIframe();
    }catch (err) {
        return
    } 
}
function hideSmsProductEdit() {
    var id = "smsproduct";

    zm("#" + id + "_edit").hide();
    zm("#" + id + "_edit_form").hide();
    zm("#" + id + "_error").html("&nbsp;");
    zm("#" + id + "_edit #loading").hide();
    zm("#" + id).show();
    try{
        resizeIframe();
    }catch (err) {
        return
    } 
}
function updateSmsProduct() {
    var id = "smsproduct";
    zm("#" + id + "_edit #loading").show();
    zmXCall.register('updateSmsProductCallback', function(data) {
        if (data.error == "-1") {
            zm.Boxy.alert(data.msg, "Thông báo", false, {
                okButton: "Đóng",
                onOk: reLoad
            });
            setTimeout(function() {
                location.reload();
            }, 5000);
        } else if (data.error == "1") {
            hideSmsProductEdit();
            var content = '<div class="updatemsg"><span class="checkdoneicn"></span>Bạn đã hủy nhận thông tin từ các sản phẩm của VNG.</div>';
            zm.Boxy.alert(content, "", 2000, {
                footer: false,
                contentClass: 'title-alert'
            });
            setTimeout(function() {
                location.reload();
            }, 2000);
        } else if (data.error == "2") {
            hideSmsProductEdit();
            var content = '<div class="updatemsg"><span class="checkdoneicn"></span>Cập nhật thành công.</div>';
            zm.Boxy.alert(content, "", 2000, {
                footer: false,
                contentClass: 'title-alert'
            });
            setTimeout(function() {
                location.reload();
            }, 2000);
        //            zm("#"+id).hide();
        //            zm("#success_listproduct").html(data.msg);
        //            zm("#success_listproduct").show();            
        }
    });
    zm("#frm_info").submit();
    return false;
}


//PHONE ZX
var regexPhone = /(0|84)+(9[0-9]|12[0-9]|16[0-9]|99[0-9]|19[0-9]|8[0-9]|3[0-9]|7[0-9]|5[0-9])\d{7}$/;
var regex = /(0|84)+(90|91|93|94|96|97|98|120|121|122|123|124|125|126|127|128|129|162|163|164|165|166|167|168|169|86|88|89|32|33|34|35|36|37|38|39|70|76|77|78|79|81|82|83|84|85)\d{7}$/;

function showPhonezxEdit() {
    hideAllEdit();
    var id = "phonezx";

    zm("#" + id).hide();

    //    zm("#"+id+"_edit").html(zm("#"+id+"_edit_fake").html());
    //reset input
    zm("#phonezx1").val("");
    zm("#phonezx2").val("");
    zm("#phonezx3").val("");

    zm("#" + id + "_edit").show();
    zm("#phonezx_edit #loading").hide();
    zm("#" + id + "_edit_form").show();
    zm("#" + id + "_edit .Notice").hide();
    zm(".warning").html("&nbsp;");
    try{
        resizeIframe();
    }catch (err) {
        return
    } 
}
function hidePhonezxEdit() {
    var id = "phonezx";

    zm("#" + id + "_edit").hide();
    zm("#" + id + "_edit_form").hide();
    zm("#" + id + "_error").html("&nbsp;");
    zm("#phonezx_edit #loading").hide();
    zm("#" + id).show();
    try{
        resizeIframe();
    }catch (err) {
        return
    } 
}
function validPhonezx(phonezx1, phonezx2, phonezx3) {
    isValid = true;
    //Check empty
    if (phonezx1 == "" && phonezx2 == "" && phonezx3 == "") {
        zmIdContent.showError("phonezx1_error", errMsg.require_err);
        isValid = false;
    }

    //Valid phone number
    if (phonezx1 != "" && !regexPhone.test(phonezx1)) {
        zmIdContent.showError("phonezx1_error", errMsg.Phone_invalid);
        isValid = false;
    }
    if (phonezx2 != "" && !regexPhone.test(phonezx2)) {
        zmIdContent.showError("phonezx2_error", errMsg.Phone_invalid);
        isValid = false;
    } else if (phonezx2 == phonezx1 && phonezx2 != "") {
        zmIdContent.showError("phonezx2_error", errMsg.Phone_thesame);
        isValid = false;
    }

    if (phonezx3 != "" && !regexPhone.test(phonezx3)) {
        zmIdContent.showError("phonezx3_error", errMsg.Phone_invalid);
        isValid = false;
    } else if (((phonezx3 == phonezx1) || (phonezx3 == phonezx2)) && phonezx3 != "") {
        zmIdContent.showError("phonezx3_error", errMsg.Phone_thesame);
        isValid = false;
    }
    return isValid;
}
function updatePhonezx() {
    var id = "#phonezx_edit";


    // Hide notes
    zm(id + " .warning").html("&nbsp;");

    // Show all errors about required fields

    var phonezx1 = zm("#phonezx1").val();
    var phonezx2 = zm("#phonezx2").val();
    var phonezx3 = zm("#phonezx3").val();
    if (validPhonezx(phonezx1, phonezx2, phonezx3)) {
        zm(id + " #loading").show();
        var params = {
            action: "phonezx.update",
            phonezx1: phonezx1,
            phonezx2: phonezx2,
            phonezx3: phonezx3
        };
        params = zm.param(params);
        //        zm.getJSON(zid.baseUrl+"/infosetting/otservice/updatephonezx?"+params, function(data){  
        zm.getJSON(zid.baseUrl + "/infosetting/phonezx/update?" + params, function(data) {
            zm(id + " #loading").hide();
            if (data.error == "0") {
                var content = '<div class="updatemsg"><span class="checkdoneicn"></span>Cập nhật thông tin thành công</div>';
                zm.Boxy.alert(content, "", 1500, {
                    footer: false,
                    contentClass: 'title-alert'
                });
                setTimeout(function() {
                    location.reload();
                }, 1500);
            }
            else {
                zmIdContent.showError("phonezx_edit #phonezx" + data.error + "_error", data.msg);
            }
        });
    }
    return false;
}

// CONFIRM PHONE PROTECT
var ConfirmBoxy = new zm.Boxy({
    title: "Liên kết tài khoản",
    autoFocus: false,
    footer: true,
    okButton: "Đồng ý",
    cancelButton: "Bỏ qua",
    animated: false
})
function chkPhonePwd(event) {
    if (event.keyCode == 13)
    {
        var pwd = zm("#phone_pwd").val();
        if (pwd == "" || pwd.length > 32 || pwd.length < 4) {
            zmIdContent.showError("phone_pwd_error", "Vui lòng nhập mật khẩu từ 4 đến 32 ký tự");
            return false;
        }
        doConfirmPhone();
    }
    else {
        zm(".Notice").hide();
    }
    return false;
}
function showConfirmPhone() {
    var content = "<p class=\"boxy_ptext\" style=\"width:450px;\" >Hệ thống sẽ gửi tin nhắn \"MÃ XÁC MINH\" tới số điện thoại của bạn<br>\n\
                        Nhập mật khẩu Zing ID để tiếp tục</p>\n\
			<div class=\"sociallogin_form\">\n\
			<p class=\"finput\"><input id=\"phone_pwd\" class=\"input_login\" onkeypress='chkPhonePwd(event);' type=\"password\" placeholder=\"Mật khẩu\"></p>\n\
                        <div class=\"sformbottom\">\
                        <a class=\"sformforgot\" href=\"" + forgotpwdUrl + "\">Quên mật khẩu?</a>\
                        <p class=\"connt_error_msg\" id =\"phone_pwd_error\">&nbsp;</p>\
                        </div></div>";

    ConfirmBoxy.changeSettings({
        title: "Xác minh Số điện thoại bảo vệ",
        onOk: doConfirmPhone,
        content: content
    });
    ConfirmBoxy.show();
    zm("#phone_pwd").focus();
}
function doConfirmPhone() {
    var pwd = zm("#phone_pwd").val();
    if (pwd == "" || pwd.length > 32 || pwd.length < 4) {
        zmIdContent.showError("phone_pwd_error", "Vui lòng nhập mật khẩu từ 4 đến 32 ký tự");
        return false;
    }
    var params = {
        pwd: pwd,
        apikey: zid.apikey,
        pid: zid.pid
    };
    params = zm.param(params);
    var url = zid.baseUrl + "/infosetting/security/confirmphone?" + params;
    zm.getJSON(url, function(data) {
        if (data.error == "0") {
            window.location = data.msg;
        } else if (data.error == "1") {
            zmIdContent.showError("phone_pwd_error", data.msg);
            return false;
        }
        else {
            zm.Boxy.alert("<div style=\"padding: 20px 30px;\">Quá trình kết nối bị gián đoạn. Vui lòng thử lại.</div>", "Thông báo", 1000, {
                okButton: "Đồng ý"
            });

        }
        return false;
    });
    return false;
}
function lineItem(parent) {
    var div = parent[0];
    zm(div.children[0]).attr("disabled", "true");
    zm(div.children[0]).attr("checked", "");
    zm(div.children[0]).val("");
    zm(div.children[1]).css("text-decoration", "line-through");
    zm(div.children[2]).hide();
    zm(div.children[3]).show();
}
function unlineItem(parent) {
    var div = parent[0];
    zm(div.children[0]).attr("disabled", "");
    //zm(div.children[0]).val( zm(div.children[4]).html());
    zm(div.children[0]).val(zm(div.children[1]).attr("value"));
    zm(div.children[1]).css("text-decoration", "");
    zm(div.children[2]).show();
    zm(div.children[3]).hide();
}



setTimeout(function() {
    // Tooltip quesmark_cmnd
    zm("#quesmark_cmnd").hover(function() {
        zm("#cmnd_tooltip").show();
    });
    zm("#quesmark_cmnd").mouseleave(function() {
        zm("#cmnd_tooltip").hide();
    });
    zm("#quesmark_phonezx").hover(function() {
        zm("#phonezx_tooltip").show();
    });
    zm("#quesmark_phonezx").mouseleave(function() {
        zm("#phonezx_tooltip").hide();
    });
    zm("#quesmark_smsproduct").hover(function() {
        zm("#smsproduct_tooltip").show();
    });
    zm("#quesmark_smsproduct").mouseleave(function() {
        zm("#smsproduct_tooltip").hide();
    });
    zm("#quesmark_emailpro").hover(function() {
        zm("#emailpro_tooltip").show();
    });
    zm("#quesmark_emailpro").mouseleave(function() {
        zm("#emailpro_tooltip").hide();
    });
    zm("#quesmark_phonepro").hover(function() {
        zm("#phonepro_tooltip").show();
    });
    zm("#quesmark_phonepro").mouseleave(function() {
        zm("#phonepro_tooltip").hide();
    });
    zm("#quesmark_gc").hover(function() {
        zm("#gc_tooltip").show();
    });
    zm("#quesmark_gc").mouseleave(function() {
        zm("#gc_tooltip").hide();
    });
    zm("#quesmark_qna").hover(function() {
        zm("#qna_tooltip").show();
    });
    zm("#quesmark_qna").mouseleave(function() {
        zm("#qna_tooltip").hide();
    });
    // Submit by Enter


    // Add ZT
    function __zt() {
        if (typeof (window.zt) != "undefined") {
            window.zt.dT()
        } else {
            setTimeout(__zt, 1000)
        }
    }
    if (document.getElementById("zmzt") == undefined) {
        var _zmzt = document.createElement("script");
        _zmzt.id = "zmzt";
        _zmzt.name = "zmzt";
        _zmzt.type = "text/javascript";
        _zmzt.src = "https://stc-id.zing.vn/login/js/zt-1.04-1.min.js";
        document.getElementsByTagName("head")[0].appendChild(_zmzt);
        setTimeout(__zt, 500)
    }
}, 500)
zm.ready(function() {
    function gotoRequirePage() {
        window.location = requireUrl + "?apikey=" + zid.apikey + "&pid=" + zid.pid;
    }
    if (zm.cookie("justreg") == "2") {
        // if justreg -> set cookie =1 & show boxy    
        zm.cookie("justreg", "1", {
            domain: ".id.zing.vn"
        });
        var content = '<div style="text-align: center;font-size: 13px;">\n\
                    <h2>Chúc mừng bạn!</h2>\
                    <h3>Bạn đã đăng ký Zing ID thành công</h3>\n\
                    <p><i>Bạn có thể sử dụng tài khoản này để đăng nhập tại tất cả các sản phẩm của VNG.</i></p>  \n\
                    <p><strong>Lưu ý:</strong><i> Nhấn "Cập nhật" để bổ sung thêm thông tin bảo vệ tài khoản của bạn.</i></p>\n\
                    </div>';
        var boxy = new zm.Boxy({
            title: "Thông báo",
            autoFocus: false,
            footer: true,
            okButton: "Cập nhật",
            cancelButton: "Đóng",
            animated: false,
            content: content,
            onOk: gotoRequirePage
        });
        boxy.show();
    } else if ((zm.cookie("justreg") == "1") || (zm.cookie("justreg") == "2")) {
        showTicketNewReg();
    }
});
