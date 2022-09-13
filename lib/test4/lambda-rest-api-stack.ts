import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApiConstruct } from "./construct/api-construct";
import { LambdaConstruct } from "./construct/lambda-construct";

export class LambdaRestApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const lambdaConstruct = new LambdaConstruct(this, "LambdaConstruct");
    new ApiConstruct(this, "ApiConstruct", { lambdaA: lambdaConstruct.lambdaA });
  }
}
