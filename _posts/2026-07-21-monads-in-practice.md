---
layout: post
title:  "Monads in Practice"
date:   2026-07-21 12:00:00 +0000
categories: blog
---
# What are Monads?
"A monad is a monoid in the category of endofunctors," is a typical definition one finds when they ask Google, or Jeeves, or Jarvis about what a monad is, but what are they really? My last blog post was an attempt to get the reader to understand what a specific type of monad is by thinking about what it does instead of it's definition.

Let's continue that trend of discussing how *some* monads work and leave the concise definitions to the big wigs.

Monads are used and enforced in a lot of languages through things like `Maybe` types (in Elm's case), Option Results (like in Rust and other languages), and other methods. They can also be created, through a bit of effort, in languages that don't have any fundamental type or design specifications for them at all. C#, JavaScript, Python; you'll find examples of people working a monadic library into just about every language they can.

Here's a simple example (note this is not production code, please do not use it for such things):

```Elm
type alias Produce =
    { name : String
    , expirationDate : Maybe Date
    , price : Float
    }

canSellProduce : Produce -> Bool
canSellProduce produce =
    case produce.expirationDate of
        Nothing ->
            True
        Just date ->
            date > today
```

In this code we're checking a piece of produce being passed to the canSellProduce function for a grocery store. Most things in grocery stores have an expiration date, but what about paper products? What about twinkies? Those last for all of eternity! If we wound up accidentally passing in an item without an `expirationDate` to this function in JavaScript we may have run into a classic null runtime exception!

Fortunately, Elm has a very strong type system and these situations lean on Maybe. Once you have a `Maybe` property in a type declaration Elm's compiler will check every instantiation of that property and throw an absolute fit if you don't offer an alternative path for if the property isn't there. Checking every `Maybe` guarantees that if `expirationDate` isn't there, your code will be able to keep moving forward instead of throwing a null error.

# Why are they useful?
Let's take a look at what the code example is really doing. It's deciding whether or not we can sell a specific piece of produce. If the produce has an expiration date we check to make sure it isn't expired, but what if it doesn't have one at all? This monad is just forcing us to solve this potential null error before the code ever reaches production.

In languages like Elm the compiler forces us to check this ahead of time. If we left out the option where the `expirationDate` could be nothing, the program wouldn't compile. If it doesn't compile, we can't put it in production. We never have that runtime exception where we forgot to check for `expirationDate` being null.

In other languages, we might remember to null check this item, but what about other methods? What about the new guy we hired that doesn't realize there are products that don't have expiration dates? How many times have you ran into a null exception in production? There are speeches, documentaries, even books written about this very issue. All of that whisked away if you choose a language that strictly implements these rules.

# Why do we hear about them only in certain languages?
Ok, we know what a monad is. We know why it's useful to use them. We even know we can make them in languages that don't even have specifications for them. So why don't we hear about these types of monads in those languages?

I believe it's because they don't enforce them. Much in the same way that languages with only mutable data types often don't talk about immutability (save for articles that have found the key to "stopping errant state mutations with this one little trick!"). It's just not a de facto thing supported by the language design. You'll come across the odd engineer that has been bitten by this one too many times and now they make it their life goal to implement this in every spot they find, but otherwise if the language isn't designed for it, we often don't think about it.

When emergencies happen, human's responses fall to their base levels of training. When programming, we often fall to the base levels of our chosen language's design. If we can get away without a null check, we won't always remember to check for null. If we can mutate variables outside of scope, we will eventually mutate variables outside of scope. We are flawed, it's what makes us human, but proper tooling can pick up where our flaws leave off. Monads are one of those tools.

If you have comments or more questions feel free to reach out to me! I have some contact information in the footer below.