import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_apigateway as apigateway } from "aws-cdk-lib";

export class ApiStack extends cdk.Stack {
  public readonly stackProps: ApiStackProps;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    new apigateway.LambdaRestApi(this, `Endpoint`, {
      handler: props.lambdaA,
    });
  }
}

export interface ApiStackProps extends cdk.StackProps {
  lambdaA: lambda.Function;
  lambdaB: lambda.Function;
}
