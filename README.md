DXP Themes Stylelint plugin
===========================

This plugin enforces some of [SMC](https://www.smc.it)’s best-practices for [Liferay DXP](https://liferay.com) themes.

Quick start
-----------

Install the plugin:

	yarn add @smclab/stylelint-dxp-theme

Configure it in your `.stylelintrc`:

```json
{
  "plugins": [
    "@smclab/stylelint-dxp-theme"
  ],
  "rules": {
    "smc-dxp-theme/components": true,
    "smc-dxp-theme/disallow-ids": true
  }
}

```

Theme Structure
---------------

The recommended theme structure (regarding CSS) is as follows:

```bash
src/css
│   # custom components:
├── components/_*.scss
│   # changes (and variants) to BS/Clay components:
├── styles/_*.scss
│   # import from ./styles and then ./components:
├── _aui_custom.scss
│   # customize BS/Clay:
└── _aui_variables.scss
```

Rules
-----

### Components

```json
rules: {
  "smc-dxp-theme/components": true
}
```

This rule is applied to all files inside `src/css/components`.

It requires all root selectors to be strictly related to the component styled in the file.

The name of the component comes from the name of the file.

```diff
my-cool-theme/src/css/components/_my-carousel.scss

// This rule is ok because it matches the file name:
+ .my-carousel {
+   background: white;
+ }

// Variants and components’ parts are ok too:
+ .my-carousel-vertical {
+   flex-direction: column;
+ }

// Unrelated selectors are not ok:
- .btn-for-carousel {
-    position: absolute;
- }

// Unrelated selectors are ok **if nested**
+ .my-carousel {
+   .btn-for-carousel { position: absolute; }
+ }

// All selectors in a list must be related, so this is not ok:
- .my-carousel, .my-pagination { … }
```

### Disallow IDs

```json
rules: {
  "smc-dxp-theme/components": true
}
```

This rule is applied to all files inside `src/css/components` and `src/css/styles`.

```diff
my-cool-theme/src/css/styles/_my-carousel.scss

// All selector types are ok…
+ a:link, a:visited { … }
+ [rel="slideshow"] { … }

// …but not IDs:
- #someid { … }
- .some-class #someid { … }
```

Credits
-------

Humbly made by the spry ladies and gents at [SMC](https://www.smc.it).

License
-------

This library, *DXP Themes Stylelint plugin*, is free software ("Licensed
Software"); you can redistribute it and/or modify it under the terms of the
[GNU Lesser General Public License](http://www.gnu.org/licenses/lgpl-2.1.html)
as published by the Free Software Foundation; either version 2.1 of the
License, or (at your option) any later version.

This library is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; including but not limited to, the implied warranty of MERCHANTABILITY,
NONINFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
Public License for more details.

You should have received a copy of the [GNU Lesser General Public
License](http://www.gnu.org/licenses/lgpl-2.1.html) along with this library; if
not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth
Floor, Boston, MA 02110-1301 USA
