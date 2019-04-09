//兼容旧版本
if(_C4webSrvUrl.indexOf("weboperator/")==-1)
	_C4webSrvUrl=_C4webSrvUrl+"weboperator/";

var _C4ServiceTitle = "<small>Live</small> <big>Support</big>";
var _C4ServiceContact = "Chat";
var _C4ServiceMessage = "Message";
var _C4RefreshSecound=10000;
var _C4RefreshTry=0; 
var _C4RefreshDelay=30000;

function UrlDecode(str){ 
    var ret=""; 
    for(var i=0;i<str.length;i++)
    { 
        var chr = str.charAt(i); 
        if(chr == "+")
        { 
            ret+=" "; 
        }
        else if(chr=="%")
        { 
            var asc = str.substring(i+1,i+3); 
            if(parseInt("0x"+asc)>0x7f)
            { 
                ret+=asc2str(parseInt("0x"+asc+str.substring(i+4,i+6))); 
                i+=5; 
            }
            else
            { 
                ret+=asc2str(parseInt("0x"+asc)); 
                i+=2; 
            } 
        }
        else
        { 
            ret+= chr; 
        } 
    } 
    return ret; 
}
_C4SiteName=UrlDecode(_C4SiteName);

function _C4initServiceLang(){
    if (typeof(_C4Language) == "undefined"){_C4Language = "en-us";} //_C4nMode not exist
    _C4Language = _C4Language.toLowerCase();
    if(_C4Language=="zh-cn"|| _C4Language=="zh" || _C4Language=="zh-sg")
    {
        _C4ServiceTitle = "<small>实时</small><big>在线客服</big>";
            _C4ServiceContact = "洽谈";
            _C4ServiceMessage = "留言";
    }
    else if(_C4Language=="zh-tw"|| _C4Language=="zh-hk"|| _C4Language=="zh-mo")
    {
        _C4ServiceTitle = "<small>即時</small><big>線上客服</big>";
            _C4ServiceContact = "洽談";
            _C4ServiceMessage = "留言";
    }
    else if(_C4Language=="sv"|| _C4Language=="sv-fi"|| _C4Language=="sv-se"|| _C4Language=="ru" || _C4Language=="ru-md" || _C4Language=="ru-ru"||
        _C4Language=="nl"|| _C4Language=="nl-be" || _C4Language=="nl-nl"|| _C4Language=="ja"|| _C4Language=="ja-jp"|| _C4Language=="en-us" || 
        _C4Language=="en-nz" || _C4Language=="en-ie" || _C4Language=="en-au" || _C4Language=="en-bz" || _C4Language=="en-ph" || _C4Language=="en-029" || 
        _C4Language=="en-ca" || _C4Language=="en-zw" || _C4Language=="en-za" || _C4Language=="en-tt" || _C4Language=="en-jm" || _C4Language=="en-gb" ||
        _C4Language=="pt-br"|| _C4Language=="pt" || _C4Language=="pt-pt" || _C4Language=="es-es" || _C4Language=="es-ar" || _C4Language=="es-py" || 
        _C4Language=="es-pa" || _C4Language=="es-pr" || _C4Language=="es-bo" || _C4Language=="es-es tradnl" || _C4Language=="es-do" || 
        _C4Language=="es-ec" || _C4Language=="es-co" || _C4Language=="es-cr" || _C4Language=="es-hn" || _C4Language=="es-pe" || _C4Language=="es-mx" || 
        _C4Language=="es-ni" || _C4Language=="es-sv" || _C4Language=="es-gt" || _C4Language=="es-ve" || _C4Language=="es-uy" || _C4Language=="es-cl"|| 
        _C4Language=="es" || _C4Language=="pl" || _C4Language=="pl-pl" || _C4Language=="tr" || _C4Language=="tr-tr" || _C4Language=="de" || 
        _C4Language=="de-de" || _C4Language=="de-at" || _C4Language=="de-li" || _C4Language=="de-lu" || _C4Language=="de-ch"|| _C4Language=="hu" || 
        _C4Language=="hu-hu" || _C4Language=="da" || _C4Language=="da-dk")
    {
    }
    else
    {
        if (window.navigator.appName == "Netscape") //FrieFox
        {
            if(navigator.language.toLowerCase()=="zh-cn"||navigator.language.toLowerCase()=="zh"||navigator.language.toLowerCase()=="zh-sg")
            {
                _C4ServiceTitle = "<small>实时</small><big>在线客服</big>";
                _C4ServiceContact = "洽谈";
                _C4ServiceMessage = "留言";
            }
            else if(navigator.language.toLowerCase()=="zh-tw"||navigator.language.toLowerCase()=="zh-hk"||navigator.language.toLowerCase()=="zh-mo")
            {
                _C4ServiceTitle = "<small>即時</small><big>線上客服</big>";
                _C4ServiceContact = "洽談";
                _C4ServiceMessage = "留言";
            }
        }else{
            if(navigator.userLanguage.toLowerCase()=="zh-cn"||navigator.userLanguage.toLowerCase()=="zh"||navigator.userLanguage.toLowerCase()=="zh-sg")
            {
               _C4ServiceTitle = "<small>实时</small><big>在线客服</big>";
               _C4ServiceContact = "洽谈";
               _C4ServiceMessage = "留言";
            }
            else if(navigator.userLanguage.toLowerCase()=="zh-tw"||navigator.userLanguage.toLowerCase()=="zh-hk"||navigator.userLanguage.toLowerCase()=="zh-mo")
            {
                _C4ServiceTitle = "<small>即時</small><big>線上客服</big>";
                _C4ServiceContact = "洽談";
                _C4ServiceMessage = "留言";
            }
        } 
    }   
}
_C4initServiceLang();

function closebtn() {
    document.getElementById("_C4banner").style.display="none";
} 
   
function HideBtnClose(isHide) {
    if (isHide)
        document.getElementById("btnClose").style.visibility="hidden";
    else
        document.getElementById("btnClose").style.visibility="visible";
}    

