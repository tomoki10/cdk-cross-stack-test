import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_apigateway as apigateway } from "aws-cdk-lib";

export class ApiConstruct extends Construct {
  public readonly ConstructProps: ApiConstructProps;

  constructor(scope: Construct, id: string, props: ApiConstructProps) {
    super(scope, id);
    new apigateway.LambdaRestApi(this, `Endpoint`, {
      handler: props.lambdaA,
    });
  }
}

export interface ApiConstructProps extends cdk.StackProps {
  lambdaA: lambda.Function;
}
