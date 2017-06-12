'use strict';

const path = require('path');

const minimatch = require('minimatch');
const stylelint = require('stylelint');
const selectorParser = require('postcss-selector-parser');

const ruleName = 'smc-dxp-theme/disallow-ids';

const messages = stylelint.utils.ruleMessages(ruleName, {
	invalid: id =>
		`Invalid presence of id "#${id}"; please use classes instead.`
});

const COMPONENTS_GLOB = '**/css/components/**/*.scss';
const STYLES_GLOB = '**/css/styles/**/*.scss';
const GLOB = `{${COMPONENTS_GLOB},${STYLES_GLOB}}`;

const plugin = stylelint.createPlugin(
	ruleName,
	(option = true, secondaryOptions) => (root, result) => {
		var validOptions = stylelint.utils.validateOptions(
			result,
			ruleName,
			option
		);

		if (!validOptions) {
			return;
		}

		const inputFile = root.source.input.file;

		if (!minimatch(inputFile, GLOB)) {
			return;
		}

		root.walkRules(rule => {
			const linter = lintSelector(rule);

			selectorParser(linter).process(rule.selector);
		});

		function lintSelector(rule) {
			return root => {
				root.nodes.forEach(selector => {
					selector.nodes.forEach(part => {
						if (part.type === 'id') {
							stylelint.utils.report({
								ruleName,
								result,
								node: rule,
								message: messages.invalid(part.value)
							});
						}
					});
				});
			};
		}
	}
);

module.exports = plugin;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
