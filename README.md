# No Geniza

> **Note**: Seeking a better name, suggestions are welcome

The goal is to **facilitate the ability to prepare documents in such a way that [geniza](https://en.wikipedia.org/wiki/Genizah) will not be required**. To the best of my knowledge, this means removing the forms of Hashem's name that would require a hardcopy of a document to be properly buried instead of thrown out.

## Problem

I am thinking of those who prepare sources for a d'var Torah and the like. If the preparer is conscious of this problem, then without the proper tools, he/she must either:

* manually replace the holy names (_slow and error prone_)
* find a source that already has the names in the non-holy form (_inconvenient_)

## Solutions
Some ideas of how to improve on that:

* **Web app**: allows one to paste some piece of text (presumably with the holy names) and retrieve (copy to clipboard?) processed output (with the holy names transformed to be non-holy) that could then be pasted in some other document.
* **API**: a library or API that could be used by other apps trying to do similar
* **Plugins/Add-ons**: create plugins for word processors (think Google Docs add-on) that can inspect the documents and automatically perform this operation on command. This is good because once installed, there should be very low friction for the user

## Challenges

* The input might contain nikkud and cantellation marks that make it harder to "find" the right content. Related to that, it would be ideal if the processed content preserves as much of the original input as possible, assuming that the document preparer intentionally is using content with nikkud or cantellation marks. Perhaps an option to strip out that "extra" material would also be universally valuable.

* False positives, examples include:

  * **אל**: since אֶל (meaning: _to_) is not a holy word
  * **אלוהים**: as in "אלוהים אחרים" specifically is not a holy form since it is not referring to Hashem

  Potential solutions for that include:

  * trying to use surrounding text to do a best guess lookup against a known "database" as to whether that specific instance needs to be altered or can be left as is
  * marking unknown instances of the input as unknown, though this may be a UI/UX problem, and it may require that the user manually reviews, which is less than ideal


* Many of the holy names also take on several variations, e.g. אלוהים/אלהי/אלהינו, which are all conceptually the same form, but need to be found differently.
