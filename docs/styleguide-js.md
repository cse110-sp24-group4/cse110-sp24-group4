# JavaScript Style Guide for Ctrl Alt Elite Projects

## Content

1. [Introduction](#1-introduction)
   - [Terminology](#11-terminology-notes)
2. [Source file basics](#2-source-file-basics)
   - [File names](#21-file-names)
   - [Special characters](#22-special-characters)
3. [Source file structure](#3-source-file-structure)
   - [File overview](#31-top-level-file-overview)
   - [Imports](#32-imports)
   - [Implementation](#33-implementation)
4. [Formatting](#4-formatting)
   - [Braces](#41-braces)
   - [Block indentation](#42-block-indentation-2-spaces)
   - [Statements](#43-statements)
   - [Column limit](#44-column-limit-80)
   - [Line wrapping](#45-line-wrapping)
   - [Whitespace](#46-whitespace)
   - [Grouping parantheses](#47-grouping-parentheses-recommended)
   - [Comments](#48-comments)
5. [Language features](#5-language-features)
   - [Local variables](#51-local-variable-declarations)
   - [Array and Object literals](#52-array-and-object-literals)
   - [Functions](#53-functions)
   - [String literals](#54-string-literals)
   - [Control structures](#55-control-structures)
6. [Naming](#6-naming)
   - [Common naming rules](#61-rules-common-to-all-identifiers)
   - [Naming rules by type](#62-rules-by-identifier-type)
7. [JSDoc](#7-jsdoc)
   - [General form](#71-general-form)
   - [Tags](#72-jsdoc-tags)
   - [Line wrapping](#73-line-wrapping)
   - [File level comments](#74-file-level-comments)
   - [Class comments](#75-class-comments)
   - [Enum and typedef](#76-enum-and-typedef-comments)
   - [Methods and functions](#77-method-and-function-comments)
   - [Properties](#78-property-comments)
   - [Type annotations](#79-type-annotations)
8. [Policies](#8-policies)

## 1 Introduction

This document serves as the complete definition of Ctrl Alt Elite's coding standards for source code in the JavaScript programming language.

Like other programming style guides, the issues covered span not only aesthetic issues of formatting, but other types of conventions or coding standards as well. However, this document focuses primarily on the hard-and-fast rules that we follow universally, and avoids giving advice that isn't clearly enforceable (whether by human or tool).

### 1.1 Terminology notes

1. The term comment always refers to implementation comments. We do not use the phrase documentation comments, instead using the common term “JSDoc” for both human-readable text and machine-readable annotations within `/** … */`.

2. This Style Guide uses [RFC 2119](http://tools.ietf.org/html/rfc2119) terminology when using the phrases _must, must not, should, should not, and may_. The terms _prefer_ and _avoid_ correspond to should and should not, respectively. Imperative and declarative statements are prescriptive and correspond to must.

## 2 Source file basics

### 2.1 File Names

1. File names _must_ be all lowercase and may include hyphens, but no additional punctuation.

### 2.2 Special characters

#### 2.2.1 Whitespace characters

Aside from the line terminator sequence, the ASCII horizontal space character (`0x20`) is the only whitespace character that appears anywhere in a source file. This implies that

1. All other whitespace characters in string literals are escaped, and

2. Tab characters are _not_ used for indentation.

#### 2.2.2 Special Escape Sequences

For any character that has a special escape sequence (`\'`, `\"`, `\\`, `\b`, `\f`, `\n`, `\r`, `\t`, `\v`), that sequence is used rather than the corresponding numeric escape (e.g `\x0a`, `\u000a`, or `\u{a}`). **Legacy octal escapes are never used.**

#### 2.2.3 Non-ASCII Characters

For the remaining non-ASCII characters, either the actual Unicode character (e.g. `∞`) or the equivalent hex or Unicode escape (e.g. `\u221e`) is used, depending only on which makes the code easier to read and understand.

Non-ASCII characters _must_ be followed by a comment explaining what character that line references.

## 3 Source File Structure

Files consist of the following, **in order**:

1.  `@file` overview JSDoc
2.  `import` statments
3.  The file's implementation

> **Exactly one blank line** separates each section that is present, except the file's implementation, which may be preceded by 1 or 2 blank lines.

### 3.1 Top level file overview

A file should have a top-level file overview. Author information and default visibility level are optional. The top level comment is designed to orient readers unfamiliar with the code to what is in this file. If present, it may provide a description of the file's contents and any dependencies or compatibility information. Wrapped lines are not indented.

JSDoc example:

```
/**
 * @file Description of file, its uses and information
 * about its dependencies.
 * @package
 */
```

### 3.2 Imports

Import statements must not be line wrapped.

#### 3.2.1 Import paths

ES module files must use the `import` statement to import other ES module files.

The `.js` file extension is not optional in import paths and must always be included.

Do not import the same file multiple times. This can make it hard to determine the aggregate imports of a file.

Module import names (`import * as name`) are `lowerCamelCase` names that are derived from the imported file name.

### 3.3 Implementation

The actual implementation follows after all dependency information is declared (separated by at least one blank line).

This may consist of any module-local declarations (constants, variables, classes, functions, etc), as well as any exported symbols.

## 4 Formatting

> **Terminology Note**: block-like construct refers to the body of a class, function, method, or brace-delimited block of code. Array literals and Object literals may be treated as block-like constructs.

### 4.1 Braces

#### 4.1.1 Braces are used for all control structures

Braces are required for all control structures (i.e. `if`, `else`, `for`, `do`, `while`, as well as any others), even if the body contains only a single statement. The first statement of a non-empty block should begin on its own line unless doing otherwise results in improved readability.

#### 4.1.2 Nonempty blocks: K&R style

Braces follow the Kernighan and Ritchie style ([Egyptian brackets](https://blog.codinghorror.com/new-programming-jargon/)) for nonempty blocks and block-like constructs:

- No line break before the opening brace.
- Line break after the opening brace.
- Line break before the closing brace.
- Line break after the closing brace if that brace terminates a statement or the body of a function or class statement, or a class method. Specifically, there is no line break after the brace if it is followed by else, catch, while, or a comma, semicolon, or right-parenthesis.

Example:

```
class InnerClass {
  constructor() {}

  /** @param {number} foo */
  method(foo) {
    if (condition(foo)) {
      try {
        // Note: this might fail.
        something();
      } catch (err) {
        recover();
      }
    }
  }
}
```

#### 4.1.3 Empty blocks: may be concise

An empty block or block-like construct may be closed immediately after it is opened, with no characters, space, or line break in between (i.e. `{}`), unless it is a part of a multi-block statement (one that directly contains multiple blocks: `if`/`else` or `try`/`catch`/`finally`).

Example:

```
function doNothing() {}
```

Disallowed:

```
if (condition) {
  // …
} else if (otherCondition) {} else {
  // …
}

try {
  // …
} catch (e) {}
```

### 4.2 Block indentation: +2 spaces

Each time a new block or block-like construct is opened, the indent increases by two spaces. When the block ends, the indent returns to the previous indent level. The indent level applies to both code and comments throughout the block. Tabs _must not_ be used.

#### 4.2.1 Array and Object literals: optionally block-like

Any Array or Object literal _may_ be formatted as if it were a "block-like construct". Some examples:

```
const a = [
  0,
  1,
  2,
];

const b =
    [0, 1, 2];
```

```
const c = [0, 1, 2];

someMethod(foo, [
  0, 1, 2,
], bar);
```

```
const a = {
  a: 0,
  b: 1,
};

const b =
    {a: 0, b: 1};
```

```
const c = {a: 0, b: 1};

someMethod(foo, {
  a: 0, b: 1,
}, bar);
```

Literals _should_ be formatted according to readability.

#### 4.2.2 Function expressions

When declaring an anonymous function in the list of arguments for a function call, the body of the function is indented two spaces more than the preceding indentation depth.

Example:

```
prefix.something.reallyLongFunctionName('whatever', (a1, a2) => {
  // Indent the function body +2 relative to indentation depth
  // of the 'prefix' statement one line above.
  if (a1.equals(a2)) {
    someOtherLongFunctionName(a1);
  } else {
    andNowForSomethingCompletelyDifferent(a2.parrot);
  }
});

some.reallyLongFunctionCall(arg1, arg2, arg3)
    .thatsWrapped()
    .then((result) => {
      // Indent the function body +2 relative to the indentation depth
      // of the '.then()' call.
      if (result) {
        result.use();
      }
    });
```

#### 4.2.3 Switch statements

As with any other block, the contents of a switch block are indented +2.

After a `switch` label, a newline appears, and the indentation level is increased +2, exactly as if a block were being opened. An explicit block may be used if required by lexical scoping. The following `switch` label returns to the previous indentation level, as if a block had been closed.

A blank line is optional between a `break` and the following case.

Example:

```
switch (animal) {
  case Animal.BANDERSNATCH:
    handleBandersnatch();
    break;

  case Animal.JABBERWOCK:
    handleJabberwock();
    break;

  default:
    throw new Error('Unknown animal');
}
```

### 4.3 Statements

#### 4.3.1 One statement per line

Each statement is followed by a line-break.

#### 4.3.2 Semicolons are required

Every statement _must_ be terminated with a semicolon.

### 4.4 Column limit: 80

JavaScript code has a column limit of 80 characters.

Exceptions:

1. ES module import and export from statements (see 3.4.1 Imports and 3.4.2.4 export from).
2. Lines where obeying the column limit is not possible or would hinder discoverability. Examples include:
   - A long URL which should be clickable in source.
   - A shell command intended to be copied-and-pasted.
   - A long string literal which may need to be copied or searched for wholly (e.g., a long file path).

### 4.5 Line-wrapping

JavaScript code _should_ be line-wrapped to obey the 80-column limit. Code _may_ also be wrapped in order to improve readability, such as in the case of array literals.

#### 4.5.1 Where to break

The prime directive of line-wrapping is: prefer to break at a **higher syntactic level**

Preferred:

```
currentEstimate =
    calc(currentEstimate + x * currentEstimate) /
        2.0;
```

Discouraged:

```
currentEstimate = calc(currentEstimate + x *
    currentEstimate) / 2.0;
```

Operators are wrapped as follows:

1. When a line is broken at an operator the break comes after the symbol.
   - This does not apply to the dot (`.`), which is not actually an operator.
2. A method or constructor name stays attached to the open parenthesis (`(`) that follows it.
3. A comma (`,`) stays attached to the token that precedes it.

> Note: Line-wrapping is meant to maintain readable code. It is up to the discretion of the author to ensure readability within the style guide standards.

#### 4.5.2 Indent continuation lines in multiples of +4 spaces

When line-wrapping, each line after the first (each continuation line) is indented at least +4 from the original line, unless it falls under the rules of block indentation.

When there are multiple continuation lines, indentation may be varied beyond +4 as appropriate. In general, continuation lines at a deeper syntactic level are indented by larger multiples of 4, and two lines use the same indentation level if and only if they begin with syntactically parallel elements.

Refer to [4.6.3 Horizontal alignment: discouraged](#463-horizontal-alignment-discouraged) to understand why horizontal alignment is discouraged.

### 4.6 Whitespace

#### 4.6.1 Vertical whitespace

A single blank line _should_ appear to create logical grouping between statements. Multiple blank lines _may_ appear between major sections of the file. See [3 Source File Structure](#3-source-file-structure).

#### 4.6.2 Horizontal whitespace

Use of horizontal whitespace depends on location, and falls into three broad categories: _leading_ (at the start of a line), _trailing_ (at the end of a line), and _internal_. Leading whitespace (i.e., indentation) is addressed elsewhere. Trailing whitespace is forbidden.

Beyond where required by the language or other style rules, and apart from literals, comments, and JSDoc, a single internal ASCII space also appears in the following places **only**:

1. Separating any reserved word (such as `if`, `for`, or `catch`) except for `function` and `super`, from an open parenthesis (`(`) that follows it on that line.
2. Separating any reserved word (such as `else` or `catch`) from a closing curly brace (`}`) that precedes it on that line.
3. Before any open curly brace (`{`), with two exceptions:
   - Before an object literal that is the first argument of a function or the first element in an array literal (e.g. `foo({a: [{c: d}]})`).
   - In a template expansion, as it is forbidden by the language (e.g. valid: `ab${1 + 2}cd`, invalid: `xy$ {3}z`).
4. On both sides of any binary or ternary operator.
5. After a comma (`,`) or semicolon (`;`). Note that spaces are never allowed before these characters.
6. After the colon (`:`) in an object literal.
7. On both sides of the double slash (`//`) that begins an end-of-line comment. Here, multiple spaces are allowed, but not required.
8. After an open-block comment character and on both sides of close characters (e.g. for short-form type declarations, casts, and parameter name comments: `this.foo = /** @type {number} */ (bar)`; or `function(/** string */ foo) {; or baz(/* buzz= */ true)`).

#### 4.6.3 Horizontal alignment: discouraged

Horizontal alignment is tempting for initial readability, but discouraged as future edits of code can create a cascading effect of busywork to maintain the same formatting.

Example:

```
// original
{
  tiny:   42,  // nicely formatted, for now...
  longer: 435,
};

// reallyLongVariableName added

{
    tiny:                   42, // added whitespace
    longer:                 435, // added whitespace
    reallyLongVariableName: 1000,
};
```

> As we can see in the example above, with one line change we had to reformat the entire block. This has the follow-on effect that it becomes harder to understand which values are assigned to which variable because of the extra whitespace between name and value.

### 4.7 Grouping parentheses: recommended

Optional grouping parentheses are omitted only when the author and reviewer agree that there is no reasonable chance that the code will be misinterpreted without them, nor would they have made the code easier to read. It is not reasonable to assume that every reader has the entire operator precedence table memorized.

Do not use unnecessary parentheses around the entire expression following `delete`, `typeof`, `void`, `return`, `throw`, `case`, `in`, `of`, or `yield`.

Parentheses are required for type casts: `/** @type {!Foo} */ (foo)`.

### 4.8 Comments

> This section addresses implementation comments. JSDoc is addressed separately.

Block comments are indented at the same level as the surrounding code. They may be in `/* … */` or `//-style.` For multi-line `/* … */` comments, subsequent lines must start with `*` aligned with the `*` on the previous line, to make comments obvious with no extra context.

Comments _are not_ enclosed in boxes drawn with asterisks or other characters.

_Do not_ use JSDoc (`/** … */`) for implementation comments as it will clutter the JSDoc.

## 5 Language features

JavaScript includes many dubious (and even dangerous) features. This section delineates which features _may_ or _may not_ be used, and any additional constraints on their use.

### 5.1 Local variable declarations

#### 5.1.1 Use `const` and `let`

All variables _must_ be delared with:

- `const` if the variable does not need to be reassigned.
- `let` _only_ if the variable _must_ be reassigned later in the code.

`var` _must not_ be used.

#### 5.1.2 Declared when needed, initialized as soon as possible

Local variables _should_ be declared close to the point they are first used and initialized (within reason) to minimize their scope.

#### 5.1.3 Declare types as needed

JSDoc type annotations _may_ be added either on the line above the declaration, or else inline before the variable name if no other JSDoc is present.

Example:

```
const /** !Array<number> */ data = [];

/**
 * Some description.
 * @type {!Array<number>}
 */
const data = [];
```

Mixing inline and JSDoc styles is not allowed: the compiler will only process the first JsDoc and the inline annotations will be lost.

### 5.2 Array and Object literals

#### 5.2.1 Use trailing commas

Include a trailing comma whenever there is a line break between the final element and the closing bracket.

Example:

```
const values = [
  'first value',
  'second value',
];
```

> Including a trailing comma makes it easier to add more elements if necessary without risking a difficult-to-track-down syntax problem.

#### 5.2.2 `Array` and `Object` constructor

The `Array` constructor is error-prone and _should not_ be used. The `Object` constructor is less error-prone, however for consistency it _should not_ be used.

#### 5.2.3 Do no mix quoted and unquoted keys in Object literals

Object literals may represent either structs (with unquoted keys and/or symbols) or dicts (with quoted and/or computed keys). Do not mix these key types in a single object literal.

### 5.3 Functions

#### 5.3.1 Nested functions and closures

Functions _may_ contain nested function definitions. If it is useful to give the function a name, it should be assigned to a local `const`.

#### 5.3.2 Parameter and return types

Function parameters and return types should be documented with JSDoc annotations.

Optional parameters are permitted using the equals operator in the parameter list. Optional parameters must include spaces on both sides of the equals operator, be named exactly like required parameters (i.e., not prefixed with `opt_`), use the `=` suffix in their JSDoc type, come after required parameters, and not use initializers that produce observable side effects. All optional parameters for concrete functions must have default values, even if that value is `undefined`. In contrast to concrete functions, abstract and interface methods must omit default parameter values.

### 5.4 String literals

#### 5.4.1 Use double quotes

Ordinary string literals are delimited with double quotes (`"`) rather than single quotes (`'`).

Consistency here helps for the following reasons:

1. Double quotes eliminate the need to escape apostrophes
2. While JavaScript does not differentiate between `"` and `'`, it could be confusing to someone with a background in another language where `'` denotes a character or a string with no support of backslash escapes.
3. JSON notation is written with double quotes.

> **Note**: While JavaScript makes no distiction between `"` and `'`, as many on our team are first-time JavaScript developers, we will do everything we can to avoid confusion on their part.

#### 5.4.2 No line continuations

_Do not_ use line continuations as it reduces readability and can lead to tricky errors. Instead use concatenation of smaller string literals if the 80 column limit is exceeded by a string literal.

### 5.5 Control structures

#### 5.5.1 Exceptions

Exceptions _should_ be used whenever exceptional cases occur.

##### 5.5.1.1 Empty catch blocks

It is very rarely correct to do nothing in response to a caught exception. When it truly is appropriate to take no action whatsoever in a catch block, the reason this is justified is explained in a comment.

```
try {
  return handleNumericResponse(response);
} catch (ok) {
  // it's not numeric; that's fine, just continue
}
return handleTextResponse(response);
```

Disallowed:

```
  try {
    shouldFail();
    fail('expected an error');
  } catch (expected) {
  }
```

#### 5.5.2 Switch statements

Within a `switch` block, each statement group either terminates abruptly (with a `break`, `return` or thrown exception), or is marked with a comment to indicate that execution will or might continue into the next statement group. Any comment that communicates the idea of fall-through is sufficient (typically `// fall through`). This special comment is not required in the last statement group of the switch block.

The `default` case _must_ be present, even if it contains no code.

#### 5.5.3 Non-standard features

_Do not_ use non-standard features. This includes old features that have been removed (e.g., `WeakMap.clear`), new features that are not yet standardized (e.g., the current TC39 working draft, proposals at any stage, or proposed but not-yet-complete web standards), or proprietary features that are only implemented in some browsers. Use only features defined in the current ECMA-262 or WHATWG standards.

#### 5.5.4 Frameworks and libraries

In the spirit of this course and to avoid bloated projects, as much code as possible _should_ be written in native JavaScript without outside frameworks or libraries. Any use of outside frameworks _must_ be approved by a TA or the professor. If you feel an outside framework would contribute greatly to the productivity or functionality of the project, raise an issue with a team lead and we will get you an answer ASAP.

## 6 Naming

### 6.1 Rules common to all identifiers

Identifiers use only ASCII letters and digits, and, in a small number of cases noted below, underscores and very rarely (when required by frameworks like Angular) dollar signs.

Give as descriptive a name as possible, within reason. Do not worry about saving horizontal space as it is far more important to make your code immediately understandable by a new reader. Do not use abbreviations that are ambiguous or unfamiliar to readers outside your project, and do not abbreviate by deleting letters within a word.

Allowed:

```
errorCount          // No abbreviation.
dnsConnectionIndex  // Most people know what "DNS" stands for.
referrerUrl         // Ditto for "URL".
customerId          // "Id" is both ubiquitous and unlikely to be misunderstood.
```

Disallowed:

```
n                   // Meaningless.
nErr                // Ambiguous abbreviation.
nCompConns          // Ambiguous abbreviation.
wgcConnections      // Only your group knows what this stands for.
pcReader            // Lots of things can be abbreviated "pc".
cstmrId             // Deletes internal letters.
kSecondsPerDay      // Do not use Hungarian notation.
```

### 6.2 Rules by identifier type

#### Package names

Package names are all `lowerCamelCase`.

#### Class names

Class, interface, record, and typedef names are written in `UpperCamelCase`. Class names _should_ be one noun that encompasses what the class represents, unless one word is not descriptive enough.

#### Method names

Method names are written in `lowerCamelCase`.

Method names are typically verbs or verb phrases.

#### Enum names

Enum names are written in `UpperCamelCase` and _should_ generally be singular nouns. Individual items within the enum are written in `CONSTANT_CASE`

#### Constant names

Constant names use `CONSTANT_CASE`: all uppercase letters, with words separated by underscores. There is no reason for a constant to be named with a trailing underscore, since private static properties can be replaced by (implicitly private) module locals.

Every constant is a `@const` static property or a module-local `const` declaration, but not all `@const` static properties and module-local `const`s are constants. Before choosing constant case, consider whether the field really feels like a _deeply immutable_ constant. For example, if any of that instance's observable state can change, it is almost certainly not a constant. Merely intending to never mutate the object is generally not enough.

#### Non-constant field names

Non-constant field names (static or otherwise) are written in `lowerCamelCase` and _should_ be nouns.

#### Parameter names

Parameter names are written in `lowerCamelCase`, except when required by a third-party framework.

#### Local variable names

Local variable names are written in `lowerCamelCase` and _should_ be nouns.

## 7 JSDoc

[JSDoc](https://jsdoc.app/) is used on all classes, fields, and methods.

### 7.1 General form

The basic formatting of JSDoc blocks is as seen in this example:

```
/**
 * Multiple lines of JSDoc text are written here,
 * wrapped normally.
 * @param {number} arg A number to do something to.
 */
function doSomething(arg) { … }
```

Many tools extract metadata from JSDoc comments to perform code validation. As such, these comments _must_ be well-formed.

### 7.2 JSDoc tags

Tags should generally be on their own line in a JSDoc comment. Simple tags that do not require any additional data _may_ be combined onto the same line.

### 7.3 Line wrapping

Line-wrapped block tags are indented four spaces.

Example:

```
/**
 * Illustrates line wrapping for long param/return descriptions.
 * @param {string} foo This is a param with a description too long to fit in
 *     one line.
 * @return {number} This returns something that has a description too long to
 *     fit in one line.
 */
exports.method = function(foo) {
  return 5;
};
```

### 7.4 File-level comments

A file _should_ have a top-level file overview. Author information and default visibility level are optional. File overviews are generally recommended whenever a file consists of more than a single class definition. The top level comment is designed to orient readers unfamiliar with the code to what is in this file. If present, it may provide a description of the file's contents and any dependencies or compatibility information. Wrapped lines are not indented.

### 7.5 Class comments

Classes, interfaces and records _must_ be documented with a description and any template parameters, implemented interfaces, visibility, or other appropriate tags. The class description should provide the reader with enough information to know how and when to use the class, as well as any additional considerations necessary to correctly use the class. Textual descriptions may be omitted on the constructor. `@constructor` and `@extends` annotations are not used with the class keyword unless the class is being used to declare an `@interface` or it extends a generic class.

```
/**
 * A fancier event target that does cool things.
 * @implements {Iterable<string>}
 */
class MyFancyTarget extends EventTarget {
  /**
   * @param {string} arg1 An argument that makes this more interesting.
   * @param {!Array<number>} arg2 List of numbers to be processed.
   */
  constructor(arg1, arg2) {
    // ...
  }
};

/**
 * Records are also helpful.
 * @extends {Iterator<TYPE>}
 * @record
 * @template TYPE
 */
class Listable {
  /** @return {TYPE} The next item in line to be returned. */
  next() {}
}
```

### 7.6 Enum and typedef comments

All enums and typedefs _must_ be documented with appropriate JSDoc tags (`@typedef` or `@enum`) on the preceding line. Public `enum`s and `typedef`s must also have a description. Individual `enum` items may be documented with a JSDoc comment on the preceding line.

```
/**
 * A useful type union, which is reused often.
 * @typedef {!Bandersnatch|!BandersnatchType}
 */
let CoolUnionType;


/**
 * Types of bandersnatches.
 * @enum {string}
 */
const BandersnatchType = {
  /** This kind is really frumious. */
  FRUMIOUS: 'frumious',
  /** The less-frumious kind. */
  MANXOME: 'manxome',
};
```

### 7.7 Method and function comments

Methods and functions _must_ be documented with JSDoc as well as parameter and return types.

```
/** A class that does something. */
class SomeClass extends SomeBaseClass {
  /**
   * Operates on an instance of MyClass and returns something.
   * @param {!MyClass} obj An object that for some reason needs detailed
   *     explanation that spans multiple lines.
   * @param {!OtherClass} obviousOtherClass
   * @return {boolean} Whether something occurred.
   */
  someMethod(obj, obviousOtherClass) { ... }

  /** @override */
  overriddenMethod(param) { ... }
}

/**
 * Demonstrates how top-level functions follow the same rules.  This one
 * makes an array.
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */
function makeArray(arg) { ... }
```

### 7.8 Property comments

Property types must be documented. The description may be omitted for private properties, if name and type provide enough documentation for understanding the code.

```
/** My class. */
class MyClass {
  /** @param {string=} someString */
  constructor(someString = 'default string') {
    /** @private @const {string} */
    this.someString_ = someString;

    /** @private @const {!OtherType} */
    this.someOtherThing_ = functionThatReturnsAThing();

    /**
     * Maximum number of things per pane.
     * @type {number}
     */
    this.someProperty = 4;
  }
}

/**
 * The number of times we'll try before giving up.
 * @const {number}
 */
MyClass.RETRY_COUNT = 33;
```

### 7.9 Type annotations

Type annotations are found on `@param`, `@return`, `@this`, and `@type` tags, and optionally on `@const`, `@export`, and any visibility tags. Type annotations attached to JSDoc tags must always be enclosed in braces.

## 8 Policies

For any style question that isn't settled definitively by this specification, prefer to do what the other code in the same file is already doing. Questions can also be directed to team leads, who will make clarifications and adjust this specification as necessary to maintain consistency.
