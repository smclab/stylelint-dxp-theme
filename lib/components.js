'use strict';

const path = require('path');

const minimatch = require('minimatch');
const stylelint = require('stylelint');
const selectorParser = require('postcss-selector-parser');

const ruleName = 'smc-dxp-theme/components';

const messages = stylelint.utils.ruleMessages(ruleName, {
	expected: (selector, componentName) =>
		`Expected root selector "${selector}" to match component name "${componentName}".`
});

const COMPONENTS_GLOB = '**/css/components/**/*.scss';
const COMPONENT_RE = /^_?([a-z\-]+).scss$/;

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
		const inputFilename = path.basename(inputFile);

		if (!minimatch(inputFile, COMPONENTS_GLOB)) {
			return;
		}

		const [, componentName] = inputFilename.match(COMPONENT_RE) || [];

		if (!componentName) {
			return;
		}

		root.walkRules(rule => {
			const linter = lintSelector(rule, componentName);

			if (rule.parent.type === 'root') {
				selectorParser(linter).process(rule.selector);
			}
		});

		function matchesComponent(className, componentName) {
			return (
				className === componentName ||
				className.slice(0, componentName.length + 1) ===
					componentName + '-'
			);
		}

		function lintSelector(rule) {
			return root => {
				const valid = root.nodes.every(selector =>
					selector.nodes.some(
						part =>
							part.type === 'class' &&
							matchesComponent(part.value, componentName)
					)
				);

				if (!valid) {
					stylelint.utils.report({
						ruleName,
						result,
						node: rule,
						message: messages.expected(rule.selector, componentName)
					});
				}
			};
		}
	}
);

module.exports = plugin;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
