#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Cloud9Stack } from '../lib/cloud9-stack';

const app = new cdk.App();
new Cloud9Stack(app, 'Cloud9Stack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth();
