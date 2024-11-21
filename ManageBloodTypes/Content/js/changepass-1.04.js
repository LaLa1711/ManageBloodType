/**
 * Use this file for view changepass.xtm.
 */

// Flag valid form
var strongPassword = true;      // Strong password is true if level password >= 2
var validNewPassword = true;
var validConfirmPassword = true;
var validOldPassword = true;

/**
 * Hide error message that is corresponding with an element. The element has to have an element to show error message.
 * @param {String} id - id of element
 * @returns {void}
 */
function hidePwdError(id) {
    var errId = "#" + zm("#" + id).attr('id') + "_err";
    //    zm(errId).hide();
    zm(errId).html("&nbsp;");
}
/**
 * Show error message that is corresponding with an element. The element has to have an element to show error message.
 * @param {String} id - id of element
 * @param {String} mess - error message
 * @returns {void}
 */
function showPwdError(id, mess) {
    var errId = "#" + zm("#" + id).attr('id') + "_err";
    zm(errId).html(mess);
//    zm(errId).show();
}

/**
 * Process when load page.
 */
zm.ready(function() {

    // Show error messages from server if they exist
    var errCaptcha = zm("#errCaptcha").val();
    if (errCaptcha != "") {
        showPwdError('sVerifyCode', Verify_Error[errCaptcha]);
    }

    var errOldPassword = zm("#errOldPassword").val();
    if (errOldPassword != "") {
        showPwdError('sOldPassword', Password_Error[errOldPassword]);
    }

    var errNewPassword = zm("#errNewPassword").val();
    if (errNewPassword != "") {
        showPwdError('new_password', Password_Error[errNewPassword]);
    }
});

/**
 * When focus on sOldPassword again, disapear error message.
 */
zm("#sOldPassword").click(function() {
    if (this.value == '') {
        hidePwdError('sOldPassword');
    }
});
/**
 * When focus on sOldPassword again, disapear error message.
 */
zm("#sOldPassword").keypress(function() {
    if (this.value == '') {
        hidePwdError('sOldPassword');
    }
});
/**
 * Process sOldPassword when user blur input tag.
 */
zm("#sOldPassword").blur(function() {
    if (this.value == '') {
        hidePwdError('sOldPassword');
        return;
    }

    // Check oldp password
    checkOldPassword(this);
});


/**
 * Check the old password is in valid format or not.
 * @param {Element} obj
 * @returns {Boolean} true or false
 */
function checkOldPassword(obj) {

    // Must not contain Vietnam characters
//    if (!checkPassVietnam(obj.value)) {
//        validOldPassword = false;
//        return showPwdError(obj.id, Password_Error[0]);
//    }

    // Check length
    if (!checkValidLength(obj.value, 6, 32)) {
        validOldPassword = false;
        return showPwdError(obj.id, Password_Error[1]);
    }

    // Accepted
    if (obj.value) {
        validOldPassword = true;
        showValidIcon(obj.id);
    }
    hidePwdError(obj.id);
    return true;
}

/**
 * When focus on sVerifyCode again, disapear error message.
 */
zm("#sVerifyCode").focus(function() {
    if (this.value == '') {
        hidePwdError("sVerifyCode")
    }
});

/**
 * When key up at sVerifyCode, validate its characters.
 */
zm("#sVerifyCode").keyup(function() {

    // Check captcha when user input enough 6 characters
    if (this.value.length == 6) {
        if (!checkImageSecurityChars(this.value, true)) {
            showPwdError("sVerifyCode", Verify_Error[0]);
            return;
        }

        hidePwdError("sVerifyCode")
        showValidIcon("sVerifyCode");
    }
});

/**
 * Hide error when user focus on new_password again.
 */
zm("#new_password").focus(function() {
    zm("#new_password_note").show();
    if (this.value == '') {
        hidePwdError('new_password');
        zm("#new_password_note").show();
    }
});

/**
 * Process new_password when user blur input tag.
 */
zm("#new_password").blur(function() {
    // Hide guide password when user input
    zm("#new_password_note").hide();
    if (this.value == '') {
        hidePwdError('new_password');
        return;
    }

    

    // Check password
    showPasswordLevel(this.value);
    checkNewPassword(this);
});

/**
 * Reset confirm_password if new_password change.
 */
zm("#new_password").change(function() {
    zm("#confirm_password").val('');
    hidePwdError('confirm_password');
});

/**
 * Check password every key up.
 */
zm("#new_password").keyup(function() {

    // Password must not contain VietNam characters
//    if (!checkPassVietnam(this.value)) {
//        resetLevel();
//        validNewPassword = false;
//        return showPwdError(this, Password_Error[0]);
//    }

    // Show password level when its length is [6,32]
    if (this.value.length < 6) {
        resetLevel();
        return false;
    }
    showPasswordLevel(this.value);
});

