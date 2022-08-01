<!-- 2019-12-14 -->

# [Markdown Cheat Sheet](<#/markdown-cheat-sheet.md>)

Interesting things you can do with Markdown.

## Links of Interest

- [https://daringfireball.net/projects/markdown/](<https://daringfireball.net/projects/markdown/>) << where it all started
- [https://en.wikipedia.org/wiki/Markdown](<https://en.wikipedia.org/wiki/Markdown>)
- [https://en.wikipedia.org/wiki/Wiki#Editing](<https://en.wikipedia.org/wiki/Wiki#Editing>)
- [https://github.com/showdownjs/showdown](<https://github.com/showdownjs/showdown>)
- [https://guides.github.com/features/mastering-markdown/](<https://guides.github.com/features/mastering-markdown/>)
- [https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet](<https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet>)
- [https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md](<https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md>)
- [https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf](<https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf>)

<!-- -->

tips

- [https://github.com/shaunlebron/github-markdown-hacks](<https://github.com/shaunlebron/github-markdown-hacks>)
- [https://www.webfx.com/tools/emoji-cheat-sheet/](<https://www.webfx.com/tools/emoji-cheat-sheet/>)
- [https://github.com/bryanbraun/poor-mans-styleguide](<https://github.com/bryanbraun/poor-mans-styleguide>)
- [https://www.poormansstyleguide.com/](<https://www.poormansstyleguide.com/>)

<!-- -->

tests

abc<br>

 def<br>

 ghi

:bowtie:

YAML here

[www.google.com](<http://www.google.com>).<br>

 example.com

Mentions

[@theo-armour](<https://github.com/theo-armour>)

YAML

[http://alvinalexander.com/technology/markdown-comments-syntax-not-in-generated-output/](<http://alvinalexander.com/technology/markdown-comments-syntax-not-in-generated-output/>)

---

```
<sub>abc def 123</sub>
```

<sub>abc def 123</sub>

```
<abbr>AEC</abbr>

The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.
```

<abbr>AEC</abbr>

The <abbr title="World Health Organization">WHO</abbr>

 was founded in 1948.

Small:

```
abc ABC <small>abc def 123</small> ABC abc
```

abc ABC <small>abc def 123</small>

 ABC abc





iframe test

<iframe src="https://pushme-pullyou.github.io/templates-01/open-markdown-or-html/readme.html" width="100%" height="100%"><p>Iframes are not viewable in GitHub source code views</p></iframe>

### Text

```
_italics_ *italics*
```

*italics* *italics*

```
**bold**
```

**bold**

```
***bold and italics***
```

***bold and italics***

### Strike through

```
~~Strike through~~
```

~~Strike through~~

### Keyboard

```
Press <kbd>W</kbd> to go up, and <kbd>A</kbd> to go down.
If you can find the <kbd>ESC</kbd>, pressing that will fire missiles 🚀
```

Press <kbd>W</kbd>

 to go up, and <kbd>A</kbd>

 to go down.<br>

 If you can find the <kbd>ESC</kbd>

, pressing that will fire missiles 🚀

### Horizontal rules

```
***
    ---
    ___
```

---

---

---

### Links

```Markdown
[Example.com]( https://example.com "title" )
```

[Example.com](<https://example.com> "title")

text [^1](<footnote>) not

### Tables

```
| h1    |    h2   |      h3 |
|:------|:-------:|--------:|
| 100   | [a][1]  | ![b][2] |
| *foo* | **bar** | ~~baz~~ |
```

| h1      | h2      | h3      |
| :------ | :-----: | :-----: |
| 100     | [a][1]  | ![b][2] |
| *foo*   | **bar** | ~~baz~~ |

### Lists

```
* item
* item
* item
    * item
    * item
        * item
* item
```

- item
- item
- item- item
    - item- item

        <!-- -->

    <!-- -->

- item

<!-- -->

### Code

```Markdown
```
    line of code with 3 backquote characters
    line of code
    line of code
    ```
```

```Markdown
line of code
    line of code
    line of code
```

```Markdown
text with `back quote` characters
```

text `text` text

### Quotes

```markdown
> quote
> quote
> quote
```

> quote<br>
> 
>  quote<br>
> 
>  quote

### Audio

<audio controls=""><source src="https://simpl.info/audio/audio/audio.ogv" type="audio/ogg"><source src="https://simpl.info/audio/audio/audio.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio>

### Images

- Uses [picsum.photos](<https://picsum.photos>) to gather random images

<!-- -->

```
![External Link Icon]( https://picsum.photos/800/600/?random =100x100 )

    ![ text ]( https://picsum.photos/800/600/?random  =400x300 )

    ![ text ]( https://picsum.photos/800/600/?random  =200x150 )
```

![External Link Icon](<https://picsum.photos/800/600/?random> =100x100)

![ text ](<https://picsum.photos/800/600/?random> =400x300)

![ text ](<https://picsum.photos/800/600/?random> =200x150)

### Figures

```
<figure style=display:inline-block; >
<a href=https://google.com >
<img src="https://picsum.photos/200/200/" >
<figcaption>Fig1. - A view of image 1</figcaption>
<a>
</figure>
```

<figure style="display:inline-block;"><a href="https://google.com"><img src="https:///picsum.photos/200/200/"><figcaption>Fig1. - A view of image 1</figcaption></a><a></a></figure>

<figure style="display:inline-block;"><a></a><a href="https://google.com"><img src="https://picsum.photos/200/200/"><figcaption>Fig2. - A view of the caption</figcaption></a></figure>

### Footers

<br>

---



<center title="dingbat"><p></p><h1 id="a-hrefjavascriptwindowscrollto00-styletext-decorationnone-❦a"><a href="javascript:window.scrollTo(0,0);" style="text-decoration:none;">❦</a></h1><p></p></center>





<center title="dingbat"><p></p><h1 id="span-onclickwindowscrollto00-stylecursorpointer-❦span"><span onclick="window.scrollTo(0,0);" style="cursor:pointer;">❦</span></h1><p></p></center>





<center title="dingbat"><p></p><h2 id="a-hrefjavascriptcontentscrolltop0-❦a"><a href="javascript:content.scrollTop=0;">❦</a></h2><p></p></center>





<center title="dingbat"><p></p><h1 id="a-hrefjavascriptwindowscrolltop0-styletext-decorationnone-❦a"><a href="javascript:window.scrollTop=0;" style="text-decoration:none;">❦</a></h1><p></p></center>



