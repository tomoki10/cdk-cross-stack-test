import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_apigateway as apigateway } from "aws-cdk-lib";
import { ApiStackProps } from "./api-stack";

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

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
    props.restApi.root.addMethod("GET", new apigateway.LambdaIntegration(stackCrossTest));
    props.restApi.root.addMethod("POST", new apigateway.LambdaIntegration(stackCrossTest2));
    // 擬似的なOutputsの作成(CDK v1.90.1以降);
    this.exportValue(stackCrossTest.functionArn);

    // 擬似的なOutputsの作成(一個目の関数の擬似Output);
    //
    // cdk.outに生成されたCfnテンプレートの以下のようなOutputsを確認して偽装する
    // cdk.out/LambdaStack.template.json:
    // ...
    // "Outputs": {
    // "ExportsOutputFnGetAttStackCrossTestFunctionXXXXXXXXXXXXXXXXXXX": {
    //  "Value": {
    //   "Fn::GetAtt": [
    //    "StackCrossTestFunctionXXXXXXXX",
    //    "Arn"
    //   ]
    //  },
    //  "Export": {
    //   "Name": "LambdaStack2:ExportsOutputFnGetAttStackCrossTestFunctionXXXXXXXXXXXXXXXXXXX"
    //  }
    // },
    // ...
    //
    // 偽装で作成したOutputの例:
    // new cdk.CfnOutput(
    //   this,
    //   "ExportsOutputFnGetAttStackCrossTestFunctionXXXXXXXXXXXXXXXXXXX",
    //   {
    //     exportName: "LambdaStack2:ExportsOutputFnGetAttStackCrossTestFunctionXXXXXXXXXXXXXXXXXXX",
    //     value: stackCrossTest.functionArn,
    //   }
    // );
  }
}