function _C4helpDlg(){
    if (typeof(_C4nMode) == "undefined"){_C4nMode = 0;} //_C4nMode not exist
    document.open();    
    if (!document.getElementById("_C4symbol")) {
        if (_C4nFloat == 0 && _C4nMode == 0){    //Normal Button
            if (document.getElementById("_C4speed"))
                document.getElementById("_C4speed").innerHTML = "<div id=\"_C4symbol\"></div>";
            else
            {
                document.write("<div id=\"_C4symbol\">");
                document.write("</div>");
            }
        }else if (_C4nFloat == 1 && _C4nMode == 0){  //Float Button
            document.write("<div id=\"_C4banner\" style=\"position:absolute;top:10px;left:10px\" onmouseout=\"HideBtnClose(true)\" onmouseover=\"HideBtnClose(false)\">");
            document.write("<div id=\"btnClose\" style=\"top: 0px; right: 0px; text-align:right; visibility: hidden\">");
            document.write("<img src=\"" + _C4webSrvUrl + "operator/images/bannerclose.gif\" onclick=\"closebtn();\"/></div>");
            document.write("<div id=\"_C4symbol\" align=\"center\"></div>");
            document.write("</div>");
        }
    }
    /* 读取自定义的CSS文件.
    if (_C4nFloat == 0 && _C4nMode != 0 && _C4style != 0){ //Normal Dept. or Operator
            if(_C4style==0)
                document.write("<" + "link rel=\"stylesheet\" id=\"_C4ServiceBarCSS\" type=\"text/css\" href=" + _C4webSrvUrl + "uploadface/ServiceBar" + _C4sTag + ".css /\">");
            else
                document.write("<" + "link rel=\"stylesheet\" id=\"_C4ServiceBarCSS\" type=\"text/css\" href=" + _C4webSrvUrl + "operator/css/ServiceBar" + _C4style + ".css /\">");
            document.write("<div id=\"C4ServiceBar\">");
            document.write("<div id=\"C4ServiceTop\" style=\"background-image:url(" + _C4imgTop + ")\">");
            document.write("<div class=\"C4HomePage\"><a href=\"" + _C4HomePage + "\" target=\"_blank\">[Chat4Support]</a></div>");
            document.write("<div class=\"C4Title\">" + _C4ServiceTitle + "</div>");
            document.write("</div>");
            document.write("<div id=\"C4ServiceList\" style=\"background-image:url(" + _C4imgMid + ")\"></div>");
            document.write("<div id=\"C4ServiceBot\" style=\"background-image:url(" + _C4imgBottom + ")\"></div>");
            document.write("</div>");                   
    }else if (_C4nFloat == 1 && _C4nMode != 0 && _C4style != 0){ //Float Dept. or Operator
            if(_C4style==0)
                document.write("<" + "link rel=\"stylesheet\" id=\"_C4ServiceBarCSS\" type=\"text/css\" href=" + _C4webSrvUrl + "uploadface/ServiceBar" + _C4sTag + ".css /\">");
            else
                document.write("<" + "link rel=\"stylesheet\" id=\"_C4ServiceBarCSS\" type=\"text/css\" href=" + _C4webSrvUrl + "operator/css/ServiceBar" + _C4style + ".css /\">");
            document.write("<div id=\"C4ServiceBar\" class=\"C4DragAble\">");
            document.write("<div id=\"C4ServiceTop\" style=\"background-image:url(" + _C4imgTop + ")\">");
            document.write("<div class=\"C4HomePage\"><a href=\"" + _C4HomePage + "\" target=\"_blank\">[Chat4Support]</a></div>");
            document.write("<div class=\"C4Title\">" + _C4ServiceTitle + "</div>");
            document.write("</div>");
            document.write("<div id=\"C4ServiceList\" style=\"background-image:url(" + _C4imgMid + ")\"></div>");
            document.write("<div id=\"C4ServiceBot\" style=\"background-image:url(" + _C4imgBottom + ")\"></div>");
            document.write("</div>"); 
    }
    */
    if (_C4nFloat == 0 && _C4nMode != 0){ //Normal Dept. or Operator
            document.write("<" + "link rel=\"stylesheet\" id=\"_C4ServiceBarCSS\" type=\"text/css\" href=" + _C4webSrvUrl + "operator/css/ServiceBar" + _C4style + ".css /\">");   
            if (document.getElementById("_C4speed"))
                document.getElementById("_C4speed").innerHTML = "<div id=\"C4ServiceBar\"><div id=\"C4ServiceTop\" style=\"background-image:url(" + _C4imgTop + ")\"><div class=\"C4HomePage\"><a href=\"" + _C4HomePage + "\" target=\"_blank\">" + _C4SiteName + "</a></div><div class=\"C4Title\">" + _C4ServiceTitle + "</div></div><div id=\"C4ServiceList\" style=\"background-image:url(" + _C4imgMid + ")\"></div><div id=\"C4ServiceBot\" style=\"background-image:url(" + _C4imgBottom + ")\"></div><div id=\"_C4isDemo\"></div></div>";
            else
            {
                document.write("<div id=\"C4ServiceBar\" style=\"z-index:2147483647\">");
                document.write("<div id=\"C4ServiceTop\" style=\"background-image:url(" + _C4imgTop + ")\">");
                document.write("<div class=\"C4HomePage\"><a href=\"" + _C4HomePage + "\" target=\"_blank\">" + _C4SiteName + "</a></div>");
                document.write("<div class=\"C4Title\">" + _C4ServiceTitle + "</div>");
                document.write("</div>");
                document.write("<div id=\"C4ServiceList\" style=\"background-image:url(" + _C4imgMid + ")\"></div>");
                document.write("<div id=\"C4ServiceBot\" style=\"background-image:url(" + _C4imgBottom + ")\"></div>");
                document.write("<div id=\"_C4isDemo\"></div>");
                document.write("</div>");  
            }                 
    }else if (_C4nFloat == 1 && _C4nMode != 0){ //Float Dept. or Operator
            document.write("<" + "link rel=\"stylesheet\" id=\"_C4ServiceBarCSS\" type=\"text/css\" href=" + _C4webSrvUrl + "operator/css/ServiceBar" + _C4style + ".css /\">");
            document.write("<div id=\"C4ServiceBar\" style=\"top:10px;left:10px;z-index:2147483647\" class=\"C4DragAble\">");
            document.write("<div id=\"C4ServiceTop\" style=\"background-image:url(" + _C4imgTop + ")\">");
            document.write("<div class=\"C4HomePage\"><a href=\"" + _C4HomePage + "\" target=\"_blank\">" + _C4SiteName + "</a></div>");
            document.write("<div class=\"C4Title\">" + _C4ServiceTitle + "</div>");
            document.write("</div>");
            document.write("<div id=\"C4ServiceList\" style=\"background-image:url(" + _C4imgMid + ")\"></div>");
            document.write("<div id=\"C4ServiceBot\" style=\"background-image:url(" + _C4imgBottom + ")\"></div>");
            document.write("<div id=\"_C4isDemo\"></div>");
            document.write("</div>"); 
    }
    document.write("<" + "link rel=\"stylesheet\" id=\"_C4InviteCSS\" type=\"text/css\" href=\"\"></link>");
	document.write("<div id='C4help' style='position:absolute;left:0px;top:0px;width:400px;height:120px;visibility:hidden;cursor:move;z-index:2147483647' class='C4DragAble'>");
	document.write("<div style='height:92px;'>");
	document.write("<div id='_C4InviteInfo' style='height:70px;padding-top:22px;padding-left:90px;padding-right:30px;word-spacing:0;'></div></div>");
    document.write("<div style='line-height:20px;'><label class='c4left' id='btnAccept' onclick=\"_C4chat(0);document.getElementById('C4help').style.visibility='hidden'\">Accept</label>");
    document.write("<label class='c4right' id='btnIgnore' onclick=\"_C4bCancel=1;_C4operId='';_C4cancelinvite();document.getElementById('C4help').style.visibility='hidden'\">Close</label></div>");
	document.write("</div>");
	document.close();
}
_C4helpDlg();

function _C4InitInvite(_C4invertStyle){
    if(_C4invertStyle >= 1 && _C4invertStyle <= 3){
        if (document.getElementById("_C4InviteCSS").href != _C4webSrvUrl+ 'operator/css/style'+_C4invertStyle+'.css')
            document.getElementById("_C4InviteCSS").href = _C4webSrvUrl+ 'operator/css/style'+_C4invertStyle+'.css';
	}else{
	    if (document.getElementById("_C4InviteCSS").href != _C4webSrvUrl+ 'uploadface/style'+_C4sTag+'.css')
	        document.getElementById("_C4InviteCSS").href = _C4webSrvUrl+ 'uploadface/style'+_C4sTag+'.css';
	}
}

