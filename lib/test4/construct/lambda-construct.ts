import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_apigateway as apigateway } from "aws-cdk-lib";

export class LambdaConstruct extends Construct {
  public readonly lambdaA: lambda.Function;
  public readonly lambdaB: lambda.Function;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const ConstructCrossTest = new lambda.Function(this, `ConstructCrossTestFunction`, {
      code: lambda.Code.fromAsset(`src/handler`),
      functionName: `Construct-cross-test`,
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_16_X,
    });
    const ConstructCrossTest2 = new lambda.Function(this, `ConstructCrossTestFunction2`, {
      code: lambda.Code.fromAsset(`src/handler`),
      functionName: `Construct-cross-test-2`,
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_16_X,
    });
    this.lambdaA = ConstructCrossTest;
    this.lambdaB = ConstructCrossTest2;
  }
}
