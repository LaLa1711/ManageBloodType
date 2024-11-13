/**
 * 
 * Use this file for all view.
 */

// Begin error messages declarations
var AliasName_Error = new Array(
        'Thông tin đăng nhập này không tồn tại, vui lòng kiểm tra lại.',
        'Tài khoản này đã bị khóa. Vui lòng liên hệ hotline 1900.561.558 để được hỗ trợ.'
        );
var Password_Error = new Array(
        'Không được nhập tiếng Việt có dấu.', // 0
	'Mật khẩu chưa đủ mạnh, phải có ký tự chữ số, chữ hoa, thường hoặc ký tự đặc biệt.', // 1
        'Vui lòng nhập mật khẩu dài 6-32 ký tự, có ký tự chữ số, chữ hoa và chữ thường.', // 2
        'Mật khẩu xác nhận không chính xác.', // 3
        'Mã game xác nhận không chính xác.', // 4
        'Mã game không được trùng Mật khẩu.', // 5
        'Mật khẩu mới và cũ không được trùng.', // 6
        'Mật khẩu không được trùng với mã game.', // 7
        'Không được trùng mã game hiện tại.', // 8
        'Cần có ít nhất 4 ký tự.', // 9
        'Mã game không đúng.', // 10
        'Mật khẩu không đúng.', // 11
        'Mã game không an toàn.', // 12
	'Mật khẩu chưa đủ mạnh, phải có ký tự chữ số, chữ hoa, thường hoặc ký tự đặc biệt.', // 13
        );
var Require_Error = 'Bạn cần nhập thông tin này.';
var Verify_Error = new Array(
        'Mã xác nhận hình ảnh không đúng.'
        );
var Qna_Error = new Array(
        'Câu hỏi hoặc câu trả lời không đúng.', // 0
        'Bạn chưa chọn câu hỏi.', // 1
        'Bạn chưa nhập câu trả lời.', // 2
        'Xác nhận câu trả lời không chính xác.'   // 3
        );
var Sms_Error = new Array(
        'Mã xác minh không đúng.', // 0
        'Phải là ký tự số.', // 1
        'Phải có 6 ký tự số.' // 2
        );
var Phone_Error = new Array(
        'Phải là ký tự số.', // 0
        'Phải có từ 10-11 ký tự số.', // 1
        'Chỉ sử dụng Mobifone, Vinaphone, Viettel.', // 2
        'Không được trùng với số điện thoại hiện tại.', // 3
        'Số điện thoại không đúng.' // 4
        );
var Cmnd_Error = new Array(
        'Phải có từ 8-15 ký tự.', // 0
        'Số CMND không đúng.' // 1
        );
var Email_Error = new Array(
        'Địa chỉ email không hợp lệ.', // 0
        'Không được trùng tên đăng nhập.', // 1
        'Email mới và email cũ không được trùng nhau.', // 2
        'Địa chỉ email không đúng.', //3
        'Địa chỉ email không tồn tại.' //4
        );
// End error messages declarations

// Note declarations
var PHONE_DESCRIPTION = 'Chỉ sử dụng Mobifone, Vinaphone, Viettel.<br/> Ví dụ: 0903123456 hoặc 01223123456';
var PHONE_DESCRIPTION2 = 'Chúng tôi sẽ gửi tin nhắn tới số điện thoại này để giúp bạn thay đổi Email Bảo vệ Tài khoản.';
// End note declarations
var captcha2_url = "https://captcha2.zing.vn/captcha2";

/**
 * Request a new captcha.
 */
function refreshCaptcha2() {

    zm.getJSON(captcha2_url + "/gettoken?publicKey=" + zid.apikey, function(data) {
        zm("#sVerifyImg").attr("src", captcha2_url + "/getcaptcha?publicKey=" + zid.apikey + "&token=" + data.token);
        zm("#tokenCaptcha").val(data.token);
    });
}
function refreshQnaCaptcha2() {

    zm.getJSON(captcha2_url + "/gettoken?publicKey=" + zid.apikey, function(data) {
        zm("#qna_sVerifyImg").attr("src", captcha2_url + "/getcaptcha?publicKey=" + zid.apikey + "&token=" + data.token);
        zm("#qna_tokenCaptcha").val(data.token);
    });

}

/**
 * Request a new captcha.
 */
function refreshCaptcha() {

    // Prepare data
    var token = zm("#tokenCaptcha").val();
    var params = {};
    var url = "https://id.zing.vn/ajax/getcaptcha?token=" + token;

    // Ajax call to get a new captcha
    zm.post(url, params, {dataType: "json"}, function(data) {

        // Display new captcha image
        if (data != null) {
            zm("#sVerifyImg").attr("src", data.captchaImg);
        }
    });
}