var _C4Obj=document.getElementById&&!document.all; 
var _C4IsDrag=false; 
var _C4DiffY,_C4DiffX; 
var _C4DragObj;

function _C4moveMouse(e) {
    if (_C4IsDrag) { 
    _C4DragObj.style.top  =  (_C4Obj ? _C4nTY + e.clientY - _C4DiffY : _C4nTY + event.clientY - _C4DiffY)+"px"; 
    _C4DragObj.style.left  =  (_C4Obj ? _C4nTX + e.clientX - _C4DiffX : _C4nTX + event.clientX - _C4DiffX)+"px"; 
    return false; 
    } 
} 

function _C4initDrag(e) { 
    var oDragHandle = _C4Obj ? e.target : event.srcElement; 
    var topElement = "HTML"; 
    while (oDragHandle != null && oDragHandle.tagName != topElement && oDragHandle.className != "C4DragAble") { 
        oDragHandle = _C4Obj ? oDragHandle.parentNode : oDragHandle.parentElement; 
    } 
    if (oDragHandle != null && oDragHandle.className=="C4DragAble") { 
    _C4IsDrag = true; 
    _C4DragObj = oDragHandle; 
    _C4nTY = parseInt(_C4DragObj.style.top+15); 
    _C4DiffY = _C4Obj ? e.clientY : event.clientY; 
    _C4nTX = parseInt(_C4DragObj.style.left+10); 
    _C4DiffX = _C4Obj ? e.clientX : event.clientX; 
    document.onmousemove=_C4moveMouse; 
    return false; 
    } 
}
if(document.attachEvent){
    document.attachEvent("onmousedown",_C4initDrag);
    document.attachEvent("onmouseup",function(){_C4IsDrag=false;});
}else if(document.addEventListener){
    document.addEventListener("mousedown",_C4initDrag,false);
    document.addEventListener("mouseup",function(){_C4IsDrag=false;},false);
} 

var C4lastHScrollX = 0;
var C4lastHScrollY = 0;

function _C4InitHelp(){
    var _C4hPosX;
    var _C4hPosY;
    var _C4objHelp = document.getElementById("C4help");
    
    var oWidth = _C4objHelp.offsetWidth;
    var oHeight = _C4objHelp.offsetHeight;
    var cHeight = 0;
    var sTop = 0;
      
    if (document.compatMode == "BackCompat") {
        cHeight = document.body.clientHeight;
        sTop = document.body.scrollTop;
    }
    else { //document.compatMode == "CSS1Compat"
        cHeight = document.documentElement.clientHeight;
        sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
    }
   
    if (document.documentElement && document.documentElement.clientWidth)
    {
        if (myBrowser() == "Safari")
            _C4hPosX = (document.documentElement.clientWidth - oWidth)/2 + document.body.scrollLeft;
        else
            _C4hPosX = (document.documentElement.clientWidth - oWidth)/2 + document.documentElement.scrollLeft;
    }
    else if(document.body)
        _C4hPosX = (document.body.clientWidth - oWidth)/2 + document.body.scrollLeft;
        
     _C4hPosY = (cHeight - oHeight)/2 + sTop;    
    
    C4HpercentX = .1 * (_C4hPosX - C4lastHScrollX);
    if (C4HpercentX < 0) C4HpercentX = Math.ceil(C4HpercentX);
    else C4HpercentX = Math.floor(C4HpercentX);

    C4HpercentY = .1 * (_C4hPosY - C4lastHScrollY);
    if (C4HpercentY < 0) C4HpercentY = Math.ceil(C4HpercentY);
    else C4HpercentY = Math.floor(C4HpercentY);

    _C4objHelp.style.left = parseInt(_C4objHelp.style.left) + C4HpercentX + "px";
    _C4objHelp.style.top = parseInt(_C4objHelp.style.top) + C4HpercentY + "px";

    C4lastHScrollX = C4lastHScrollX + C4HpercentX;
    C4lastHScrollY = C4lastHScrollY + C4HpercentY;    
}

function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari或是Chrome浏览器   

    if(isIE){ 
       var IE5 = IE55 = IE6 = IE7 = IE8 = false;
       var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
       reIE.test(userAgent);
       var fIEVersion = parseFloat(RegExp["$1"]);

       IE55 = fIEVersion == 5.5 ;
       IE6 = fIEVersion == 6.0 ;
       IE7 = fIEVersion == 7.0 ;
       IE8 = fIEVersion == 8.0 ;
      
       if(IE55){ return "IE55"; }
       if(IE6){ return "IE6"; }
       if(IE7){ return "IE7"; }
       if(IE8){ return "IE8"; }
    }
    
    if(isFF){ return "FF"; }
    if(isOpera){ return "Opera"; }
    if(isSafari){ return "Safari"; }
}

var C4lastScrollX = 0;
var C4lastScrollY = 0;

