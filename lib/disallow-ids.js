'use strict';

const minimatch = require('minimatch');
const stylelint = require('stylelint');

const ruleName = 'smc-dxp-theme/disallow-ids';

const messages = stylelint.utils.ruleMessages(ruleName, {
	invalid: `Invalid presence of id; please use classes instead.`
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

		stylelint.utils.checkAgainstRule(
			{
				ruleName: 'selector-max-id',
				ruleSettings: [ 0 ],
				root
			},
			warning => {
				stylelint.utils.report({
					message: messages.invalid,
					ruleName,
					result,
					node: warning.node,
					line: warning.line,
					column: warning.column
				});
			}
		);
	}
);

module.exports = plugin;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