/**
 * Request a new captcha.
 */
function refreshQnaCaptcha() {

    // Prepare data
    var token = zm("#qna_tokenCaptcha").val();
    var params = {};
    var url = "https://id.zing.vn/ajax/getcaptcha?token=" + token;

    // Ajax call to get a new captcha
    zm.post(url, params, {dataType: "json"}, function(data) {

        // Display new captcha image
        if (data != null) {
            zm("#qna_sVerifyImg").attr("src", data.captchaImg);
        }
    });
}

/**
 * Check characters of the string must be in alphabet.
 * @param {String} str - string input
 * @param {Boolean} chkAll - true if check for both lowercase and uppercase, false if only check for lowercase
 * @returns {Boolean} true or false
 */
function checkImageSecurityChars(str, chkAll) {
    var re = /^[a-zA-Z0-9]*$/;
    if (chkAll) {
        re = /^[a-zA-Z0-9]*$/;
    }
    str = trim(str);
    if (str.length != 6) {
        return false;
    }
    var pos = str.search(re);
    if (pos === -1) {
        return false;
    }
    return true;
}

/**
 * Show element and fade out it in 2 seconds.
 * @param {String} id - id of element
 * @returns {Boolean} true
 */
function showValidIcon(id) {
    zm("#" + id + "_icon").show();
    zm("#" + id + "_icon").fadeOut(200);
    return true;
}

/**
 * Check the string doesn't contain VietNam characters.
 * @param {String} str
 * @returns {Boolean} true or false
 */
function checkPassVietnam(str) {
    for (i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) < 32 || str.charCodeAt(i) > 126)
            return false;
    }
    return true;
}

/**
 * Show error message that is corresponding with an element. The element has to have an element to show error message.
 * @param {String} id - id of element
 * @param {String} mess - error message
 * @returns {void}
 */
function showError(id, mess) {
    var errId = "#" + zm("#" + id).attr('id') + "_err";
    zm(errId).html(mess);
    zm(errId).show();
}

/**
 * Hide error message that is corresponding with an element. The element has to have an element to show error message.
 * @param {String} id - id of element
 * @returns {void}
 */
function hideError(id) {
    var errId = "#" + zm("#" + id).attr('id') + "_err";
    zm(errId).hide();
}

/**
 * Show error message that is corresponding with an element. 
 * The element has to have an element to show error message.
 * @param {String} id - id of element
 * @param {String} mess - error message
 * @returns {void}
 */
function showError2(id, mess) {
    var errId = "#" + zm("#" + id).attr('id') + "_err";
    zm(errId).html(mess);
}

/**
 * Hide error message that is corresponding with an element. 
 * The element has to have an element to show error message.
 * @param {String} id - id of element
 * @returns {void}
 */
function hideError2(id) {
    var errId = "#" + zm("#" + id).attr('id') + "_err";
    zm(errId).html("&nbsp;");
}

/**
 * Estimate the level of password.
 * @param {String} str - password
 * @returns {Array} level
 */
function passwordLevel(str) {
    if (str.length < 6)
        return null;

    var level = new Array(null, null, null, null);
    for (i = 0; i < str.length; i++) {
        // Lowercase
        if (checkCharLow(str.charCodeAt(i)))
            level[0] = 1;
        // Uppercase
        if (checkCharUp(str.charCodeAt(i)))
            level[1] = 1;
        // Number digit
        if (checkNum(str.charCodeAt(i)))
            level[2] = 1;
    }
    // Special characters
    if (!checkInvalidSpecialChars(str)) {
        level[3] = 1;
    }
    return level;
}

/**
 * Check a string is valid or not. If it contains invalid characters, the result is false.
 * @param {String} str
 * @returns {Boolean} true of false
 */
function checkInvalidSpecialChars(str) {
    for (i = 0; i < str.length; i++) {
        if ((str.charCodeAt(i) < 48 && str.charCodeAt(i) != 46
                && str.charCodeAt(i) != 45) || str.charCodeAt(i) > 122)
            return false;
        if (str.charCodeAt(i) > 57 && str.charCodeAt(i) < 64)
            return false;
        if (str.charCodeAt(i) > 90 && str.charCodeAt(i) < 97 && str.charCodeAt(i) != 95)
            return false;
    }
    return true;
}

/**
 * Check the string length is between [min, max] or not.
 * @param {String} str
 * @param {Integer} min
 * @param {Integer} max
 * @returns {Boolean} true or false
 */
