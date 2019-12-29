# Meaningful names

## 1. Use Intention-Revealing Names

Name should tell why it exists, what it does and how to use it.

## 2. Avoid disinfomation

Example: accounts is a group of accounts while account just represents 1 account.

## 3. Make meaningful distintion

Distinguish names in such a way that the reader knows what the differences offer. Example: avoid to declare 2 variables name `productInfo` and `productData`. Info and Data are indistinct noise words like `a`, `an`, and `the`.

## 4. Use pronounceable names

## 5. Use searchable names

Easy to guess and search the name.

## 6. Class Names

Classes and objects should have noun or noun phrase names like `Customer`, `WikiPage`, `Account`, and `AddressParser`. Avoid words like `Manager`, `Processor`, `Data`, or `Info` in the name of a class. A class name should not be a verb.

## 7. Method Names

Methods should have verb or verb phrase names like `postPayment`, `deletePage`, or `save`.

Accessors, mutators, and predicates should be named for their value and prefixed with `get`, `set`, and `is` according to the javabean standard.

When constructors are overloaded, use static factory methods with names that describe the arguments. For example, `Complex fulcrumPoint = Complex.FromRealNumber(23.0);`

## 8. Pick One Word per Concept

Pick one word for one abstract concept and stick with it. For instance, it’s confusing to have fetch, retrieve, and get as equivalent methods of different classes.
