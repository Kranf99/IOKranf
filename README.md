# IOKranf

Educational library in Javascript that is great for kids to learn programming. 

This library emulates a "console" with simple println and input command. 

This javascript library is inspired by the great C's <iostream.h> library. 

The actual code of the IOKranf library is a mixture of several projects:
* IOCream library: https://bitbucket.org/sumukhbarve/iocream/
* Promise-Alert project: https://github.com/rBurgett/promise-alert
* The "co" package: https://www.npmjs.com/package/co

Thanks for the many contributors to these projects: Without them this library would not exist!

ioKranf.js is a simple library, allowing you to easily port your console-based code to Javascript and run it in a browser of your choice. Using ioKranf.js, all programs/projects written during any introductory course to Computer Science, irrespective of the language used or rigor, can be QUICKLY and ELEGANTLY rewritten in Javascript. The primary intention of this library is to encourage new programmers to explore coding, and to engage in prototype-based programming.


# Why still another educational library to learn how to code?

I wanted a quick and easy way to teach how to code to my 3 kids (Cassian, Darian and Lara).

Initially, I started using Python but there are several things that keept me away from Python:
* The Python syntax wasn't the easiest one for the kids (especially the "for" loops).
* Another thing that profoundly bothered me with Python is that we spent more time in learning how to run the libraries written by others (giving the proper parameters in the right order,etc.) than we were spending time in actually learning algorithms, code complexity (O(N)) of algorithms, etc. and, in general, how to create good code.
* The coding environment in Python is terribly and horribly bloated (a complete Python environment often takes more than 1GB of hard drive space)!
* I wanted an easy debugger where you can execute step-by-step the instructions, with a "watch" window to see the variables "moving" and this was not easy to setup in Python (are there any good debugger in Python?).
* I wanted an programming environment that was directly available to everybody, everywhere on the planet.

Then, I tried to use the "scratch" programming language. "Scratch" is a nice language for the very young. But, when your kids are around 10-12 years old, you want to teach them how to create "good" code: You want to talk about algorithmics, functional programming, with them. ...And "Scratch" is not a good idea for that (i.e. Writing a "quicksort" in scratch is a headache!).

Thereafter, I found the excellent "iocream" library. It almost solved all my issues with the other options detailed here above ...but this library is still very cumbersome in the way you need to write the "input" functions: i.e. you need to use "call-back" functions and this adds an extra layer of un-needed complexity to your code that makes your code very difficult to understand for the younglings. So I rewrote the "input" functions from the "iocream" library to make them much easier to use "et voilà!" the "IOKranf" library was born! Enjoy!


# What's the advantage of using this library to learn how to code?

The IOKranf library has the following advantages: 
* It offers progamming language with an easy  syntax (the syntax of Javascript is very easy!) 
* It offers a great debugger (the one integrated in Firefox is really good!)
* It's accessible everywhere easily (because everybody has Firefox or Chrome installed!)
* It's not bloated: it's a single 15KB file! The only required file is the file "lib/iokranf.js". There are no dependencies to any third-party library (such as jQuery, Angular,etc.). 
* This library is very simple to use: You only need to learn the Javascript syntax any nothing else. No need to learn the syntax of any third-party complex & cumbersome library (such as jQuery, Angular,etc.). In this way, you can really focus on what really matters: algorithmics, data structure, clever code.

In the forecoming years, i intend to post many examples of usage: sorting algorithms, searching algorithms, graph algorithms, etc.

The file "example1_tron.html" shows how to create a simple "TRON" game (also known as "SNAKE" game), to get you started!

Who will be the first one to make a Tetris game? 


# Quick Start Guide

The library gives access to a few different functions. The most important ones are:
```
  println(): Prints a message inside the "console".
  printhr(): Prints a large horizontal bar inside the "console".
  input():   Creates a inline input box inside the "console"; the user must hit Enter to submit the input.
  click():   Creates a horizontal list of buttons for the user to click on.
  clr():     Clear all text inside the "console".
  close():   If your program has finished, you can clearly indicate that by calling close().
```

Here is a small JavaScript demonstration program (it's really self-explanatory!):
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

Here is a video-screen-capture of the execution of the above program:
![demo_gif](https://github.com/Kranf99/IOKranf/blob/main/demo.gif)

You get more documentation (although a little bit outdated) <a href="https://bitbucket.org/sumukhbarve/iocream/src" target="_blank">here</a>.

The library is under "MIT License", so that anybody can use it for free!

Have fun!

Frank
