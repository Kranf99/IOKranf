//
// IOKranf.js
// LICENSE          : the MIT License (MIT), see LICENSE.md for details
// DOCUMENTATION    : README.md
//
function IOKranf(pre_id, bgcolor, outcolor, incolor, xcolor) {
    'use strict';
    var jar, jarId, jarOn, jarBuffer, that; // PRIVATE VARIABLES;
    jar = window.document.getElementById(pre_id);
    jarId = pre_id;
    jarOn = !!jar;
    jarBuffer = [];
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
    function print(mode, message, color) {
        if (!jarOn) { return false; }
        if (mode === 'buffer') {
            if (!color) {
                jarBuffer.push(message);
            } else {
                jarBuffer.push(['<span style="color:', color, ';">', message, '</span>'].join(''));
            }
        } else {
            if (!color) {
                jar.innerHTML += message;
            } else { jar.innerHTML += '<span style="color:' + color + ';">' + message + '</span>'; }
        }
        return true;
    }
    function anchor(mode, href, linktext, color) {
        if (!linktext) { linktext = href; }
        if (!color) { color = xcolor; }
        return print(mode, ['<i><a href="', href, '" style="color:', color, ';">', linktext, '</a></i>'].join(''));
    }
    //
    /////////////////////////////////////////////////////
    // CREAM OUTPUT Methods./////////////////////////////
    /////////////////////////////////////////////////////
    //
    // `endl()` adds a NEWLINE character to CREAM OUTPUT.
    this.endl = function () { return print('direct', '\n'); };
    //
    // `endlb()` adds a NEWLINE character to the BUFFER.
    this.endlb = function () { return print('buffer', '\n'); };
    // clear
    this.clr = function () { jarBuffer=[]; jar.innerHTML=""; }
    //
    // The following two methods output supplied messages without any manipulation.
    // `message` should be supplied for meaningful output.
    // You may OPTIONALLY supply a CSS color.
    this.print = function (message, color) { return print('direct', message, color); };
    this.printb = function (message, color) { return print('buffer', message, color); };
    //
    // The following two methods append a NEWLINE character to supplied messages.
    // `message` should be supplied for meaningful output. To simply add a NEWLINE,
    // call `endl` or `endlb` instead.
    // You may OPTIONALLY supply a CSS color.
    this.println = function (message, color) { return print('direct', message + '\n', color); };
    this.printlnb = function (message, color) { return print('buffer', message + '\n', color); };
    //
    // The following two methods add a HORIZONTAL RULE.
    this.printhr = function () { return print('direct', '<hr>'); };
    this.printhrb = function () { return print('buffer', '<hr>'); };
    //
    // The following two methods aid in creating hyperlinks (by creating anchor tags.)
    // The destination url (`href`) must be supplied for meaningful output.
    // `linktext` and `color` are OPTIONAL.
    this.janchor = function (href, linktext, color) { return janchor('direct', href, linktext, color); };
    this.janchorb = function (href, linktext, color) { return janchor('buffer', href, linktext, color); };
    //
    // The following method scrolls the JAR to the end of its contents.
    // There should not really be a need to use this method, as other methods
    // incorporate scrolling when required, but it's use is not restricted.
    this.jscroll = function () {
        if (!jarOn) { return false; }
        jar.scrollTop = jar.scrollHeight;
        return true;
    };
    //
    /////////////////////////////////////////////////////
    // FULSHING THE BUFFER.//////////////////////////////
    /////////////////////////////////////////////////////
    //
    this.flushb = function (flush) {
        if (!jarOn) { return false; }
        that.print(jarBuffer.join(''));
        jarBuffer = [];
        if (flush !== false) { that.jscroll(); } // To perform a flush-less scroll, explicitly set flush = false.
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
            bobjs[i] = document.createElement('button');
            bobjs[i].appendChild(document.createTextNode(buttonTexts[i]));
            dobj.appendChild(bobjs[i]);
            //if (i === 1) { bobjs[i].autofocus = true; }
            bobjs[i].onclick = (function (current_i) {
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
            if (i === 1) { bobjs[i].autofocus = true; }
            dobj.appendChild(bobjs[i]);
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
    	this.flushb(scroll);
        if (!buttonText) { buttonText = 'Reload'; } // `buttonText` is optional. 
        that.print('<hr>');
        that.println(['<button onclick="window.location.reload();">', buttonText, '</button>'].join(''));
        if (scroll !== false) { that.jscroll(); }   // To avoid scrolling, explicitly set scroll to false.
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
        arr.push('\tSTATUS REPORT:-');
        if (jarOn) {
            arr.push('Jar Binding: Active');
        } else {
            arr.push('Jar Binding: Inactive');
        }
        arr.push('Jar ID: ' + jarId);
        if (jarBuffer.length === 0) {
            arr.push('Jar Buffer: Empty');
        } else {
            arr.push('Jar Buffer: Non-empty');
            arr.push('Buffer-length: ' + jarBuffer.length);
        }
        arr.push('********************************');
        window.alert(arr.join('\n'));
    };
}

function IOKranf_co(gen) {
  var ctx = this;
  var args = Array.prototype.slice.call(arguments, 1);

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
      return null;
    }

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
	function isPromise(obj) {
  		return 'function' == typeof obj.then;
	}
    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */
    function next(ret) {
      if (ret.done) return resolve(ret.value);
      //var value = toPromise.call(ctx, ret.value);
      var value = ret.value;
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}