function _C4midPosition(){
    if (document.getElementById("C4help").style.visibility!="hidden")
	    _C4InitHelp();
    if (typeof(_C4nPos) == "undefined"){_C4nPos = 0;} //_C4nPos not exist
    if (typeof(_C4nPosX) == "undefined"){_C4nPosX = 0;}
    if (typeof(_C4nPosY) == "undefined"){_C4nPosY = 0;}
    var posX = 0;
    var posY = 0;
    var _C4objBtn;
    if (_C4nMode==0)
        _C4objBtn = document.getElementById("_C4banner");
    else
        _C4objBtn = document.getElementById("C4ServiceBar");
    if (_C4objBtn == null)
        return;
    
    var oWidth = _C4objBtn.offsetWidth;
    var oHeight = _C4objBtn.offsetHeight;
    var cHeight = 0;
    var sTop = 0;
      
    if (document.compatMode == "BackCompat") {
        cHeight = document.body.clientHeight;
        sTop = document.body.scrollTop;
    }
    else { //document.compatMode == "CSS1Compat"
        cHeight = document.documentElement.clientHeight;
        sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
    }
    
	if(_C4nFloat==1){
	    if (_C4nPos==0){
	        if (document.documentElement && document.documentElement.scrollLeft)
                posX = document.documentElement.scrollLeft + _C4nPosX;
            else if (document.body)
                posX = document.body.scrollLeft + _C4nPosX;
                
            posY = sTop + _C4nPosY;
	    }else if(_C4nPos==1){
	        if (document.documentElement && document.documentElement.clientWidth)
            {
                if (myBrowser() == "Safari")
                    posX = document.documentElement.clientWidth - oWidth - 30 + document.body.scrollLeft + _C4nPosX;
                else
                    posX = document.documentElement.clientWidth - oWidth - 30 + document.documentElement.scrollLeft + _C4nPosX;
            }
            else if(document.body)
                posX = document.body.clientWidth - oWidth - 30 + document.body.scrollLeft + _C4nPosX;
	        
            posY = sTop + _C4nPosY;
	    }else if(_C4nPos==2){
            if (document.documentElement && document.documentElement.scrollLeft)
                posX = document.documentElement.scrollLeft + _C4nPosX;
            else if (document.body)
                posX = document.body.scrollLeft + _C4nPosX;
                
            posY = (cHeight - oHeight)/2 + sTop + _C4nPosY;
        }else if(_C4nPos==3){
            if (document.documentElement && document.documentElement.clientWidth)
            {
                if (myBrowser() == "Safari")
                    posX = document.documentElement.clientWidth - oWidth - 30 + document.body.scrollLeft + _C4nPosX;
                else
                    posX = document.documentElement.clientWidth - oWidth - 30 + document.documentElement.scrollLeft + _C4nPosX;
            }
            else if(document.body)
                posX = document.body.clientWidth - oWidth - 30 + document.body.scrollLeft + _C4nPosX;
                
            posY = (cHeight - oHeight)/2 + sTop + _C4nPosY;
        }else if(_C4nPos==4){
            if (document.documentElement && document.documentElement.scrollLeft)
                posX = document.documentElement.scrollLeft + _C4nPosX;
            else if (document.body)
                posX = document.body.scrollLeft + _C4nPosX;
                
            posY = cHeight - oHeight - 20 + sTop + _C4nPosY;            
        }else if (_C4nPos==5){
            if (document.documentElement && document.documentElement.clientWidth)
            {
                if (myBrowser() == "Safari")
                    posX = document.documentElement.clientWidth - oWidth - 30 + document.body.scrollLeft + _C4nPosX;
                else
                    posX = document.documentElement.clientWidth - oWidth - 30 + document.documentElement.scrollLeft + _C4nPosX;
            }
            else if(document.body)
                posX = document.body.clientWidth - oWidth - 30 + document.body.scrollLeft + _C4nPosX;
                
            posY = cHeight - oHeight - 20 + sTop + _C4nPosY;           
        }
	    C4percentX = .1 * (posX - C4lastScrollX);
        if (C4percentX < 0) C4percentX = Math.ceil(C4percentX - 10);
        else C4percentX = Math.floor(C4percentX);

        C4percentY = .1 * (posY-C4lastScrollY);
        if (C4percentY < 0) C4percentY = Math.ceil(C4percentY - 10);
        else C4percentY = Math.floor(C4percentY);

        //_C4objBtn.style.left = parseInt(_C4objBtn.style.left)+C4percentX+"px";
        _C4objBtn.style.left = posX+"px";
        _C4objBtn.style.top = parseInt(_C4objBtn.style.top)+C4percentY+"px";

        C4lastScrollX=C4lastScrollX+C4percentX;
        C4lastScrollY=C4lastScrollY+C4percentY;
	}	
}

window.setInterval("_C4midPosition()",30);

var _C4oImg="";
var _C4img="";
var _C4Online=false;
var _C4msg="";
var _C4operId="";
var _C4operName="";
var _C4Welcome="";
var _C4bCancel=0;
var _C4vId="";
var _C4visited=false;
var	_C4vCountry="";
var	_C4vCity="";
var	_C4vOS="";
var	_C4vBrowser="";
var	_C4vKeyword="";
var	_C4vKeywordMatch=false;
var _C4newWindow=null;
var _C4DeptList = new Array;    //Dept. Call
var _C4OperList = new Array;    //Oper. Call
var _C4isDemo=-1;

function _C4imgSrc(){
    if (typeof(_C4imgOn) != "undefined"){ //New Version
        if(_C4Online) //Operator Online
            _C4img=_C4imgOn;
        else
        _C4img=_C4imgOff; 
    }
    if(_C4nFloat!=2 && _C4oImg!=_C4img && _C4nMode==0){
        var _C4Btn = document.getElementById("_C4symbol");       
        _C4Btn.innerHTML = "<a href='' onclick='_C4chat(1);return false;'><img id='_C4online' src="+_C4img+" border='0' style='visibility:visible;display:block'></a><div id=\"_C4isDemo\"></div>";        
        _C4oImg=_C4img; 
    }
    if (document.getElementById("_C4online")) {
        document.getElementById("_C4online").style.visibility = "visible";
        document.getElementById("_C4online").style.display = "block";
    }
}

function _C4chat(_C4type){
	if(_C4type==0)  //Invite
		_C4newWindow=window.open(_C4srvURL+'main.asp?sid='+_C4sid+'&sTag='+escape(_C4sTag)+'&oTag='+escape(_C4operId)+'&url=' + escape(C4S_GetVisitPage())+ '&' + _C4Custom, 'Chat', 'toolbar=0,scrollbars=yes,location=0,menubar=no,resizable=yes,status=yes,width=720,height=640');
	else    //Call
	{
		if(_C4ChatList!=0)
		    _C4newWindow=window.open(_C4webSrvUrl+'chatlistbar.aspx?sid='+_C4sid+'&sTag='+escape(_C4sTag)+'&chatlist='+_C4ChatList+'&url=' + escape(C4S_GetVisitPage())+ '&' + _C4Custom, 'Chat', 'toolbar=0,scrollbars=yes,location=0,menubar=no,resizable=yes,status=yes,width=720,height=640');
		else
		    _C4newWindow=window.open(_C4srvURL+'main.asp?sid='+_C4sid+'&sTag='+escape(_C4sTag)+'&url=' + escape(C4S_GetVisitPage())+ '&' + _C4Custom, 'Chat', 'toolbar=0,scrollbars=yes,location=0,menubar=no,resizable=yes,status=yes,width=720,height=640');
	}
	_C4newWindow.focus();
	_C4newWindow.opener=window;
	_C4operId="";
	return false;
}

function _C4cancelinvite(){
    var _C4Url = _C4srvURL+'cancelinvite.asp?sTag='+escape(_C4sTag)+'&vTag=' + _C4vId
    _C4PutScript("CancelInvite", _C4Url);	
}

function _C4getTime(){ 
    var nowtime=new Date();
	var hour=nowtime.getHours();
	if(hour<10)
		hour="0"+hour;
	var minute=nowtime.getMinutes();
	if(minute<10)
		minute="0"+minute;
	var second=nowtime.getSeconds();
	if(second<10)
		second="0"+second;
	var now=hour+':'+minute+':'+second;
    return now;
}

var _C4isUpdate = 0;
function _C4checkSite(){
	if (_C4RefreshTry>=1) {
		if(_C4online!=0)
			setTimeout("_C4checkSite()",_C4RefreshDelay);
		_C4RefreshTry=0;
		return;
	}
	var _C4Url = _C4srvURL+'visit.asp?sid='+_C4sid+'&sTag='+escape(_C4sTag)+'&cancel='+_C4bCancel+'&style='+_C4style+'&online='+_C4online;
	if (_C4visited) {
		_C4Url=_C4Url+'&first=0';
	} else {
		var urlReferrer = escape(C4S_GetReferrer());
		var timeZone = C4S_GetTimeZone();
		var screenSize	= escape(screen.width + 'x' + screen.height);
		var screenColor = C4S_GetColor();
		var pageTitle = escape(C4S_GetPageTitle());
		_C4Url=_C4Url+'&urlreferer='+urlReferrer+'&timezone='+timeZone+'&screensize='+screenSize+'&screencolor='+screenColor+'&pagetitle='+pageTitle+'&url=' + escape(C4S_GetVisitPage());
	}
	_C4Url+='&time=' + _C4getTime()+'&mode='+_C4nMode;
	
	if (_C4nFloat!=2 && _C4nMode!=0){
	    if (_C4isUpdate <= 0)
	        _C4Url+='&update=1';
	    else
	        _C4Url+='&update=0';
	}
	_C4Url+='&' + _C4Custom;
	_C4PutScript("GetOnline", _C4Url);	
	_C4RefreshTry+=1;
	if(_C4online!=0)
		setTimeout("_C4checkSite()",_C4RefreshSecound);
}
_C4checkSite();

