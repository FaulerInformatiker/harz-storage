module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent disabling E2E tests in Husky hooks',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        const filename = context.getFilename();
        const sourceCode = context.getSourceCode();
        const text = sourceCode.getText();
        
        // Check if this is a Husky hook file
        if (filename.includes('.husky/')) {
          // Check for commented out E2E test lines
          const commentedE2EPatterns = [
            /^#.*npm run test:e2e/m,
            /^#.*Running E2E tests/m,
            /^#.*🎭.*E2E/m,
            /disabled.*e2e/i,
            /skip.*e2e/i,
            /E2E tests.*disabled/i,
            /temporarily disabled/i
          ];
          
          for (const pattern of commentedE2EPatterns) {
            if (pattern.test(text)) {
              context.report({
                node,
                message: 'E2E tests must never be disabled in Husky hooks. They are required for code quality.',
              });
              break;
            }
          }
          
          // Ensure E2E tests are actually enabled
          if (!text.includes('npm run test:e2e') || !text.includes('Running E2E tests')) {
            context.report({
              node,
              message: 'E2E tests must be enabled in Husky hooks. Add "npm run test:e2e" command.',
            });
          }
        }
      },
    };
  },
};
