#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ApiStack } from "../lib/test1/api-stack";
import { LambdaStack } from "../lib/test1/lambda-stack";
import { ApiStack as ApiStack2 } from "../lib/test2/api-stack";
import { LambdaStack as LambdaStack2 } from "../lib/test2/lambda-stack";
import { ApiStack as ApiStack3 } from "../lib/test3/api-stack";
import { LambdaStack as LambdaStack3 } from "../lib/test3/lambda-stack";
import { LambdaRestApiStack } from "../lib/test4/lambda-rest-api-stack";

const app = new cdk.App();

// テストケース1. APIG->Lambda パターン
const lambdaStack = new LambdaStack(app, "LambdaStack");
const apiStack = new ApiStack(app, "ApiStack", { lambdaA: lambdaStack.lambdaA, lambdaB: lambdaStack.lambdaB });

// テストケース2. Lambda->APIG パターン(テンプレートの参照はケース1と同様)
// const apiStack = new ApiStack2(app, "ApiStack2");
// const lambdaStack = new LambdaStack2(app, "LambdaStack2", { restApi: apiStack.stackProps.restApi });

// テストケース3. APIG->Lambda パターン(ケース1の別メソッド版)
// const lambdaStack = new LambdaStack3(app, "LambdaStack3");
// const apiStack = new ApiStack3(app, "ApiStack3", { lambdaA: lambdaStack.lambdaA, lambdaB: lambdaStack.lambdaB });

// テストケース4. Constructで分けてStackをまとめるパターン
// const lambdaRestApiStack = new LambdaRestApiStack(app, "LambdaRestApiStack");