function _C4update() {
		_C4RefreshTry=0;
		_C4imgSrc();
		try {_C4newWindow && _C4newWindow.open && !_C4newWindow.closed}catch(e){_C4newWindow=null;}		
		if(_C4operId==""||_C4operName==""||_C4msg==""||(_C4newWindow && _C4newWindow.open && !_C4newWindow.closed)){	
			document.getElementById("C4help").style.visibility="hidden";
			_C4bCancel=0;
		} else if (_C4newWindow && _C4newWindow.closed && !_C4newWindow.open) {
		    _C4bCancel=1;
		    _C4operId="";
		    document.getElementById("C4help").style.visibility="hidden";
		    _C4newWindow = null;
		} else {
			if (document.getElementById("C4help").style.visibility!="visible"){
			    _C4InitInvite(_C4nInvite);
		        _C4initInviteLang();
		        if(_C4Welcome.length>45)_C4Welcome=_C4Welcome.substring(0,41)+" ...";
		        if(_C4msg.length>184)_C4msg=_C4msg.substring(0,180)+" ...";
			    document.getElementById("_C4InviteInfo").innerHTML="<Font color='#666666'><strong>"+_C4Welcome+"</strong><br />"+_C4msg+"</Font>";
				document.getElementById("C4help").style.visibility="visible";
			}
			_C4bCancel=0;
		}
		if (_C4nFloat!=2 && _C4nMode!=0){
		  if (_C4isUpdate <= 0){
		    _C4isUpdate = 6;
		    _C4SortOperList();
		    _C4initServiceList();
		  }else
		    _C4isUpdate = _C4isUpdate - 1;	        
		}
        		
		if (!_C4visited) {
		    C4S_GetVid();
			_C4visited = true;	        
		}
		if (_C4isDemo==0)
                document.getElementById("_C4isDemo").innerHTML = "<div style=\"font-family:Tahoma;font-size:11px;color:Gray;text-align:left;word-break:break-all;word-wrap:break-word;\">You are using a Chat4Support demo version.<br>Please <a href=\"http://www.chat4support.com/Server.asp\" target=\"_blank\">purchase the software</a> to get rid of the limitations.</div>";		
}

function _C4initServiceList(){  //Init ServiceList
    if (typeof(_C4wid) == "undefined"){_C4wid = "";} //_C4wid not exist
    if (typeof(_C4v2cname) == "undefined"){_C4v2cname = "";}
    else {_C4v2cname = UrlDecode(_C4v2cname);} //_C4v2cname not exist
    if (typeof(_C4vCallUrl) == "undefined"){_C4vCallUrl = "";} //_C4vCallUrl not exist
    var C4ServiceList = document.getElementById("C4ServiceList");
    var ServiceCode = "";
    if (_C4nMode == 1 && C4ServiceList){  //Dept.
        ServiceCode = "<ul>";
        for (var i=0; i<_C4DeptList.length; i++) {
            //alert(_C4DeptList[i][0]);   //Id
            //alert(_C4DeptList[i][1]);   //Name     
            ServiceCode += "<li><span><img src=\"" + _C4webSrvUrl + "operator/images/collect.gif\" /></span><span title=\"" + _C4ServiceContact + "\" style=\"cursor:pointer\" onclick=\"_C4chatDept(" + true + "," +  _C4DeptList[i][0] + "," + 0 + "," + 0 + ");\"><strong>" + _C4DeptList[i][1] + "</strong><img  src=\"" + _C4webSrvUrl + "operator/images/chat.gif\" /></span></li>";
        }
        ServiceCode += "</ul>";
        C4ServiceList.innerHTML = ServiceCode;
    }else if (_C4nMode == 2 && C4ServiceList){  //Oper.   
        ServiceCode = "<ul>";
        for (var i=0; i<_C4OperList.length; i++) {
             //alert(_C4OperList[i][0]);   //oId
             //alert(_C4OperList[i][1]);   //oTag
             //alert(_C4OperList[i][2]);   //oName
             //alert(_C4OperList[i][3]);   //dId 
             //alert(_C4OperList[i][4]);   //dName 
             //alert(_C4OperList[i][5]);   //oStatus
             //alert(_C4OperList[i][6]);   //Seatid
             if(!_C4existDept(i,_C4OperList[i][3])){    //Dept. not exist
                if(_C4onlineDept(_C4OperList[i][3]))
                    ServiceCode += "<li><span><img src=\"" + _C4webSrvUrl + "operator/images/expand.gif\" /></span><span title=\"" + _C4ServiceContact + "\" style=\"cursor:pointer\" onclick=\"_C4chatDept(" + true + "," +  _C4OperList[i][3] + "," + 0 + "," + 0 + ");\"><strong style=\"color:Black\">" + _C4OperList[i][4] + "</strong><img src=\"" + _C4webSrvUrl + "operator/images/chat.gif\" /></span></li>";
                else
                    ServiceCode += "<li><span><img src=\"" + _C4webSrvUrl + "operator/images/expand.gif\" /></span><span title=\"" + _C4ServiceMessage + "\" style=\"cursor:pointer\" onclick=\"_C4chatDept(" + true + "," +  _C4OperList[i][3] + "," + 0 + "," + 0 + ");\"><strong style=\"color:DimGray\">" + _C4OperList[i][4] + "</strong><img src=\"" + _C4webSrvUrl + "operator/images/message.gif\" /></span></li>";
             }
             if(_C4wid!=""&&_C4OperList[i][6]!=""&&_C4vCallUrl!="")
             {
                if(_C4OperList[i][5]){
                    ServiceCode += "<li><span title=\"" + _C4ServiceContact + "\" onclick=\"_C4chatDept(" + false + ",'" + _C4OperList[i][1] + "'," + 0 + "," + _C4OperList[i][0] + ");\" style=\"cursor:pointer\"><em><img src=\"" + _C4webSrvUrl + "operator/images/OperOn.gif\" /></em><span>" + _C4OperList[i][2] + "</span><img src=\"" + _C4webSrvUrl + "operator/images/chat.gif\" /></span><a href=\"" + _C4vCallUrl + "?wid=" + _C4wid + "&name=" + _C4v2cname + "&seatid=" + _C4OperList[i][6] + "\" target=\"_blank\"><img src=\"" + _C4webSrvUrl + "operator/images/call.gif\" border=0 alt=\"回拨电话\" /></a></li>";
                } else {
                 ServiceCode += "<li><span title=\"" + _C4ServiceMessage + "\" onclick=\"_C4chatDept(" + false + ",'" + _C4OperList[i][1] + "'," + 1 + "," + _C4OperList[i][0] + ");\" style=\"cursor:pointer\"><em><img src=\"" + _C4webSrvUrl + "operator/images/OperOff.gif\" /></em><span style=\"color:DimGray\">" + _C4OperList[i][2] + "</span><img src=\"" + _C4webSrvUrl + "operator/images/message.gif\" /></span><a href=\"" + _C4vCallUrl + "?wid=" + _C4wid + "&name=" + _C4v2cname + "&seatid=" + _C4OperList[i][6] + "\" target=\"_blank\"><img src=\"" + _C4webSrvUrl + "operator/images/call.gif\" border=0 alt=\"回拨电话\" /></a></li>";
                }
             }
             else
             {
                if(_C4OperList[i][5]){
                    ServiceCode += "<li><span title=\"" + _C4ServiceContact + "\" onclick=\"_C4chatDept(" + false + ",'" + _C4OperList[i][1] + "'," + 0 + "," + _C4OperList[i][0] + ");\" style=\"cursor:pointer\"><em><img src=\"" + _C4webSrvUrl + "operator/images/OperOn.gif\" /></em><span>" + _C4OperList[i][2] + "</span><img src=\"" + _C4webSrvUrl + "operator/images/chat.gif\" /></span></li>";
                } else {
                 ServiceCode += "<li><span title=\"" + _C4ServiceMessage + "\" onclick=\"_C4chatDept(" + false + ",'" + _C4OperList[i][1] + "'," + 1 + "," + _C4OperList[i][0] + ");\" style=\"cursor:pointer\"><em><img src=\"" + _C4webSrvUrl + "operator/images/OperOff.gif\" /></em><span style=\"color:DimGray\">" + _C4OperList[i][2] + "</span><img src=\"" + _C4webSrvUrl + "operator/images/message.gif\" /></span></li>";
                }
             }                         
        }
        ServiceCode += "</ul>";
        C4ServiceList.innerHTML = ServiceCode;
     }  
}