function checkValidLength(str, min, max) {
    if ((str.length > 0 && str.length < min) || str.length > max) {
        return false;
    }
    return true;
}

/**
 * Check a string is a number or not.
 * @param {String} str
 * @returns {Boolean} true or false
 */
function checkStringIsNum(str) {
    for (i = 0; i < str.length; i++) {
        if (!checkNum(str.charCodeAt(i)))
            return false;
    }
    return true;
}

/**
 * Check a character is lowercase or not.
 * @param {char} c
 * @returns {Boolean} true or false
 */
function checkCharLow(c) {
    if ((c > 96 && c < 123) || c == 32) {
        return true;
    }
    return false;
}

/**
 * Check a character is uppercase or not.
 * @param {char} c
 * @returns {Boolean} true or false
 */
function checkCharUp(c) {
    if (c > 64 && c < 91)
        return true;
    return false;
}

/**
 * Check a character is a digit number or not.
 * @param {char} c
 * @returns {Boolean} true or false
 */
function checkNum(c) {
    if (c > 47 && c < 58)
        return true;
    return false;
}

/**
 * Check a string is a number or not.
 * @param {String} num - number string
 * @returns {Boolean} true or false
 */
function isNumber(num) {
    var pattern = /^\d+$/;
    if (num.match(pattern) != null)
        return true;
    return false;
}

/**
 * Trim a string.
 * @param {String} str
 * @returns {String} result
 */
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

/**
 * Validate personalId, often is CMND.
 * @param {String} personalId - often is CMND
 * @returns {Boolean} true is valid, false is invalid
 */
function checkPersonalId(personalId) {
    if (personalId.length < 8 || personalId.length > 15) {
        return false;
    }
    if (!checkInputCharsCMND(personalId)) {
        return false;
    }
    return true;
}

/**
 * Validate CMND.
 * @param {String} cmnd
 * @returns {Boolean} true is valid, false is invalid
 */
function checkInputCharsCMND(cmnd) {
    var pattern = /^[a-zA-Z0-9]*$/;
    if (cmnd.match(pattern) != null)
        return true;
    return false;
}

/**
 * Validate email.
 * @param {String} mailName
 * @param {String} mailDomain
 * @param {Integer} minlenMailName
 * @param {Integer} minlenMailDomain
 * @param {Integer} minlen
 * @param {Integer} maxlen
 * @returns {Boolean} true is valid, false is invalid
 */
function checkEmail(mailName, mailDomain, minlenMailName, minlenMailDomain, minlen, maxlen) {
    var sMailName = mailName.toLowerCase();
    var sMailDomain = mailDomain.toLowerCase();
    if (!sMailName || !sMailDomain)
        return false;

    if (sMailName.length < minlenMailName || sMailName.charAt(0) == '_'
            || sMailName.charAt(sMailName.length - 1) == '_'
            || sMailName.indexOf('._') != -1 || sMailName.indexOf('_.') != -1
            || sMailName.indexOf('__') != -1 || sMailName.indexOf('-') != -1) {
        return false;
    }

    if (sMailDomain.length < minlenMailDomain || sMailDomain.charAt(0) == '-'
            || sMailDomain.charAt(sMailDomain.length - 1) == '-'
            || sMailDomain.indexOf('.-') != -1 || sMailDomain.indexOf('-.') != -1
            || sMailDomain.indexOf('--') != -1 || sMailDomain.indexOf('_') != -1) {
        return false;
    }

    var email = sMailName + '@' + sMailDomain;
    if (email.length < minlen || email.length > maxlen) {
        return false;
    }

    if (email.indexOf('..') != -1 || email.indexOf('.@') != -1
            || email.indexOf('@.') != -1 || email.indexOf(':') != -1) {
        return false;
    }

    var re = /^([A-Za-z0-9\_\-]+\.)*[A-Za-z0-9\_\-]+@[A-Za-z0-9\_\-]+(\.[A-Za-z0-9\_\-]+)+$/;
    if (email.search(re) == -1) {
        return false;
    }
    return true;
}

/**
 * Get parameter from URL.
 * @param {String} name - the name of parameter
 * @returns {@exp;@call;decodeURIComponent}
 */
function getURLParameter(name) {
    return decodeURIComponent(
            (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
                    .exec(location.search) || [, ""])[1].replace(/\+/g, '%20'))
            || null;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    // 37: left, 39: right, 46: delete, 8: backspace, 35: end, 36: home
    if (charCode === 37 || charCode === 39 || charCode === 46 || charCode === 8
            || charCode === 35 || charCode === 36) {
        return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
