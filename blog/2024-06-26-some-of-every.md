---
layout: post
title:  "Some of Every: JS is illogical! Or is it?"
date:   2024-06-26 21:55:00 +0000
categories: blog random javascript programming
---

A few times in my career I've been the witness of a classic JavaScript blunder. One that leads developers to stand up, shake their fist at the sky and decry, yet again, "JavaScript makes no sense!"

The particular case against JavaScript my title refers to is actually no fault of JavaScript's at all: .every().

Imagine, for a moment, your boss has a penchant for blue items. Every transaction in your eCommerce site, even donations, just *have* to have a blue item in them. Easy enough, we'll just take the array of items in the cart, run a .every() on it and check that there's a blue item in there. You commit your code, send it on its way and forget about it.

The next week goes by and you hear what you thought was your name being muttered down the hall. Footsteps grow louder until your boss comes storming into your cubicle demanding to know what the heck the meaning of this is as he hands you a piece of paper with a crude picture of a monitor with a single transaction on it. A donation with no items attached was allowed to go through. That's not right, you think, you ran a .every() check on that, it shouldn't get through unless there is a blue item in there...

Then it dawns on you, you go to [MDN](https://developer.mozilla.org) and check the docs on .every() to find... Empty arrays return true. Wat. "JavaScript I knew you were a cold blooded son of a gun, but this too far," you proclaim. And promptly add another check for empty arrays and move on... The next week you make the same mistake with C#'s .all()...

## How could this be?

A good friend and mentor of mine always stressed learning JavaScript's ins and outs to make sure these surprises aren't surprising at all. As another coworker of mine once said, "it's code, not magic." Even though it may feel like it sometimes.

It turns out JavaScript, like most other languages with an every check, gets this completely right from a purely logical perspective. The logical principle they operate off is called [Vacuous Truth](https://en.wikipedia.org/wiki/vacuous_truth) where, logically, nothing of something is true. According to JavaScript, when it checked an array of no items, technically every item in that array was blue. Maybe this is annoying to some, but if you squint your mind's eye and think about it for a bit it you can kind of see why it makes sense, even if you might not like it.

Next time try a .some().

## Jira tickets
I'll leave you with a better example. A favorite of my old mentor:

Your boss walks in to find you having a slow workday. He postures himself and asks you "Did you finish all of your Jira tickets for the day?"

You look over to the screen cluttered with tickets. Remembering none were assigned to you that day you confidently reply. "Yep!"

Have a good day!

P.S. I'll be at KCDC2024 for the next 2 days, if you're in town I'd love to meet and discuss whatever nerd stuff you enjoy! Cheers!