# IOKranf
Educational library in Javascript with simple println and input command

This javascript is library Inspired by C's <iostream.h>. 

The actual code of this library is a mixture of several projects:
* IOCREAM project: https://bitbucket.org/sumukhbarve/iocream/src/master/
* Promise-Alert project: https://github.com/rBurgett/promise-alert
* co project: https://www.npmjs.com/package/co
Thanks for the many contributors to these projects: Without them this library would not exist!

ioKranf.js is a simple wrapper around the DOM, allowing you to easily port your code to Javascript and run it in a browser of your choice. Using ioKranf.js, all programs/projects written during any introductory course to Computer Science, irrespective of the language used or rigor, can be QUICKLY and ELEGANTLY rewritten in Javascript. The primary intention of this library is to encourage new programmers to explore Javascript, and to engage in prototype-based programming.

The library gives access to a few different functions. The most important ones are:
```
  println
  printhr
  input
  click
  clr
  close
```

Here is a small JS demonstration  program:
```
	io.println('Hello!');
  io.printhr();
    
  io.println('Are you happy?!');
	var r=yield io.click('yes','no');
	io.println('you clicked '+r+'\n');
	
	var s=yield io.input('Enter your name:');
	io.println('Hello '+s+'\n');
  io.close();
```

Here is a screen video captureof the execution of the above program:


Have fun!
Frank
