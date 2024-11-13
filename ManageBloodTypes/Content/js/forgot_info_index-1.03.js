/**
 * When focus on sAliasName again, disapear error message.
 */
zm("#sAliasName").focus(function () {
    if (this.value == '') {
        hideError2("sAliasName");
    }
});

/**
 * When leave from sAliasName, validate it and show error if it exist.
 */
zm("#sAliasName").blur(function () {
    if (checkAliasName()) {
        hideError2("sAliasName");
        showValidIcon("sAliasName");
        if (checkPhone("sAliasName")) {
            zm("#acnLikePhone").show();
            zm("#acnLikePhone_check").focus();
        } else {
            zm("#acnLikePhone_check").attr("checked", false);
            zm("#acnLikePhone").hide();
        }
    } else {
        zm("#acnLikePhone_check").attr("checked", false);
        zm("#acnLikePhone").hide();
    }
});

/**
 * Check alias name input. It may be a username, email or phone number.
 * @returns {Boolean} true or false
 */
function checkAliasName() {

    // If no input is specified, hide error message
    var aliasName = zm("#sAliasName").val();
    if (aliasName == '') {
        hideError2("sAliasName");
        return false;
    }

    // Check special characters
    if (!checkInvalidSpecialChars(aliasName)) {
        showError2('sAliasName', AliasName_Error[0]);
        return false;
    }

    // Check ending character
//    if (!checkAliasNameCharEnd(aliasName)) {
//        showError2('sAliasName', AliasName_Error[0]);
//        return false;
//    }

    // Check account length
    if (!checkValidLength(aliasName, 4, 100)) {
        showError2('sAliasName', AliasName_Error[0]);
        return false;
    }

    // Check Viet Nam characters
    if (!checkPassVietnam(aliasName)) {
        showError2('sAliasName', AliasName_Error[0]);
        return false;
    }

    // Check characters continuous
    if (!checkAliasNameCharContinuous(aliasName)) {
        showError2('sAliasName', AliasName_Error[0]);
        return false;
    }

    // Default result
    hideError2("sAliasName");
    return true;
}

/**
 * Check ending character must be different with dot ('.') and underline ('_').
 * @param {String} aliasName
 * @returns {Boolean} true or false
 */
function checkAliasNameCharEnd(aliasName) {
    if (aliasName.charAt(aliasName.length - 1) == '.'
            || aliasName.charAt(aliasName.length - 1) == '_') {
        return false;
    }
    return true;
}

/**
 * Check alias name contains invalid characters continuous.
 * @param {String} aliasName
 * @returns {Boolean} true or false
 */
function checkAliasNameCharContinuous(aliasName) {
    if (aliasName.indexOf('._') != -1 || aliasName.indexOf('_.') != -1
            || aliasName.indexOf('__') != -1 || aliasName.indexOf('..') != -1) {
        return false;
    }
    return true;
}

/**
 * When focus on sVerifyCode again, disapear error message.
 */
zm("#sVerifyCode").focus(function () {
    if (this.value == '') {
        hideError2("sVerifyCode");
    }
});

/**
 * When key up at sVerifyCode, validate its characters.
 */
zm("#sVerifyCode").keyup(function (event) {

    // Check captcha when user input enough 6 characters
    if (this.value.length == 6) {
        if (!checkImageSecurityChars(this.value, true)) {
            showError2("sVerifyCode", Verify_Error[0]);
            return;
        }

        hideError2("sVerifyCode");
        if (event.which != 13) {
            showValidIcon("sVerifyCode");
        }
    }
});

/**
 * Check form is valid or not.
 * @returns {Boolean} true or flase
 */
function checkValidForm() {

    // Validate username
    if (zm('#sAliasName').val() == '') {
        showError2('sAliasName', Require_Error);
    } else {
        checkAliasName();
    }

    // Validate captcha
    var sVerifyCode = zm('#sVerifyCode').val();
    if (sVerifyCode == '') {
        showError2('sVerifyCode', Require_Error);
    } else if (sVerifyCode.length != 6 || !checkImageSecurityChars(sVerifyCode, true)) {
        showError2("sVerifyCode", Verify_Error[0]);
    }

    // Return result
    var sVerifyCodeErr = zm("#sVerifyCode_err").html();
    var sAliasNameErr = zm("#sAliasName_err").html();
    if (sVerifyCodeErr != '&nbsp;' || sAliasNameErr != '&nbsp;') {
        return false;
    }
    zm("#frmForgotInfo").submit();
    return true;
}

/**
 * Process when load page.
 */
zm.ready(function () {

    // Show error messages from server if they exist
    var errAlias = zm("#errAlias").val();
    if (errAlias != "") {
        showError2('sAliasName', AliasName_Error[errAlias]);
    }

    var errCaptcha = zm("#errCaptcha").val();
    if (errCaptcha != "") {
        showError2('sVerifyCode', Verify_Error[errCaptcha]);
    }

    // Show checked option
    var forgotType = zm("#forgotType").val();
    if (forgotType == "gamecode") {
        zm("#forgotTypeGamecode").attr("checked", "checked");
    } else if (forgotType == "otpmobile") {
        zm("#forgotTypeOtpmobile").attr("checked", "checked");
    } else {    // Default forgot password is checked option
        zm("#forgotTypePassword").attr("checked", "checked");
    }
    refreshCaptcha2();
});

/**
 * Submit form when pressing enter.
 */
zm("#frmForgotInfo").keypress(function (event) {
    if (event.which == 13) {
        event.preventDefault();
        return checkValidForm();
    }
});

/**
 * Check phone number is valid or not.
 * @param {ElementId} objId
 * @returns {Boolean} true of false
 */
function checkPhone(objId) {

    // Check digit number
    var phoneNumber = trim(zm("#" + objId).val());
    if (phoneNumber == "") {
        return false;
    }
    if (!/^\d*$/.test(phoneNumber)) {
        return false;
    }

    // Check length
    if (!checkValidLength(phoneNumber, 10, 11)) {
        return false;
    }

    // Check Mobiphone, Vinaphone, Viettel
    if (!isValidPhonePrefix(phoneNumber)) {
        return false;
    }

    // Accepted
    return true;
}

/**
 * Helper function for checking prefix phone number.
 * @param {type} phoneNumber
 * @returns {Boolean} true or false
 */
function isValidPhonePrefix(phoneNumber) {
    var prefixPhone = new Array(
            // Mobile
            '090', '093', '0120', '0121', '0122', '0126', '0128','089',
            // Vinaphone
            '091', '094', '0123', '0124', '0125', '0127', '0129','088',
            // Viettel
            '096', '097', '098', '0162', '0163', '0164', '0165', '0166', '0167', '0168', '0169', '086');
    for (var i = 0; i < prefixPhone.length; i++) {
        if (phoneNumber.indexOf(prefixPhone[i]) == 0)
            return true;
    }
    return false;
}