/**
 * Show password level at tag <div class="stronglevel">.
 * @param {String} password
 * @returns {void}
 */
function showPasswordLevel(password) {

    // Get password level array
    var levelArr = passwordLevel(password);
    if (levelArr) {

        // Calculate level
        var level = 0;
        for (var i = 0; i < 4; i++) {
            if (levelArr[i] == 1) {
                level += 1;
            }
        }

        // Set global variable: strongPassword
        if (level >= 1) {
            strongPassword = true;
        } else {
            strongPassword = false;
        }

        // Show level password
        for (var i = 1; i <= level; i++) {
            zm("#level" + i).addClass("level");
        }

        // Hide higher level password
        for (var k = level + 1; k <= 4; k++) {
            zm("#level" + k).removeClass("level");
        }
    } else {
        resetLevel();
    }
}

/**
 * Reset strong level bar.
 * @returns {void}
 */
function resetLevel() {
    zm('#level1').removeClass('level');
    zm('#level2').removeClass('level');
    zm('#level3').removeClass('level');
    zm('#level4').removeClass('level');
}

/**
 * Check password is valid or not.
 * @param {Element} obj - object contains the password string
 * @returns {Boolean} true is valid, false is invalid
 */
function checkNewPassword(obj) {

    // Password must not contain Vietnam characters
//    if (!checkPassVietnam(obj.value)) {
//        validNewPassword = false;
//        return showPwdError(obj.id, Password_Error[0]);
//    }

    // Check password length
    if (!checkValidLength(obj.value, 6, 32)) {
        validNewPassword = false;
        return showPwdError(obj.id, Password_Error[1]);
    }

    // Password is not enough strong
    if (!strongPassword) {
        validNewPassword = false;
        return showPwdError(obj.id, Password_Error[2]);
    }

    // Accepted password
    if (obj.value) {
        validNewPassword = true;
        showValidIcon(obj.id);
    }
    hidePwdError(obj.id);

    // Check password is safe by AJAX call
    checkSafePassword(obj.value);
}

/**
 * Check password is safe or not.
 * @returns {void}
 */
function checkSafePassword(password) {

    // Prepare data
    var params = {
        "p": password
    };
    var url = "https://id.zing.vn/ajax/checkpwd";

    // Ajax call to check safe password
    zm.post(url, params, {
        dataType: "json"
    }, function(data) {

        // Unsafe password
        if (data != null && data.code != "0") {
            validNewPassword = false;
            showPwdError("new_password", Password_Error[13]);
        }
    });
}

/**
 * Hide error when user focus on confirm_password textbox again.
 */
zm("#confirm_password").focus(function() {
    if (this.value == '') {
        hidePwdError("confirm_password")
    }
});

/**
 * Check confirm new password.
 */
zm("#confirm_password").blur(function() {
    if (this.value == '') {
        hidePwdError("confirm_password")
    } else {
        return checkConfirmNewPassword(this);
    }
});

/**
 * Check confirm password is valid or not.
 * @param {Element} obj - object contains confirm password string
 * @returns {Boolean} true or false
 */
function checkConfirmNewPassword(obj) {

    // If new password length is invalid, do nothing
    if (!checkValidLength(zm("#new_password").val(), 6, 32)) {
        return false;
    }

    // Don't match
    if (zm("#new_password").val() != obj.value) {
        validConfirmPassword = false;
        return showPwdError(obj.id, Password_Error[3]);
    }

    // Show valid icon
    if (obj.value) {
        validConfirmPassword = true;
        showValidIcon("confirm_password");
    }
    hidePwdError(obj.id);
    return true;
}
function reLoad(){
    window.location.reload();
}
function appendPwdToken() {
    zm.getJSON("/ajax/gentoken", function(data) {
        if (data.code == "0") {
            //append token here
            zm("#pwd_tokenExpire").val(data.msg);

        }
        else {
            location.reload();
        }
    });
}
/**
 * Check form is valid or not.
 * @returns {Boolean} true or flase
 */
