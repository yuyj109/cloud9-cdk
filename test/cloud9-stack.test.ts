import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Cloud9Stack from '../lib/cloud9-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Cloud9Stack.Cloud9Stack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT,
    ),
  );
});
