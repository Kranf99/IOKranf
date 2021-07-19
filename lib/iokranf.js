//
// IOKranf.js
// VERSION			: v1.2
// LICENSE          : the MIT License (MIT), see LICENSE.md for details
// DOCUMENTATION    : README.md
//
function IOKranf(pre_id, bgcolor, outcolor, incolor, xcolor) {
    'use strict';
    var jar, jarId, jarOn, that, scrollInterval=null; // PRIVATE VARIABLES;
    jar = window.document.getElementById(pre_id);
    jarId = pre_id;
    jarOn = !!jar;
    that = this;
    if (!jarOn) {
        window.alert('FATAL: No PRE element with the supplied `pre_id` was found.');
        return false;
    }
    if (jar.tagName.toUpperCase() !== 'PRE') {
        window.alert('FATAL: Non-PRE element with supplied `pre_id` was found.');
        return false;
    }
    //
    /////////////////////////////////////////////////
    // Styling the JAR.//////////////////////////////
    /////////////////////////////////////////////////
    //
    incolor = (!!incolor) ? incolor : 'blue';
    xcolor = (!!xcolor) ? xcolor : 'red';
    if (!jar.style.backgroundColor) { jar.style.backgroundColor = (!!bgcolor) ? bgcolor : 'white'; }
    if (!jar.style.color) { jar.style.color = (!!outcolor) ? outcolor : 'black'; }
    if (!jar.style.fontFamily) { jar.style.fontFamily = 'Monaco,Menlo,Consolas,"Courier New",monospace'; }
    //if (!jar.style.fontWeight) { jar.style.fontWeight = 'bold'; }
    //if (!jar.style.fontSize) { jar.style.fontSize = '110%'; }
    if (!jar.style.padding) { jar.style.padding = '0.75%'; }
    if (!jar.style.overflow) { jar.style.overflow = 'auto'; }
    if (!jar.style.resize) { jar.style.resize = 'both'; }
    if (!jar.style.height) { jar.style.height = '500px'; }
    if (!jar.style.border) { jar.style.border = 'thick solid silver'; }
    //
    //////////////////////////////////////////////////
    // PRIVATE FUNCTIONS./////////////////////////////
    //////////////////////////////////////////////////
    function print(message, color) {
        if (!jarOn) { return false; }
        if (!color) {
            jar.innerHTML += message;
        } else { jar.innerHTML += '<span style="color:' + color + ';">' + message + '</span>'; }
        return true;
    }
    function printImage(src, width, height) {
        if (!jarOn) { return false; }
        var s="<image src='"+src+"'"; //FIXME?
        if (!(width === undefined)) s+=" width='"+width+"'";
        if (!(height === undefined)) s+=" height='"+height+"'";
        jar.innerHTML += (s+">");
        return true;
    }
    function anchor(href, linktext, color) {
        if (!linktext) { linktext = href; }
        if (!color) { color = xcolor; }
        return print(['<i><a href="', href, '" style="color:', color, ';">', linktext, '</a></i>'].join(''));
    }
    //
    /////////////////////////////////////////////////////
    // CREAM OUTPUT Methods./////////////////////////////
    /////////////////////////////////////////////////////
    //
    // `endl()` adds a NEWLINE character to CREAM OUTPUT.
    this.endl = function () { return print('\n'); };
    //
    // clear
    this.clr = function () { jar.innerHTML=""; }
    //
    // The following two methods output supplied messages without any manipulation.
    // `message` should be supplied for meaningful output.
    // You may OPTIONALLY supply a CSS color.
    this.print = function (message, color) { return print(message, color); };
    this.printImage = function (src,w,h) { return printImage(src,w,h); };
    //
    // The following two methods append a NEWLINE character to supplied messages.
    // `message` should be supplied for meaningful output. To simply add a NEWLINE,
    // call `endl` or `endlb` instead.
    // You may OPTIONALLY supply a CSS color.
    this.println = function (message, color) { return print(message + '\n', color); };
    //
    // The following two methods add a HORIZONTAL RULE.
    this.printhr = function () { return print('<hr>'); };
    //
    // The following two methods aid in creating hyperlinks (by creating anchor tags.)
    // The destination url (`href`) must be supplied for meaningful output.
    // `linktext` and `color` are OPTIONAL.
    this.janchor = function (href, linktext, color) { return janchor(href, linktext, color); };
    //
    // The following method scrolls the JAR to the end of its contents.
    // There should not really be a need to use this method, as other methods
    // incorporate scrolling when required, but it's use is not restricted.
    this.autoScroll = function (activate) {
        if (!jarOn) { return false; }
        if ((activate===undefined)||activate) scrollInterval = setInterval(function() { jar.scrollTop = jar.scrollHeight; }, 50);
        else clearInterval(scrollInterval); 
        return true;
    };
    //
    /////////////////////////////////////////////////////
    // KEYBOARD INPUT Methods.///////////////////////////
    /////////////////////////////////////////////////////
    //
    // These are blocking functions.
    // `input` produces an inline text-field for user input.
 
    this.input = (message, suggestion, color) => new Promise((resolve, reject) => {
	    this.input2(
    	    message,
        	res => resolve(res),
        	suggestion,
        	color);
    });
 
	this.input2 = function (message, callback, suggestion, color) {
        var fobj, lobj, sobj, iobj; // form, label, span and input elements respectively.
        if (!jarOn) { return false; }
        if (message === undefined) { message = ''; }
        if (suggestion === undefined) { suggestion = ''; }
        if (!color) { color = incolor; }
        // FORM:
        fobj = document.createElement('form');
        fobj.id = '_jin_form_' + jarId;
        fobj.style.display = 'table';
        fobj.style.width = '100%';
        // LABEL:
        lobj = document.createElement('label');
        lobj.style.display = 'table-cell';
        lobj.style.color = color;
        // SPAN:
        sobj = document.createElement('span');
        sobj.style.display = 'table-cell';
        sobj.style.width = '100%';
        // INPUT:
        iobj = document.createElement('input');
        iobj.id = '_jin_input_' + jarId;
        iobj.style.width = '100%';
        iobj.style.fontFamily = 'monospace';
        iobj.style.fontWeight = 'bold';
        iobj.value = suggestion;
        // FORM ID and ONSUBMIT:
        fobj.onsubmit = function () {
            var iVal, newspan, oldform;
            iVal = document.getElementById('_jin_input_' + jarId).value;
            newspan = document.createElement('span');
            newspan.style.color = color;
            newspan.appendChild(document.createTextNode(message + iVal + '\n'));
            oldform = document.getElementById('_jin_form_' + jarId);
            jar.replaceChild(newspan, oldform);
            callback(iVal);
            return false;                   // So that the form does NOT submit.
        };
        // APPENDING CHILDREN
        lobj.appendChild(document.createTextNode(message));
        sobj.appendChild(iobj);
        fobj.appendChild(lobj);
        fobj.appendChild(sobj);
        jar.appendChild(fobj);
        iobj.focus();
        iobj.select();
        return true;
    };
    
    //
    // `inputarea` produces an block textarea for input, and a "Submit" button.
    this.inputarea = (message, suggestion, buttonText, color) => new Promise((resolve, reject) => {
	    this.inputarea(
    	    message,
        	res => resolve(res),
        	suggestion,buttonText,color);
    });
        
    this.inputarea2 = function (message, callback, suggestion, buttonText, color) {
        var fobj, tobj, bobj; // FORM, TEXTAREA and BUTTON elements
        if (!color) { color = incolor; }
        if (!that.print(message, color)) { return false; }
        if (!buttonText) { buttonText = 'Submit'; }
        // TEXTAREA:
        tobj = document.createElement('textarea');
        tobj.id = '_jinarea_textarea_' + jarId;
        tobj.style.width = '100%';
        tobj.style.display = 'block';
        tobj.value = (!!suggestion) ? suggestion : '';
        // FORM:
        fobj = document.createElement('form');
        fobj.id = '_jinarea_form_' + jarId;
        fobj.onsubmit = function () {
            var tVal, oldform;
            tVal = document.getElementById('_jinarea_textarea_' + jarId).value;
            oldform = document.getElementById('_jinarea_form_' + jarId);
            jar.removeChild(oldform);
            that.println(tVal, color);
            callback(tVal);
            return false;
        };
        // SUBMIT BUTTON:
        bobj = document.createElement('button');
        bobj.appendChild(document.createTextNode(buttonText));
        // APPENDING CHILDREN:
        fobj.appendChild(tobj);
        fobj.appendChild(bobj);
        jar.appendChild(fobj);
        tobj.focus();
        tobj.select();
        return true;
    };
    //
    /////////////////////////////////////////////////////
    // MOUSE INPUT Method.///////////////////////////////
    /////////////////////////////////////////////////////
    //
    // `click` is a blocking function.
    this.click = (...params) => new Promise((resolve, reject) => {
		if (!params.length) { params = ['Go']; }
		this.click2(res => resolve(res),Array.from(params));
    });
    
    this.click2 = function (callback, buttonTexts) {
        var dobj, bobjs = ['empty'], i; // DIV, BUTTONs elements respectively.
        dobj = document.createElement('div');
        dobj.style.display = 'inline';
        dobj.id = '_jclick_div_' + jarId;
        for (i = 0; i < buttonTexts.length; i ++) {
            var b = document.createElement('button');
            bobjs[i] =b;
            b.appendChild(document.createTextNode(buttonTexts[i]));
            b.style.margin='0 0 0 5px';
            dobj.appendChild(b);
            //if (i === 1) { bobjs[i].autofocus = true; }
            b.onclick = (function (current_i) {
                return function () {
                    var bTxt, olddiv, newbutton;
                    bTxt = bobjs[current_i].innerHTML;
                    newbutton = document.createElement('button');
                    newbutton.appendChild(document.createTextNode(bTxt));
                    newbutton.disabled = true;
                    olddiv = document.getElementById('_jclick_div_' + jarId);
                    jar.replaceChild(newbutton, olddiv);
                    jar.appendChild(document.createTextNode('\n'));
                    callback(bTxt);
                    return true;
                };
            }(i));
            if (i === 0) { b.autofocus = true; }
            dobj.appendChild(b);
        }
        jar.appendChild(dobj);
        return true;
    };
    //
    //////////////////////////////////////////////////////
    // WRAPPERS AROUND INBUILT Javascript FUNCTIONS.//////
    //////////////////////////////////////////////////////
    //
    this.prompt = function (message, suggestion, color) {
        if (!jarOn) { return false; }
        if (!color) { color = xcolor; }
        var inp = window.prompt(message, suggestion);
        // that.println(message + inp, color);
        return inp;
    };
    this.confirm = function (message, color) {
        if (!jarOn) { return null; }
        if (!color) { color = xcolor; }
        var bull = window.confirm(message), buttonName;
        buttonName = (!!bull) ? 'OK' : 'Cancel';
        that.println(message + buttonName, color);
        return bull;
    };
    this.alert = function (message, color) {
        if (!jarOn) { return false; }
        if (!color) { color = xcolor; }
        window.alert(message);
        that.println(message, color);
        return true;
    };
    //
    ///////////////////////////////////////////////////////
    // End of execution.///////////////////////////////////
    ///////////////////////////////////////////////////////
    //
    this.close = function (buttonText, scroll) {
        if (!jarOn) { return false; }
        if (!buttonText) { buttonText = 'Reload'; } // `buttonText` is optional. 
        that.print('<hr>');
        that.println(['<button onclick="window.location.reload();">', buttonText, '</button>'].join(''));
        if (scroll !== false) { jar.scrollTop = jar.scrollHeight; }   // To avoid scrolling, explicitly set scroll to false.
        jar = null;
        jarOn = false;
        return true;
    };
    //
    ////////////////////////////////////////////////////////
    // A window into private properties.////////////////////
    ////////////////////////////////////////////////////////
    //
    this.status = function () {
        var arr = [];
        arr.push('********************************');
        arr.push('STATUS REPORT:');
        if (jarOn) {
            arr.push('Jar Binding: Active');
        } else {
            arr.push('Jar Binding: Inactive');
        }
        arr.push('Jar ID: ' + jarId);
        arr.push('AutoScroll: ' + (!!scrollInterval));
        arr.push('********************************');
        window.alert(arr.join('\n'));
    };
}

function sleep(milliSeconds)
{
    return new Promise((resolve, reject) => {
	    setTimeout(res => resolve(res),milliSeconds);
    });
}
