import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_apigateway as apigateway } from "aws-cdk-lib";
import { ApiStackProps } from "./api-stack";

export class LambdaStack extends cdk.Stack {
  public readonly lambdaA: lambda.Function;
  public readonly lambdaB: lambda.Function;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
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
    this.lambdaA = stackCrossTest;
    this.lambdaB = stackCrossTest2;
  }
}