function pwd_checkValidForm() {
    var isValid = true;
    // Hide notes
    zm("#new_password_note").hide();

    // Show all errors about required fields
    var listRequiredInput = new Array('sOldPassword', 'new_password', 'confirm_password', 'sVerifyCode');
    for (var i = 0; i < listRequiredInput.length; i++) {
        if (zm('#' + listRequiredInput[i]).val() == '') {
            showPwdError(listRequiredInput[i], Require_Error);
            isValid = false;
        }
    }

    // Password must be different with old password
    var newPassword = zm("#new_password").val();
    var oldPassword = zm("#sOldPassword").val();
    if (newPassword != '' && newPassword == oldPassword) {
        showPwdError('new_password', Password_Error[6]);
        isValid = false;
    } else if (zm("#new_password_err").css("display") != 'none'
        && zm("#new_password_err").html() == Password_Error[7]) {
        hidePwdError('new_password');
        isValid = false;
    }

    // Confirm password doesn't match
    if (zm("#confirm_password").val() != '' && zm("#new_password").val() != zm("#confirm_password").val()) {
        showPwdError('confirm_password', Password_Error[3]);
        isValid = false;
    }

    // Validate captcha
    var sVerifyCode = zm('#sVerifyCode').val();
    if (sVerifyCode == '') {
        showPwdError('sVerifyCode', Require_Error);
        isValid = false;
    } else if (sVerifyCode.length != 6 || !checkImageSecurityChars(sVerifyCode, true)) {
        showPwdError("sVerifyCode", Verify_Error[0]);
        isValid = false;
    }

    // Return result
    if (!validNewPassword || !validConfirmPassword || !validOldPassword) {
        isValid = false;
    }
    return isValid;
}

function showPwdEdit() {
    hideAllEdit();
    var id = "pwd";

    // hide warning - icon - note  
    zm("#new_password_note").hide();
    resetLevel();
    refreshCaptcha2();
    zm(".check_icon").hide();
    zm("#" + id + "_error").html("&nbsp;");
    zm("#pwd_edit .warning").html("&nbsp;");

    //reset input
    zm("#sOldPassword").val("");
    zm("#new_password").val("");
    zm("#confirm_password").val("");

    //show content
    zm("#" + id).hide();
    // append token
    appendPwdToken();
    zm("#frm_pwd").reset();//frm_pwd
    zm("#pwd_edit_form #loading").hide();
    zm("#" + id + "_edit_form").show();

    zm("#sOldPassword").focus();
     try{
        resizeIframe();
    }catch (err) {
        return
    }
}
function hidePwdEdit() {
    var id = "pwd";

    zm("#" + id + "_edit_form").hide();
    zm("#pwd_edit_form #loading").hide();
    zm("#" + id).show();
     try{
        resizeIframe();
    }catch (err) {
        return
    }
}
function reLoad() {
    window.location.reload();
}
function updatePwd() {
    var id = "#pwd_edit";

    // hide warning - icon - note 
    zm("#new_password_note").hide();


    if (!pwd_checkValidForm()) {
        return false;
    }
    zm(id + "_error").html("&nbsp;");
    zm(".check_icon").hide();
    zm("#pwd_edit .warning").html("&nbsp;");

    var newPassword = zm("#new_password").val();
    var oldPassword = zm("#sOldPassword").val();
    var confirmPassword = zm("#confirm_password").val();
    var sVerifyCode = zm('#sVerifyCode').val();

    zm("#pwd_edit_form #loading").show();
    var params = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
        captcha: sVerifyCode,
        tokenCaptcha: zm("#tokenCaptcha").val(),
        tokenExpire: zm("#pwd_tokenExpire").val(),
        apikey: zid.apikey,
        pid: zid.pid
    };
    params = zm.param(params);
    zm.getJSON(zid.baseUrl+"/changepass/update?" + params, function(data) {
        if (data.error == "0") {
            zm("#pwd_edit_form #loading").hide();            
            zm.Boxy.alert('<div class="updatemsg-notradius"><span class="checkdoneicn"></span>Đổi mật khẩu thành công. Vui lòng đăng nhập lại.</div>', "Thông báo", false, {
                okButton: "Đồng ý",
                onOk: reLoad
            }, 5000);
        //            setTimeout(function() {
        //                window.location.reload();
        //            }, 1000);
        }
        else if (data.error == "-1") {
            zm("#pwd_edit_form #loading").hide();
            zm.Boxy.alert(data.msg, "Thông báo", false, {
                okButton: "Đóng",
                onOk : reLoad
            });
            setTimeout(function() {
                location.reload();
            }, 5000);
        }
        else {
            zm("#pwd_edit_form #loading").hide();
            zm("#new_password").val("");
            zm("#sOldPassword").val("");
            zm("#confirm_password").val("");
            zm("#sVerifyCode").val("");

            // append token
            appendPwdToken();
            refreshCaptcha2();
            resetLevel();

            zm("#frm_pwd").reset();//frm_pwd

            zm('#pwd_edit_form [rel="' + data.error + '"]').html(data.msg);
            zm('#pwd_edit_form [rel="' + data.error + '"]').show();

            zm("#sOldPassword").focus();
        }
    });
    return false;
}
setTimeout(function() {
    zm("#sVerifyCode").keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            updatePwd();
        }
    });
}, 500)

