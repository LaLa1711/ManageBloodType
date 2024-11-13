function generateImageTracking(action, type, appid, appname, itemid, where) {
    var serverdomain = document.getElementById("serverdomain").value;
    var acn = document.getElementById("acn").value;
    var img = document.createElement("img");
    img.style.width = "1px";
    img.style.heigth = "1px";

    img.src = serverdomain + "/tracking?action=" + action+ "&type=" + type + "&appid=" + appid + "&appname=" + appname
            + "&where=" + where + "&itemid=" + itemid  + "&acn=" + acn;
    return img;
}
function trackingClick(action,type, appid, appname, itemid, where) {
    var acn = document.getElementById("acn").value;
    $.ajax({
        type: "GET",
        url: "/v2/tracking?action=" + action +"&type=" + type+ "&appid=" + appid + "&appname=" + appname
                + "&where=" + where + "&itemid=" + itemid + "&acn=" + acn
    })
            .done(function(msg) {

            });
}