var zmContent = {
    showError : function(id,content){
        zm("#"+id).html(content);
        zm("#"+id).show();
        return false;
    }
}
function enterPressed(evn) {
    if (window.event && window.event.keyCode == 13) {
        zid_oauth.doUpdate();
    } 
}
function replaceAll(string, token, newtoken) {
    if(token!=newtoken)
        while(string.indexOf(token) > -1) {
            string = string.replace(token, newtoken);
        }
    return string;
}
//OAUTH
var zid_oauth = {
    idxUrl : 'http://idx.me.zing.vn',
    baseUrl :  'https://id.zing.vn/xlogin',
    provider : null, 
    apikey : "",
    pid: "",
    data : "", 
    callback : "", 
    logincb : function(){
        location.reload();  
    },
    regcb : function(){
        location.reload();  
    },
    boxy : new zm.Boxy({
        title :"Đồng bộ tài khoản",
        autoFocus: false,
        footer:true,
        okButton : "Đồng ý",         
        cancelButton : "Bỏ qua",         
        animated : false			
    }),
    openIdUrl : 'https://id.zing.vn/openid',
    forgotinfoUrl : 'https://id.zing.vn/v2/forgotinfo',
    openPopupYahoo : function () {
        setTimeout(function() {            
            var zmxcid = zmXCall.getXCallID();
            var url = "https://id.zing.vn/openid?apikey="+zid_oauth.apikey+"&reg=true&t=" + Math.floor(Math.random()*10000)+"&zmxcid=" + zmxcid;
            var newWindow = window.open(url,'_blank','height=500,width=500,left=400, top=180','resizable=yes','scrollbars=no','toolbar=no','status=no');
            return newWindow;
        }, 500);
    }, 
    openPopupForYahoo : function () {
        setTimeout(function() {            
            var zmxcid = zmXCall.getXCallID();
            var url = "https://id.zing.vn/openid?apikey="+zid_oauth.apikey+"&callback=openidRegisterCallback&t=" + Math.floor(Math.random()*10000)+"&zmxcid=" + zmxcid;
            var newWindow = window.open(url,'_blank','height=500,width=500,left=400, top=180','resizable=yes','scrollbars=no','toolbar=no','status=no');
            return newWindow;
        }, 500);
    }, 
    openPopup : function (provider) { 
        if (provider == "yahoo"){
            zid_oauth.openPopupForYahoo();
            return;
        }
        setTimeout(function() {
            var zmxcid = zmXCall.getXCallID();
            var callback = zid_oauth.baseUrl + "/oauthcb?apikey="+zid_oauth.apikey+"&zmxcid=" + zmxcid ;
            var url = zid_oauth.idxUrl + "/oauth/dialog?provider="+provider+"&callback="  + encodeURIComponent(callback) + "&t=" + Math.floor(Math.random()*10000);
            var newWindow = window.open(url,'_blank','height=500,width=500,left=400, top=180','resizable=yes','scrollbars=no','toolbar=no','status=no');
            return newWindow;
        }, 500);
    }, 
    showReg : function(resp){
        zid_oauth.data = resp.oauthData;
        zid_oauth.boxy.changeSettings({
            onOk : zid_oauth.doOauthReg,   
            title :"Đăng ký Tài khoản Zing ID",
            footer:true,          	
            content :resp.data			
        });
        zid_oauth.boxy.show();    
    },
    doOauthReg : function(){
        var content='<div style="text-align: center;font-size: 13px;padding: 5px 50px;"><strong>Đang tiến hành đồng bộ dữ liệu. Vui lòng chờ</strong></div>\
                        <p align="center"><img src="https://stc-id.zing.vn/images/load_small.gif" alt="" /></p>';
        zid_oauth.boxy.changeSettings({       
            closeButton : false,   
            footer:false,          	
            content :content			
        });
        zid_oauth.boxy.show();  
        var url =zid_oauth.baseUrl+"/oauthreg?data="+zid_oauth.data;
        zm.getJSON(url, function(data){
            zid_oauth.boxy.show();  
            if (data.code ==="error"){ 
                zid_oauth.boxy.hide();
                zm.Boxy.alert("Quá trình kết nối bị gián đoạn. Vui lòng thử lại.","Thông báo", false,{
                    okButton: "Đồng ý"
                }); 
            }         
            else {// Register success
                zid_oauth.regcb(data.acn,data.zid,data.uin);  
            }  
        })               
    },
    doOpenidReg : function(){        
        var content='<div style="text-align: center;font-size: 13px;padding: 5px 50px;"><strong>Đang tiến hành đồng bộ dữ liệu. Vui lòng chờ</strong></div>\
                        <p align="center"><img src="https://stc-id.zing.vn/images/load_small.gif" alt="" /></p>';
        zid_oauth.boxy.changeSettings({       
            closeButton : false,   
            footer:false,          	
            content :content			
        });
        zid_oauth.boxy.show();  
        var url =zid_oauth.baseUrl+"/openidreg?data="+zid_oauth.data;
        zm.getJSON(url, function(data){  
            zid_oauth.boxy.show();  
            if (data.code ==="error"){
                zid_oauth.boxy.hide();
                zm.Boxy.alert("Quá trình kết nối đến Yahoo bị gián đoạn. Vui lòng thử lại.","Thông báo", false,{
                    okButton: "Đồng ý"
                }); 
            }  
            else {// Register success
                zid_oauth.regcb(data.acn,data.zid,data.uin);  
            }
        })  
    },
    showRegMap : function(resp){
        zid_oauthdata = resp.oauthData;
        zid_oauthcallback = resp.data.callback;        
        var obj = JSON.parse(resp.data);
        zid_oauth.mapacc = obj.mapaccount;
        zid_oauth.strData = obj.strData;
        zid_oauth.provider = obj.provider;    
        
        var content ="<p class=\"boxy_ptext\" >Email <strong>" + obj.email+"</strong> đã được dùng để đăng ký Zing ID: <strong>"+obj.acn+"</strong> <br/>\
                            Bạn có muốn liên kết Zing ID này với tài khoản <span style=\"text-transform:capitalize\">"+zid_oauth.provider.toLowerCase()+"</span> của bạn ? <br/>\
                            </p><div class=\"sociallogin_form\">\
                            <p class=\"socialf_text\">Nhập mật khẩu Zing để xác nhận</p>\
                            <p class=\"finput\">\n\
                                <input onkeypress='zm(\".Notice\").hide();enterPressed();' type=\"password\" placeholder=\"Mật khẩu\" class=\"input_login\"  name=\"p\" id=\"map_pwd\"></p>\n\
                                <div class=\"sformbottom\"><a class=\"sformforgot\" href=\""+zid_oauth.forgotinfoUrl+"?apikey="+zid_oauth.apikey+"&pid="+zid_oauth.pid+"\">Quên mật khẩu?</a>\n\
                                <p class=\"connt_error_msg\" id =\"pwd_error\">&nbsp;</p>\n\
                                </div>\
                            </div>";
        zid_oauth.boxy.changeSettings({
            onOk : zid_oauth.doUpdate,    
            content : content			
        });
        zid_oauth.boxy.show();
        zm("#map_pwd").focus();
    },
    doUpdate : function (){
        var val =zid_oauthdata;           
        var pwd = zm("#map_pwd").val();
        if (pwd=="" || pwd.length > 32 || pwd.length < 6){
            zmContent.showError("pwd_error","Vui lòng nhập mật khẩu dài 6-32 ký tự, có ký tự chữ số, chữ hoa và chữ thường");
            return false;
        }
        //        zid_oauth.boxy.hide();
        //        var content='<div style="text-align: center;font-size: 13px;padding: 5px 50px;"><strong>Đang tiến hành đồng bộ dữ liệu. Vui lòng chờ</strong></div>\
        //                      <p align="center"><img src="https://stc-id.zing.vn/images/load_small.gif" alt="" /></p>//';
        //        zid_oauth.boxy.changeSettings({       
        //            closeButton : false,   
        //            footer:false,          	
        //            content :content			
        //        });
        //        zid_oauth.boxy.show();  
        var url = zid_oauth.baseUrl + "/doregmap?val="+val+"&acn="+zid_oauth.mapacc+"&provider="+zid_oauth.provider+"&pwd="+pwd;
        zm.getJSON(url, function(data){ 
            //            zid_oauth.boxy.show();  
            if (data.code !="error"){                      
                //                zid_oauth.boxy.hide();
                var content ='<div class="updatemsg"><span class="checkdoneicn"></span>Kết nối thành công.</div>';
                zm.Boxy.alert(content,"", 1000,{
                    footer:false,
                    contentClass:'title-alert'
                }); 
                setTimeout(function(){// Register success
                    zid_oauth.regcb(data.acn,data.zid,data.uin,"1");              
                }, 1000);
            }
            else {   
                if(data.msg!=""){   
                    //                    zid_oauth.boxy.hide();
                    zm.Boxy.alert(data.msg,"Thông báo", false,{
                        okButton: "Đồng ý"
                    }); 
                }
                else {
                    zid_oauth.boxy.hide();
                    zm.Boxy.alert("Quá trình kết nối bị gián đoạn. Vui lòng thử lại.","Thông báo", false,{
                        okButton: "Đồng ý"
                    }); 
                }
                                
            }
            return false;
        });   
        return false;
    }
};
function GetUrlValue(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
            return KeyValuePair[1];
        }
    }
    return "";
}
zid_oauth.apikey = GetUrlValue("apikey");
zid_oauth.pid = GetUrlValue("pid");
zmXCall.register('oauthCb', function(resp){
    if (resp.code === "success"){
        // login success
        var content='<div style="text-align: center;font-size: 13px;padding: 5px 50px;"><strong>Đang tiến hành kết nối. Vui lòng chờ</strong></div>\
                        <p align="center"><img src="https://stc-id.zing.vn/images/load_small.gif" alt="" /></p>';
        zid_oauth.boxy.changeSettings({       
            closeButton : false,   
            footer:false,          	
            content :content			
        });
        zid_oauth.boxy.show();  
        setTimeout(function() {       
            zid_oauth.logincb(resp.acn,resp.zid,resp.uin);
        },500);
       
        return false;
    }
    else if (resp.code === "banned"){
        zm.Boxy.alert("<div style=\"text-align: center;\">Tài khoản "+resp.acn+" đã bị khóa.<br>Vui lòng liên hệ <strong>1900.561.558</strong> để được hỗ trợ.</div>","Thông báo", false,{
            okButton: "Đồng ý"
        }); 
    }
    else if (resp.code === "reg"){
        zid_oauth.showReg(resp);
    }else if (resp.code === "regmap"){
        zid_oauth.showRegMap(resp);
    }else if (resp.code === "error"){
        zm.Boxy.alert("Quá trình kết nối bị gián đoạn. Vui lòng thử lại.","Thông báo", false,{
            okButton: "Đồng ý"
        }); 
    }
    else {
        zm.Boxy.alert("Quá trình kết nối bị gián đoạn. Vui lòng thử lại.","Thông báo", false,{
            okButton: "Đồng ý"
        });
    }
    return;
}); 
zmXCall.register('openidRegisterCallback', function(resp) {
    if (resp.error !=0){
        zm.Boxy.alert("Quá trình kết nối bị gián đoạn. Vui lòng thử lại.","Thông báo", false,{
            okButton: "Đồng ý"
        }); 
    }
    else {         
        zid_oauth.data = resp.authdata;
        var url = zid_oauth.baseUrl + "/openidcb?data="+resp.authdata;
        zm.getJSON(url, function(data){ 
            if (data.error == 6){
                zm.Boxy.alert("<div style=\"text-align: center;\">Tài khoản "+data.acn+" đã bị khóa.<br>Vui lòng liên hệ <strong>1900.561.558</strong> để được hỗ trợ.</div>","Thông báo", false,{
                    okButton: "Đồng ý"
                });
                return false;
            } else if (data.error != 0){
                zm.Boxy.alert("Quá trình kết nối bị gián đoạn. Vui lòng thử lại.","Thông báo", false,{
                    okButton: "Đồng ý"
                }); 
                return false;
            }  
             
            if (data.login === "true"){
                if (data.callback === "undefined" || data.callback === ""){ }
                //login success
                var content='<div style="text-align: center;font-size: 13px;padding: 5px 50px;"><strong>Đang tiến hành kết nối. Vui lòng chờ</strong></div>\
                        <p align="center"><img src="https://stc-id.zing.vn/images/load_small.gif" alt="" /></p>';
                zid_oauth.boxy.changeSettings({       
                    closeButton : false,   
                    footer:false,          	
                    content :content			
                });
                zid_oauth.boxy.show();  
                setTimeout(function() {       
                    zid_oauth.logincb(data.acn,data.zid,data.uin);
                },500);
                return false;
            }
            else if (data.reg === "true"){
                var tmp = replaceAll(data.content,"\\","");
                zid_oauth.boxy.changeSettings({
                    onOk : zid_oauth.doOpenidReg,    
                    content : tmp			
                });
                zid_oauth.boxy.show();  
            }          
        })  
    }   
});

