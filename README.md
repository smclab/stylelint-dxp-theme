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
    "smc-dxp-theme/components": true
  }
}

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
