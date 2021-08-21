# bluemoon
bluemoon is an "image code" generator.

## How it works
Pixels are read in rows. Each pixel is checked for its RGB values (not including transparency) and a code is generated off of that. <br>
The numbers are split up individually (eg. 255 becomes 2, 5 and 5)
```
Initial -> Code
0 -> 0
1 -> a
2 -> b
3 -> c
4 -> d
5 -> e
6 -> f
7 -> g
8 -> h
9 -> i
```
Therefore, a pixel with the RGB of 60, 45, 134 would become f0deacd. <br>
This code is added to a string and a comma is added after each color value, so that code would actually be f0,de,acd. <br>
The aforementioned string ends up being really long and becomes quite a large file if you have a large image. <br>
Then, it is put through a base64 encoder and that base64 is converted to sha256 and gzip. <br>
You are returned a sha256 code and given a gzip file. **It is not recommended to use sha256 as it is not always unique (although that is unlikely). You should use the gzip file instead.**

## Requirements
- node.js

## How to set it up
- Download the files
- Go to the folder you have the files in
- Open that folder in a command prompt
- Run `npm install`
- Once done, put an image in the folder
- In the command prompt, run `node gen.js imgname.extension`, example: `node gen.js test.png`
- You will be returned a sha256 code and a file will be in the folder with the gzip
