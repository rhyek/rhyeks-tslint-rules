import * as ts from 'typescript';
import * as Lint from 'tslint';

type Options = {
  binary?: [string, string, string[]][];
};

export class Rule extends Lint.Rules.TypedRule {
  public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
    const options = this.ruleArguments[0] as Options | undefined;
    if (options) {
      return this.applyWithFunction(sourceFile, walk, options, program.getTypeChecker());
    }
    return [];
  }
}

function walk(ctx: Lint.WalkContext<Options>, tc: ts.TypeChecker): void {
  return ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
    if (ctx.options.binary && ts.isBinaryExpression(node)) {
      const leftType = tc.typeToString(tc.getTypeAtLocation(node.left));
      const rightType = tc.typeToString(tc.getTypeAtLocation(node.right));
      for (const [leftTypeStr, rightTypeStr, operators] of ctx.options.binary) {
        if (
          (leftType === rightType && leftType === leftTypeStr && rightType === rightTypeStr) ||
          (leftType !== rightType &&
            leftTypeStr !== rightTypeStr &&
            [leftType, rightType].includes(leftTypeStr) &&
            [leftType, rightType].includes(rightTypeStr))
        ) {
          for (const operator of operators) {
            if (node.operatorToken.getText() === operator) {
              ctx.addFailureAtNode(
                node,
                `Expression forbidden (${leftType} ${operator} ${rightType}).`
              );
            }
          }
        }
      }
    }
    return ts.forEachChild(node, cb);
  });
}
