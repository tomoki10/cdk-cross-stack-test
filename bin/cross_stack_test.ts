#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CrossStackTestStack } from '../lib/cross_stack_test-stack';

const app = new cdk.App();
new CrossStackTestStack(app, 'CrossStackTestStack');