function _C4chatDept(Dept, Para, guestbook, oId){
    if (Dept)
        _C4newWindow=window.open(_C4srvURL+'main.asp?sid='+_C4sid+'&sTag='+escape(_C4sTag)+'&url=' + escape(C4S_GetVisitPage())+'&did='+Para+ '&' + _C4Custom, 'Chat', 'toolbar=0,scrollbars=yes,location=0,menubar=no,resizable=yes,status=yes,width=720,height=640');
    else
        _C4newWindow=window.open(_C4srvURL+'main.asp?sid='+_C4sid+'&sTag='+escape(_C4sTag)+'&url=' + escape(C4S_GetVisitPage())+'&oTag='+escape(Para)+'&guestbook='+guestbook+'&oId='+oId+ '&' + _C4Custom, 'Chat', 'toolbar=0,scrollbars=yes,location=0,menubar=no,resizable=yes,status=yes,width=720,height=640');
	_C4newWindow.focus();
	_C4newWindow.opener=window;
	_C4operId="";
	return false;
}

function _C4SortOperList(){
    for(var I = 1; I < _C4OperList.length; I++){
        var J = I;
        var temp = _C4OperList[I];
        while(J > 0 && temp[3] != _C4OperList[J-1][3]){
            _C4OperList[J] = _C4OperList[J-1];
            J--;
        }
        _C4OperList[J] = temp;
    }
}

function _C4existDept(length, dId){
    var Result = false;
    for (var i=0; i<length; i++){
        if (dId == _C4OperList[i][3]) Result = true;
    }    
    return Result;    
}
function _C4onlineDept(dId){
    var Result = false;
    for (var I = 0; I < _C4OperList.length; I++){
        if(_C4OperList[I][3] == dId && _C4OperList[I][5])
            Result = true; 
    }
    return Result;
}

function _C4PutScript(sName, sUrl){
	var _C4head = document.getElementsByTagName("head");
	if (_C4head != null && _C4head.length > 0) {
		_C4head = _C4head[0];
	} else {
		_C4head = document.body;
	}	

	var _C4old = document.getElementById(sName); 
	if (_C4old) {try{_C4head.removeChild(_C4old);}catch(e){}}
	var _C4script = document.createElement("SCRIPT"); 
	_C4script.src = sUrl; 
	_C4script.defer = true; 
	_C4script.type = "text/javascript"; 
	_C4script.id = sName; 
	_C4head.appendChild(_C4script);
} 

