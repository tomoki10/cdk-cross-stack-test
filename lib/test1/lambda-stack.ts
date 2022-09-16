import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda as lambda } from "aws-cdk-lib";

export class LambdaStack extends cdk.Stack {
  public readonly lambdaA: lambda.Function;
  public readonly lambdaB: lambda.Function;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // MEMO: ダウンタイムを最小限にして移行する方法の動作確認ステップ
    // 1. 一度はstackCrossTest,stackCrossTest2のみでデプロイ
    // 2. stackCrossTest3を有効化し、lambdaAにstackCrossTest3を代入。擬似Outputを有効化
    // 3. 擬似アウトプットとstackCrossTestを削除

    const stackCrossTest = new lambda.Function(this, `StackCrossTestFunction`, {
      code: lambda.Code.fromAsset(`src/handler`),
      functionName: `stack-cross-test`,
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_16_X,
    });
    const stackCrossTest2 = new lambda.Function(this, `StackCrossTestFunction2`, {
      code: lambda.Code.fromAsset(`src/handler`),
      functionName: `stack-cross-test-2`,
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_16_X,
    });
    const stackCrossTest3 = new lambda.Function(this, `StackCrossTestFunction3`, {
      code: lambda.Code.fromAsset(`src/handler`),
      functionName: `stack-cross-test-3`,
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_16_X,
    });
    this.lambdaA = stackCrossTest;
    this.lambdaB = stackCrossTest2;
    // 擬似的なOutputsの作成(CDK v1.90.1以降);
    this.exportValue(stackCrossTest.functionArn);

    // 擬似的なOutputsの作成;
    // 1個目のLambdaのOutputを偽装する
    new cdk.CfnOutput(this, "ExportsOutputFnGetAttStackCrossTestFunctionXXXXXXXXXXXXXXXXXXX", {
      exportName: "LambdaStack:ExportsOutputFnGetAttStackCrossTestFunctionXXXXXXXXXXXXXXXXXXX",
      value: stackCrossTest.functionArn,
    });
  }
}
