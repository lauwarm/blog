---
title: "All of the Markdown"
image: "/posts/images/posts/20210810-allOfTheMarkdown/1.webp"
date: 2021-08-10T17:55:39+02:00
draft: false
tags: ["post"]
---

## Purpose

This Post demonstrates how Markdown is rendered on this Website.

## Headings

# ATX style H1

## ATX style H2

### ATX style H3

#### ATX style H4

# Closed ATX style H1 #

## Closed ATX style H1 ##

### Closed ATX style H1 ###

#### Closed ATX style H1 ####

Alt-H1
======

Alt-H2
------

## Quotes

> The secret to creativity is knowing how to hide your sources.
> &mdash; [Albert Einstein][1]
[1]: http://www.quotedb.com/quotes/2112

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.

## Images

![image alt text](/posts/images/posts/20210810-allOfTheMarkdown/1.webp)

## Bold Text

**This is bold text**

## Italic Text

*This text is italicized*

## Crossed Text

~~This was mistaken text~~

## Bold and Italic Text

**This text is _extremely_ important**

## All Bold and Italic Text

***All this text is important***

## Quoting code

Some basic Git commands are:

```git
git status
git add
git commit
```

## Links

This site was built using [GitHub Pages](https://pages.github.com/).

[I'm an inline-style link](https://example.com/)

[I'm an inline-style link with title](https://example.com/ "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
https://example.com/ or <https://example.com/> and sometimes example.com (but not on Github, for example).

[arbitrary case-insensitive reference text]: https://example.com/
[1]: https://example.com/
[link text itself]: https://example.com/

## Lists

- George Washington
- John Adams
- Thomas Jefferson

* Unordered list can use asterisks

- Minuses

+ Pluses

1. James Madison
2. James Monroe
3. John Quincy Adams

1. First ordered list item
2. Another item
   * Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
   1. Ordered sub-list
4. And another item.

## Nested Lists

1. First list item
   - First nested list item
     - Second nested list item

## Task lists

- [x] #739
- [ ] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:

## Ignoring Markdown formatting

Let's rename \*our-new-project\* to \*our-old-project\*.

## Creating a table

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

| Command | Description |
| --- | --- |
| git status | List all new or modified files |
| git diff | Show file differences that haven't been staged |

| Command | Description |
| --- | --- |
| `git status` | List all *new or modified* files |
| `git diff` | Show file differences that **haven't been** staged |

| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| git status   | git status     | git status    |
| git diff     | git diff       | git diff      |

| Name     | Character |
| ---      | ---       |
| Backtick | `         |
| Pipe     | \|        |

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

## Logo

Inline-style (hover to see the title text)

![alt text](/posts/images/posts/20210810-allOfTheMarkdown/logo-24.png "Logo Title Text 1")

Reference-style (hover to see the title text)

![alt text][logo]

[logo]: /posts/images/posts/20210810-allOfTheMarkdown/logo-24.png "Logo Title Text 2"

## Inline Code

Inline `code` has `back-ticks around` it.

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
```

## Lines

Three or more Hyphens

---

Three or more Asterisks

***

Three or more Underscores

___
