import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_apigateway as apigateway } from "aws-cdk-lib";

export class ApiStack extends cdk.Stack {
  public readonly stackProps: ApiStackProps;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    const restApi = new apigateway.RestApi(this, "restApi", {
      restApiName: "api-test",
    });
    restApi.root.addMethod("GET", new apigateway.LambdaIntegration(props.lambdaA));
    restApi.root.addMethod("POST", new apigateway.LambdaIntegration(props.lambdaB));
  }
}

export interface ApiStackProps extends cdk.StackProps {
  lambdaA: lambda.Function;
  lambdaB: lambda.Function;
}