function _C4initInviteLang() {
    if (typeof(_C4Language) == "undefined"){_C4Language = "en-us";} //_C4nMode not exist
    _C4Language = _C4Language.toLowerCase();
    if(_C4Language=="zh-cn"|| _C4Language=="zh" || _C4Language=="zh-sg")
    {
        document.getElementById("btnAccept").innerHTML=" 接受 ";
        document.getElementById("btnIgnore").innerHTML=" 忽略 ";
    }
    else if(_C4Language=="zh-tw"|| _C4Language=="zh-hk"|| _C4Language=="zh-mo")
    {
        document.getElementById("btnAccept").innerHTML=" 接受 ";
        document.getElementById("btnIgnore").innerHTML=" 忽略 ";
    }
    else if(_C4Language=="sv"|| _C4Language=="sv-fi"|| _C4Language=="sv-se")
    {
        document.getElementById("btnAccept").innerHTML="Acceptera";
        document.getElementById("btnIgnore").innerHTML="Ignorera";
    }
    else if(_C4Language=="ru"|| _C4Language=="ru-md" || _C4Language=="ru-ru")
    {
        document.getElementById("btnAccept").innerHTML=" Да ";
        document.getElementById("btnIgnore").innerHTML=" Нет ";   
    }
    else if(_C4Language=="nl"|| _C4Language=="nl-be" || _C4Language=="nl-nl")
    {  
        document.getElementById("btnAccept").innerHTML="Accepteren";
        document.getElementById("btnIgnore").innerHTML="Negeren";
    }
    else if(_C4Language=="ja"|| _C4Language=="ja-jp")
    {
        document.getElementById("btnAccept").innerHTML=" 開始 ";
        document.getElementById("btnIgnore").innerHTML=" 無視 ";   
    }
    else if(_C4Language=="en-us" || _C4Language=="en-nz" || _C4Language=="en-ie" || _C4Language=="en-au" || _C4Language=="en-bz" || _C4Language=="en-ph" || _C4Language=="en-029" || _C4Language=="en-ca" || _C4Language=="en-zw" || _C4Language=="en-za" || _C4Language=="en-tt" || _C4Language=="en-jm" || _C4Language=="en-gb")
    {
        document.getElementById("btnAccept").innerHTML=" Accept ";
        document.getElementById("btnIgnore").innerHTML=" Close ";
    } 
    else if(_C4Language=="pt-br"|| _C4Language=="pt" || _C4Language=="pt-pt")
    {
        document.getElementById("btnAccept").innerHTML=" Aceitar ";
        document.getElementById("btnIgnore").innerHTML=" Ignorar ";
    }
    else if(_C4Language=="es-es" || _C4Language=="es-ar" || _C4Language=="es-py" || _C4Language=="es-pa" || _C4Language=="es-pr" || _C4Language=="es-bo" || _C4Language=="es-es tradnl" || _C4Language=="es-do" || _C4Language=="es-ec" || _C4Language=="es-co" || _C4Language=="es-cr" || _C4Language=="es-hn" || _C4Language=="es-pe" || _C4Language=="es-mx" || _C4Language=="es-ni" || _C4Language=="es-sv" || _C4Language=="es-gt" || _C4Language=="es-ve" || _C4Language=="es-uy" || _C4Language=="es-cl"|| _C4Language=="es")
    {
        document.getElementById("btnAccept").innerHTML=" Aceptar ";
        document.getElementById("btnIgnore").innerHTML=" Ignorar "; 
    }
    else if(_C4Language=="pl" || _C4Language=="pl-pl")
    {
        document.getElementById("btnAccept").innerHTML=" Tak ";
        document.getElementById("btnIgnore").innerHTML=" Nie "; 
    }
    else if(_C4Language=="tr" || _C4Language=="tr-tr")
    {
        document.getElementById("btnAccept").innerHTML=" Kabul ";
        document.getElementById("btnIgnore").innerHTML=" Reddet "; 
    }
    else if(_C4Language=="de" || _C4Language=="de-de" || _C4Language=="de-at" || _C4Language=="de-li" || _C4Language=="de-lu" || _C4Language=="de-ch")
    {
        document.getElementById("btnAccept").innerHTML="Annehmen";
        document.getElementById("btnIgnore").innerHTML="Ignorieren"; 
    }
    else if(_C4Language=="hu" || _C4Language=="hu-hu")
    {
        document.getElementById("btnAccept").innerHTML=" Elfogad ";
        document.getElementById("btnIgnore").innerHTML=" Elutasít "; 
    }
    else if(_C4Language=="da" || _C4Language=="da-dk")
    {
        document.getElementById("btnAccept").innerHTML=" Accepter ";
        document.getElementById("btnIgnore").innerHTML=" Luk ";
    }
    else
    {
        if (window.navigator.appName == "Netscape") //FrieFox
        {
            if(navigator.language.toLowerCase()=="zh-cn"||navigator.language.toLowerCase()=="zh"||navigator.language.toLowerCase()=="zh-sg")
            {
                document.getElementById("btnAccept").innerHTML=" 接受 ";
                document.getElementById("btnIgnore").innerHTML=" 忽略 ";
            }
            else if(navigator.language.toLowerCase()=="zh-tw"||navigator.language.toLowerCase()=="zh-hk"||navigator.language.toLowerCase()=="zh-mo")
            {
                document.getElementById("btnAccept").innerHTML=" 接受 ";
                document.getElementById("btnIgnore").innerHTML=" 忽略 ";
            }
            else if(navigator.language.toLowerCase()=="sv"||navigator.language.toLowerCase()=="sv-fi"||navigator.language.toLowerCase()=="sv-se")
            {
                document.getElementById("btnAccept").innerHTML="Acceptera";
                document.getElementById("btnIgnore").innerHTML="Ignorera";
            }
            else if(navigator.language.toLowerCase()=="ru"||navigator.language.toLowerCase()=="ru-md"||navigator.language.toLowerCase()=="ru-ru")
            {
                document.getElementById("btnAccept").innerHTML=" Да ";
                document.getElementById("btnIgnore").innerHTML=" Нет ";     
            }
            else if(navigator.language.toLowerCase()=="nl"||navigator.language.toLowerCase()=="nl-be"||navigator.language.toLowerCase()=="nl-nl")
            {  
                document.getElementById("btnAccept").innerHTML="Accepteren";
                document.getElementById("btnIgnore").innerHTML="Negeren";
            }
            else if(navigator.language.toLowerCase()=="ja"||navigator.language.toLowerCase()=="ja-jp")
            {
                document.getElementById("btnAccept").innerHTML=" 開始 ";
                document.getElementById("btnIgnore").innerHTML=" 無視 ";   
            }
            else if(navigator.language.toLowerCase()=="pt-br"||navigator.language.toLowerCase()=="pt"||navigator.language.toLowerCase()=="pt-pt")
            {
                document.getElementById("btnAccept").innerHTML=" Aceitar ";
                document.getElementById("btnIgnore").innerHTML=" Ignorar ";
            }
            else if(navigator.language.toLowerCase()=="es-es"||navigator.language.toLowerCase()=="es-ar"||navigator.language.toLowerCase()=="es-py"||navigator.language.toLowerCase()=="es-pa"||navigator.language.toLowerCase()=="es-pr"||
                navigator.language.toLowerCase()=="es-bo"||navigator.language.toLowerCase()=="es-es tradnl"||navigator.language.toLowerCase()=="es-do"||navigator.language.toLowerCase()=="es-ec"||navigator.language.toLowerCase()=="es-co"||
                navigator.language.toLowerCase()=="es-cr"||navigator.language.toLowerCase()=="es-hn"||navigator.language.toLowerCase()=="es-pe"||navigator.language.toLowerCase()=="es-mx"||navigator.language.toLowerCase()=="es-ni"||
                navigator.language.toLowerCase()=="es-sv"||navigator.language.toLowerCase()=="es-gt"||navigator.language.toLowerCase()=="es-ve"||navigator.language.toLowerCase()=="es-uy"||navigator.language.toLowerCase()=="es-cl"||navigator.language.toLowerCase()=="es")
            {
                document.getElementById("btnAccept").innerHTML=" Aceptar ";
                document.getElementById("btnIgnore").innerHTML=" Ignorar "; 
            }
            else if(navigator.language.toLowerCase()=="pl"||navigator.language.toLowerCase()=="pl-pl")
            {
                document.getElementById("btnAccept").innerHTML=" Tak ";
                document.getElementById("btnIgnore").innerHTML=" Nie ";
            }
            else if(navigator.language.toLowerCase()=="tr"||navigator.language.toLowerCase()=="tr-tr")
            {
                document.getElementById("btnAccept").innerHTML=" Kabul ";
                document.getElementById("btnIgnore").innerHTML=" Reddet ";
            }
            else if(navigator.language.toLowerCase()=="de"||navigator.language.toLowerCase()=="de-de"||navigator.language.toLowerCase()=="de-at"||navigator.language.toLowerCase()=="de-li"||navigator.language.toLowerCase()=="de-lu"||navigator.language.toLowerCase()=="de-ch")
            {
                document.getElementById("btnAccept").innerHTML="Annehmen";
                document.getElementById("btnIgnore").innerHTML="Ignorieren";            
            }
            else if(navigator.language.toLowerCase()=="hu"||navigator.language.toLowerCase()=="hu-hu")
            {
                document.getElementById("btnAccept").innerHTML=" Elfogad ";
                document.getElementById("btnIgnore").innerHTML=" Elutasít "; 
            }
            else if(navigator.language.toLowerCase()=="da"||navigator.language.toLowerCase()=="da-dk")
            {
                document.getElementById("btnAccept").innerHTML=" Accepter ";
                document.getElementById("btnIgnore").innerHTML=" Luk ";
            }
            else
            {
                document.getElementById("btnAccept").innerHTML=" Accept ";
                document.getElementById("btnIgnore").innerHTML=" Close ";
            } 
        }
        else
        {
            if(navigator.userLanguage.toLowerCase()=="zh-cn"||navigator.userLanguage.toLowerCase()=="zh"||navigator.userLanguage.toLowerCase()=="zh-sg")
            {
                document.getElementById("btnAccept").innerHTML=" 接受 ";
                document.getElementById("btnIgnore").innerHTML=" 忽略 ";
            }
            else if(navigator.userLanguage.toLowerCase()=="zh-tw"||navigator.userLanguage.toLowerCase()=="zh-hk"||navigator.userLanguage.toLowerCase()=="zh-mo")
            {
                document.getElementById("btnAccept").innerHTML=" 接受 ";
                document.getElementById("btnIgnore").innerHTML=" 忽略 ";
            }
            else if(navigator.userLanguage.toLowerCase()=="sv"||navigator.userLanguage.toLowerCase()=="sv-fi"||navigator.userLanguage.toLowerCase()=="sv-se")
            {
                document.getElementById("btnAccept").innerHTML="Acceptera";
                document.getElementById("btnIgnore").innerHTML="Ignorera";
            }
            else if(navigator.userLanguage.toLowerCase()=="ru"||navigator.userLanguage.toLowerCase()=="ru-md"||navigator.userLanguage.toLowerCase()=="ru-ru")
            {
                document.getElementById("btnAccept").innerHTML=" Да ";
                document.getElementById("btnIgnore").innerHTML=" Нет ";    
            }
            else if(navigator.userLanguage.toLowerCase()=="nl"||navigator.userLanguage.toLowerCase()=="nl-be"||navigator.userLanguage.toLowerCase()=="nl-nl")
            {  
                document.getElementById("btnAccept").innerHTML="Accepteren";
                document.getElementById("btnIgnore").innerHTML="Negeren";
            }
            else if(navigator.userLanguage.toLowerCase()=="ja"||navigator.userLanguage.toLowerCase()=="ja-jp")
            {
                document.getElementById("btnAccept").innerHTML=" 開始 ";
                document.getElementById("btnIgnore").innerHTML=" 無視 ";   
            }
            else if(navigator.userLanguage.toLowerCase()=="pt-br"||navigator.userLanguage.toLowerCase()=="pt"||navigator.userLanguage.toLowerCase()=="pt-pt")
            {
                document.getElementById("btnAccept").innerHTML=" Aceitar ";
                document.getElementById("btnIgnore").innerHTML=" Ignorar ";
            }
            else if(navigator.userLanguage.toLowerCase()=="es-es"||navigator.userLanguage.toLowerCase()=="es-ar"||navigator.userLanguage.toLowerCase()=="es-py"||navigator.userLanguage.toLowerCase()=="es-pa"||navigator.userLanguage.toLowerCase()=="es-pr"||
                navigator.userLanguage.toLowerCase()=="es-bo"||navigator.userLanguage.toLowerCase()=="es-es tradnl"||navigator.userLanguage.toLowerCase()=="es-do"||navigator.userLanguage.toLowerCase()=="es-ec"||navigator.userLanguage.toLowerCase()=="es-co"||
                navigator.userLanguage.toLowerCase()=="es-cr"||navigator.userLanguage.toLowerCase()=="es-hn"||navigator.userLanguage.toLowerCase()=="es-pe"||navigator.userLanguage.toLowerCase()=="es-mx"||navigator.userLanguage.toLowerCase()=="es-ni"||
                navigator.userLanguage.toLowerCase()=="es-sv"||navigator.userLanguage.toLowerCase()=="es-gt"||navigator.userLanguage.toLowerCase()=="es-ve"||navigator.userLanguage.toLowerCase()=="es-uy"||navigator.userLanguage.toLowerCase()=="es-cl"||navigator.userLanguage.toLowerCase()=="es")
            {
                document.getElementById("btnAccept").innerHTML=" Aceptar ";
                document.getElementById("btnIgnore").innerHTML=" Ignorar "; 
            }
            else if(navigator.userLanguage.toLowerCase()=="pl"||navigator.userLanguage.toLowerCase()=="pl-pl")
            {
                document.getElementById("btnAccept").innerHTML=" Tak ";
                document.getElementById("btnIgnore").innerHTML=" Nie ";
            }
            else if(navigator.userLanguage.toLowerCase()=="tr"||navigator.userLanguage.toLowerCase()=="tr-tr")
            {
                document.getElementById("btnAccept").innerHTML=" Kabul ";
                document.getElementById("btnIgnore").innerHTML=" Reddet ";
            }
            else if(navigator.userLanguage.toLowerCase()=="de"||navigator.userLanguage.toLowerCase()=="de-de"||navigator.userLanguage.toLowerCase()=="de-at"||navigator.userLanguage.toLowerCase()=="de-li"||navigator.userLanguage.toLowerCase()=="de-lu"||navigator.userLanguage.toLowerCase()=="de-ch")
            {
                document.getElementById("btnAccept").innerHTML="Annehmen";
                document.getElementById("btnIgnore").innerHTML="Ignorieren";            
            }
            else if(navigator.userLanguage.toLowerCase()=="hu"||navigator.userLanguage.toLowerCase()=="hu-hu")
            {
                document.getElementById("btnAccept").innerHTML=" Elfogad ";
                document.getElementById("btnIgnore").innerHTML=" Elutasít "; 
            }
            else if(navigator.userLanguage.toLowerCase()=="da"||navigator.userLanguage.toLowerCase()=="da-dk")
            {
                document.getElementById("btnAccept").innerHTML=" Accepter ";
                document.getElementById("btnIgnore").innerHTML=" Luk "; 
            }
            else
            {
                document.getElementById("btnAccept").innerHTML=" Accept ";
                document.getElementById("btnIgnore").innerHTML=" Close ";
            } 
        } 
    }     
}

/*统计开始*//////////////////////////////////////
function C4S_GetVisitPage(){
    var page="";
    try {page=top.document.URL;}
    catch(err) {page="";}
    finally {page==""?page=document.URL:page=page;}
    if (page.length > 200)
        page = page.substring(0, 199);
    return escape(page);
}

function C4S_GetColor(){
    if (navigator.appName != "Netscape") 
	    return screen.colorDepth;
    else 
	    return screen.pixelDepth;
}

function C4S_GetPageTitle(){
    var title="";
    try {title=top.document.title;}
    catch(err) {title="";}
    finally {title==""?title=document.title:title=title;}
    if (title.length > 300)
        title = title.substring(0, 299);
    return escape(title);
}

function C4S_GetReferrer(){
    var referrer="";
    try {referrer=top.document.referrer;}
    catch(err) {referrer="";}
    finally {referrer=(referrer=="")?document.referrer:referrer;}
    return escape(referrer);
}

function C4S_GetTimeZone(){
    var ndate	= new Date();
    return 0 - ndate.getTimezoneOffset();
}
/*统计结束*///////////////////////////////////////////////

/*设置Cookie开始*//////////////////////////////////////
function C4S_GetCookie(name) 
{
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
          return C4S_getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break; 
    }
    return null;
}

function C4S_getCookieVal(offset)
{
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

function C4S_GetVid()
{
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + 1 * (365*24*60*60*1000)); //+365 day
    var cookievId = C4S_GetCookie("_C4vId");

    if(_C4vId == "" || _C4vId == null)
        _C4vId = cookievId;    
    
    C4S_SetCookie("_C4vId",_C4vId,expdate);
}

function C4S_SetCookie (name, value)
{
    var argv = C4S_SetCookie.arguments;
    var argc = C4S_SetCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape (value) +
    ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
    ((path == null) ? "" : ("; path=" + path)) +
    ((domain == null) ? "" : ("; domain=" + domain)) +
    ((secure == true) ? "; secure" : "");
}
/*Set Cookie结束*///////////////////////////////////////////////